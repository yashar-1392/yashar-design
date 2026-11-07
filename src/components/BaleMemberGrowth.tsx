import { Zap, Check, Users, MessageCircle, Clock, Send } from 'lucide-react';
import { useApp } from '@/context';
import { channelPackages, BALE_CHANNEL } from '@/i18n';
import { formatToman } from '@/lib/order';

interface Props {
  onOrderChannel: (packageId: string) => void;
}

export function BaleMemberGrowth({ onOrderChannel }: Props) {
  const { t, isFa } = useApp();
  const m = t.memberGrowth;

  return (
    <section id="member-growth" className="py-24 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-950/40 border border-accent-200 dark:border-accent-800/50 text-accent-700 dark:text-accent-300 text-sm font-medium mb-4 animate-fade-up">
            <Zap size={16} className="text-accent-500" />
            {m.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {m.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {m.subtitle}
          </p>
          <div className="mt-6 w-24 h-1.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Channel packages — spans 2 cols */}
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{m.channelTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.channelDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Clock size={14} />
              {m.delivery}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channelPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group relative rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/40 p-4 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {isFa ? pkg.label.fa : pkg.label.en}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-extrabold text-primary-700 dark:text-primary-300">
                      {formatToman(pkg.price, isFa ? 'fa' : 'en')}
                    </span>
                    {isFa && <span className="text-xs text-slate-400">{t.services.currency}</span>}
                  </div>
                  <button
                    onClick={() => onOrderChannel(pkg.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    <Check size={16} />
                    {m.orderChannel}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group packages — 1 col */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-white/10 shadow-xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{m.groupTitle}</h3>
                <p className="text-xs text-slate-400">{m.groupDesc}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white/70" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
                {m.groupDesc}
              </p>
            </div>

            <a
              href={BALE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              <Send size={18} />
              {m.groupCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
