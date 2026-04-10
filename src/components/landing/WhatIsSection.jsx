import { Activity } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import tr, { T } from '../../constants/translations';

export default function WhatIsSection() {
  const { lang } = useLang();

  return (
    <section className="px-8 py-20">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-10 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center">
            <Activity className="w-5 h-5 text-teal" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{T(tr.whatIs.title, lang)}</h2>
        </div>
        <p className="text-base text-gray-600 leading-[1.75]">
          {T(tr.whatIs.p1, lang)}
        </p>
        <p className="text-base text-gray-600 leading-[1.75] mt-4">
          {T(tr.whatIs.p2, lang)}
        </p>
      </div>
    </section>
  );
}
