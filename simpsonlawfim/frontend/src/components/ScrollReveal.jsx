import { useEffect, useRef } from 'react';

const observer = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  : null;

export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!observer) return;

    const el = ref.current;
    if (!el) return;

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
