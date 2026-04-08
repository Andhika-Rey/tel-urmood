import { CONTEXTS } from '../../constants/design';

export default function ContextsSection() {
  return (
    <section className="px-8 py-24 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-mint/20 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Four Areas, One Picture
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            Your mood isn&rsquo;t the same everywhere. Tel-UrMood looks at four parts of
            your daily life.
          </p>
        </div>

        {/* Bento-style grid — first item spans full width as feature, rest are cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature card — Home (wider, horizontal) */}
          {(() => {
            const ctx = CONTEXTS[0];
            const Icon = ctx.icon;
            return (
              <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-card-md border border-white/60 p-8 flex items-start gap-6 transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5">
                <div className="w-14 h-14 rounded-2xl bg-purple-soft flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ctx.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{ctx.description}</p>
                </div>
              </div>
            );
          })()}

          {/* School — tall-ish standalone */}
          {(() => {
            const ctx = CONTEXTS[1];
            const Icon = ctx.icon;
            return (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-card-md border border-white/60 p-7 transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ctx.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{ctx.description}</p>
              </div>
            );
          })()}

          {/* Social Activities — standalone */}
          {(() => {
            const ctx = CONTEXTS[2];
            const Icon = ctx.icon;
            return (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-card-md border border-white/60 p-7 transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ctx.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{ctx.description}</p>
              </div>
            );
          })()}

          {/* Alone — wider horizontal */}
          {(() => {
            const ctx = CONTEXTS[3];
            const Icon = ctx.icon;
            return (
              <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-card-md border border-white/60 p-8 flex items-start gap-6 transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5">
                <div className="w-14 h-14 rounded-2xl bg-purple-soft flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ctx.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{ctx.description}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
