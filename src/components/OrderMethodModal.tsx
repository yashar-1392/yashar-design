import { useEffect } from 'react';
import { X, Globe, Send } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_ORDER_BOT } from '@/i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  onSiteOrder: () => void;
}

export function OrderMethodModal({ open, onClose, onSiteOrder }: Props) {
  const { t, isFa } = useApp();
  const o = t.order;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-6 pb-8">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <button
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h3 className="relative text-xl font-extrabold text-white">{o.methodTitle}</h3>
          <p className="relative text-sm text-primary-50 mt-1">{o.methodSubtitle}</p>
        </div>

        <div className="p-5 space-y-3">
          {/* Site order */}
          <button
            onClick={onSiteOrder}
            className="group w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50 dark:bg-slate-800/40 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all duration-300 text-start"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white">{o.methodSite}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{o.methodSiteDesc}</div>
            </div>
          </button>

          {/* Bale order */}
          <a
            href={BALE_ORDER_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50 dark:bg-slate-800/40 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white">{o.methodBale}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{o.methodBaleDesc}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
