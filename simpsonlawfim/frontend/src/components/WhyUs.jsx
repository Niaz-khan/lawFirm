import ScrollReveal from './ScrollReveal';

const reasons = [
  {
    idx: '01',
    title: 'We come to you.',
    body: "Home, hospital, or jail — if you can't get to us, we'll get to you. That's not a courtesy, it's how we've always worked.",
  },
  {
    idx: '02',
    title: 'No fee unless we recover for you.',
    body: 'Personal injury, wrongful death, and vehicle accident cases are handled on contingency. Free consultation, no upfront cost to find out where you stand.',
  },
  {
    idx: '03',
    title: 'Locally and family owned since 2008.',
    body: "We're part of the Searcy community, not a call center. Your case gets a lawyer who's actually from here.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 max-md:py-20 bg-paper-white">
      <div className="max-w-[1160px] mx-auto px-7">
        <ScrollReveal>
          <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
            Why clients stay
          </span>
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
            Three things every client mentions
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-9 mt-12 stagger-in">
          {reasons.map((r) => (
            <ScrollReveal key={r.idx}>
              <div className="border-t-2 border-ink pt-5">
                <span className="font-mono text-brass text-[0.85rem] block mb-3.5">{r.idx}</span>
                <h3 className="text-[1.2rem] mb-2.5">{r.title}</h3>
                <p className="text-slate text-[0.96rem] max-md:text-[1rem] leading-[1.65]">{r.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
