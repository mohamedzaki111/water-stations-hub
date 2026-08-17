import React from 'react';
import { appStore } from '../../store/appStore';
import {
  Printer,
  Bot,
  AlertTriangle,
  Calendar,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { toArabicDigits } from '../../utils/formatters';

export const Header: React.FC<{
  title: string;
  subtitle?: string;
  openAiModal: () => void;
}> = ({ title, subtitle, openAiModal }) => {
  const session = appStore.session;
  const activeStation = session?.station;
  const isCentral = session?.isCentral;

  const openBreakdowns = appStore.getBreakdowns().filter((b) => b.status === 'جارٍ');
  const recentRecords = appStore.getRecords().slice(0, 10);
  const lowPfCount = recentRecords.filter((r) => r.power_factor != null && r.power_factor < 0.85).length;
  const lowEffCount = recentRecords.filter((r) => r.efficiency < 0.88).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0 gap-3 print:hidden shadow-2xs">
      {/* Left: Title & Subtitle */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-slate-50 p-1 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs hidden sm:flex">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium truncate hidden md:block mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Status Actions & Alerts */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Active Station / Central Badge */}
        {isCentral ? (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold">
            <Building className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate max-w-[180px]">الإدارة المركزية (جميع المحطات)</span>
          </div>
        ) : activeStation ? (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate max-w-[140px]">{activeStation.static.general.name}</span>
          </div>
        ) : null}

        {/* System Alerts */}
        {openBreakdowns.length > 0 || lowPfCount > 0 || lowEffCount > 0 ? (
          <button
            type="button"
            onClick={() => appStore.navigate(isCentral ? 'central/breakdowns' : 'station/breakdowns')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
            title="انقر لعرض الأعطال"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              {openBreakdowns.length > 0
                ? `${toArabicDigits(openBreakdowns.length)} أعطال جارية`
                : lowPfCount > 0
                ? `تنبيه: ${toArabicDigits(lowPfCount)} أيام بـ PF منخفض`
                : `تنبيه كفاءة`}
            </span>
          </button>
        ) : (
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>النظام منتظم</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="hidden 2xl:flex items-center gap-1.5 text-slate-600 text-xs bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 font-bold shrink-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{toArabicDigits(new Date().toISOString().slice(0, 10))}</span>
        </div>

        {/* AI Consultant Button */}
        <button
          type="button"
          onClick={openAiModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
          title="استشارة الذكاء الاصطناعي"
        >
          <Bot className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">التحليل الذكي (AI)</span>
        </button>

        {/* Print Button */}
        <button
          type="button"
          onClick={handlePrint}
          title="طباعة الشاشة"
          className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors shrink-0"
        >
          <Printer size={15} />
        </button>
      </div>
    </header>
  );
};
