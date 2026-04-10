import { ArrowRight, Home, GraduationCap, Users, User } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import tr, { T } from '../../constants/translations';

export default function HeroSection({ onStartTest }) {
  const { lang } = useLang();

  const contextLabels = [
    { key: 'home', Icon: Home, style: 'bg-purple-soft', iconStyle: 'text-purple', pos: 'absolute -top-2 right-4 md:right-0' },
    { key: 'school', Icon: GraduationCap, style: 'bg-purple-soft', iconStyle: 'text-purple', pos: 'absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8' },
    { key: 'social', Icon: Users, style: 'bg-teal-soft', iconStyle: 'text-teal', pos: 'absolute -bottom-1 left-4 md:left-2' },
    { key: 'alone', Icon: User, style: 'bg-teal-soft', iconStyle: 'text-teal', pos: 'absolute -bottom-1 right-4 md:right-2' },
  ];

  return (
    <section className="relative pt-20 pb-28 px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-mint/40 blur-[120px]" />
        <div className="absolute top-1/4 right-1/6 w-[400px] h-[400px] rounded-full bg-teal/12 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] rounded-full bg-purple/5 blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — editorial text block */}
        <div className="max-w-lg">
          {/* Logo + Headline block */}
          <div className="mb-6">
            <div className="mb-4">
              <img src="/logo-.PNG" alt="Tel-UrMood" className="h-auto w-[280px] md:w-[360px]" />
            </div>
            <h1 className="text-4xl md:text-[3.25rem] font-bold text-gray-900 leading-[1.12] tracking-tight">
              {T(tr.hero.headline, lang)}{' '}
              <span className="text-purple">{T(tr.hero.headlineAccent, lang)}</span>
            </h1>
          </div>

          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            {T(tr.hero.subtitle, lang)}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartTest}
              className="inline-flex items-center gap-2 bg-purple hover:bg-purple-light active:bg-purple-dark text-white rounded-full px-9 py-3.5 text-sm font-semibold shadow-card-md hover:shadow-card-lg transition-all duration-200 cursor-pointer"
            >
              {T(tr.hero.cta, lang)}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors no-underline"
            >
              {T(tr.hero.seeHow, lang)} &darr;
            </a>
          </div>
        </div>

        {/* Right — branded visual block */}
        <div className="relative flex items-center justify-center">
          {/* Decorative background ring */}
          <div className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-teal/10" />
          <div className="absolute w-[260px] h-[260px] md:w-[310px] md:h-[310px] rounded-full border border-mint/40" />

          {/* Central card with product illustration */}
          <div className="relative w-[280px] md:w-[320px] bg-white/80 backdrop-blur-sm rounded-[28px] shadow-card-lg border border-white/60 p-7 md:p-8">
            {/* Mini mood map preview */}
            <div className="text-center mb-5">
              <div className="text-xs font-semibold text-teal tracking-wide uppercase mb-3">{T(tr.hero.yourMoodMap, lang)}</div>
              <svg viewBox="0 0 200 200" className="w-full max-w-[180px] mx-auto">
                {/* Grid */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#e0e0e0" strokeWidth="0.75" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#e0e0e0" strokeWidth="0.75" />
                <line x1="60" y1="20" x2="60" y2="180" stroke="#e8e8e8" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="140" y1="20" x2="140" y2="180" stroke="#e8e8e8" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="20" y1="60" x2="180" y2="60" stroke="#e8e8e8" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="20" y1="140" x2="180" y2="140" stroke="#e8e8e8" strokeWidth="0.5" strokeDasharray="3 3" />
                {/* Points — Home (blue) */}
                <circle cx="128" cy="115" r="10" fill="#4a90d9" opacity="0.15" />
                <circle cx="128" cy="115" r="5.5" fill="#4a90d9" stroke="white" strokeWidth="2" />
                {/* School (red) */}
                <circle cx="72" cy="62" r="10" fill="#d94a5c" opacity="0.15" />
                <circle cx="72" cy="62" r="5.5" fill="#d94a5c" stroke="white" strokeWidth="2" />
                {/* Social (green) */}
                <circle cx="140" cy="58" r="10" fill="#4ab87a" opacity="0.15" />
                <circle cx="140" cy="58" r="5.5" fill="#4ab87a" stroke="white" strokeWidth="2" />
                {/* Alone (yellow) */}
                <circle cx="68" cy="138" r="10" fill="#d9b84a" opacity="0.15" />
                <circle cx="68" cy="138" r="5.5" fill="#d9b84a" stroke="white" strokeWidth="2" />
                {/* Labels */}
                <text x="180" y="104" fontSize="7" fill="#9ca3af" fontFamily="Montserrat">{T(tr.chart.comfort, lang)}</text>
                <text x="96" y="16" fontSize="7" fill="#9ca3af" fontFamily="Montserrat">{T(tr.chart.energy, lang)}</text>
              </svg>
            </div>

            {/* Mini legend — all 4 contexts */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[
                { color: '#4a90d9', key: 'home' },
                { color: '#d94a5c', key: 'school' },
                { color: '#4ab87a', key: 'social' },
                { color: '#d9b84a', key: 'alone' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-gray-400">{T(tr.contexts[item.key], lang)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating context badges */}
          {contextLabels.map(({ key, Icon, style, iconStyle, pos }) => (
            <div key={key} className={`${pos} bg-white/90 backdrop-blur rounded-2xl shadow-card-md border border-white/60 px-3.5 py-2.5 flex items-center gap-2`}>
              <div className={`w-7 h-7 rounded-lg ${style} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${iconStyle}`} />
              </div>
              <span className="text-xs font-medium text-gray-600">{T(tr.contexts[key], lang)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
