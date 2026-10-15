import { Gift, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_ORDER_BOT } from '@/i18n';

export function OfferBanner() {
  const { t, isFa } = useApp();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 p-8 sm:p-12 shadow-2xl shadow-primary-500/20">
          {/* Decorative */}
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

          <div className="relative flex flex-col lg:flex-row items-center gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center animate-float">
              <Gift className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1 text-center lg:text-start">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {t.offer.title}
              </h3>
              <p className="text-base text-primary-50 leading-relaxed max-w-2xl">
                {t.offer.desc}
              </p>
            </div>

            <a
              href={BALE_ORDER_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 group flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-primary-700 bg-white hover:bg-primary-50 shadow-lg hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag size={20} />
              {t.offer.cta}
              <ArrowLeft size={18} className={`group-hover:-translate-x-1 transition-transform ${isFa ? '' : 'rotate-180'}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
