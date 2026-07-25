import { useParams, Link } from 'react-router-dom';
import { usePracticeArea } from '../lib/hooks';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';

export default function PracticeAreaPage() {
  const { slug } = useParams();
  const { area, loading, error } = usePracticeArea(slug);

  if (loading) {
    return (
      <section className="py-24 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 text-center">
          <p className="text-slate">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || !area) {
    return (
      <section className="py-24 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 text-center">
          <h1 className="font-heading text-[2rem] mb-4">Practice Area Not Found</h1>
          <Link to="/practice-areas" className="text-brass hover:text-brass-light transition-colors">
            &larr; Back to Practice Areas
          </Link>
        </div>
      </section>
    );
  }

  const imgStyle = area?.image ? { backgroundImage: `url(${area.image})` } : {};

  return (
    <>
      <PageHero
        title={`${area.title} Attorneys`}
        subtitle="Hospital, Home, &amp; Jail Visits | Over 25 Years of Experience | Locally &amp; Family Owned"
        image={area.image}
      >
        <ScrollReveal>
          <div className="flex items-center gap-6 mt-10 flex-wrap">
            <a
              href="tel:+15013899770"
              className="inline-flex items-center gap-3 bg-brass text-ink px-[30px] py-[15px] font-semibold text-[1.1rem] rounded-sm hover:bg-brass-light hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (501) 389-9770
            </a>
            <span className="text-[rgba(247,242,228,0.7)] text-[0.95rem]">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              Open &middot; Closes 5:00 pm
            </span>
          </div>
        </ScrollReveal>
      </PageHero>

      {/* Main Content */}
      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="grid grid-cols-[1.2fr_1fr] max-md:grid-cols-1 gap-12">
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-[1.8rem] mb-5">{area.headline || area.title}</h2>
                <p className="text-slate leading-[1.7] text-[1rem]">{area.summary}</p>
                {area.body && (
                  <p className="text-slate leading-[1.7] text-[1rem] mt-4">{area.body}</p>
                )}
                {area.extra && (
                  <p className="text-slate leading-[1.7] text-[1rem] mt-4">{area.extra}</p>
                )}
                <h3 className="font-heading text-[1.2rem] mt-8 mb-4">{area.services_title || 'Our Services'}</h3>
                <ul className="list-none p-0">
                  {(area.bullet_points || []).map((point) => (
                    <li key={point} className="py-3 border-t border-line text-[0.98rem] max-md:text-[1rem] text-ink-soft flex gap-2.5">
                      <span className="text-brass shrink-0">&mdash;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-paper border border-dashed border-brass rounded-md p-6 self-start sticky top-24">
                <span className="font-mono text-ribbon text-[0.72rem]">{area.stamp_label}</span>
                <p className="mt-2.5 text-[0.94rem] max-md:text-[1rem] text-ink-soft leading-[1.6]">{area.stamp_body}</p>
                <Link to="/contact" className="block mt-5 bg-brass text-ink text-center px-6 py-3 font-semibold text-[0.92rem] rounded-sm hover:bg-brass-light transition-colors">
                  Free Consultation
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-paper relative overflow-hidden py-24 max-md:py-16">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={imgStyle} />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative max-w-[760px] px-7 mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-paper-white text-[clamp(2rem,4vw,2.8rem)] leading-[1.1]">
              Experienced Representation in {area.title} Cases
            </h2>
            <p className="text-[rgba(247,242,228,0.78)] text-[1.15rem] mt-5">
              Call Simpson &amp; Simpson Attorney at Law today!
            </p>
            <a
              href="tel:+15013899770"
              className="inline-flex items-center gap-3 mt-8 bg-brass text-ink px-[30px] py-[15px] font-semibold text-[1.1rem] rounded-sm hover:bg-brass-light hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (501) 389-9770
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      {area.testimonials && area.testimonials.length > 0 && (
        <section className="py-16 max-md:py-10 bg-paper">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <ScrollReveal>
              <svg aria-hidden="true" className="w-10 h-10 text-brass mx-auto mb-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <blockquote className="font-heading text-[1.3rem] leading-[1.6] text-ink italic">
                &ldquo;{area.testimonials[0].quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-slate text-[0.92rem] max-md:text-[1rem]">&mdash; {area.testimonials[0].attribution}</p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Bottom Links */}
      <section className="py-16 max-md:py-10 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 flex flex-wrap gap-4">
          <Link to="/contact" className="bg-brass text-ink px-7 py-3.5 font-semibold text-[0.95rem] max-md:text-[1rem] rounded-sm hover:bg-brass-light transition-colors">
            Free Consultation
          </Link>
          <Link to="/practice-areas" className="border border-line text-ink px-7 py-3.5 font-semibold text-[0.95rem] max-md:text-[1rem] rounded-sm hover:border-brass transition-colors">
            &larr; All Practice Areas
          </Link>
        </div>
      </section>
    </>
  );
}
