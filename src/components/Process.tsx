import { useApp } from '@/context';
import { processSteps } from '@/i18n';

export function Process() {
  const { t, isFa } = useApp();

  return (
    <section id="process" className="py-24 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.process.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.process.subtitle}
          </p>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 inset-x-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400 dark:from-primary-800 dark:via-primary-600 dark:to-accent-700 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-3">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="relative group animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Card */}
                <div className="relative rounded-2xl p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1.5 text-center">
                  {/* Number circle */}
                  <div className="relative w-14 h-14 mx-auto mb-3">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-primary-500/30">
                      {isFa ? step.num : String(i + 1)}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {isFa ? step.title.fa : step.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isFa ? step.desc.fa : step.desc.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
