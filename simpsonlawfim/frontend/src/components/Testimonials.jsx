import { useTestimonials } from '../lib/hooks';
import ScrollReveal from './ScrollReveal';

const tapeColors = [
  'rgba(122,59,49,0.55)',
  'rgba(92,107,76,0.5)',
  'rgba(138,110,62,0.5)',
];
const tapeRotations = ['-4deg', '3deg', '-2deg'];

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials();

  if (loading) return null;

  return (
    <section className="py-24 max-md:py-20 bg-paper">
      <div className="max-w-[1160px] mx-auto px-7">
        <ScrollReveal>
          <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
            In their words
          </span>
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
            What clients tell us afterward
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 mt-12 stagger-in">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id}>
              <div className="bg-paper-white border border-line rounded-md p-7 relative h-full flex flex-col justify-between">
                <div
                  className="absolute -top-2.5 left-[22px] w-[46px] h-[18px] rounded-sm shadow-[0_2px_4px_rgba(43,41,36,0.12)]"
                  style={{
                    background: tapeColors[i],
                    transform: `rotate(${tapeRotations[i]})`,
                  }}
                />
                <p className="text-[1rem] leading-[1.65] text-ink-soft italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4.5 font-mono text-[0.75rem] tracking-[0.05em] text-slate uppercase">
                  &mdash; {t.attribution}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
