import { useState } from 'react';
import { usePracticeAreas } from '../lib/hooks';
import { submitInquiry } from '../lib/api';
import ScrollReveal from './ScrollReveal';

export default function ContactForm({ compact = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { practiceAreas, loading, error: areasError } = usePracticeAreas();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.target);
    const data = {
      full_name: form.get('name'),
      phone: form.get('phone'),
      email: form.get('email') || '',
      matter_type: form.get('matter') || '',
      details: form.get('details') || '',
      source_page: window.location.pathname,
    };

    try {
      await submitInquiry(data);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`py-24 max-md:py-20 bg-paper-white ${compact ? '' : ''}`}>
      <div className="max-w-[1160px] mx-auto px-7">
        <ScrollReveal>
          <div className={`bg-[#FBF6E3] border border-line rounded-[10px] p-14 max-md:p-9 relative overflow-hidden grid ${compact ? 'grid-cols-1' : 'grid-cols-2 max-md:grid-cols-1'} gap-15`}>
            <div
              className="absolute left-16 max-md:left-0 top-0 bottom-0 w-px bg-ribbon opacity-35 max-md:hidden"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 37px, rgba(27,42,62,0.06) 37px 38px)',
              }}
            />

            <div className="relative">
              <span className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-ribbon">
                Get in touch
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] mt-3.5">
                Tell us what&apos;s going on.
              </h2>
              <p className="mt-4 text-slate leading-[1.7] text-[1rem]">
                A free consultation is usually enough to tell you whether you need a lawyer, and if so, which kind of help actually fits your situation.
              </p>
              <div className="mt-7">
                <div className="mb-3.5 text-[0.98rem]">
                  <span className="font-mono text-[0.72rem] text-ribbon uppercase tracking-[0.06em] block mb-0.5">Phone</span>
                  <a href="tel:+15013899770" className="hover:text-brass transition-colors">(501) 389-9770</a>
                </div>
                <div className="mb-3.5 text-[0.98rem]">
                  <span className="font-mono text-[0.72rem] text-ribbon uppercase tracking-[0.06em] block mb-0.5">Email</span>
                  info@simpsonlawpartners.net
                </div>
                <div className="mb-3.5 text-[0.98rem]">
                  <span className="font-mono text-[0.72rem] text-ribbon uppercase tracking-[0.06em] block mb-0.5">Office</span>
                  200 N Spring St, Searcy, AR 72143
                </div>
                <div className="text-[0.98rem]">
                  <span className="font-mono text-[0.72rem] text-ribbon uppercase tracking-[0.06em] block mb-0.5">Hours</span>
                  Mon&ndash;Fri &middot; home, hospital, and jail visits by request
                </div>
              </div>
            </div>

            <div className="relative">
              {submitted ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="font-heading text-[1.5rem] text-ink mb-2">Request Received</div>
                    <p className="text-slate">We&apos;ll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 text-[0.92rem] px-4 py-3 rounded-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jordan Ellis"
                      required
                      className="w-full border-0 border-b border-line bg-transparent py-3.5 px-0.5 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(501) 555-0100"
                      required
                      className="w-full border-0 border-b border-line bg-transparent py-3.5 px-0.5 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
                      Email (optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border-0 border-b border-line bg-transparent py-3.5 px-0.5 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="matter" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
                      What&apos;s this about?
                    </label>
                    <select
                      id="matter"
                      name="matter"
                      className="w-full border-0 border-b border-line bg-transparent py-3.5 px-0.5 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors cursor-pointer"
                    >
                      {practiceAreas.map((a) => (
                        <option key={a.slug} value={a.slug}>{a.title}</option>
                      ))}
                      <option value="other">Something else</option>
                    </select>
                    {areasError && (
                      <p className="font-mono text-[0.72rem] text-ribbon mt-1">Could not load practice areas. Select "Something else" if needed.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="details" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
                      A few details
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows="3"
                      placeholder="Briefly, what's going on?"
                      className="w-full border-0 border-b border-line bg-transparent py-3.5 px-0.5 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 bg-ink text-paper border-none py-[15px] px-7 font-semibold text-[0.95rem] rounded-sm cursor-pointer transition-colors hover:bg-ribbon w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Request a Callback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
