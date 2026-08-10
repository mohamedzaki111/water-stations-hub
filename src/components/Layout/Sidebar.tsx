import React, { useRef } from 'react';
import { appStore } from '../../store/appStore';
import {
  LayoutDashboard,
  GitCompare,
  PenTool,
  Table,
  Calendar,
  Wrench,
  Building2,
  Users,
  FlaskConical,
  Activity,
  Bot,
  LogOut,
  Download,
  Upload,
  RefreshCw,
  Droplets,
  ShieldAlert,
  Settings,
} from 'lucide-react';

interface NavItem {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  s?: string;
  role?: string;
  badge?: number;
}

export const Sidebar: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
  openAiModal: () => void;
}> = ({ currentPage, onNavigate, openAiModal }) => {
  const session = appStore.session;
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!session) return null;

  const { user, station, isSystemAdmin, isCentral, isAcct } = session;
  const openBreakdowns = appStore.getBreakdowns().filter((b) => b.status === 'جارٍ').length;

  const centralNav: NavItem[] = [
    { s: 'الرئيسية' },
    { id: 'central/dashboard', label: 'لوحة التحكم المركزية', icon: <LayoutDashboard size={18} /> },
    { id: 'central/scada', label: 'السكادا والتشغيل الحي', icon: <Activity size={18} /> },
    { id: 'central/compare', label: 'مقارنة المحطات', icon: <GitCompare size={18} /> },
    { s: 'البيانات والتقارير' },
    { id: 'central/entry', label: 'إدخال بيانات يومية', icon: <PenTool size={18} /> },
    { id: 'central/records', label: 'سجل البيانات اليومية', icon: <Table size={18} /> },
    { id: 'central/monthly', label: 'التقرير الشهري', icon: <Calendar size={18} /> },
    { id: 'acct/chemicals', label: 'تقرير الكيماويات والصيانة', icon: <FlaskConical size={18} /> },
    { s: 'الأعطال والذكاء الاصطناعي' },
    { id: 'central/breakdowns', label: 'سجل الأعطال والصيانة', icon: <Wrench size={18} />, badge: openBreakdowns },
    { id: 'central/jartest', label: 'مستشار Jar Test الذكي', icon: <FlaskConical size={18} /> },
    { s: 'الإدارة والتهيئة' },
    { id: 'central/stations', label: 'إدارة المحطات وحالات التشغيل', icon: <Building2 size={18} /> },
    { id: 'central/static', label: 'البيانات الثابتة والملف الفني', icon: <Wrench size={18} /> },
  ];

  const systemNav: NavItem[] = [
    { s: 'إدارة النظام' },
    { id: 'system/settings', label: 'الإعدادات العامة والنسخ', icon: <Settings size={18} /> },
    { id: 'system/users', label: 'المستخدمون والصلاحيات', icon: <Users size={18} /> },
  ];

  const stationNav: NavItem[] = [
    { s: 'محطتي' },
    { id: 'station/dashboard', label: 'لوحة تحكم المحطة', icon: <LayoutDashboard size={18} /> },
    { id: 'station/scada', label: 'السكادا والتتبع الحي', icon: <Activity size={18} /> },
    { s: 'البيانات والعمليات' },
    { id: 'station/entry', label: 'إدخال يومي', icon: <PenTool size={18} /> },
    { id: 'station/records', label: 'سجلات المحطة', icon: <Table size={18} /> },
    { id: 'station/monthly', label: 'التقرير الشهري', icon: <Calendar size={18} /> },
    { s: 'المعمل والأعطال' },
    { id: 'station/jartest', label: 'مستشار الجار تست (Jar Test)', icon: <FlaskConical size={18} /> },
    { id: 'station/breakdowns', label: 'سجل الأعطال', icon: <Wrench size={18} />, badge: openBreakdowns },
    { s: 'إعدادات المحطة' },
    { id: 'station/static', label: 'البيانات الثابتة والملف الفني', icon: <Building2 size={18} /> },
  ];

  const acctNav: NavItem[] = [
    { s: 'الحسابات والتكاليف' },
    { id: 'acct/overview', label: 'نظرة عامة على التكاليف', icon: <LayoutDashboard size={18} /> },
    { id: 'acct/chemicals', label: 'تقرير الكيماويات والصيانة', icon: <FlaskConical size={18} /> },
  ];

  const navItems = isSystemAdmin ? systemNav : isCentral ? centralNav : isAcct ? acctNav : stationNav;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const res = appStore.importBackupJson(text);
          if (res.ok) {
            alert(`تم استعادة النسخة الاحتياطية بنجاح (${res.count} سجل)`);
          } else {
            alert(`خطأ في استعادة البيانات: ${res.error}`);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <aside className="w-64 min-w-[256px] bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0 border-l border-slate-800 z-30 select-none shrink-0">
      {/* Header Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow-md shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base font-bold text-white tracking-tight truncate">
            مركز بيانات المحطات
          </h1>
          <p className="text-xs text-blue-400 font-medium truncate mt-0.5">
            {isCentral
              ? 'الإدارة المركزية بالجيزة'
              : isAcct
              ? 'قطاع التكاليف والماليات'
              : station?.static.general.name || 'محطة مياه'}
          </p>
        </div>
      </div>

      {/* AI Assistant Quick Launcher */}
      <div className="px-4 pt-4 pb-1">
        <button
          onClick={openAiModal}
          className="w-full py-2.5 px-3 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-300 font-bold text-xs flex items-center justify-between shadow-xs hover:bg-blue-600/20 hover:text-white transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span>المستشار الهندسي الذكي</span>
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
            AI 3.6
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
        {navItems.map((item, idx) => {
          if (item.s) {
            return (
              <div
                key={`s_${idx}`}
                className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pt-5 pb-1.5"
              >
                {item.s}
              </div>
            );
          }

          if (item.role && user.role !== item.role) return null;

          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center shadow-xs">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {user.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {user.name}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {user.role === 'system_admin'
                ? 'مدير نظام'
                : user.role === 'central_admin'
                ? 'مدير مركزي'
                : user.role === 'station_admin'
                ? 'مسؤول محطة'
                : user.role === 'cost_accountant'
                ? 'محاسب تكاليف'
                : 'مشاهد'}
            </div>
          </div>
        </div>

        <button
          onClick={() => appStore.logout()}
          title="تسجيل الخروج"
          className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};
