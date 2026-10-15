import { useApp } from '@/context';
import { services } from '@/i18n';
import { Icon } from '@/components/Icon';

export function Services() {
  const { t, isFa } = useApp();

  return (
    <section id="services" className="relative py-24 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 animate-fade-up ${
                s.soon
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 opacity-75'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:shadow-primary-500/10'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                s.soon
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  : 'bg-gradient-to-br from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400 group-hover:from-primary-500 group-hover:to-accent-500 group-hover:text-white'
              }`}>
                <Icon name={s.icon} className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {isFa ? s.title.fa : s.title.en}
              </h3>

              {/* Desc */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {isFa ? s.desc.fa : s.desc.en}
              </p>

              {/* Price */}
              {s.soon ? (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {t.services.soon}
                </div>
              ) : s.custom ? (
                <div className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                  {isFa ? s.price.fa : s.price.en}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-slate-400 text-xs">{isFa ? '💰' : ''}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {isFa ? s.price.fa : s.price.en}
                  </span>
                  {isFa && <span className="text-xs text-slate-400">{t.services.currency}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
