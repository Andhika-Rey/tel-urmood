import { motion } from 'framer-motion';
import { CONTEXTS } from '../../constants/design';

const TOTAL_QUESTIONS = 16;
const PER_CONTEXT = 4;

export default function ProgressBar({ currentStep }) {
  const contextIndex = Math.floor(currentStep / PER_CONTEXT);
  const questionInContext = (currentStep % PER_CONTEXT) + 1;
  const context = CONTEXTS[contextIndex];
  const progress = ((currentStep + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-medium text-gray-500 tracking-wide">
          {context.label} &mdash; {questionInContext} of {PER_CONTEXT}
        </span>
        <span className="text-xs font-medium text-teal tabular-nums">
          {currentStep + 1}/{TOTAL_QUESTIONS}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200/60 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-teal"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
