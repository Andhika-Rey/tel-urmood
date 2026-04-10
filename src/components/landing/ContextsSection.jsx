import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CONTEXTS } from '../../constants/design';
import { useLang } from '../../contexts/LanguageContext';
import tr, { T } from '../../constants/translations';

function ContextCard({ ctx, isWide, lang }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ctx.icon;

  return (
    <div
      className={`${isWide ? 'md:col-span-2' : ''} bg-white/80 backdrop-blur-sm rounded-3xl shadow-card-md border border-white/60 transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={`${isWide ? 'p-8 flex items-start gap-6' : 'p-7'}`}>
        <div className={`${isWide ? 'w-14 h-14' : 'w-11 h-11 mb-4'} rounded-2xl ${isWide ? 'bg-purple-soft' : 'bg-teal-soft'} flex items-center justify-center shrink-0`}>
          <Icon className={`${isWide ? 'w-6 h-6' : 'w-5 h-5'} ${isWide ? 'text-purple' : 'text-teal'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{T(tr.contexts[ctx.key], lang)}</h3>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{T(tr.contextDescriptions[ctx.key], lang)}</p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-500 leading-relaxed mt-3 pt-3 border-t border-gray-100">
                  {T(tr.contextsSection.explanations[ctx.key], lang)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function ContextsSection() {
  const { lang } = useLang();

  return (
    <section className="px-8 py-24 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-mint/20 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {T(tr.contextsSection.title, lang)}
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            {T(tr.contextsSection.subtitle, lang)}
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ContextCard ctx={CONTEXTS[0]} isWide lang={lang} />
          <ContextCard ctx={CONTEXTS[1]} isWide={false} lang={lang} />
          <ContextCard ctx={CONTEXTS[2]} isWide={false} lang={lang} />
          <ContextCard ctx={CONTEXTS[3]} isWide lang={lang} />
        </div>
      </div>
    </section>
  );
}
