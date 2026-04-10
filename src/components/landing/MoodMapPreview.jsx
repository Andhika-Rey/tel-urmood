import { CONTEXTS } from '../../constants/design';
import { useLang } from '../../contexts/LanguageContext';
import tr, { T } from '../../constants/translations';

const EXAMPLE_POINTS = [
  { key: 'home',   x: 67,  y: 37 },
  { key: 'school', x: 35,  y: 70 },
  { key: 'social', x: 70,  y: 67 },
  { key: 'alone',  x: 37,  y: 32 },
];

const CHART_SIZE = 280;
const PAD = 28;
const PLOT = CHART_SIZE - PAD * 2;
const MID = PAD + PLOT / 2;

function toSvgX(val) { return PAD + (val / 100) * PLOT; }
function toSvgY(val) { return PAD + PLOT - (val / 100) * PLOT; }

export default function MoodMapPreview() {
  const { lang } = useLang();

  const quadrantLegend = [
    { key: 'energeticPleasant', color: 'bg-teal/10 text-teal-dark' },
    { key: 'energeticUnpleasant', color: 'bg-purple-soft text-purple' },
    { key: 'calmPleasant', color: 'bg-teal/10 text-teal-dark' },
    { key: 'lowUnpleasant', color: 'bg-purple-soft text-purple' },
  ];

  return (
    <section className="px-8 py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-mint/20 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {T(tr.moodMapPreview.title, lang)}
          </h2>
          <p className="text-base text-gray-500 leading-[1.8] mb-6">
            {T(tr.moodMapPreview.description, lang)}
          </p>

          {/* Quadrant legend */}
          <div className="grid grid-cols-2 gap-3">
            {quadrantLegend.map(({ key, color }) => (
              <div key={key} className={`rounded-xl px-3.5 py-2.5 ${color}`}>
                <div className="text-xs font-semibold mb-0.5">{T(tr.quadrants[key].label, lang)}</div>
                <div className="text-[10px] opacity-70">{T(tr.quadrants[key].short, lang)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — chart card */}
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-[28px] shadow-card-lg border border-white/60 p-7 md:p-8">
            <svg
              viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
              className="w-full max-w-[280px]"
              role="img"
              aria-label="Example mood map preview"
            >
              {/* Grid */}
              {Array.from({ length: 7 }, (_, i) => {
                const pos = PAD + (i * PLOT) / 6;
                return (
                  <g key={i} opacity="0.07">
                    <line x1={pos} y1={PAD} x2={pos} y2={PAD + PLOT} stroke="#4f9f96" />
                    <line x1={PAD} y1={pos} x2={PAD + PLOT} y2={pos} stroke="#4f9f96" />
                  </g>
                );
              })}

              {/* Quadrant fills */}
              <rect x={MID} y={PAD} width={PLOT / 2} height={PLOT / 2} fill="#4f9f96" opacity="0.04" rx="3" />
              <rect x={PAD} y={PAD} width={PLOT / 2} height={PLOT / 2} fill="#813a88" opacity="0.03" rx="3" />
              <rect x={MID} y={MID} width={PLOT / 2} height={PLOT / 2} fill="#4a90d9" opacity="0.03" rx="3" />
              <rect x={PAD} y={MID} width={PLOT / 2} height={PLOT / 2} fill="#813a88" opacity="0.04" rx="3" />

              {/* Divider lines at 50 */}
              <line x1={MID} y1={PAD} x2={MID} y2={PAD + PLOT} stroke="#d0d0d0" strokeWidth="0.75" />
              <line x1={PAD} y1={MID} x2={PAD + PLOT} y2={MID} stroke="#d0d0d0" strokeWidth="0.75" />

              {/* Labels */}
              <text x={PAD + PLOT / 2} y={CHART_SIZE - 4} fontSize="7" fill="#9ca3af" fontFamily="Montserrat" fontWeight="500" textAnchor="middle">{T(tr.chart.comfort, lang)}</text>
              <text x={6} y={PAD + PLOT / 2} fontSize="7" fill="#9ca3af" fontFamily="Montserrat" fontWeight="500" textAnchor="middle" transform={`rotate(-90, 6, ${PAD + PLOT / 2})`}>{T(tr.chart.energy, lang)}</text>

              {/* Points */}
              {EXAMPLE_POINTS.map(({ key, x, y }) => {
                const ctx = CONTEXTS.find(c => c.key === key);
                const cx = toSvgX(x);
                const cy = toSvgY(y);
                return (
                  <g key={key}>
                    <circle cx={cx} cy={cy} r="12" fill={ctx.chartColor} opacity="0.12" />
                    <circle cx={cx} cy={cy} r="6" fill={ctx.chartColor} stroke="white" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-5">
              {CONTEXTS.map(({ key, chartColor }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColor }} />
                  <span className="text-[11px] text-gray-500">{T(tr.contexts[key], lang)}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-3">{T(tr.moodMapPreview.exampleVis, lang)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
