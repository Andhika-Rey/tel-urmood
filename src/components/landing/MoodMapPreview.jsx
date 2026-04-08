import { CONTEXTS } from '../../constants/design';

const EXAMPLE_POINTS = [
  { key: 'home',   x: 0.35,  y: -0.25 },
  { key: 'school', x: -0.3,  y: 0.4   },
  { key: 'social', x: 0.4,   y: 0.35  },
  { key: 'alone',  x: -0.25, y: -0.35 },
];

const CHART_SIZE = 280;
const HALF = CHART_SIZE / 2;
const PADDING = 28;
const PLOT_AREA = HALF - PADDING;

function toSvgX(comfort) { return HALF + comfort * PLOT_AREA; }
function toSvgY(energy) { return HALF - energy * PLOT_AREA; }

export default function MoodMapPreview() {
  return (
    <section className="px-8 py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-mint/20 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Your Personal Mood Map
          </h2>
          <p className="text-base text-gray-500 leading-[1.8] mb-6">
            After answering, you&rsquo;ll see where each part of your life falls on a
            comfort-and-energy map. Each dot represents one area — so you can see
            how your mood shifts across different contexts.
          </p>

          {/* Quadrant legend */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Energetic Pleasant', desc: 'Lively & at ease', color: 'bg-teal/10 text-teal-dark' },
              { label: 'Energetic Unpleasant', desc: 'Restless or on edge', color: 'bg-purple-soft text-purple' },
              { label: 'Calm Pleasant', desc: 'Calm & comfortable', color: 'bg-teal/10 text-teal-dark' },
              { label: 'Low Unpleasant', desc: 'Drained or uneasy', color: 'bg-purple-soft text-purple' },
            ].map(({ label, desc, color }) => (
              <div key={label} className={`rounded-xl px-3.5 py-2.5 ${color}`}>
                <div className="text-xs font-semibold mb-0.5">{label}</div>
                <div className="text-[10px] opacity-70">{desc}</div>
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
                const pos = PADDING + (i * (CHART_SIZE - 2 * PADDING)) / 6;
                return (
                  <g key={i} opacity="0.07">
                    <line x1={pos} y1={PADDING} x2={pos} y2={CHART_SIZE - PADDING} stroke="#4f9f96" />
                    <line x1={PADDING} y1={pos} x2={CHART_SIZE - PADDING} y2={pos} stroke="#4f9f96" />
                  </g>
                );
              })}

              {/* Quadrant fills */}
              <rect x={HALF} y={PADDING} width={HALF - PADDING} height={HALF - PADDING} fill="#4f9f96" opacity="0.04" rx="3" />
              <rect x={PADDING} y={PADDING} width={HALF - PADDING} height={HALF - PADDING} fill="#813a88" opacity="0.03" rx="3" />
              <rect x={HALF} y={HALF} width={HALF - PADDING} height={HALF - PADDING} fill="#4f9f96" opacity="0.03" rx="3" />
              <rect x={PADDING} y={HALF} width={HALF - PADDING} height={HALF - PADDING} fill="#813a88" opacity="0.04" rx="3" />

              {/* Axes */}
              <line x1={HALF} y1={PADDING} x2={HALF} y2={CHART_SIZE - PADDING} stroke="#d0d0d0" strokeWidth="0.75" />
              <line x1={PADDING} y1={HALF} x2={CHART_SIZE - PADDING} y2={HALF} stroke="#d0d0d0" strokeWidth="0.75" />

              {/* Labels */}
              <text x={CHART_SIZE - PADDING + 2} y={HALF + 3} fontSize="7" fill="#9ca3af" fontFamily="Montserrat" fontWeight="500">Comfort</text>
              <text x={HALF + 4} y={PADDING - 6} fontSize="7" fill="#9ca3af" fontFamily="Montserrat" fontWeight="500">Energy</text>

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
              {CONTEXTS.map(({ key, label, chartColor }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColor }} />
                  <span className="text-[11px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-3">Example visualization</p>
          </div>
        </div>
      </div>
    </section>
  );
}
