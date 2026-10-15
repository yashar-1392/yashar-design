import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '@/context';
import { faqItems } from '@/i18n';

export function FAQ() {
  const { t, isFa } = useApp();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.faq.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.faq.subtitle}
          </p>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-primary-300 dark:border-primary-700 bg-primary-50/50 dark:bg-primary-950/20 shadow-lg shadow-primary-500/5'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                >
                  <span className={`text-base font-bold transition-colors ${
                    isOpen ? 'text-primary-700 dark:text-primary-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {isFa ? item.q.fa : item.q.en}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'text-primary-600 dark:text-primary-400 rotate-180'
                        : 'text-slate-400'
                    }`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {isFa ? item.a.fa : item.a.en}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
