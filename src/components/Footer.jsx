import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-teal/8 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand column */}
          <div>
            <Link to="/" className="no-underline inline-block">
              <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
            </Link>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-[220px]">
              A self-reflection tool to help you understand how you feel across
              different parts of your life.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">How It Works</a></li>
              <li><Link to="/test" className="text-sm text-gray-400 hover:text-gray-600 no-underline transition-colors">Take the Test</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">About</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Faculty of Psychology<br />
              Telkom University
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-teal/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-300 tracking-wide">
            &copy; {new Date().getFullYear()} Tel-UrMood
          </p>
          <p className="text-[11px] text-gray-300">
            Not a clinical diagnosis tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
