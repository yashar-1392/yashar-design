import { useEffect } from 'react';
import { X, GraduationCap, ShoppingBag, ArrowLeft, Info } from 'lucide-react';
import { useApp } from '@/context';
import type { Service } from '@/i18n';
import { Icon } from '@/components/Icon';

interface Props {
  service: Service | null;
  onClose: () => void;
  onOrder: () => void;
}

export function StudentDiscountModal({ service, onClose, onOrder }: Props) {
  const { t, isFa } = useApp();
  const m = t.serviceInfo;

  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [service, onClose]);

  if (!service) return null;

  const hasStudentPrice = !service.custom && service.studentPrice.fa !== '';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
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
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Icon name={service.icon} className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white leading-tight">
                {isFa ? service.title.fa : service.title.en}
              </h3>
              <p className="text-sm text-primary-50 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                {m.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Full details */}
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isFa ? service.details.fa : service.details.en}
            </p>
          </div>

          {/* Pricing */}
          {hasStudentPrice && (
            <div className="rounded-2xl border border-primary-200 dark:border-primary-800/50 bg-primary-50/50 dark:bg-primary-950/20 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard price */}
                <div className="rounded-xl bg-white dark:bg-slate-800/60 p-3 border border-slate-200 dark:border-white/5">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {m.standardPrice}
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {isFa ? service.price.fa : service.price.en}
                    {isFa && <span className="text-xs font-normal text-slate-400 ms-1">{m.currency}</span>}
                  </div>
                </div>
                {/* Student price */}
                <div className="rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-3 border border-primary-300 dark:border-primary-700">
                  <div className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {m.studentPriceLabel}
                  </div>
                  <div className="text-sm font-extrabold text-primary-700 dark:text-primary-300">
                    {isFa ? service.studentPrice.fa : service.studentPrice.en}
                    {isFa && <span className="text-xs font-normal text-primary-400 ms-1">{m.currency}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student discount section */}
          {hasStudentPrice && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {m.studentSection}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {m.studentDesc}
              </p>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.studentNote}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => { onClose(); onOrder(); }}
            className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            <ShoppingBag size={20} />
            {m.cta}
            <ArrowLeft size={18} className={`group-hover:-translate-x-1 transition-transform ${isFa ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
