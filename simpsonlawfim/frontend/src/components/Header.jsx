import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchPages } from '../lib/api';

const navItems = [
  { href: '#top', label: 'Home' },
  { href: '#practice', label: 'Practice Areas' },
  { href: '#why', label: 'Why Us' },
  { href: '#team', label: 'Attorneys' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [pagesOpen, setPagesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    fetchPages().then((data) => setPages(data.results || data)).catch(() => {});
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!pagesOpen) return;
    const handleClickOutside = (e) => {
      if (e.target.closest('.pages-dropdown')) return;
      setPagesOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [pagesOpen]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const firstLink = menuRef.current.querySelector('a, button');
    firstLink?.focus();
  }, [open]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    close();
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  const handlePageLink = (e, to) => {
    e.preventDefault();
    close();
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-[rgba(252,250,243,0.92)] backdrop-blur-[8px] border-b border-line">
      <div className="flex items-center justify-between px-7 py-4 max-w-[1160px] mx-auto">
        <Link to="/" className="flex items-center gap-2.5 text-ink">
          <span className="w-[34px] h-[34px] rounded-full bg-ink text-paper flex items-center justify-center font-mono text-[0.85rem] font-semibold shrink-0">
            SS
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading font-semibold text-[1.25rem]">Simpson &amp; Simpson</span>
            <span className="font-mono text-[0.72rem] tracking-[0.06em] text-slate mt-0.5">Attorney at Law</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.to}
                to={item.to}
                className="text-[0.92rem] font-medium text-ink-soft relative pb-1 hover:text-ink transition-colors group"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="text-[0.92rem] font-medium text-ink-soft relative pb-1 hover:text-ink transition-colors group cursor-pointer"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
          <div
            className="relative pages-dropdown"
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            <span className="text-[0.92rem] font-medium text-ink-soft relative pb-1 hover:text-ink transition-colors group cursor-pointer select-none">
              Pages <span className="font-mono text-[0.65rem]">{pagesOpen ? '▲' : '▼'}</span>
              <span className="absolute left-0 bottom-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
            </span>
            {pagesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-paper-white border border-line rounded-md shadow-lg min-w-[200px] py-2 z-50">
                <Link
                  to="/community-involvement"
                  className="block px-4 py-2 text-[0.88rem] text-ink-soft hover:text-ink hover:bg-paper transition-colors"
                >
                  Community Involvement
                </Link>
                {pages.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/page/${p.slug}`}
                      className="block px-4 py-2 text-[0.88rem] text-ink-soft hover:text-ink hover:bg-paper transition-colors"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          <a
            href="tel:+15013899770"
            className="px-5 py-2.5 rounded-sm text-[0.88rem] font-semibold tracking-wide bg-brass text-ink hover:bg-brass-light transition-colors"
          >
            (501) 389-9770
          </a>
        </nav>

        <button
          ref={btnRef}
          className="md:hidden bg-none border-none cursor-pointer w-11 h-11 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-ink my-1.5 transition-all duration-300" style={open ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
          <span className="block w-6 h-0.5 bg-ink my-1.5 transition-all duration-300" style={open ? { opacity: 0 } : {}} />
          <span className="block w-6 h-0.5 bg-ink my-1.5 transition-all duration-300" style={open ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={close} aria-hidden="true" style={{ background: 'rgba(43,41,36,0.4)' }} />
      )}

      {open && (
        <nav ref={menuRef} className="md:hidden absolute top-full left-0 right-0 bg-paper-white border-b border-line p-5 z-50 animate-[fadeIn_0.2s_ease]">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => close()}
                className="block py-3.5 text-[0.92rem] font-medium text-ink-soft hover:text-brass transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="block py-3.5 text-[0.92rem] font-medium text-ink-soft hover:text-brass transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            )
          )}
          <div className="border-t border-line mt-3 pt-3">
            <span className="block py-2 text-[0.72rem] font-mono uppercase tracking-[0.08em] text-slate">Pages</span>
            <Link
              to="/community-involvement"
              onClick={() => close()}
              className="block py-3.5 text-[0.92rem] font-medium text-ink-soft hover:text-brass transition-colors"
            >
              Community Involvement
            </Link>
            {pages.map((p) => (
                <Link
                  key={p.slug}
                  to={`/page/${p.slug}`}
                  onClick={() => close()}
                  className="block py-3.5 text-[0.92rem] font-medium text-ink-soft hover:text-brass transition-colors"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          <a
            href="tel:+15013899770"
            className="block mt-3 text-center py-3.5 rounded-sm font-semibold bg-brass text-ink hover:bg-brass-light transition-colors"
          >
            (501) 389-9770
          </a>
        </nav>
      )}
    </header>
  );
}
