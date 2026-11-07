import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang, Theme } from '@/i18n';
import { t } from '@/i18n';

interface AppContextValue {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (typeof t.fa | typeof t.en);
  isFa: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedLang = localStorage.getItem('yd-lang') as Lang | null;
    const savedTheme = localStorage.getItem('yd-theme') as Theme | null;
    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    localStorage.setItem('yd-lang', lang);
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('yd-theme', theme);
  }, [theme]);

  const value: AppContextValue = {
    lang,
    theme,
    setLang,
    toggleLang: () => setLang((p) => (p === 'fa' ? 'en' : 'fa')),
    toggleTheme: () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')),
    t: t[lang],
    isFa: lang === 'fa',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
