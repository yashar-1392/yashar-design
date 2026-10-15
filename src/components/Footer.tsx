import { Send, Heart, Globe } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_CHANNEL, BALE_ORDER_BOT } from '@/i18n';
import { services } from '@/i18n';

export function Footer() {
  const { t, isFa } = useApp();

  const quickLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#process', label: t.nav.process },
    { href: '#faq', label: t.nav.faq },
  ];

  const topServices = services.slice(0, 6);

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-extrabold text-lg font-fa">ی</span>
              </div>
              <span className="font-extrabold text-base text-white">
                {isFa ? 'یاشار دیزاین' : 'Yashar Design'}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              {t.footer.desc}
            </p>
            <div className="flex gap-3">
              <a
                href={BALE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Bale Channel"
              >
                <Send size={18} />
              </a>
              <a
                href={BALE_ORDER_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Order Bot"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5">
              {topServices.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors line-clamp-1"
                  >
                    {isFa ? s.title.fa : s.title.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              <a
                href={BALE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-primary-400 transition-colors"
              >
                <Send size={16} className="shrink-0" />
                <span className="truncate">ble.ir/yashardesign</span>
              </a>
              <a
                href={BALE_ORDER_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-accent-400 transition-colors"
              >
                <Globe size={16} className="shrink-0" />
                <span className="truncate">ble.ir/order_registration_bot</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {isFa ? 'یاشار دیزاین' : 'Yashar Design'} — {t.footer.rights}
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            {t.footer.madeWith} <Heart size={14} className="text-error-500 fill-error-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
