import { Link } from 'react-router-dom';

export default function Navbar({ onStartTest }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
      <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-between">
        {/* Brand — left */}
        <Link to="/" className="no-underline">
          <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
        </Link>

        {/* Right side — lightweight nav + CTA */}
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="hidden sm:inline text-sm text-gray-500 hover:text-gray-700 no-underline transition-colors">
            How It Works
          </a>
          <button
            type="button"
            onClick={onStartTest || undefined}
            className="bg-purple hover:bg-purple-light text-white rounded-full px-5 py-2 text-xs font-semibold shadow-card-sm hover:shadow-card-md transition-all duration-200 cursor-pointer"
          >
            Start Reflecting
          </button>
        </div>
      </div>
    </nav>
  );
}
