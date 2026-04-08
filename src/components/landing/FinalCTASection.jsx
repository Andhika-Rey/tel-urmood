import { ArrowRight } from 'lucide-react';

export default function FinalCTASection({ onStartTest }) {
  return (
    <section className="px-8 py-28 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-mint/35 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-purple/5 blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ready to Check In With Yourself?
          </h2>
          <p className="text-base text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            It only takes a few minutes. No sign-up, no saving, no judgment.
          </p>
          <button
            type="button"
            onClick={onStartTest}
            className="inline-flex items-center gap-2 bg-purple hover:bg-purple-light active:bg-purple-dark text-white rounded-full px-10 py-4 text-sm font-semibold shadow-card-md hover:shadow-card-lg transition-all duration-200 cursor-pointer"
          >
            Start Reflecting
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-400 mt-6">
            No account needed &middot; Results stay on your device
          </p>
        </div>
      </div>
    </section>
  );
}
