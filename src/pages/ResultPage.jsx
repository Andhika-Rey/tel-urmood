import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RotateCcw, Home, Sparkles, Camera } from 'lucide-react';
import { createEmptyAnswers } from '../constants/design';
import { computeResults, isComplete } from '../utils/scoring';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';
import MoodMapChart from '../components/result/MoodMapChart';

function to100(v) {
  return Math.round((v + 1) * 50);
}

function replaceTokens(str, tokens) {
  return Object.entries(tokens).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), str);
}

export default function ResultPage({ answers, setAnswers, userName }) {
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

  // ── Pattern analysis ──
  const sortedByComfort = [...results].sort((a, b) => b.comfort - a.comfort);
  const sortedByEnergy = [...results].sort((a, b) => b.energy - a.energy);
  const highComfort = sortedByComfort[0];
  const lowComfort = sortedByComfort[sortedByComfort.length - 1];
  const highEnergy = sortedByEnergy[0];
  const lowEnergy = sortedByEnergy[sortedByEnergy.length - 1];
  const comfortSpread = to100(highComfort.comfort) - to100(lowComfort.comfort);
  const energySpread = to100(highEnergy.energy) - to100(lowEnergy.energy);

  const positiveCount = results.filter(
    (r) => r.quadrantKey === 'energeticPleasant' || r.quadrantKey === 'calmPleasant',
  ).length;

  const overallKey = positiveCount >= 3 ? 'positive' : positiveCount >= 2 ? 'mixed' : 'challenging';

  // ── Build dynamic reflection paragraphs ──
  const reflectionParts = [];

  if (comfortSpread > 15) {
    reflectionParts.push(
      replaceTokens(T(t.result.reflection.comfortContrast, lang), {
        high: T(t.contexts[highComfort.key], lang),
        highVal: to100(highComfort.comfort),
        low: T(t.contexts[lowComfort.key], lang),
        lowVal: to100(lowComfort.comfort),
      }),
    );
  }
  if (energySpread > 15) {
    reflectionParts.push(
      replaceTokens(T(t.result.reflection.energyContrast, lang), {
        high: T(t.contexts[highEnergy.key], lang),
        highVal: to100(highEnergy.energy),
        low: T(t.contexts[lowEnergy.key], lang),
        lowVal: to100(lowEnergy.energy),
      }),
    );
  }
  if (comfortSpread <= 15 && energySpread <= 15) {
    reflectionParts.push(T(t.result.reflection.consistent, lang));
  } else {
    reflectionParts.push(T(t.result.reflection.varied, lang));
  }
  if (comfortSpread > 25) {
    reflectionParts.push(
      replaceTokens(T(t.result.reflection.contrastNote, lang), {
        high: T(t.contexts[highComfort.key], lang),
        low: T(t.contexts[lowComfort.key], lang),
      }),
    );
  }

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

      {/* Navbar */}
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
          {userName ? (
            <>
              <p className="text-base font-medium text-purple mb-1">
                {T(t.result.greeting, lang).replace('{name}', userName)}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {T(t.result.greetingSubtitle, lang)}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500 leading-relaxed">
              {T(t.result.subtitle, lang)}
            </p>
          )}
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

          {/* Context breakdown cards */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">{T(t.result.contextBreakdown, lang)}</h2>
            <div className="space-y-4">
              {results.map((r) => {
                const Icon = r.icon;
                const comfortScore = to100(r.comfort);
                const energyScore = to100(r.energy);
                const feedback = T(t.result.contextFeedback?.[r.key]?.[r.quadrantKey], lang)
                  || T(t.result.reflectionMessages[r.quadrantKey], lang);

                return (
                  <div
                    key={r.key}
                    className="rounded-2xl border border-white/70 bg-white/60 backdrop-blur-sm p-5 shadow-card-sm"
                    style={{ borderLeftWidth: '4px', borderLeftColor: r.chartColor }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-soft flex items-center justify-center">
                          <Icon className="w-4 h-4 text-purple" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">{T(t.contexts[r.key], lang)}</h3>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-soft text-purple">
                        {T(t.quadrants[r.quadrantKey]?.label, lang)}
                      </span>
                    </div>

                    {/* Score bars */}
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-24 shrink-0">{T(t.chart.comfort, lang)}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${comfortScore}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 w-8 text-right tabular-nums">{comfortScore}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-24 shrink-0">{T(t.chart.energy, lang)}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-purple/60 transition-all duration-500" style={{ width: `${energyScore}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 w-8 text-right tabular-nums">{energyScore}</span>
                      </div>
                    </div>

                    {/* Feedback */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feedback}
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
                <h3 className="text-sm font-semibold text-teal-dark mb-2">{T(t.result.reflectionTitle, lang)}</h3>
                {reflectionParts.map((part, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed mb-2">
                    {part}
                  </p>
                ))}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {T(t.result.overallInsights[overallKey], lang)}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
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

          {/* Photobooth CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100/80">
            <div className="text-center">
              <Link
                to="/photobooth"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-teal hover:bg-teal-light active:bg-teal-dark text-white shadow-card-md hover:shadow-card-lg transition-all duration-200 no-underline cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                {T(t.photobooth.ctaButton, lang)}
              </Link>
            </div>
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
