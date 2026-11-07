import { useEffect, useState } from 'react';
import { useApp } from '@/context';
import { services } from '@/i18n';
import { Icon } from '@/components/Icon';

export function ServiceTicker() {
  const { isFa } = useApp();
  const activeServices = services.filter((s) => !s.soon);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeServices.length);
    }, 2000);
    return () => clearInterval(id);
  }, [activeServices.length]);

  const current = activeServices[index];

  return (
    <div className="flex items-center gap-2.5 h-9 overflow-hidden">
      <div
        key={index}
        className="flex items-center gap-2.5 animate-slide-in"
      >
        <div className="w-7 h-7 rounded-lg bg-primary-500/10 dark:bg-primary-500/15 flex items-center justify-center shrink-0">
          <Icon name={current.icon} className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
          {isFa ? current.title.fa : current.title.en}
        </span>
      </div>
    </div>
  );
}
