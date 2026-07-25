import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function RequestCallBack() {
  return (
    <>
      <PageHero
        eyebrow="Request a Call Back"
        title="Tell us about your case."
        subtitle="Fill out the form below and we'll get back to you as soon as possible."
        image={heroBg}
      />

      <ContactForm compact />
    </>
  );
}
