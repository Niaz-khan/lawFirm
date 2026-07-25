import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchList, deleteItem } from '../lib/adminApi';

function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    }}>
      <div style={{
        background: '#F8F4E9', borderRadius: 8, padding: 32, maxWidth: 420, width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <p style={{ fontSize: '1rem', color: '#2B2924', margin: 0 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 24px', borderRadius: 4, border: '1px solid rgba(43,41,36,0.14)',
              background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', color: '#2B2924',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '10px 24px', borderRadius: 4, border: 'none',
              background: '#A83E32', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#2B2924',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ListPage({ resource, title, columns, createPath }) {
  const basePath = createPath.replace(/\/new$/, '');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    fetchList(resource)
      .then((data) => setItems(data.results || data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, [resource]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const lookup = deleteTarget.slug || deleteTarget.id;
    try {
      await deleteItem(resource, lookup);
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    } catch {
      alert('Failed to delete');
    }
    setDeleteTarget(null);
  };

  return (
    <div>
      <ConfirmModal
        open={!!deleteTarget}
        message="Are you sure you want to delete this?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-[1.8rem] text-ink">{title}</h1>
        <Link
          to={createPath}
          className="bg-brass text-ink px-5 py-2.5 font-semibold text-[0.9rem] rounded-sm hover:bg-brass-light transition-colors"
        >
          + New
        </Link>
      </div>

      {loading ? (
        <p className="text-slate">Loading...</p>
      ) : items.length === 0 ? (
        <div className="bg-paper-white border border-line rounded-lg p-12 text-center">
          <p className="text-slate text-[1rem]">No items yet.</p>
          <Link to={createPath} className="text-brass hover:text-brass-light text-[0.92rem] mt-2 inline-block">
            Create the first one →
          </Link>
        </div>
      ) : (
        <div className="bg-paper-white border border-line rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-[#f8f6f0]">
                {columns.map((col) => (
                  <th key={col.key} className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate px-5 py-3">
                    {col.label}
                  </th>
                ))}
                <th className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate px-5 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-line last:border-b-0 hover:bg-[#faf8f3] transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-[0.92rem] text-ink">
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <Link
                      to={`${basePath}/${item.slug || item.id}/edit`}
                      className="bg-green-600 text-white px-4 py-2 text-[0.82rem] font-semibold rounded-sm hover:bg-green-700 transition-colors mr-2 inline-block"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="bg-red-600 text-white px-4 py-2 text-[0.82rem] font-semibold rounded-sm hover:bg-red-700 transition-colors cursor-pointer border-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
