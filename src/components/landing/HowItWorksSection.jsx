import { ClipboardList, Map, Lightbulb, ChevronRight } from 'lucide-react';
import { STEPS } from '../../constants/design';

const STEP_ICONS = [ClipboardList, Map, Lightbulb];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-8 py-28 relative">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-mint/30 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-base text-gray-500">
            Three simple steps. About 5 minutes. Zero complexity.
          </p>
        </div>

        {/* Product teaser — split layout: steps on left, mock UI on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — numbered steps with connector line */}
          <div className="space-y-0">
            {STEPS.map(({ label, description }, i) => {
              const Icon = STEP_ICONS[i];
              const isLast = i === STEPS.length - 1;
              return (
                <div key={label} className="flex gap-5">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center shrink-0 relative z-10">
                      <Icon className="w-5 h-5 text-teal" />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-gradient-to-b from-teal/20 to-teal/5 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={isLast ? 'pb-0' : 'pb-8'}>
                    <div className="text-xs font-semibold text-teal mb-1">Step {i + 1}</div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5">{label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — mock product UI card */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-[28px] shadow-card-lg border border-white/60 p-7 md:p-8">
              {/* Mock progress bar */}
              <div className="flex items-center gap-2 mb-6">
                {['Home', 'School', 'Social', 'Alone'].map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-1.5 rounded-full ${i === 0 ? 'bg-teal' : 'bg-gray-100'}`} />
                    <p className="text-[10px] text-gray-400 mt-1.5 text-center">{label}</p>
                  </div>
                ))}
              </div>

              {/* Mock question card */}
              <div className="bg-mint-pale/60 rounded-2xl p-5 mb-4">
                <p className="text-xs text-gray-400 mb-2">1 of 4</p>
                <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">
                  I feel comfortable and at ease when I&rsquo;m at home.
                </p>
                {/* Mock Likert */}
                <div className="flex gap-2">
                  {['SD', 'D', 'N', 'A', 'SA'].map((l, i) => (
                    <div
                      key={l}
                      className={`flex-1 h-8 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors
                        ${i === 3 ? 'bg-purple text-white' : 'bg-white border border-gray-200 text-gray-400'}`}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock nav */}
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1.5 text-xs font-medium text-purple">
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-teal text-white text-[10px] font-bold rounded-full px-3 py-1.5 shadow-card-md">
              ~5 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
