import ScrollReveal from './ScrollReveal';

export default function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <section className="text-paper relative overflow-hidden py-24 max-md:py-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="relative max-w-[760px] px-7 mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-brass-light">
            {eyebrow}
          </span>
        </ScrollReveal>
        <ScrollReveal>
          <h1 className="text-paper-white text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.05] mt-3">
            {title}
          </h1>
        </ScrollReveal>
        {subtitle && (
          <ScrollReveal>
            <p className="mt-6 text-[1.15rem] leading-[1.6] text-[rgba(247,242,228,0.78)] max-w-[52ch]">
              {subtitle}
            </p>
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
}
