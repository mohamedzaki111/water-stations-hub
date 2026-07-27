import React, { useMemo } from 'react';
import { appStore } from '../../store/appStore';
import {
  Droplets,
  Zap,
  FlaskConical,
  Activity,
  Plus,
  PenTool,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileText,
  Wrench,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const StationDashboard: React.FC = () => {
  const session = appStore.session;
  const station = session?.station || appStore.stations[0];
  const stationId = station.id;

  const stats = useMemo(() => appStore.stats(stationId), [appStore.records.length, stationId]);
  const trendData = useMemo(() => appStore.trend(stationId, 30), [appStore.records.length, stationId]);
  const recentRecords = useMemo(
    () => appStore.getRecords({ station_id: stationId }).slice(0, 10),
    [appStore.records.length, stationId]
  );
  const breakdowns = useMemo(
    () => appStore.getBreakdowns(stationId),
    [appStore.breakdowns.length, stationId]
  );

  const targetEff = station.static.targets.efficiency_target;
  const isEffOk = stats.avg_eff >= targetEff;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Station Title Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-2.5 py-0.5 rounded-md border border-blue-400/30">
              {station.static.general.sector_name}
            </span>
            <span className="text-xs text-slate-400">
              سنة الإنشاء: {station.static.general.year_built}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-1">
            {station.static.general.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            المصدر: {station.static.general.water_source} | الطاقة التصميمية: {station.static.general.capacity_design_m3_day.toLocaleString('ar-EG')} م³/يوم
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => appStore.navigate('station/entry')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Plus size={16} />
            <span>إدخال بيـانات يومية جديدة</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>إنتاج المياه الكلي</span>
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {stats.total_prod.toLocaleString('ar-EG')} <span className="text-xs font-normal text-slate-400 font-sans">م³</span>
          </div>
          <p className="text-xs text-blue-600 font-medium">
            العكرة المسحوبة: {stats.total_turbid.toLocaleString('ar-EG')} م³
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>الكفاءة الهيدروليكية</span>
            <TrendingUp className={`w-5 h-5 ${isEffOk ? 'text-emerald-500' : 'text-rose-500'}`} />
          </div>
          <div className={`text-2xl font-bold font-mono ${isEffOk ? 'text-emerald-600' : 'text-rose-600'}`}>
            {(stats.avg_eff * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-slate-500 font-medium">
            الهدف: {(targetEff * 100).toFixed(0)}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>استهلاك الكهرباء الكلي</span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {stats.total_kwh.toLocaleString('ar-EG')} <span className="text-xs font-normal text-slate-400 font-sans">ك.و</span>
          </div>
          <p className="text-xs text-amber-600 font-medium">
            معدل الاستهلاك: {stats.avg_kwh_m3.toFixed(4)} ك.و/م³
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>استهلاك الشبة والكلور</span>
            <FlaskConical className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {stats.total_alum.toFixed(1)} <span className="text-xs font-normal text-slate-400 font-sans">طن شبة</span>
          </div>
          <p className="text-xs text-teal-600 font-medium">
            الكلور: {stats.total_chlorine.toFixed(2)} طن
          </p>
        </div>
      </div>

      {/* Production & Efficiency Trend Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <span>مخطط إنتاج الكفاءة والإنتاج اليومي (آخر 30 يوم)</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">المعدل اليومي</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="stEffGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[70, 100]} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, 'الكفاءة']} />
              <Area type="monotone" dataKey="eff" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#stEffGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent 10 Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden space-y-0">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>آخر 10 تسجيلات يومية للمحطة</span>
          </h3>
          <button
            onClick={() => appStore.navigate('station/records')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            عرض كافة السجلات
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200">
                <th className="py-3 px-4 font-semibold">التاريخ</th>
                <th className="py-3 px-4 font-semibold">المنتجة (م³)</th>
                <th className="py-3 px-4 font-semibold">العكرة (م³)</th>
                <th className="py-3 px-4 font-semibold">الكفاءة</th>
                <th className="py-3 px-4 font-semibold">كهرباء (ك.و)</th>
                <th className="py-3 px-4 font-semibold">معامل القدرة</th>
                <th className="py-3 px-4 font-semibold">الشبة (طن)</th>
                <th className="py-3 px-4 font-semibold">مسؤول الوردية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold font-mono text-slate-900">{r.date}</td>
                  <td className="py-3 px-4 font-mono text-slate-800">{r.produced_m3.toLocaleString('ar-EG')}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{r.turbid_m3.toLocaleString('ar-EG')}</td>
                  <td className="py-3 px-4 font-bold font-mono">
                    <span className={r.efficiency >= targetEff ? 'text-emerald-600' : 'text-rose-600'}>
                      {(r.efficiency * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-800">{r.electricity_kwh.toLocaleString('ar-EG')}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {r.power_factor ? r.power_factor.toFixed(2) : '—'}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-800">{r.alum_liquid.toFixed(3)}</td>
                  <td className="py-3 px-4 text-slate-500 truncate max-w-[150px]">{r.shift_crew}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
