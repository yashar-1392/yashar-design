import { useState } from 'react';
import {
  Search, Loader2, AlertCircle, Check, Clock, Package,
  Eye, ThumbsUp, Wrench, CheckCircle2, XCircle, ArrowLeft, ArrowRight,
  Home,
} from 'lucide-react';
import { useApp } from '@/context';
import {
  trackOrder, formatToman, formatDate, statusLabels,
  STATUS_ORDER, REJECTED_STATUS, type TrackResponse,
} from '@/lib/order';

interface Props {
  initialCode?: string;
  onHome: () => void;
  onNewOrder: () => void;
}

const statusIcons: Record<string, typeof Clock> = {
  new: Package,
  reviewing: Eye,
  approved: ThumbsUp,
  in_progress: Wrench,
  completed: CheckCircle2,
  rejected: XCircle,
};

const statusColors: Record<string, string> = {
  new: 'text-blue-500 bg-blue-500/10',
  reviewing: 'text-amber-500 bg-amber-500/10',
  approved: 'text-cyan-500 bg-cyan-500/10',
  in_progress: 'text-violet-500 bg-violet-500/10',
  completed: 'text-emerald-500 bg-emerald-500/10',
  rejected: 'text-red-500 bg-red-500/10',
};

export function TrackPage({ initialCode, onHome, onNewOrder }: Props) {
  const { t, isFa } = useApp();
  const o = t.order;

  const [code, setCode] = useState(initialCode || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<TrackResponse | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;
    setLoading(true);
    setError('');
    setData(null);
    setSearched(true);

    try {
      const res = await trackOrder(cleanCode);
      if (res.success && res.order) {
        setData(res);
      } else {
        setError(res.error || o.trackError);
      }
    } catch {
      setError(o.trackError);
    } finally {
      setLoading(false);
    }
  };

  const order = data?.order;
  const isRejected = order?.status === REJECTED_STATUS;
  const currentIndex = order ? STATUS_ORDER.indexOf(order.status as typeof STATUS_ORDER[number]) : -1;

  return (
    <div className="min-h-[70vh] px-5 py-24">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            {o.trackTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{o.trackSubtitle}</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={o.trackPlaceholder}
              dir="ltr"
              className="w-full rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 ltr:pl-11 rtl:pr-11 ltr:pr-4 rtl:pl-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? o.trackLoading : o.trackButton}
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-4 py-3 text-sm text-red-600 dark:text-red-400 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            <span className="text-sm text-slate-400">{o.trackLoading}</span>
          </div>
        )}

        {order && !loading && (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden animate-fade-up">
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-6">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative flex items-center justify-between">
                <div>
                  <span className="text-xs text-primary-50">{o.trackingCode}</span>
                  <div className="text-2xl font-extrabold text-white font-mono tracking-wider mt-0.5">
                    {order.code}
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColors[order.status] || 'text-slate-500 bg-slate-500/10'}`}>
                  {isFa ? statusLabels[order.status]?.fa : statusLabels[order.status]?.en}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Timeline */}
              <div className="space-y-1">
                {isRejected ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-red-700 dark:text-red-400">
                        {isFa ? statusLabels.rejected.fa : statusLabels.rejected.en}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(order.updatedAt, isFa ? 'fa' : 'en')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {STATUS_ORDER.map((statusKey, i) => {
                      const StatusIcon = statusIcons[statusKey] || Clock;
                      const isDone = i < currentIndex;
                      const isCurrent = i === currentIndex;
                      const label = isFa ? statusLabels[statusKey].fa : statusLabels[statusKey].en;
                      const isLast = i === STATUS_ORDER.length - 1;
                      return (
                        <div key={statusKey} className="flex gap-3 pb-6 last:pb-0 relative">
                          {!isLast && (
                            <div className={`absolute top-10 ltr:left-[18px] rtl:right-[18px] w-0.5 h-full ${
                              isDone ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                            }`} />
                          )}
                          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30 scale-110'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                          }`}>
                            {isDone ? <Check className="w-4.5 h-4.5" /> : <StatusIcon className="w-4.5 h-4.5" />}
                          </div>
                          <div className="pt-1.5">
                            <div className={`text-sm font-bold ${
                              isCurrent ? 'text-primary-600 dark:text-primary-400' : isDone ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {label}
                            </div>
                            {isCurrent && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {formatDate(order.updatedAt, isFa ? 'fa' : 'en')}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 p-4">
                <DetailRow label={o.orderService} value={order.service} />
                <DetailRow label={o.orderUrgency} value={order.urgency} />
                {order.pricing && (
                  <DetailRow
                    label={o.orderTotal}
                    value={`${formatToman(order.pricing.total, isFa ? 'fa' : 'en')}${isFa ? ' ' + t.services.currency : ''}`}
                  />
                )}
                <div className="border-t border-slate-200 dark:border-white/10 my-1" />
                <DetailRow label={o.orderCreated} value={formatDate(order.createdAt, isFa ? 'fa' : 'en')} />
                <DetailRow label={o.orderUpdated} value={formatDate(order.updatedAt, isFa ? 'fa' : 'en')} />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onNewOrder}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 transition-all duration-300"
                >
                  {o.newOrderShort}
                </button>
                <button
                  onClick={onHome}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
                >
                  {isFa ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  {o.backHome}
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !order && !searched && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center">
              <Package className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-sm text-slate-400">{o.trackSubtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs gap-2">
      <span className="text-slate-500 dark:text-slate-400 shrink-0">{label}</span>
      <span className="font-semibold text-slate-700 dark:text-slate-200 text-end">{value}</span>
    </div>
  );
}
