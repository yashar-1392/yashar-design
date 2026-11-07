import type { Lang, Service } from '@/i18n';
import { services } from '@/i18n';

export const WORKER_BASE_URL = 'https://yashar-design-orders.yashar-online-store.workers.dev';

export type UrgencyId = 'flexible' | 'fast' | 'urgent';

export interface UrgencyOption {
  id: UrgencyId;
  min: number;
  max: number;
}

export const urgencyOptions: UrgencyOption[] = [
  { id: 'flexible', min: 0, max: 0 },
  { id: 'fast', min: 300000, max: 500000 },
  { id: 'urgent', min: 600000, max: 1500000 },
];

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const FA_THOUSANDS = '٬';

export function toFaDigits(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}

export function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

export function formatToman(n: number, lang: Lang): string {
  const str = n.toLocaleString('en-US');
  if (lang === 'fa') return toFaDigits(str).replace(/,/g, FA_THOUSANDS);
  return str;
}

export function parsePriceRange(priceStr: string): { min: number; max: number } | null {
  const en = toEnDigits(priceStr);
  const nums = en.match(/\d[\d.,]*/g);
  if (!nums || nums.length === 0) return null;
  const parse = (s: string) => parseInt(s.replace(/[.,]/g, ''), 10);
  const values = nums.map(parse).filter((n) => !isNaN(n));
  if (values.length === 0) return null;
  return { min: values[0], max: values[values.length - 1] };
}

export function priceMidpoint(priceStr: string): number {
  const range = parsePriceRange(priceStr);
  if (!range) return 0;
  return Math.round((range.min + range.max) / 2);
}

export function getServicesForOrder(): Service[] {
  return services.filter((s) => !s.soon);
}

export interface OrderPayload {
  name: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  student: boolean;
  basePrice: number;
  urgency: UrgencyId;
  urgencyFee: number;
  description: string;
}

export interface OrderResponse {
  success: boolean;
  code?: string;
  status?: string;
  total?: number;
  notificationSent?: boolean;
  message?: string;
  error?: string;
}

export async function submitOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${WORKER_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({ success: false, error: 'خطای ارتباط با سرور' }));
  if (!res.ok) {
    return { success: false, error: data.error || 'ثبت سفارش ناموفق بود' };
  }
  return data as OrderResponse;
}

export interface TrackResponse {
  success: boolean;
  error?: string;
  order?: {
    code: string;
    status: string;
    statusLabel: string;
    service: string;
    urgency: string;
    pricing: { base: number; urgency: number; total: number; currency: string; source: string };
    createdAt: string;
    updatedAt: string;
  };
}

export async function trackOrder(code: string): Promise<TrackResponse> {
  const res = await fetch(`${WORKER_BASE_URL}/api/orders/track?code=${encodeURIComponent(code)}`);
  const data = await res.json().catch(() => ({ success: false, error: 'خطای ارتباط با سرور' }));
  if (!res.ok) {
    return { success: false, error: data.error || 'سفارشی پیدا نشد' };
  }
  return data as TrackResponse;
}

export const STATUS_ORDER = ['new', 'reviewing', 'approved', 'in_progress', 'completed'] as const;
export const REJECTED_STATUS = 'rejected';

export const statusLabels: Record<string, { fa: string; en: string }> = {
  new: { fa: 'سفارش جدید', en: 'New Order' },
  reviewing: { fa: 'در حال بررسی', en: 'Under Review' },
  approved: { fa: 'تأیید شده', en: 'Approved' },
  in_progress: { fa: 'در حال انجام', en: 'In Progress' },
  completed: { fa: 'تکمیل شده', en: 'Completed' },
  rejected: { fa: 'رد شده', en: 'Rejected' },
};

export function formatDate(iso: string, lang: Lang): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
