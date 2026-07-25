import { useParams, Link } from 'react-router-dom';
import { usePage } from '../lib/hooks';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function StaticPage() {
  const { slug } = useParams();
  const { page, loading, error } = usePage(slug);

  if (loading) {
    return (
      <section className="py-24 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 text-center">
          <p className="text-slate">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || !page) {
    return (
      <section className="py-24 bg-paper-white">
        <div className="max-w-[1160px] mx-auto px-7 text-center">
          <h1 className="font-heading text-[2rem] mb-4">Page Not Found</h1>
          <p className="text-slate mb-6">The page you're looking for doesn't exist or isn't published yet.</p>
          <Link to="/" className="bg-brass text-ink px-6 py-3 font-semibold text-[0.92rem] rounded-sm hover:bg-brass-light transition-colors">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={page.title} subtitle={page.meta_description} image={heroBg} />

      <section className="py-20 max-md:py-14 bg-paper-white">
        <div className="max-w-[800px] mx-auto px-7">
          <ScrollReveal>
            <div className="prose prose-ink max-w-none text-slate leading-[1.8] text-[1.05rem]">
              {page.body.split('\n').map((para, i) => (
                para.trim() ? <p key={i}>{para}</p> : null
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
