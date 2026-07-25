import { useState, useEffect } from 'react';
import { fetchList, updateItem, deleteItem } from '../lib/adminApi';

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
            style={{ padding: '8px 20px', borderRadius: 4, border: '1px solid #6E6A5C', background: 'transparent', color: '#2B2924', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{ padding: '8px 20px', borderRadius: 4, border: 'none', background: '#A83E32', color: '#2B2924', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-green-100 text-green-700',
};

export default function InquiriesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    fetchList('inquiries')
      .then((data) => setItems(data.results || data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatus = async (id, status) => {
    try {
      await updateItem('inquiries', id, { status });
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem('inquiries', id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeleteTarget(null);
      setExpanded(null);
    } catch {
      alert('Failed to delete inquiry');
    }
  };

  if (loading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <h1 className="font-heading text-[1.8rem] text-ink mb-2">Inquiries</h1>
      <p className="text-slate text-[0.95rem] mb-6">Contact form submissions from the public site.</p>

      {items.length === 0 ? (
        <div className="bg-paper-white border border-line rounded-lg p-12 text-center">
          <p className="text-slate">No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-paper-white border border-line rounded-lg overflow-hidden"
            >
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#faf8f3] transition-colors"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[0.95rem] text-ink">{item.full_name}</span>
                    <span className={`text-[0.72rem] font-mono px-2 py-0.5 rounded-sm ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[0.85rem] text-slate mt-0.5">
                    {item.phone} {item.email && `· ${item.email}`} · {item.matter_type || 'No type'}
                  </div>
                </div>
                <span className="font-mono text-[0.75rem] text-slate shrink-0">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <span className="text-slate text-[0.8rem]">
                  {expanded === item.id ? '▲' : '▼'}
                </span>
              </div>

              {expanded === item.id && (
                <div className="px-5 pb-5 border-t border-line pt-4 flex flex-col">
                  <div className="flex-1">
                    {item.details && (
                      <div className="mb-4">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ribbon block mb-1">
                          Details
                        </span>
                        <p className="text-[0.92rem] text-ink-soft leading-[1.6]">{item.details}</p>
                      </div>
                    )}
                    {item.source_page && (
                      <div className="mb-4">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ribbon block mb-1">
                          Source Page
                        </span>
                        <span className="text-[0.88rem] text-slate">{item.source_page}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ribbon self-center mr-1">
                        Status:
                      </span>
                      {['new', 'contacted', 'closed'].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatus(item.id, s)}
                          className={`text-[0.82rem] px-3 py-1.5 rounded-sm border cursor-pointer transition-colors ${
                            item.status === s
                              ? 'bg-ink text-paper border-ink'
                              : 'bg-transparent text-ink border-line hover:border-brass'
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item.id)}
                      className="bg-red-600 text-white border-none px-4 py-2 text-[0.82rem] font-semibold rounded-sm cursor-pointer hover:bg-red-700 transition-colors"
                    >
                      Delete Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        message="Are you sure you want to delete this inquiry? This cannot be undone."
        onConfirm={() => handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
