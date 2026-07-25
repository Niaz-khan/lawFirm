import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeAreas } from '../lib/hooks';
import ScrollReveal from './ScrollReveal';

const tilts = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.6];

export default function PracticeAreaTabs() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { practiceAreas, loading } = usePracticeAreas();
  const navigate = useNavigate();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (loading || !practiceAreas.length) return null;

  const current = practiceAreas[active];

  return (
    <section className="bg-paper py-24 max-md:py-20 relative">
      <div className="max-w-[1160px] mx-auto px-7">
        <ScrollReveal>
          <div className="max-w-[640px] mb-14">
            <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
              What we handle
            </span>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
              Open a file
            </h2>
            <p className="text-slate mt-3.5 text-[1.02rem] leading-[1.6] max-md:text-[1rem]">
              Six practice areas, one intake process. Click a tab to see how we work each kind of case.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap gap-0">
          {practiceAreas.map((area, i) => {
            return (
              <button
                key={area.slug}
                onClick={() => setActive(i)}
                className="font-mono text-[0.78rem] tracking-[0.04em] border border-line border-b-0 px-0 pt-0 pb-0 cursor-pointer text-ink-soft relative -mr-px -mb-px rounded-tl-[6px] rounded-tr-[10px] text-left transition-transform duration-[180ms] ease-in-out hover:-translate-y-1 overflow-hidden"
                style={{
                  '--tilt': `${isMobile ? 0 : tilts[i]}deg`,
                  transform: `rotate(${isMobile ? 0 : tilts[i]}deg)${active === i ? ' translateY(-8px)' : ''}`,
                  background: active === i ? 'var(--color-paper-white)' : '#EDE4CC',
                  boxShadow: active === i ? 'var(--shadow, 0 18px 40px rgba(43,41,36,0.14))' : undefined,
                  zIndex: active === i ? 3 : undefined,
                }}
              >
                <div className="relative w-full h-[100px] max-md:h-[80px] overflow-hidden">
                  {area.image && (
                    <img
                      src={area.image}
                      alt={area.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="block text-paper-white text-[0.65rem] opacity-80">{area.docket_number}</span>
                    <span className="block font-heading text-[0.92rem] text-paper-white font-semibold leading-tight">
                      {area.title}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-paper-white border border-line rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] p-11 max-md:p-6 shadow-[0_18px_40px_rgba(43,41,36,0.14)] relative grid grid-cols-[1.2fr_1fr] max-md:grid-cols-1 gap-10">
          <div
            className="absolute top-[22px] right-6 font-mono text-[0.56rem] tracking-[0.06em] text-ribbon w-[66px] h-[66px] rounded-[48%_52%_45%_55%/55%_45%_53%_47%] border-2 border-ribbon flex items-center justify-center text-center opacity-55 max-md:hidden"
            style={{ transform: 'rotate(-8deg)' }}
          >
            REVIEWED
          </div>

          <div>
            <h3 className="text-[1.5rem] mb-4">{current.title}</h3>
            <p className="text-slate leading-[1.7] text-[1rem]">{current.body}</p>
            <ul className="mt-5 list-none p-0">
              {(current.bullet_points || current.bulletPoints || []).map((point) => (
                <li key={point} className="py-2.5 border-t border-line text-[0.94rem] max-md:text-[1rem] text-ink-soft flex gap-2.5">
                  <span className="text-brass shrink-0">&mdash;</span>
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(`/practice-areas/${current.slug}`)}
              className="mt-6 inline-flex items-center gap-2 bg-brass text-ink px-6 py-4 font-semibold text-[0.92rem] max-md:text-[1rem] rounded-sm hover:bg-brass-light hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Read More
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="self-start bg-paper border border-dashed border-brass rounded-md p-5.5">
            <span className="font-mono text-ribbon text-[0.72rem]">{current.stamp_label}</span>
            <p className="mt-2.5 text-[0.94rem] max-md:text-[1rem] text-ink-soft leading-[1.6]">{current.stamp_body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
