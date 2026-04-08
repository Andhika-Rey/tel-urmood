import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RotateCcw, Home, Sparkles } from 'lucide-react';
import { createEmptyAnswers } from '../constants/design';
import { computeResults, isComplete } from '../utils/scoring';
import MoodMapChart from '../components/result/MoodMapChart';

const REFLECTION_MESSAGES = {
  energeticPleasant:
    'You seem to feel lively and at ease here — that\'s a positive space for you.',
  calmPleasant:
    'This area brings you a sense of calm comfort — a place where you can recharge.',
  energeticUnpleasant:
    'You might feel on edge or restless here — it\'s okay to notice that.',
  lowUnpleasant:
    'This space may leave you feeling drained — recognizing that is the first step.',
};

export default function ResultPage({ answers, setAnswers }) {
  const navigate = useNavigate();

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
      ? 'Overall, most areas of your life seem to feel pretty comfortable right now. Keep paying attention to how different spaces affect your mood.'
      : positiveCount >= 2
        ? 'Your mood varies across different parts of your life — that\'s completely normal. Notice which spaces energize or calm you, and which ones feel harder.'
        : 'It looks like several areas feel challenging right now. Remember, this isn\'t a diagnosis — just a starting point for understanding yourself better.';

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
            Your Mood Map
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Here&rsquo;s a snapshot of how you usually feel across four areas of your life.
            Take a moment to explore your patterns.
          </p>
        </div>

        {/* Main card */}
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-8 md:p-12">
          {/* Chart section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Mood Map</h2>
            <p className="text-xs text-gray-400 mb-6">
              Each dot represents how you tend to feel in a specific context.
            </p>
            <MoodMapChart results={results} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100/80 my-8" />

          {/* Context summary cards */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Context Breakdown</h2>
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
                      <h3 className="text-sm font-semibold text-gray-800">{r.label}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                      <span>Comfort: <span className="font-medium text-gray-600">{r.comfort > 0 ? '+' : ''}{r.comfort.toFixed(2)}</span></span>
                      <span className="text-gray-200">|</span>
                      <span>Energy: <span className="font-medium text-gray-600">{r.energy > 0 ? '+' : ''}{r.energy.toFixed(2)}</span></span>
                    </div>
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-purple-soft text-purple">
                      {r.quadrant.label}
                    </span>
                    <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                      {REFLECTION_MESSAGES[r.quadrantKey]}
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
                <h3 className="text-sm font-semibold text-teal-dark mb-1.5">A moment to reflect</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {overallInsight}
                </p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  This map is just one snapshot — your mood naturally changes over time.
                  Use this as a gentle starting point, not a label.
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
              Retake
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-card-sm transition-all duration-200 no-underline"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-8 max-w-md leading-relaxed">
          Tel-UrMood is a self-reflection tool for educational purposes only.
          It is not a clinical assessment, diagnosis, or treatment recommendation.
        </p>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 text-center border-t border-teal/5">
        <p className="text-xs text-gray-400 tracking-wide">
          Tel-UrMood &middot; A self-reflection tool — not a clinical diagnosis.
        </p>
        <p className="text-xs text-gray-300 mt-1.5">
          Faculty of Psychology, Telkom University
        </p>
      </footer>
    </div>
  );
}
