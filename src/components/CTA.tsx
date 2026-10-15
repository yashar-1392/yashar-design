import { ShoppingBag, Send } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_ORDER_BOT, BALE_CHANNEL } from '@/i18n';

export function CTA() {
  const { t } = useApp();

  return (
    <section className="py-24 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 p-10 sm:p-16 text-center shadow-2xl">
          {/* Decorative */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-glow" />
          <div className="absolute -bottom-24 right-0 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.cta.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BALE_ORDER_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-xl shadow-primary-500/30 hover:scale-105 transition-all duration-300"
              >
                <ShoppingBag size={20} />
                {t.cta.order}
              </a>
              <a
                href={BALE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                <Send size={20} />
                {t.cta.channel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
