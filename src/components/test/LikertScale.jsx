import { motion } from 'framer-motion';
import t from '../../constants/translations';

const POINT_COUNT = 5;
const CENTER = 2; // index of neutral point

export default function LikertScale({ value, onChange, dimension, lang = 'en' }) {
  const labels = t.scaleLabels[dimension]?.[lang] || t.scaleLabels.comfort[lang] || t.scaleLabels.comfort.en;

  // Compute the fill bar from center to the selected point
  const centerPct = (CENTER / (POINT_COUNT - 1)) * 100; // 50%
  const selectedPct = value !== null ? (value / (POINT_COUNT - 1)) * 100 : centerPct;
  const fillLeft = Math.min(centerPct, selectedPct);
  const fillWidth = Math.abs(selectedPct - centerPct);

  return (
    <div className="select-none">
      {/* Track with clickable points */}
      <div className="relative mx-auto" style={{ maxWidth: 400 }}>
        {/* Rail */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 rounded-full bg-gray-200/70" />

        {/* Center tick mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-3 rounded-full bg-gray-300/60" />

        {/* Filled rail from center to selection */}
        {value !== null && (
          <motion.div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-purple/40"
            initial={false}
            animate={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}

        {/* Points */}
        <div className="relative flex items-center justify-between h-10">
          {Array.from({ length: POINT_COUNT }, (_, i) => {
            const isSelected = value === i;
            const isCenter = i === CENTER;
            // Dots between center and selection are "passed through"
            const isBetween =
              value !== null &&
              ((value < CENTER && i >= value && i <= CENTER) ||
               (value > CENTER && i >= CENTER && i <= value));
            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                className="relative flex items-center justify-center w-10 h-10 cursor-pointer group"
                aria-label={labels[i]}
              >
                {/* Outer glow on selected */}
                {isSelected && (
                  <motion.div
                    layoutId="likert-glow"
                    className="absolute w-10 h-10 rounded-full bg-purple/8"
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}
                {/* Dot */}
                <motion.div
                  className={`relative z-10 rounded-full border-2 transition-colors duration-200 ${
                    isSelected
                      ? 'bg-purple border-purple'
                      : isBetween
                        ? 'bg-purple/30 border-purple/30'
                        : isCenter && value === null
                          ? 'bg-gray-200 border-gray-300'
                          : 'bg-white border-gray-300 group-hover:border-teal'
                  }`}
                  animate={{
                    width: isSelected ? 20 : isCenter && value === null ? 16 : 14,
                    height: isSelected ? 20 : isCenter && value === null ? 16 : 14,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels below */}
      <div className="relative mx-auto mt-2" style={{ maxWidth: 400 }}>
        <div className="flex justify-between">
          {labels.map((label, i) => {
            const isSelected = value === i;
            return (
              <span
                key={i}
                className={`text-[10px] leading-tight text-center w-16 transition-colors duration-200 ${
                  isSelected ? 'text-purple font-semibold' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
