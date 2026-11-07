import { useState, useMemo } from 'react';
import { Info, GraduationCap, Search, X } from 'lucide-react';
import { useApp } from '@/context';
import { services, type Service } from '@/i18n';
import { Icon } from '@/components/Icon';
import { StudentDiscountModal } from '@/components/StudentDiscountModal';

interface ServicesProps {
  onOrder: () => void;
}

export function Services({ onOrder }: ServicesProps) {
  const { t, isFa } = useApp();
  const [modalService, setModalService] = useState<Service | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => {
      const fields = [s.title.fa, s.title.en, s.desc.fa, s.desc.en, s.details.fa, s.details.en];
      return fields.some((f) => f.toLowerCase().includes(q));
    });
  }, [query]);

  return (
    <section id="services" className="relative py-24 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.services.searchPlaceholder}
              className="w-full rounded-full bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* No results */}
        {filtered.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">
            {t.services.noResults}
          </p>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s, i) => (
              <div
                key={s.id}
                className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 animate-fade-up ${
                  s.soon
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 opacity-75'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:shadow-primary-500/10'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Info button - top corner */}
                {!s.soon && (
                  <button
                    onClick={() => setModalService(s)}
                    className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title={t.serviceInfo.title}
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{t.services.infoBadge}</span>
                  </button>
                )}

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
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {isFa ? s.desc.fa : s.desc.en}
                </p>

                {/* Price section */}
                {s.soon ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {t.services.soon}
                  </div>
                ) : s.custom ? (
                  <div className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                    {isFa ? s.price.fa : s.price.en}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Standard price */}
                    <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 px-3 py-2">
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">
                        {t.services.standardLabel}
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {isFa ? s.price.fa : s.price.en}
                        </span>
                        {isFa && <span className="text-[10px] text-slate-400">{t.services.currency}</span>}
                      </div>
                    </div>

                    {/* Student price */}
                    {s.studentPrice.fa !== '' && (
                      <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 px-3 py-2">
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {t.services.studentLabel}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {isFa ? s.studentPrice.fa : s.studentPrice.en}
                          </span>
                          {isFa && <span className="text-[10px] text-slate-400">{t.services.currency}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service info modal */}
      <StudentDiscountModal service={modalService} onClose={() => setModalService(null)} onOrder={onOrder} />
    </section>
  );
}
