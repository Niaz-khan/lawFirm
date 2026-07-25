import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const navItems = [
  { to: '/admin', icon: '⊞', label: 'Dashboard', end: true },
  { to: '/admin/practice-areas', icon: '⚖', label: 'Practice Areas' },
  { to: '/admin/team', icon: '♟', label: 'Team' },
  { to: '/admin/testimonials', icon: '❝', label: 'Testimonials' },
  { to: '/admin/inquiries', icon: '✉', label: 'Inquiries' },
  { to: '/admin/offices', icon: '⚐', label: 'Offices' },
  { to: '/admin/pages', icon: '☰', label: 'Pages' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-[#f5f3ee]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-ink text-paper flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-[rgba(247,242,228,0.12)]">
          <h1 className="font-heading text-[1.1rem] text-paper-white leading-tight">
            Simpson &amp; Simpson
          </h1>
          <span className="font-mono text-[0.65rem] text-brass-light tracking-[0.08em] uppercase">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-[0.88rem] transition-colors ${
                  isActive
                    ? 'bg-[rgba(247,242,228,0.08)] text-paper-white border-r-2 border-brass'
                    : 'text-[rgba(247,242,228,0.6)] hover:text-paper-white hover:bg-[rgba(247,242,228,0.04)]'
                }`
              }
            >
              <span className="w-5 text-center text-[0.95rem]">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-[rgba(247,242,228,0.12)]">
          <a
            href="/"
            className="block text-[0.82rem] text-[rgba(247,242,228,0.5)] hover:text-paper-white transition-colors mb-2"
          >
            ← Back to site
          </a>
          <button
            onClick={handleLogout}
            className="text-[0.82rem] text-brass-light hover:text-brass transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
