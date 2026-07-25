import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItem, createItem, updateItem } from '../lib/adminApi';

export default function FormPage({ resource, title, fields, backPath }) {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchItem(resource, id)
        .then((item) => {
          const initial = {};
          fields.forEach((f) => {
            initial[f.key] = item[f.key] ?? (f.type === 'checkbox' ? false : '');
          });
          initial.id = item.id;
          initial.slug = item.slug;
          setFormData(initial);
        })
        .catch(() => setError('Failed to load item'))
        .finally(() => setLoading(false));
    } else {
      const initial = {};
      fields.forEach((f) => {
        if (f.type === 'select') {
          initial[f.key] = f.options?.[0]?.value ?? '';
        } else if (f.type === 'checkbox') {
          initial[f.key] = false;
        } else if (f.type === 'number') {
          initial[f.key] = 0;
        } else {
          initial[f.key] = '';
        }
      });
      setFormData(initial);
    }
  }, [id, isEdit, resource]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {};
    const fileFields = [];
    const nullFileFields = [];
    fields.forEach((f) => {
      if (f.type === 'file') {
        if (formData[f.key] instanceof File) {
          fileFields.push(f.key);
        } else if (formData[f.key] === null && isEdit) {
          nullFileFields.push(f.key);
        }
      } else if (f.type === 'json') {
        try {
          payload[f.key] = JSON.parse(formData[f.key] || '[]');
        } catch {
          setError(`Invalid JSON in "${f.label}"`);
          setSaving(false);
          return;
        }
      } else {
        payload[f.key] = formData[f.key];
      }
    });

    try {
      let result;
      if (fileFields.length > 0) {
        const fd = new FormData();
        Object.entries(payload).forEach(([k, v]) => {
          fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
        });
        fileFields.forEach((fk) => {
          if (formData[fk] instanceof File) fd.append(fk, formData[fk]);
        });
        nullFileFields.forEach((fk) => {
          fd.append(fk, '');
        });
        result = isEdit
          ? await updateItem(resource, id, fd)
          : await createItem(resource, fd);
      } else if (nullFileFields.length > 0) {
        nullFileFields.forEach((fk) => { payload[fk] = null; });
        result = isEdit
          ? await updateItem(resource, id, payload)
          : await createItem(resource, payload);
      } else {
        result = isEdit
          ? await updateItem(resource, id, payload)
          : await createItem(resource, payload);
      }
      navigate(backPath);
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <h1 className="font-heading text-[1.8rem] text-ink mb-6">
        {isEdit ? `Edit ${title}` : `New ${title}`}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 text-[0.92rem] px-4 py-3 rounded-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-paper-white border border-line rounded-lg p-6 max-w-[700px]">
        {fields.map((field) => (
          <div key={field.key} className="mb-5">
            <label className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
              {field.label}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={field.rows || 4}
                required={field.required}
                className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.92rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm resize-y"
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.92rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                  className="w-4 h-4 accent-brass"
                />
                <span className="text-[0.88rem] text-ink-soft">{field.hint || 'Yes'}</span>
              </label>
            ) : field.type === 'file' ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(field.key, e.target.files[0])}
                  className="w-full text-[0.92rem] text-ink file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-ink file:text-paper file:font-semibold file:text-[0.85rem] file:cursor-pointer"
                />
                {isEdit && formData[field.key] && typeof formData[field.key] === 'string' && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData[field.key]}
                      alt="Current"
                      className="w-[120px] h-[80px] object-cover rounded-sm border border-line"
                    />
                    <button
                      type="button"
                      onClick={() => handleChange(field.key, null)}
                      className="text-[0.82rem] text-red-600 hover:text-red-800 underline cursor-pointer bg-transparent border-none"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : field.type === 'json' ? (
              <textarea
                value={typeof formData[field.key] === 'string' ? formData[field.key] : JSON.stringify(formData[field.key] || [], null, 2)}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={field.rows || 6}
                required={field.required}
                className="w-full border border-line bg-transparent py-2.5 px-3 font-mono text-[0.82rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm resize-y"
              />
            ) : field.type === 'number' ? (
              <input
                type="number"
                value={formData[field.key] ?? ''}
                onChange={(e) => handleChange(field.key, parseInt(e.target.value) || 0)}
                required={field.required}
                className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.92rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm"
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                required={field.required}
                placeholder={field.placeholder || ''}
                className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.92rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm"
              />
            )}
          </div>
        ))}

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-ink text-paper border-none py-2.5 px-7 font-semibold text-[0.92rem] rounded-sm cursor-pointer transition-colors hover:bg-ribbon disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="border border-line text-ink py-2.5 px-7 font-semibold text-[0.92rem] rounded-sm cursor-pointer transition-colors hover:border-brass bg-transparent"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
