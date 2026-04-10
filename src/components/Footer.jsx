import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-teal/8 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand column */}
          <div>
            <Link to="/" className="no-underline inline-block">
              <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
            </Link>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed max-w-[220px]">
              {T(t.footer.brandDesc, lang)}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{T(t.footer.explore, lang)}</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">{T(t.footer.howItWorks, lang)}</a></li>
              <li><Link to="/test" className="text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">{T(t.footer.takeTheTest, lang)}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{T(t.footer.connect, lang)}</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li>
                <a href="https://instagram.com/psychology.telu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  @psychology.telu
                </a>
              </li>
              <li>
                <a href="https://instagram.com/komunitaspsychologytel_u" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  @komunitaspsychologytel_u
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@Psychology.Tel-U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  @Psychology.Tel-U
                </a>
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{T(t.footer.profileVideo, lang)}</h4>
            <div className="bg-white rounded-2xl shadow-card-sm border border-white/60 p-3 inline-block">
              <img src="/qr-code.jpeg" alt="QR code for Psychology Tel-U profile video" className="w-24 h-24 rounded-lg object-cover" />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 leading-relaxed max-w-[140px]">
              {T(t.footer.scanQr, lang)}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-teal/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-300 tracking-wide">
            &copy; {new Date().getFullYear()} {T(t.footer.copyright, lang)}
          </p>
          <p className="text-[11px] text-gray-300">
            {T(t.footer.notDiagnosis, lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
