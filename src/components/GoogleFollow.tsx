import { useState, useEffect } from 'react';
import { Search, ExternalLink, X, BookOpen } from 'lucide-react';
import { useApp } from '@/context';
import { GOOGLE_FOLLOW_URL } from '@/i18n';

export function GoogleFollow() {
  const { t, isFa } = useApp();
  const g = t.googleFollow;
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (guideOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setGuideOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [guideOpen]);

  const steps = [g.step1, g.step2, g.step3];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl" />

          <div className="relative max-w-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-5">
                <Search size={16} />
                Google
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
                {g.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-lg">
                {g.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={GOOGLE_FOLLOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-xl shadow-primary-500/20 hover:scale-105 transition-all duration-300"
                >
                  {g.cta}
                  <ExternalLink size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => setGuideOpen(true)}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/50 bg-primary-50/50 dark:bg-primary-950/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:scale-105 transition-all duration-300"
                >
                  <BookOpen size={18} />
                  {g.guideButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide modal */}
      {guideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setGuideOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-6 pb-8">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

              <button
                onClick={() => setGuideOpen(false)}
                className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="relative flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  {g.guideTitle}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center">
                      {isFa ? ['۱', '۲', '۳'][i] : i + 1}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={GOOGLE_FOLLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setGuideOpen(false)}
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                {g.cta}
                <ExternalLink size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
