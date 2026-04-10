import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RotateCcw, Home, Sparkles } from 'lucide-react';
import { createEmptyAnswers } from '../constants/design';
import { computeResults, isComplete } from '../utils/scoring';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';
import MoodMapChart from '../components/result/MoodMapChart';

export default function ResultPage({ answers, setAnswers }) {
  const navigate = useNavigate();
  const { lang } = useLang();

  // Redirect if answers are not complete
  useEffect(() => {
    if (!isComplete(answers)) {
      navigate('/', { replace: true });
    }
  }, [answers, navigate]);

  const results = useMemo(() => computeResults(answers), [answers]);

  // Don't render if incomplete (will redirect)
  if (!isComplete(answers)) return null;

  function handleRetake() {
    setAnswers(createEmptyAnswers());
    navigate('/test');
  }

  // Determine the overall dominant feel
  const positiveCount = results.filter(
    (r) => r.quadrantKey === 'energeticPleasant' || r.quadrantKey === 'calmPleasant',
  ).length;

  const overallInsight =
    positiveCount >= 3
      ? T(t.result.overallInsights.positive, lang)
      : positiveCount >= 2
        ? T(t.result.overallInsights.mixed, lang)
        : T(t.result.overallInsights.challenging, lang);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-mint-pale via-white to-mint-pale" />
        <div className="absolute top-[15%] left-[25%] w-[500px] h-[500px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute bottom-[25%] right-[10%] w-[400px] h-[400px] rounded-full bg-teal/10 blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4f9f96 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Navbar — minimal, non-clickable */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-center">
          <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 py-10 md:py-14">
        {/* Result heading */}
        <div className="text-center max-w-xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {T(t.result.title, lang)}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {T(t.result.subtitle, lang)}
          </p>
        </div>

        {/* Main card */}
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-8 md:p-12">
          {/* Chart section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{T(t.result.moodMap, lang)}</h2>
            <p className="text-xs text-gray-400 mb-6">
              {T(t.result.chartSubtitle, lang)}
            </p>
            <MoodMapChart results={results} lang={lang} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100/80 my-8" />

          {/* Context summary cards */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">{T(t.result.contextBreakdown, lang)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.key}
                    className="rounded-2xl border border-white/70 bg-white/60 backdrop-blur-sm p-5 shadow-card-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: r.chartColor }}
                      />
                      <div className="w-8 h-8 rounded-xl bg-purple-soft flex items-center justify-center">
                        <Icon className="w-4 h-4 text-purple" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800">{T(t.contexts[r.key], lang)}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                      <span>{T(t.chart.comfort, lang)}: <span className="font-medium text-gray-600">{r.comfort > 0 ? '+' : ''}{r.comfort.toFixed(2)}</span></span>
                      <span className="text-gray-200">|</span>
                      <span>{T(t.chart.energy, lang)}: <span className="font-medium text-gray-600">{r.energy > 0 ? '+' : ''}{r.energy.toFixed(2)}</span></span>
                    </div>
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-purple-soft text-purple">
                      {T(t.quadrants[r.quadrantKey]?.label, lang)}
                    </span>
                    <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                      {T(t.result.reflectionMessages[r.quadrantKey], lang)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100/80 my-8" />

          {/* Reflection section */}
          <div className="mb-10">
            <div className="flex items-start gap-3 bg-teal-soft rounded-2xl px-6 py-5 border border-teal/10">
              <Sparkles className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-teal-dark mb-1.5">{T(t.result.reflectionTitle, lang)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {overallInsight}
                </p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  {T(t.result.snapshotNote, lang)}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-purple hover:bg-purple-light active:bg-purple-dark text-white shadow-card-md hover:shadow-card-lg transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              {T(t.result.retake, lang)}
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-card-sm transition-all duration-200 no-underline"
            >
              <Home className="w-4 h-4" />
              {T(t.result.backToHome, lang)}
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-8 max-w-md leading-relaxed">
          {T(t.result.disclaimer, lang)}
        </p>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 text-center border-t border-teal/5">
        <p className="text-xs text-gray-400 tracking-wide">
          {T(t.result.footerLine1, lang)}
        </p>
        <p className="text-xs text-gray-300 mt-1.5">
          {T(t.result.footerLine2, lang)}
        </p>
      </footer>
    </div>
  );
}
