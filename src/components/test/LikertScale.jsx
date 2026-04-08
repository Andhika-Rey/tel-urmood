import { motion } from 'framer-motion';
import { SCALE_LABELS } from '../../constants/design';

const POINT_COUNT = 5;

export default function LikertScale({ value, onChange, dimension }) {
  const labels = SCALE_LABELS[dimension] || SCALE_LABELS.comfort;

  return (
    <div className="select-none">
      {/* Track with clickable points */}
      <div className="relative mx-auto" style={{ maxWidth: 400 }}>
        {/* Rail */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 rounded-full bg-gray-200/70" />

        {/* Filled rail up to selection */}
        {value !== null && (
          <motion.div
            className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full bg-purple/40"
            initial={false}
            animate={{ width: `${(value / (POINT_COUNT - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}

        {/* Points */}
        <div className="relative flex items-center justify-between h-10">
          {Array.from({ length: POINT_COUNT }, (_, i) => {
            const isSelected = value === i;
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
                      : value !== null && i < value
                        ? 'bg-purple/30 border-purple/30'
                        : 'bg-white border-gray-300 group-hover:border-teal'
                  }`}
                  animate={{
                    width: isSelected ? 20 : 14,
                    height: isSelected ? 20 : 14,
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
