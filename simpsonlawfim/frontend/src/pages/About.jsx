import { useTeamMembers } from '../lib/hooks';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import TeamCard from '../components/TeamCard';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function About() {
  const { members, loading } = useTeamMembers();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Locally owned. Family run."
        subtitle="Protecting your rights since 2008."
        image={heroBg}
      />

      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="grid grid-cols-[0.9fr_1.4fr] max-md:grid-cols-1 gap-16 max-md:gap-6 items-start">
            <div>
              <ScrollReveal>
                <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
                  Our story
                </span>
                <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
                  Serving Searcy and Central Arkansas since 2008
                </h2>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal>
                <p className="text-[1.05rem] leading-[1.75] text-slate">
                  Simpson &amp; Simpson Attorney at Law was founded in 2008 with a simple idea: that people in legal trouble deserve a lawyer who actually knows them, not a case number. For more than 25 years, the attorneys at Simpson &amp; Simpson Attorney at Law have represented people across Northeast and Central Arkansas — often at the hardest moments of their lives.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-[1.05rem] leading-[1.75] text-slate mt-4.5">
                  We take personal injury, wrongful death, and vehicle accident cases on contingency, and we handle criminal defense, civil litigation, and divorce/custody matters with the same directness. Locally and family owned means the people answering your call are the ones who&apos;ll actually work your case.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-[1.05rem] leading-[1.75] text-slate mt-4.5">
                  We come to you when that&apos;s what a case requires — your home, the hospital, or the county jail — because a legal problem doesn&apos;t wait for office hours, and neither do we.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 max-md:py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <ScrollReveal>
            <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-brass-light">
              The attorneys
            </span>
            <h2 className="text-paper-white text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
              Meet our team
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-7 mt-13">
            {!loading && members.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-md:py-20 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <ScrollReveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-9">
              <div className="border-t-2 border-ink pt-5">
                <span className="font-heading text-[1.6rem] text-brass block mb-1">25+</span>
                <span className="text-slate text-[0.96rem]">Years of combined experience</span>
              </div>
              <div className="border-t-2 border-ink pt-5">
                <span className="font-heading text-[1.6rem] text-brass block mb-1">6</span>
                <span className="text-slate text-[0.96rem]">Practice areas covered</span>
              </div>
              <div className="border-t-2 border-ink pt-5">
                <span className="font-heading text-[1.6rem] text-brass block mb-1">2008</span>
                <span className="text-slate text-[0.96rem]">Firm founded in Searcy, AR</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
