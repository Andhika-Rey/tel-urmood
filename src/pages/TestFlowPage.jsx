import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { CONTEXTS, QUESTIONS, CONTEXT_INSTRUCTIONS } from '../constants/design';
import ProgressBar from '../components/test/ProgressBar';
import LikertScale from '../components/test/LikertScale';

const TOTAL = 16;
const PER_CONTEXT = 4;

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function TestFlowPage({ answers, setAnswers }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const dirRef = useRef(1);

  const contextIndex = Math.floor(step / PER_CONTEXT);
  const questionIndex = step % PER_CONTEXT;
  const context = CONTEXTS[contextIndex];
  const contextKey = context.key;
  const Icon = context.icon;
  const question = QUESTIONS[contextKey][questionIndex];
  const currentValue = answers[contextKey][questionIndex];
  const isFirst = step === 0;
  const isLast = step === TOTAL - 1;
  const isContextStart = questionIndex === 0;
  const answered = currentValue !== null;

  function handleAnswer(value) {
    setAnswers((prev) => {
      const updated = { ...prev };
      updated[contextKey] = [...prev[contextKey]];
      updated[contextKey][questionIndex] = value;
      return updated;
    });
  }

  function handleNext() {
    if (!answered) return;
    dirRef.current = 1;
    if (isLast) {
      navigate('/result');
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (isFirst) return;
    dirRef.current = -1;
    setStep((s) => s - 1);
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-mint-pale via-white to-mint-pale" />
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-teal/10 blur-[100px]" />
      </div>

      {/* Faint dot grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4f9f96 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Navbar — non-clickable during test */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-center">
          <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 py-10 md:py-14">
        {/* Progress bar */}
        <div className="w-full max-w-xl mb-8">
          <ProgressBar currentStep={step} />
        </div>

        {/* Question card — animated */}
        <div className="w-full max-w-xl relative">
          <AnimatePresence mode="wait" custom={dirRef.current}>
            <motion.div
              key={step}
              custom={dirRef.current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full bg-white/80 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-8 md:p-12"
            >
              {/* Context badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-soft flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{context.label}</h2>
                  <p className="text-[11px] text-gray-400">
                    {CONTEXT_INSTRUCTIONS[contextKey]}
                  </p>
                </div>
              </div>

              {/* Helper tip — first question only */}
              {isFirst && (
                <div className="flex items-start gap-2.5 bg-teal-soft rounded-2xl px-5 py-3.5 mb-8 border border-teal/10">
                  <Sparkles className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                  <p className="text-xs text-teal-dark leading-relaxed">
                    There are no right or wrong answers. Just pick what feels closest to your experience.
                  </p>
                </div>
              )}

              {/* Context transition label */}
              {isContextStart && step > 0 && (
                <div className="text-center mb-6">
                  <span className="inline-block text-[11px] font-medium text-teal bg-teal-soft rounded-full px-4 py-1.5 border border-teal/10">
                    Now entering: {context.label}
                  </span>
                </div>
              )}

              {/* Question */}
              <p className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed text-center mb-10">
                {question.text}
              </p>

              {/* Likert stepped slider */}
              <div className="mb-10">
                <LikertScale
                  value={currentValue}
                  onChange={handleAnswer}
                  dimension={question.dimension}
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100/80">
                {!isFirst ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-full px-5 py-2.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!answered}
                  className={`
                    inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold
                    transition-all duration-200 cursor-pointer
                    ${answered
                      ? 'bg-purple hover:bg-purple-light active:bg-purple-dark text-white shadow-card-md hover:shadow-card-lg'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                    }
                  `}
                >
                  {isLast ? 'See My Results' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 text-center">
        <p className="text-xs text-gray-400 tracking-wide">
          Tel-UrMood &middot; Not a clinical diagnosis tool.
        </p>
      </footer>
    </div>
  );
}
