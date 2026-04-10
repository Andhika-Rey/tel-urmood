import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';

export default function Navbar({ onStartTest }) {
  const { lang, setLang } = useLang();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
      <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-between">
        {/* Brand — left */}
        <Link to="/" className="no-underline">
          <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
        </Link>

        {/* Right side — lang toggle + nav + CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Language toggle */}
          <div className="flex items-center bg-gray-100/80 rounded-full p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                lang === 'en' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                lang === 'id' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              ID
            </button>
          </div>

          <a href="#how-it-works" className="hidden sm:inline text-sm text-gray-500 hover:text-gray-700 no-underline transition-colors">
            {T(t.nav.howItWorks, lang)}
          </a>
          <button
            type="button"
            onClick={onStartTest || undefined}
            className="bg-purple hover:bg-purple-light text-white rounded-full px-5 py-2 text-xs font-semibold shadow-card-sm hover:shadow-card-md transition-all duration-200 cursor-pointer"
          >
            {T(t.nav.startReflecting, lang)}
          </button>
        </div>
      </div>
    </nav>
  );
}
