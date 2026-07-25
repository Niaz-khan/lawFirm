import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import communityHero from '../data/community involment.jpg';

const sponsors = [
  {
    since: '2010',
    title: 'Dr. Robert E. Elliott Foundation, Annual Stride to Prevent Suicide 5K Run/Walk',
    body: 'The objective of this foundation is to educate and be a resource for those who need help. If you or your loved ones are suffering from depression or contemplating suicide, the Elliott Foundation is there to help you. We feel a sense of pride in being a sponsor for this year\'s event, held at Spring Park. Our attorneys believe that it is an important support group for the community.',
  },
  {
    since: '2011',
    title: 'Parents for a Safe Prom, Searcy High School',
    body: 'According to the US Department of Transportation, on a typical prom weekend, 48 American kids are killed in auto crashes, with 5,202 getting injured. About 40 percent of the deaths are alcohol-related! A group of concerned parents and volunteers vowed to protect their children from becoming that statistic. They collected donations and purchased desirable prizes to entice the kids to stay at prom. We would like to thank that group of noble people. We salute their efforts!',
  },
  {
    since: null,
    title: 'United Way of White County',
    body: 'The Searcy lawyers at Simpson & Simpson Attorney at Law are Leadership Givers with this well-known charitable organization.',
  },
  {
    since: null,
    title: 'Get Down, Downtown, A Main Street Searcy Festival',
    body: 'This two-day festival provides various activities such as carnival rides, children\'s shows, bouncy houses, and performances from local artists. The admission is free, and food vendors participate and serve a variety of treats. Simpson & Simpson Attorney at Law is proud to be involved in this event and Main Street Searcy.',
  },
  {
    since: null,
    title: 'Center on the Square Performing Arts',
    body: 'Simpson & Simpson Attorney at Law supports this group of directors, staff, and volunteers who are dedicated to bringing arts education and entertainment to our area. It will nurture actors. The audience of all ages will be thrilled as well.',
  },
  {
    since: null,
    title: 'Searcy Junior Auxiliary, Annual Charity Ball',
    body: 'Simpson & Simpson Attorney at Law was a sponsor of this event in 2010 and 2011. We have several outreach projects that benefit a number of good causes, including Day of Caring, Angel Tree, Sunshine School, and many more.',
  },
  {
    since: null,
    title: 'Eighth Annual McCrory Days, July 4, 2010',
    body: 'Our law firm sponsored this event along with other sponsors. The event was a big crowd puller in downtown McCrory for a parade and luncheon. College scholarships were offered to eligible candidates.',
  },
];

export default function CommunityInvolvement() {
  return (
    <>
      <PageHero
        title="Community Involvement"
        subtitle="Hospital, Home, &amp; Jail Visits | Over 25 Years of Experience | Locally &amp; Family Owned"
        image={communityHero}
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

      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="grid grid-cols-[0.9fr_1.4fr] max-md:grid-cols-1 gap-16 max-md:gap-6 items-start">
            <div>
              <ScrollReveal>
                <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
                  Our commitment
                </span>
                <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
                  Devotion to Arkansas Community Organizations
                </h2>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal>
                <p className="text-[1.05rem] leading-[1.75] text-slate">
                  Simpson &amp; Simpson Attorney at Law is devoted to the people and institutions of Northeast and Central Arkansas. We are passionate about serving our community with quality legal services. Our legal team has a great interest in our school teams.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-[1.05rem] leading-[1.75] text-slate mt-4.5">
                  Our Searcy legal office is proud to sponsor community events.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-md:py-10 bg-paper">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="space-y-10">
            {sponsors.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="bg-paper-white border border-line rounded-lg p-8 max-md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {s.since && (
                      <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ribbon bg-paper px-3 py-1 rounded-sm border border-line">
                        Proud Sponsors Since {s.since}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-[1.3rem] text-ink mb-3">{s.title}</h3>
                  <p className="text-slate text-[0.96rem] max-md:text-[1rem] leading-[1.7]">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <ScrollReveal>
            <div className="grid grid-cols-[0.9fr_1.4fr] max-md:grid-cols-1 gap-16 max-md:gap-6 items-start">
              <div>
                <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
                  Recognition
                </span>
                <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mt-3.5">
                  Recognition From the Community Press
                </h2>
              </div>
              <div>
                <p className="text-[1.05rem] leading-[1.75] text-slate">
                  Searcy Daily Citizen readers have elected Jimmy Simpson as the Best of the Best Attorney in 2009, 2010, and 2014.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="text-paper relative overflow-hidden py-24 max-md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communityHero})` }}
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative max-w-[760px] px-7 mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-paper-white text-[clamp(2rem,4vw,2.8rem)] leading-[1.1]">
              Experienced Representation in Your Legal Matter
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
    </>
  );
}
