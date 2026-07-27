import React from 'react';
import { appStore } from '../../store/appStore';
import {
  Printer,
  Bot,
  AlertTriangle,
  Calendar,
  Building,
  Activity,
  CheckCircle2,
} from 'lucide-react';

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
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shrink-0 print:hidden">
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Status Actions & Alerts */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Active Station Selector for Central / Current Station Badge */}
        {isCentral ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium">
            <Building className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">الإدارة المركزية بالجيزة (جميع المحطات)</span>
            <span className="sm:hidden">المركزي</span>
          </div>
        ) : activeStation ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{activeStation.static.general.name}</span>
          </div>
        ) : null}

        {/* System Alerts Pill */}
        {openBreakdowns.length > 0 || lowPfCount > 0 || lowEffCount > 0 ? (
          <button
            onClick={() => appStore.navigate(isCentral ? 'central/breakdowns' : 'station/breakdowns')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>
              {openBreakdowns.length > 0
                ? `${openBreakdowns.length} أعطال جارية`
                : lowPfCount > 0
                ? `تنبيه: ${lowPfCount} أيام بـ PF منخفض`
                : `تنبيه كفاءة`}
            </span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>النظام يعمل بانتظام</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="hidden md:flex items-center gap-1.5 text-slate-500 text-xs bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{new Date().toISOString().slice(0, 10)}</span>
        </div>

        {/* AI Consultant Button */}
        <button
          onClick={openAiModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">التحليل الذكي (AI)</span>
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          title="طباعة الشاشة"
          className="p-1.5 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors"
        >
          <Printer size={16} />
        </button>
      </div>
    </header>
  );
};
