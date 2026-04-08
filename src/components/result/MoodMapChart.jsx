const SIZE = 360;
const HALF = SIZE / 2;
const PAD = 40; // padding for labels
const PLOT = HALF - PAD; // usable plot radius

/**
 * Custom SVG mood map chart.
 * Plots 4 context points on a Comfort (X) × Energy (Y) plane.
 * Coordinates are expected in [-1, +1] range.
 */
export default function MoodMapChart({ results }) {
  function toX(comfort) {
    return HALF + comfort * PLOT;
  }
  function toY(energy) {
    return HALF - energy * PLOT; // SVG Y is inverted
  }

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[360px] h-auto"
        role="img"
        aria-label="Mood map chart showing your mood across four life contexts"
      >
        {/* Background quadrant fills */}
        <rect x={HALF} y={0} width={HALF} height={HALF} rx="0" fill="rgba(79,159,150,0.04)" />
        <rect x={0} y={0} width={HALF} height={HALF} rx="0" fill="rgba(217,75,92,0.03)" />
        <rect x={0} y={HALF} width={HALF} height={HALF} rx="0" fill="rgba(129,58,136,0.03)" />
        <rect x={HALF} y={HALF} width={HALF} height={HALF} rx="0" fill="rgba(74,144,217,0.04)" />

        {/* Soft grid lines */}
        {[-0.5, 0.5].map((v) => (
          <g key={v}>
            <line
              x1={toX(v)} y1={PAD - 4} x2={toX(v)} y2={SIZE - PAD + 4}
              stroke="#e0e0e0" strokeWidth="0.75" strokeDasharray="4 4"
            />
            <line
              x1={PAD - 4} y1={toY(v)} x2={SIZE - PAD + 4} y2={toY(v)}
              stroke="#e0e0e0" strokeWidth="0.75" strokeDasharray="4 4"
            />
          </g>
        ))}

        {/* Axes */}
        <line
          x1={PAD - 4} y1={HALF} x2={SIZE - PAD + 4} y2={HALF}
          stroke="#d0d0d0" strokeWidth="1"
        />
        <line
          x1={HALF} y1={PAD - 4} x2={HALF} y2={SIZE - PAD + 4}
          stroke="#d0d0d0" strokeWidth="1"
        />

        {/* Quadrant labels */}
        <text x={HALF + PLOT / 2} y={PAD + 16} textAnchor="middle" className="fill-gray-400 text-[8px]" fontFamily="Montserrat, sans-serif">
          Energetic Pleasant
        </text>
        <text x={HALF - PLOT / 2} y={PAD + 16} textAnchor="middle" className="fill-gray-400 text-[8px]" fontFamily="Montserrat, sans-serif">
          Energetic Unpleasant
        </text>
        <text x={HALF + PLOT / 2} y={SIZE - PAD - 8} textAnchor="middle" className="fill-gray-400 text-[8px]" fontFamily="Montserrat, sans-serif">
          Calm Pleasant
        </text>
        <text x={HALF - PLOT / 2} y={SIZE - PAD - 8} textAnchor="middle" className="fill-gray-400 text-[8px]" fontFamily="Montserrat, sans-serif">
          Low Unpleasant
        </text>

        {/* Axis labels */}
        <text x={SIZE - PAD + 8} y={HALF + 4} textAnchor="start" className="fill-gray-500 text-[9px] font-medium" fontFamily="Montserrat, sans-serif">
          Comfort +
        </text>
        <text x={PAD - 8} y={HALF + 4} textAnchor="end" className="fill-gray-400 text-[9px]" fontFamily="Montserrat, sans-serif">
          −
        </text>
        <text x={HALF} y={PAD - 10} textAnchor="middle" className="fill-gray-500 text-[9px] font-medium" fontFamily="Montserrat, sans-serif">
          Energy +
        </text>
        <text x={HALF} y={SIZE - PAD + 18} textAnchor="middle" className="fill-gray-400 text-[9px]" fontFamily="Montserrat, sans-serif">
          −
        </text>

        {/* Data points */}
        {results.map((r) => {
          const cx = toX(r.comfort);
          const cy = toY(r.energy);
          return (
            <g key={r.key}>
              {/* Glow */}
              <circle cx={cx} cy={cy} r="16" fill={r.chartColor} opacity="0.12" />
              {/* Dot */}
              <circle cx={cx} cy={cy} r="7" fill={r.chartColor} stroke="white" strokeWidth="2.5" />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4">
        {results.map((r) => (
          <div key={r.key} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: r.chartColor }}
            />
            <span className="text-xs text-gray-500">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
