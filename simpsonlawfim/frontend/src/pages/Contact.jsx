import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here to help."
        subtitle="Free consultations. Home, hospital, and jail visits available."
        image={heroBg}
      />

      <ContactForm compact />
    </>
  );
}
