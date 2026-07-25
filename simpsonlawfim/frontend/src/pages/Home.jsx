import Hero from '../components/Hero';
import PracticeAreaTabs from '../components/PracticeAreaTabs';
import WhyUs from '../components/WhyUs';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Hero />

      <section id="intro" className="py-22 max-md:py-16 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 grid grid-cols-[0.9fr_1.4fr] max-md:grid-cols-1 gap-16 max-md:gap-6 items-start">
          <div>
            <ScrollReveal>
              <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
                Who we are
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
                Family owned. Community rooted. Ready when you need us.
              </h2>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal>
              <p className="text-[1.05rem] leading-[1.75] text-slate">
                Simpson &amp; Simpson Attorney at Law has spent more than 25 years representing people across Northeast and Central Arkansas — often at the hardest moments of their lives. We take personal injury, wrongful death, and vehicle accident cases on contingency, and we handle criminal defense, civil litigation, and divorce/custody matters with the same directness. Locally and family owned means the people answering your call are the ones who&apos;ll actually work your case.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-[1.05rem] leading-[1.75] text-slate mt-4.5">
                We come to you when that&apos;s what a case requires — your home, the hospital, or the county jail — because a legal problem doesn&apos;t wait for office hours, and neither do we.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div id="practice">
        <PracticeAreaTabs />
      </div>

      <div id="why">
        <WhyUs />
      </div>

      <div id="team">
        <Team />
      </div>

      <div id="reviews">
        <Testimonials />
      </div>

      <div id="contact">
        <ContactForm />
      </div>
    </>
  );
}
