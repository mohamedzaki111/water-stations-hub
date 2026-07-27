import React, { useMemo } from 'react';
import { appStore } from '../../store/appStore';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  Droplets,
  Zap,
  FlaskConical,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Wrench,
} from 'lucide-react';

const COLOR_PRIMARY = '#0ea5e9';
const COLOR_SUCCESS = '#22c55e';
const COLOR_WARNING = '#f59e0b';
const COLOR_DANGER = '#ef4444';

const fmtNum = (val: number, decimals = 0) =>
  val.toLocaleString('ar-EG', { maximumFractionDigits: decimals });

export const CentralDashboard: React.FC = () => {
  const allStats = useMemo(() => appStore.allStats(), [appStore.records.length]);

  const totalProd = allStats.reduce((sum, item) => sum + item.stats.total_prod, 0);
  const totalKwh = allStats.reduce((sum, item) => sum + item.stats.total_kwh, 0);
  const totalAlum = allStats.reduce((sum, item) => sum + item.stats.total_alum, 0);
  const totalChlorine = allStats.reduce((sum, item) => sum + item.stats.total_chlorine, 0);
  const avgEfficiency =
    allStats.reduce((sum, item) => sum + item.stats.avg_eff, 0) / Math.max(1, allStats.length);

  const gizaTrend = useMemo(() => appStore.trend('giza', 60), [appStore.records.length]);

  const openBreakdowns = appStore.getBreakdowns().filter((b) => b.status === 'جارٍ');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            لوحة التحكم الموحدة — الإدارة المركزية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            متابعة حية للإنتاج والكفاءة واستهلاكات الكيماويات والطاقة عبر كافة المحطات
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => appStore.navigate('central/scada')}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-medium text-xs rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Activity className="w-4 h-4 text-white" />
            <span>شاشة السكادا الحية</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>إجمالي المياه المنتجة</span>
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {fmtNum(totalProd)} <span className="text-xs font-normal text-slate-400 font-sans">م³</span>
          </div>
          <p className="text-xs text-blue-600 font-medium">مجموع إنتاج المحطات المعتمدة</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>متوسط كفاءة التشغيل</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {(avgEfficiency * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-emerald-600 font-medium">المعيار الموصى به: ≥ 90%</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>إجمالي استهلاك الكهرباء</span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {fmtNum(totalKwh)} <span className="text-xs font-normal text-slate-400 font-sans">ك.و</span>
          </div>
          <p className="text-xs text-amber-600 font-medium">الطاقة الفعالة المسجلة</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>إجمالي الشبة والكلور</span>
            <FlaskConical className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {fmtNum(totalAlum, 1)} <span className="text-xs font-normal text-slate-400 font-sans">طن شبة</span>
          </div>
          <p className="text-xs text-teal-600 font-medium">
            الكلور: {fmtNum(totalChlorine, 2)} طن
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>منحنى كفاءة محطة الجيزة الرئيسي (آخر 60 يوم)</span>
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md font-bold">
              محدث تلقائياً
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gizaTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="effGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLOR_SUCCESS} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLOR_SUCCESS} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} domain={[80, 100]} unit="%" />
                <Tooltip formatter={(v) => [`${v}%`, 'الكفاءة']} />
                <ReferenceLine y={90} stroke={COLOR_WARNING} strokeDasharray="4 3" label={{ value: 'الهدف 90%', fill: COLOR_WARNING, fontSize: 10 }} />
                <Area type="monotone" dataKey="eff" stroke={COLOR_SUCCESS} strokeWidth={2.5} fill="url(#effGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Station Production Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>مقارنة إجمالي الإنتاج الكلي للمحطات (م³)</span>
            </h3>
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md font-bold">
              تراكمي
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={allStats.map((item) => ({
                  name: item.station.static.general.name.replace('محطة مياه ', ''),
                  prod: item.stats.total_prod,
                }))}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => (v / 1000000).toFixed(1) + 'M'} />
                <Tooltip formatter={(v: any) => [fmtNum(Number(v)), 'م³']} />
                <Bar dataKey="prod" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stations Status Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span>حالة المحطات ومطابقة المعايير القياسية</span>
          </h3>
          <button
            onClick={() => appStore.navigate('central/stations')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>إدارة جميع المحطات</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">المحطة</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4">إجمالي الإنتاج</th>
                <th className="py-3 px-4">الكفاءة الفعلية</th>
                <th className="py-3 px-4">كهرباء / م³</th>
                <th className="py-3 px-4">معامل القدرة (PF)</th>
                <th className="py-3 px-4">آخر سجل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allStats.map(({ station, stats }) => {
                const targetEff = station.static.targets.efficiency_target;
                const isEffOk = stats.avg_eff >= targetEff;
                const isKwhOk =
                  stats.avg_kwh_m3 >= station.static.targets.kwh_per_m3_min &&
                  stats.avg_kwh_m3 <= station.static.targets.kwh_per_m3_max;
                const lastRec = appStore.getRecords({ station_id: station.id })[0];

                return (
                  <tr key={station.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{station.static.general.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {station.static.general.governorate} — {station.static.general.water_source}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          station.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {station.status === 'active' ? '● نشطة' : '○ موقوفة'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {fmtNum(stats.total_prod)} م³
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-sm ${
                            isEffOk ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {stats.avg_eff > 0 ? `${(stats.avg_eff * 100).toFixed(1)}%` : '—'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (الهدف: {(targetEff * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={isKwhOk ? 'text-emerald-600' : 'text-rose-600'}>
                        {stats.avg_kwh_m3 > 0 ? stats.avg_kwh_m3.toFixed(4) : '—'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {stats.avg_power_factor > 0 ? stats.avg_power_factor.toFixed(2) : '—'}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {lastRec?.date || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
