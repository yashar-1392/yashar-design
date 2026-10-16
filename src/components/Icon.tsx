import {
  Globe, BarChart3, Mic, Languages, Wrench, PenTool, Music, Podcast,
  FileText, Palette, TrendingUp, Video, Bot, Plug, Sparkles, Clock, Target,
  Image, Search, Menu, BarChart, Sticker, MessageCircle, ScanLine, Utensils,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Globe, BarChart3, Mic, Languages, Wrench, PenTool, Music, Podcast,
  FileText, Palette, TrendingUp, Video, Bot, Plug, Sparkles, Clock, Target,
  Image, Search, Menu, BarChart, Sticker, MessageCircle, ScanLine, Utensils,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
