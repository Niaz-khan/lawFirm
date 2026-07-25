import { Link } from 'react-router-dom';
import { usePracticeAreas } from '../lib/hooks';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function PracticeAreas() {
  const { practiceAreas, loading } = usePracticeAreas();

  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Six areas of law, one commitment to you."
        subtitle="We handle the cases that matter most to people in Searcy and Central Arkansas. Pick an area to learn more."
        image={heroBg}
      />

      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          {loading ? (
            <div className="text-center text-slate py-12">Loading practice areas...</div>
          ) : (
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 items-stretch">
              {practiceAreas.map((area) => {
                return (
                  <ScrollReveal key={area.slug}>
                    <Link
                      to={`/practice-areas/${area.slug}`}
                      className="flex flex-col h-full block bg-paper border border-line rounded-lg overflow-hidden hover:shadow-[0_18px_40px_rgba(43,41,36,0.14)] hover:-translate-y-1 transition-all group"
                    >
                      <div className="relative h-[200px] max-md:h-[160px] overflow-hidden">
                        {area.image && (
                          <img
                            src={area.image}
                            alt={area.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                        <span className="absolute top-4 left-4 font-mono text-paper-white text-[0.72rem] bg-ink/50 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                          {area.docket_number}
                        </span>
                      </div>
                      <div className="p-7 flex flex-col flex-1">
                        <h2 className="font-heading text-[1.4rem] mb-3 group-hover:text-brass transition-colors">{area.title}</h2>
                        <p className="text-slate text-[0.96rem] max-md:text-[1rem] leading-[1.65] flex-1">{area.summary}</p>
                        <span className="inline-block mt-4 font-semibold text-brass text-[0.92rem]">
                          Read More &rarr;
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
