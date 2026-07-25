import { useNavigate, useLocation } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (e, href) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <section id="top" className="text-paper relative overflow-hidden py-24 max-md:py-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="relative max-w-[760px] px-7 mx-auto">
        <ScrollReveal>
          <h1 className="text-paper-white text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.05]">
            Personal Injury and Litigation Attorneys in Searcy, AR
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mt-6 text-[1.15rem] leading-[1.6] text-[rgba(247,242,228,0.78)] max-w-[52ch]">
            Hospital, Home, &amp; Jail Visits | Over 25 Years of Experience | Locally &amp; Family Owned
          </p>
        </ScrollReveal>

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

        <ScrollReveal>
          <div className="flex gap-4 mt-8 flex-wrap">
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="border border-[rgba(247,242,228,0.35)] text-paper-white px-[30px] py-[15px] font-semibold text-[0.95rem] rounded-sm hover:border-brass-light transition-colors cursor-pointer">
              Free Consultation
            </a>
            <a href="#practice" onClick={(e) => scrollTo(e, '#practice')} className="border border-[rgba(247,242,228,0.35)] text-paper-white px-[30px] py-[15px] font-semibold text-[0.95rem] rounded-sm hover:border-brass-light transition-colors cursor-pointer">
              See Practice Areas
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex gap-10 flex-wrap mt-14 border-t border-[rgba(247,242,228,0.14)] pt-6">
            <div>
              <div className="font-heading text-[1.6rem] text-brass-light">25+</div>
              <div className="text-[0.78rem] text-[rgba(247,242,228,0.6)] mt-0.5">Years Experience</div>
            </div>
            <div>
              <div className="font-heading text-[1.6rem] text-brass-light">6</div>
              <div className="text-[0.78rem] text-[rgba(247,242,228,0.6)] mt-0.5">Practice Areas</div>
            </div>
            <div>
              <div className="font-heading text-[1.6rem] text-brass-light">2008</div>
              <div className="text-[0.78rem] text-[rgba(247,242,228,0.6)] mt-0.5">Locally Founded</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
