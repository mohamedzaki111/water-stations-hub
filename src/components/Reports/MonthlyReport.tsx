import React, { useState, useMemo } from 'react';
import { appStore } from '../../store/appStore';
import {
  Calendar,
  Printer,
  Droplets,
  Zap,
  FlaskConical,
  TrendingUp,
  FileText,
  Building2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const MonthlyReport: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const [stationId, setStationId] = useState<string>(
    session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [yearMonth, setYearMonth] = useState<string>('2026-05');

  const [yearStr, monthStr] = yearMonth.split('-');
  const year = parseInt(yearStr, 10) || 2026;
  const month = parseInt(monthStr, 10) || 5;

  const station = appStore.stations.find((s) => s.id === stationId);
  const monthlyStats = useMemo(
    () => appStore.monthlyStats(stationId, year, month),
    [appStore.records.length, stationId, year, month]
  );

  const monthRecords = useMemo(() => {
    return appStore.getRecords({ station_id: stationId, month: yearMonth }).reverse();
  }, [appStore.records.length, stationId, yearMonth]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <span>التقرير الشهري التجميعي للتشغيل</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ملخص ومؤشرات الأداء الشهرية لمياه الشرب والكيماويات والكهرباء
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            disabled={!isCentral}
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none shadow-xs"
          >
            {appStore.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.static.general.name}
              </option>
            ))}
          </select>

          <input
            type="month"
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 outline-none shadow-xs"
          />

          <button
            onClick={handlePrint}
            className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-xs cursor-pointer transition-all"
            title="طباعة التقرير"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Monthly KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>إجمالي الإنتاج الشهري</span>
            <Droplets className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-sky-700 font-mono">
            {monthlyStats.total_prod.toLocaleString('ar-EG')} <span className="text-xs font-normal">م³</span>
          </div>
          <p className="text-[11px] text-slate-400">
            العكرة: {monthlyStats.total_turbid.toLocaleString('ar-EG')} م³
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>متوسط الكفاءة الشهرية</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            {(monthlyStats.avg_eff * 100).toFixed(1)}%
          </div>
          <p className="text-[11px] text-slate-400">
            الهدف المستهدف: {( (station?.static.targets.efficiency_target || 0.9) * 100 ).toFixed(0)}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>استهلاك الكهرباء الشهري</span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            {monthlyStats.total_kwh.toLocaleString('ar-EG')} <span className="text-xs font-normal">ك.و.س</span>
          </div>
          <p className="text-[11px] text-slate-400">
            معدل الاستهلاك: {monthlyStats.avg_kwh_m3.toFixed(4)} ك.و/م³
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>الشبة والروبة التقديرية</span>
            <FlaskConical className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-black text-teal-600 font-mono">
            {monthlyStats.total_alum.toFixed(1)} <span className="text-xs font-normal">طن شبة</span>
          </div>
          <p className="text-[11px] text-slate-400">
            الروبة المتولدة التقديرية: {monthlyStats.sludge_m3.toLocaleString('ar-EG')} م³
          </p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-800">
          توزيع الإنتاج اليومي خلال شهر {yearMonth}
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthRecords.map((r) => ({ date: r.date.slice(8), prod: r.produced_m3 }))} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip formatter={(v: any) => [Number(v).toLocaleString('ar-EG') + ' م³', 'الإنتاج']} />
              <Bar dataKey="prod" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Days Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
          بيانات أيام شهر {yearMonth} التفصيلية ({monthRecords.length} يوم مسجل)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <th className="py-2.5 px-3 font-semibold">اليوم</th>
                <th className="py-2.5 px-3 font-semibold">الإنتاج (م³)</th>
                <th className="py-2.5 px-3 font-semibold">العكرة (م³)</th>
                <th className="py-2.5 px-3 font-semibold">الكفاءة %</th>
                <th className="py-2.5 px-3 font-semibold">الشبة (طن)</th>
                <th className="py-2.5 px-3 font-semibold">الكلور (طن)</th>
                <th className="py-2.5 px-3 font-semibold">الكهرباء (ك.و)</th>
                <th className="py-2.5 px-3 font-semibold">معامل القدرة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 font-mono">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{r.date}</td>
                  <td className="py-2.5 px-3 text-slate-800">{r.produced_m3.toLocaleString('ar-EG')}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.turbid_m3.toLocaleString('ar-EG')}</td>
                  <td className={`py-2.5 px-3 font-bold ${r.efficiency >= 0.9 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {(r.efficiency * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-slate-800">{r.alum_liquid.toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-slate-800">{r.chlorine_gas ? r.chlorine_gas.toFixed(3) : '—'}</td>
                  <td className="py-2.5 px-3 text-slate-800">{r.electricity_kwh.toLocaleString('ar-EG')}</td>
                  <td className="py-2.5 px-3 text-slate-700">{r.power_factor ? r.power_factor.toFixed(2) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
