import { CheckCircle2, Clock, Target } from 'lucide-react';
import { useApp } from '@/context';

export function About() {
  const { t } = useApp();

  const features = [
    {
      icon: <CheckCircle2 className="w-7 h-7 text-success-500" />,
      stat: '+60',
      title: t.about.s1Title,
      desc: t.about.s1Desc,
    },
    {
      icon: <CheckCircle2 className="w-7 h-7 text-primary-500" />,
      stat: '۱۰۰٪',
      title: t.about.s2Title,
      desc: t.about.s2Desc,
    },
    {
      icon: <Clock className="w-7 h-7 text-accent-500" />,
      stat: '',
      title: t.about.s3Title,
      desc: t.about.s3Desc,
    },
    {
      icon: <Target className="w-7 h-7 text-primary-500" />,
      stat: '',
      title: t.about.s4Title,
      desc: t.about.s4Desc,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              {t.about.title}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gradient mb-4">
              {t.about.slogan}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-6" />
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  i % 2 === 1 ? 'sm:translate-y-6' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center mb-4 shadow-sm">
                  {f.icon}
                </div>
                {f.stat && (
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                    {f.stat}
                  </div>
                )}
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
