import { ShoppingBag, ArrowDown, Sparkles } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_ORDER_BOT } from '@/i18n';
import { ServiceTicker } from '@/components/ServiceTicker';

export function Hero() {
  const { t, isFa } = useApp();

  const stats = [
    { value: '+۶۰', valueEn: '+60', label: t.hero.stat1 },
    { value: '۱۰۰٪', valueEn: '100%', label: t.hero.stat2 },
    { value: '۲۱', valueEn: '21', label: t.hero.stat3 },
    { value: '۷/۲۴', valueEn: '24/7', label: t.hero.stat4 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute inset-0 grid-pattern opacity-60 dark:opacity-40" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-400/20 dark:bg-primary-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-400/15 dark:bg-accent-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      {/* Gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-5 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-up">
            <Sparkles size={16} className="text-accent-500" />
            {t.hero.badge}
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-slate-900 dark:text-white">{t.hero.title1}</span>{' '}
            <span className="text-gradient">{t.hero.title2}</span>
          </h1>

          {/* Service ticker */}
          <div className="mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <ServiceTicker />
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <a
              href={BALE_ORDER_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag size={20} />
              {t.hero.cta1}
            </a>
            <a
              href="#services"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-white/5 transition-all duration-300"
            >
              {t.hero.cta2}
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center sm:text-start">
                <div className="text-3xl font-extrabold text-gradient mb-1">
                  {isFa ? s.value : s.valueEn}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
