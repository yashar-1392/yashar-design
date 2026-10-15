import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Languages, ShoppingBag, Send } from 'lucide-react';
import { useApp } from '@/context';
import { BALE_ORDER_BOT, BALE_CHANNEL } from '@/i18n';

export function Navbar() {
  const { t, isFa, toggleLang, theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#process', label: t.nav.process },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-extrabold text-lg font-fa">ی</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-base text-slate-900 dark:text-white">
              {isFa ? 'یاشار دیزاین' : 'Yashar Design'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {isFa ? 'استودیو خلاق دیجیتال' : 'Digital Creative Studio'}
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-white/5 transition-all duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle language"
          >
            <Languages size={18} />
            <span className="hidden sm:inline">{isFa ? 'EN' : 'فا'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href={BALE_ORDER_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-200"
          >
            <ShoppingBag size={16} />
            {t.nav.order}
          </a>

          <a
            href={BALE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-200"
          >
            <Send size={16} />
            {t.nav.channel}
          </a>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 mt-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden animate-fade-in">
          <ul className="flex flex-col p-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 p-2 pt-3">
              <a
                href={BALE_ORDER_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700"
              >
                <ShoppingBag size={16} />
                {t.nav.order}
              </a>
              <a
                href={BALE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
              >
                <Send size={16} />
                {t.nav.channel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
