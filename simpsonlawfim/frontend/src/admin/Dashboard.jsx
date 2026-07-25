import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboard } from '../lib/adminApi';

const cards = [
  { key: 'practice_areas', label: 'Practice Areas', to: '/admin/practice-areas', color: 'bg-brass' },
  { key: 'team_members', label: 'Team Members', to: '/admin/team', color: 'bg-moss' },
  { key: 'testimonials', label: 'Testimonials', to: '/admin/testimonials', color: 'bg-ribbon' },
  { key: 'inquiries_new', label: 'New Inquiries', to: '/admin/inquiries', color: 'bg-brass-light' },
  { key: 'inquiries_total', label: 'Total Inquiries', to: '/admin/inquiries', color: 'bg-slate' },
  { key: 'offices', label: 'Offices', to: '/admin/offices', color: 'bg-moss' },
  { key: 'pages', label: 'Pages', to: '/admin/pages', color: 'bg-ribbon' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <h1 className="font-heading text-[1.8rem] text-ink mb-2">Dashboard</h1>
      <p className="text-slate text-[0.95rem] mb-8">Overview of your site content.</p>

      <div className="grid grid-cols-3 max-md:grid-cols-2 gap-5">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={card.to}
            className="bg-paper-white border border-line rounded-lg p-6 hover:shadow-md hover:-translate-y-0.5 transition-all block"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate block mb-2">
              {card.label}
            </span>
            <span className="font-heading text-[2rem] text-ink">
              {stats?.[card.key] ?? 0}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
