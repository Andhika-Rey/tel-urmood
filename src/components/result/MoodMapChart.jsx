import t, { T } from '../../constants/translations';

const SIZE = 400;
const PAD = 52;          // space for axis labels
const PLOT = SIZE - PAD * 2;  // drawable area
const MID = PAD + PLOT / 2;   // 50-line position

// Quadrant fills (x,y are top-left of each quadrant rect in SVG coords)
const QUADRANT_FILLS = [
  { x: PAD,  y: PAD,  w: PLOT / 2, h: PLOT / 2, color: '#d94a5c', key: 'energeticUnpleasant' },  // top-left
  { x: MID,  y: PAD,  w: PLOT / 2, h: PLOT / 2, color: '#4f9f96', key: 'energeticPleasant' },     // top-right
  { x: PAD,  y: MID,  w: PLOT / 2, h: PLOT / 2, color: '#813a88', key: 'lowUnpleasant' },          // bottom-left
  { x: MID,  y: MID,  w: PLOT / 2, h: PLOT / 2, color: '#4a90d9', key: 'calmPleasant' },           // bottom-right
];

// Tick values on the 0-100 scale
const TICKS = [0, 25, 50, 75, 100];

export default function MoodMapChart({ results, lang = 'en' }) {
  // Convert comfort/energy from [-1,+1] → [0,100]
  function to100(v) {
    return (v + 1) * 50;
  }
  // Map a 0-100 value to SVG x
  function toSvgX(val) {
    return PAD + (val / 100) * PLOT;
  }
  // Map a 0-100 value to SVG y (inverted — 0 at bottom)
  function toSvgY(val) {
    return PAD + PLOT - (val / 100) * PLOT;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[400px] h-auto"
        role="img"
        aria-label="Mood map chart showing your mood across four life contexts"
      >
        <defs>
          <clipPath id="chart-clip">
            <rect x={PAD} y={PAD} width={PLOT} height={PLOT} rx="16" />
          </clipPath>
        </defs>

        {/* Chart area background */}
        <rect x={PAD} y={PAD} width={PLOT} height={PLOT} rx="16" fill="#fafbfc" />

        {/* Colored quadrant fills */}
        <g clipPath="url(#chart-clip)">
          {QUADRANT_FILLS.map((q, i) => (
            <rect key={i} x={q.x} y={q.y} width={q.w} height={q.h} fill={q.color} opacity="0.10" />
          ))}
        </g>

        {/* Quadrant labels */}
        {QUADRANT_FILLS.map((q, i) => {
          const cx = q.x + q.w / 2;
          const cy = q.y + q.h / 2;
          const label = T(t.quadrants[q.key]?.label, lang);
          return (
            <text key={`ql-${i}`} x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill={q.color} opacity="0.40" fontSize="9" fontWeight="600" fontFamily="Montserrat, sans-serif">
              {label}
            </text>
          );
        })}

        {/* Grid lines at 25 and 75 */}
        {[25, 75].map((v) => (
          <g key={v}>
            <line x1={toSvgX(v)} y1={PAD} x2={toSvgX(v)} y2={PAD + PLOT} stroke="#e2e5ea" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1={PAD} y1={toSvgY(v)} x2={PAD + PLOT} y2={toSvgY(v)} stroke="#e2e5ea" strokeWidth="0.5" strokeDasharray="3 3" />
          </g>
        ))}

        {/* Divider lines at 50 (the quadrant borders) */}
        <line x1={MID} y1={PAD} x2={MID} y2={PAD + PLOT} stroke="#c8cdd4" strokeWidth="1" />
        <line x1={PAD} y1={MID} x2={PAD + PLOT} y2={MID} stroke="#c8cdd4" strokeWidth="1" />

        {/* Chart border */}
        <rect x={PAD} y={PAD} width={PLOT} height={PLOT} rx="16" fill="none" stroke="#e2e5ea" strokeWidth="1" />

        {/* X-axis tick labels */}
        {TICKS.map((v) => (
          <text key={`xt-${v}`} x={toSvgX(v)} y={PAD + PLOT + 16} textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="Montserrat, sans-serif">
            {v}
          </text>
        ))}

        {/* Y-axis tick labels */}
        {TICKS.map((v) => (
          <text key={`yt-${v}`} x={PAD - 8} y={toSvgY(v) + 3} textAnchor="end" fill="#9ca3af" fontSize="9" fontFamily="Montserrat, sans-serif">
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={PAD + PLOT / 2} y={SIZE - 4} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="600" fontFamily="Montserrat, sans-serif">
          {T(t.chart.comfort, lang)}
        </text>
        <text x={12} y={PAD + PLOT / 2} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="600" fontFamily="Montserrat, sans-serif" transform={`rotate(-90, 12, ${PAD + PLOT / 2})`}>
          {T(t.chart.energy, lang)}
        </text>

        {/* Data points — diamond shape like reference */}
        {results.map((r) => {
          const cx = toSvgX(to100(r.comfort));
          const cy = toSvgY(to100(r.energy));
          const s = 8;
          const diamond = `M${cx},${cy - s} L${cx + s},${cy} L${cx},${cy + s} L${cx - s},${cy} Z`;
          return (
            <g key={r.key}>
              <circle cx={cx} cy={cy} r="16" fill={r.chartColor} opacity="0.10" />
              <path d={diamond} fill={r.chartColor} stroke="white" strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4">
        {results.map((r) => (
          <div key={r.key} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block rotate-45"
              style={{ backgroundColor: r.chartColor }}
            />
            <span className="text-xs text-gray-500">{T(t.contexts[r.key], lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
