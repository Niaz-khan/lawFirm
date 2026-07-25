import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-[rgba(247,242,228,0.7)] pt-14 pb-8">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="flex flex-wrap justify-between gap-10 pb-9 border-b border-[rgba(247,242,228,0.12)]">

          {/* Office Address */}
          <div>
            <span className="font-mono text-brass-light text-[0.72rem] mb-4 block tracking-wider uppercase">Office Address</span>
            <p className="text-[0.95rem] leading-relaxed text-paper-white">
              200 North Spring St<br />
              Searcy, AR 72143
            </p>
            <a
              href="https://maps.google.com/?q=200+N+Spring+St+Searcy+AR+72143"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-[0.85rem] text-brass-light hover:text-paper-white transition-colors"
            >
              Get Directions &rarr;
            </a>
          </div>

          {/* Hours */}
          <div>
            <span className="font-mono text-brass-light text-[0.72rem] mb-4 block tracking-wider uppercase">Hours</span>
            <div className="text-[0.92rem] space-y-1.5">
              <div className="flex justify-between gap-8">
                <span className="text-paper-white">Mon - Fri</span>
                <span>8:30 am - 5:00 pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-paper-white">Sat</span>
                <span>Closed</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-paper-white">Sun</span>
                <span>Closed</span>
              </div>
            </div>
            <p className="text-[0.82rem] mt-3 text-[rgba(247,242,228,0.5)] italic">
              Call Us for Appointments.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <span className="font-mono text-brass-light text-[0.72rem] mb-4 block tracking-wider uppercase">Contact Us</span>
            <div className="text-[0.92rem] space-y-1.5">
              <div className="flex gap-3">
                <span className="text-paper-white shrink-0">Main:</span>
                <a href="tel:+15013899770" className="hover:text-paper-white transition-colors">(501) 389-9770</a>
              </div>
              <div className="flex gap-3">
                <span className="text-paper-white shrink-0">Alternate:</span>
                <a href="tel:+15013899770" className="hover:text-paper-white transition-colors">(501) 389-9770</a>
              </div>
              <div className="flex gap-3">
                <span className="text-paper-white shrink-0">Mobile:</span>
                <a href="tel:+15013899770" className="hover:text-paper-white transition-colors">(501) 389-9770</a>
              </div>
            </div>
            <a href="mailto:jsimpson@simpsonfirm.net" className="block mt-3 text-[0.88rem] text-brass-light hover:text-paper-white transition-colors">
              jsimpson@simpsonfirm.net
            </a>
          </div>

          {/* Links */}
          <div className="max-w-[300px]">
            <Link to="/" className="flex items-center gap-2.5 font-heading font-semibold text-[1.1rem] text-paper-white mb-3.5">
              <span className="w-[30px] h-[30px] rounded-full bg-brass text-ink flex items-center justify-center font-mono text-[0.78rem] font-semibold shrink-0">
                SS
              </span>
              <span className="flex flex-col leading-none">
                <span>Simpson &amp; Simpson</span>
                <span className="font-mono text-[0.6rem] tracking-[0.06em] text-[rgba(247,242,228,0.5)] mt-0.5">Attorney at Law</span>
              </span>
            </Link>
            <p className="text-[0.85rem] leading-relaxed text-[rgba(247,242,228,0.5)]">
              Locally and family owned in Searcy, AR since 2008. Serving Northeast and Central Arkansas.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
          <div className="pt-6 text-[0.78rem] text-[rgba(247,242,228,0.4)] space-y-3">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-x-4 gap-y-1">
              <a href="https://policies.hibuwebsites.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white transition-colors">Privacy Policy</a>
              <a href="https://policies.hibuwebsites.com/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white transition-colors"><span className="hidden md:inline mr-4">|</span> Do Not Share My Information</a>
              <a href="https://policies.hibuwebsites.com/conditions-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white transition-colors"><span className="hidden md:inline mr-4">|</span> Conditions of Use</a>
              <a href="https://policies.hibuwebsites.com/infringement-policy" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white transition-colors"><span className="hidden md:inline mr-4">|</span> Notice and Take Down Policy</a>
              <a href="https://policies.hibuwebsites.com/accessibility-statement" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white transition-colors"><span className="hidden md:inline mr-4">|</span> Website Accessibility Policy</a>
            </div>
          <p>
            &copy; 2026 The content on this website is owned by us and our licensors. Do not copy any content (including images) without our consent. info links
          </p>
          <p className="text-[rgba(247,242,228,0.3)] italic">
            Attorney Advertising. Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
