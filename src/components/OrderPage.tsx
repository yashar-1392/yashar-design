import { useState, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Copy, CheckCircle2, GraduationCap,
  Clock, Zap, Gauge, Loader2, AlertCircle, Search, X, Tag,
} from 'lucide-react';
import { useApp } from '@/context';
import { type Service } from '@/i18n';
import { Icon } from '@/components/Icon';
import {
  getServicesForOrder, parsePriceRange, formatToman, toEnDigits,
  urgencyOptions, submitOrder, type UrgencyId, type OrderResponse,
} from '@/lib/order';

interface Props {
  onTrack: (code?: string) => void;
  onNewOrder: () => void;
}

type Step = 1 | 2 | 3 | 4 | 'success';

const urgencyIcons: Record<UrgencyId, typeof Clock> = {
  flexible: Gauge,
  fast: Zap,
  urgent: Clock,
};

export function OrderPage({ onTrack, onNewOrder }: Props) {
  const { t, isFa } = useApp();
  const o = t.order;

  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<Service | null>(null);
  const [isStudent, setIsStudent] = useState<boolean | null>(null);
  const [urgencyId, setUrgencyId] = useState<UrgencyId | null>(null);
  const [urgencyFee, setUrgencyFee] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<OrderResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const allServices = useMemo(() => getServicesForOrder(), []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allServices;
    return allServices.filter((s) =>
      [s.title.fa, s.title.en, s.desc.fa, s.desc.en].some((f) => f.toLowerCase().includes(q))
    );
  }, [allServices, searchQuery]);

  const basePriceRange = useMemo(() => {
    if (!service) return null;
    const priceStr = isStudent ? service.studentPrice.fa : service.price.fa;
    return parsePriceRange(priceStr);
  }, [service, isStudent]);

  const basePrice = useMemo(() => {
    if (!basePriceRange) return 0;
    return Math.round((basePriceRange.min + basePriceRange.max) / 2);
  }, [basePriceRange]);

  const total = basePrice + urgencyFee;

  const currentUrgency = urgencyOptions.find((u) => u.id === urgencyId);

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return isStudent !== null;
    if (step === 3) {
      if (!urgencyId) return false;
      if (urgencyId === 'flexible') return true;
      const u = urgencyOptions.find((x) => x.id === urgencyId)!;
      return urgencyFee >= u.min && urgencyFee <= u.max;
    }
    if (step === 4) return true;
    return false;
  };

  const validateStep4 = () => {
    if (name.trim().length < 2) { setError(o.errorName); return false; }
    const cleanPhone = toEnDigits(phone).replace(/\s/g, '');
    if (!/^09\d{9}$/.test(cleanPhone)) { setError(o.errorPhone); return false; }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 3 && urgencyId === 'flexible') setUrgencyFee(0);
    if (step === 4) {
      if (!validateStep4()) return;
      handleSubmit();
      return;
    }
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s) as Step);
  };

  const handlePrev = () => {
    setError('');
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s) as Step);
  };

  const handleSubmit = async () => {
    if (!service || isStudent === null || !urgencyId) return;
    setSubmitting(true);
    setError('');

    const cleanPhone = toEnDigits(phone).replace(/\s/g, '');
    const serviceName = isFa ? service.title.fa : service.title.en;

    try {
      const res = await submitOrder({
        name: name.trim(),
        phone: cleanPhone,
        serviceId: service.id,
        serviceName,
        student: isStudent,
        basePrice,
        urgency: urgencyId,
        urgencyFee,
        description: description.trim(),
      });
      if (res.success) {
        setResult(res);
        setStep('success');
      } else {
        setError(res.error || o.errorGeneric);
      }
    } catch {
      setError(o.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (step === 'success' && result) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-fade-up">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-primary-600 p-8 text-center">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-white" />
            </div>
            <h2 className="relative text-2xl font-extrabold text-white">{o.successTitle}</h2>
            <p className="relative text-sm text-emerald-50 mt-2">{o.successDesc}</p>
          </div>

          <div className="p-6 space-y-5">
            <div className="rounded-2xl border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-950/20 p-5 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{o.trackingCode}</div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-extrabold text-primary-700 dark:text-primary-300 tracking-wider font-mono">
                  {result.code}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-600 text-white hover:bg-primary-500 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? o.copied : o.copy}
                </button>
              </div>
            </div>

            {result.total != null && (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/40 px-4 py-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">{o.totalAmount}</span>
                <span className="text-lg font-bold text-slate-800 dark:text-white">
                  {formatToman(result.total, isFa ? 'fa' : 'en')}
                  {isFa && <span className="text-xs font-normal text-slate-400 ms-1">{t.services.currency}</span>}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onTrack(result.code)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <Clock className="w-5 h-5" />
                {o.goToTrack}
              </button>
              <button
                onClick={onNewOrder}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-primary-700 dark:text-primary-300 border-2 border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all duration-300"
              >
                {o.newOrder}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: o.step1Title, desc: o.step1Desc },
    { num: 2, title: o.step2Title, desc: o.step2Desc },
    { num: 3, title: o.step3Title, desc: o.step3Desc },
    { num: 4, title: o.step4Title, desc: o.step4Desc },
  ];
  const currentStepNum = typeof step === 'number' ? step : 4;

  return (
    <div className="min-h-[70vh] px-5 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            {o.methodTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{o.methodSubtitle}</p>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between gap-1">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      s.num < currentStepNum
                        ? 'bg-emerald-500 text-white'
                        : s.num === currentStepNum
                        ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30 scale-110'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {s.num < currentStepNum ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                    s.num < currentStepNum ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              {o.step} {currentStepNum} {o.of} 4
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 ms-2">
              — {steps[currentStepNum - 1].title}
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{o.step1Title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{o.step1Desc}</p>
              </div>

              <div className="relative">
                <Search className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.services.searchPlaceholder}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
                {filteredServices.length === 0 ? (
                  <p className="text-center text-sm text-slate-400 py-8">{t.services.noResults}</p>
                ) : (
                  filteredServices.map((s) => {
                    const selected = service?.id === s.id;
                    const hasStudent = s.studentPrice.fa !== '';
                    return (
                      <button
                        key={s.id}
                        onClick={() => setService(s)}
                        className={`group w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-start ${
                          selected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                            : 'border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700 bg-slate-50 dark:bg-slate-800/30'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          selected
                            ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                            : 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                        }`}>
                          <Icon name={s.icon} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-slate-900 dark:text-white">
                            {isFa ? s.title.fa : s.title.en}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {isFa ? s.desc.fa : s.desc.en}
                          </div>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                              {isFa ? s.price.fa : s.price.en}
                              {isFa && <span className="text-[10px] text-slate-400 ms-1">{t.services.currency}</span>}
                            </span>
                            {hasStudent && (
                              <span className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400">
                                <GraduationCap className="w-3 h-3" />
                                {isFa ? s.studentPrice.fa : s.studentPrice.en}
                              </span>
                            )}
                          </div>
                        </div>
                        {selected && (
                          <div className="shrink-0 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{o.step2Title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{o.step2Desc}</p>
              </div>

              {service && (
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <Icon name={service.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    {isFa ? service.title.fa : service.title.en}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setIsStudent(true)}
                  disabled={!service?.studentPrice.fa}
                  className={`group p-5 rounded-2xl border-2 transition-all duration-200 text-center disabled:opacity-40 disabled:cursor-not-allowed ${
                    isStudent === true
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                      : 'border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    isStudent === true ? 'bg-primary-500 text-white' : 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  }`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{o.studentYes}</div>
                  {service?.studentPrice.fa && (
                    <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-semibold">
                      {isFa ? service.studentPrice.fa : service.studentPrice.en}
                      {isFa && <span className="text-[10px] ms-1">{t.services.currency}</span>}
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setIsStudent(false)}
                  className={`group p-5 rounded-2xl border-2 transition-all duration-200 text-center ${
                    isStudent === false
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                      : 'border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    isStudent === false ? 'bg-primary-500 text-white' : 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  }`}>
                    <Tag className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{o.studentNo}</div>
                  {service && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold">
                      {isFa ? service.price.fa : service.price.en}
                      {isFa && <span className="text-[10px] ms-1">{t.services.currency}</span>}
                    </div>
                  )}
                </button>
              </div>

              {isStudent && (
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-lg p-3">
                  {o.studentNote}
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{o.step3Title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{o.step3Desc}</p>
              </div>

              {basePriceRange && (
                <div className="rounded-xl bg-primary-50/50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800/50 p-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{o.summaryBasePrice}</div>
                  <div className="text-lg font-bold text-primary-700 dark:text-primary-300">
                    {isFa
                      ? `${formatToman(basePriceRange.min, 'fa')} — ${formatToman(basePriceRange.max, 'fa')}`
                      : `${formatToman(basePriceRange.min, 'en')} — ${formatToman(basePriceRange.max, 'en')}`}
                    {isFa && <span className="text-xs font-normal ms-1">{t.services.currency}</span>}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {urgencyOptions.map((u) => {
                  const selected = urgencyId === u.id;
                  const UrgencyIcon = urgencyIcons[u.id];
                  const labels: Record<UrgencyId, { title: string; desc: string }> = {
                    flexible: { title: o.urgencyFlexible, desc: o.urgencyFlexibleDesc },
                    fast: { title: o.urgencyFast, desc: o.urgencyFastDesc },
                    urgent: { title: o.urgencyUrgent, desc: o.urgencyUrgentDesc },
                  };
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        setUrgencyId(u.id);
                        if (u.id === 'flexible') setUrgencyFee(0);
                        else setUrgencyFee(u.min);
                      }}
                      className={`group w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-start ${
                        selected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                          : 'border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        selected ? 'bg-primary-500 text-white' : 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      }`}>
                        <UrgencyIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{labels[u.id].title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{labels[u.id].desc}</div>
                      </div>
                      {selected && (
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {urgencyId && urgencyId !== 'flexible' && currentUrgency && (
                <div className="rounded-2xl border border-primary-200 dark:border-primary-800/50 bg-primary-50/30 dark:bg-primary-950/10 p-4 space-y-3">
                  <label className="text-sm font-bold text-slate-800 dark:text-white block">
                    {o.urgencyFeeLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={isFa ? formatToman(urgencyFee, 'fa') : String(urgencyFee)}
                      onChange={(e) => {
                        const val = parseInt(toEnDigits(e.target.value).replace(/[^\d]/g, ''), 10);
                        setUrgencyFee(isNaN(val) ? 0 : val);
                      }}
                      placeholder={o.urgencyFeeHint}
                      className="flex-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors"
                    />
                    <span className="text-xs text-slate-400 shrink-0">{t.services.currency}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {formatToman(currentUrgency.min, isFa ? 'fa' : 'en')} — {formatToman(currentUrgency.max, isFa ? 'fa' : 'en')}
                    </span>
                    <span className={`font-semibold ${
                      urgencyFee >= currentUrgency.min && urgencyFee <= currentUrgency.max
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500'
                    }`}>
                      {urgencyFee >= currentUrgency.min && urgencyFee <= currentUrgency.max ? (
                        <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {o.yes}</span>
                      ) : o.errorUrgencyFee}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentUrgency.min}
                    max={currentUrgency.max}
                    step={10000}
                    value={urgencyFee}
                    onChange={(e) => setUrgencyFee(parseInt(e.target.value, 10))}
                    className="w-full accent-primary-500"
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{o.step4Title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{o.step4Desc}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 p-4 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{o.summaryTitle}</div>
                {service && (
                  <SummaryRow label={o.summaryService} value={isFa ? service.title.fa : service.title.en} />
                )}
                <SummaryRow label={o.summaryStudent} value={isStudent ? o.yes : o.no} />
                {basePriceRange && (
                  <SummaryRow
                    label={o.summaryBasePrice}
                    value={`${formatToman(basePrice, isFa ? 'fa' : 'en')}${isFa ? ' ' + t.services.currency : ''}`}
                  />
                )}
                {urgencyId && (
                  <SummaryRow
                    label={o.summaryUrgency}
                    value={
                      urgencyId === 'flexible' ? o.urgencyFlexible :
                      urgencyId === 'fast' ? o.urgencyFast : o.urgencyUrgent
                    }
                  />
                )}
                {urgencyId !== 'flexible' && (
                  <SummaryRow
                    label={o.summaryUrgencyFee}
                    value={`${formatToman(urgencyFee, isFa ? 'fa' : 'en')}${isFa ? ' ' + t.services.currency : ''}`}
                  />
                )}
                <div className="border-t border-slate-200 dark:border-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{o.summaryTotal}</span>
                  <span className="text-lg font-extrabold text-primary-700 dark:text-primary-300">
                    {formatToman(total, isFa ? 'fa' : 'en')}
                    {isFa && <span className="text-xs font-normal ms-1">{t.services.currency}</span>}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-1.5">
                    {o.fieldName}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={o.fieldNamePlaceholder}
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-1.5">
                    {o.fieldPhone}
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={o.fieldPhonePlaceholder}
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-1.5">
                    {o.fieldDescription}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={o.fieldDescriptionPlaceholder}
                    rows={4}
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>
          )}

          {typeof step === 'number' && (
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-white/10">
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  {isFa ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  {o.prev}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canNext() || (step === 4 && submitting)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {step === 4 ? (
                  submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {o.submitting}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {o.submit}
                    </>
                  )
                ) : (
                  <>
                    {o.next}
                    {isFa ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </div>
          )}

          {error && step !== 4 && typeof step === 'number' && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-4 py-3 text-sm text-red-600 dark:text-red-400 mt-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-semibold text-slate-700 dark:text-slate-200">{value}</span>
    </div>
  );
}
