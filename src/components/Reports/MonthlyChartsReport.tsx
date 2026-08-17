import React, { useState, useMemo, useRef } from 'react';
import { appStore } from '../../store/appStore';
import {
  BarChart3,
  TrendingUp,
  Droplets,
  Zap,
  FlaskConical,
  Activity,
  Layers,
  Printer,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PdfExportButton } from '../Common/PdfExportButton';
import { formatArabicNumber, toArabicDigits } from '../../utils/formatters';

export const MonthlyChartsReport: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const [stationId, setStationId] = useState<string>(
    session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [yearMonth, setYearMonth] = useState<string>('2026-05');
  const chartsRef = useRef<HTMLDivElement>(null);

  const [yearStr, monthStr] = yearMonth.split('-');
  const year = parseInt(yearStr, 10) || 2026;
  const month = parseInt(monthStr, 10) || 5;

  const station = appStore.stations.find((s) => s.id === stationId);
  const stationName = station?.static.general.name || 'المحطة';

  const monthlyStats = useMemo(
    () => appStore.monthlyStats(stationId, year, month),
    [appStore.records.length, stationId, year, month]
  );

  const monthRecords = useMemo(() => {
    return appStore.getRecords({ station_id: stationId, month: yearMonth });
  }, [appStore.records.length, stationId, yearMonth]);

  const chartData = useMemo(() => {
    return monthRecords.map((r) => {
      const day = r.date.slice(8);
      const kwhPerM3 = r.produced_m3 > 0 ? +(r.electricity_kwh / r.produced_m3).toFixed(3) : 0;
      const alumDose = r.produced_m3 > 0 ? +((r.alum_liquid * 1000000) / r.produced_m3).toFixed(1) : 0;
      const chlorineDose = r.produced_m3 > 0 && r.chlorine_gas ? +((r.chlorine_gas * 1000000) / r.produced_m3).toFixed(1) : 0;

      return {
        date: day,
        fullDate: r.date,
        produced: r.produced_m3,
        turbid: r.turbid_m3,
        eff: +(r.efficiency * 100).toFixed(1),
        targetEff: +( (station?.static.targets.efficiency_target || 0.9) * 100 ).toFixed(1),
        kwh: r.electricity_kwh,
        kwhPerM3,
        alum: r.alum_liquid,
        chlorine: r.chlorine_gas || 0,
        alumDose,
        chlorineDose,
      };
    });
  }, [monthRecords, station]);

  const reportFileName = `تقرير_الرسومات_البيانية_${stationName.replace(/\s+/g, '_')}_${yearMonth}`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span>تقرير الرسومات البيانية والتحليلات البصرية</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            المنحنيات البيانية التفاعلية للإنتاج والكفاءة واستهلاك الطاقة والكيماويات
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

          <PdfExportButton
            targetRef={chartsRef}
            filename={reportFileName}
            variant="dark"
            size="md"
            label="تصدير المخططات PDF"
          />

          <button
            onClick={() => window.print()}
            className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-xs cursor-pointer transition-all"
            title="طباعة المخططات"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Exportable Charts Container */}
      <div ref={chartsRef} id="charts-report-content" className="space-y-6 bg-slate-50/50 p-2 rounded-2xl">
        {/* Header Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>إجمالي الإنتاج</span>
              <Droplets size={16} className="text-sky-500" />
            </div>
            <div className="text-xl font-black text-slate-900 mt-1">
              {formatArabicNumber(monthlyStats.total_prod)} <span className="text-xs font-normal">م³</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>متوسط الكفاءة</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="text-xl font-black text-emerald-600 mt-1">
              {toArabicDigits((monthlyStats.avg_eff * 100).toFixed(1))}%
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>إجمالي الكهرباء</span>
              <Zap size={16} className="text-amber-500" />
            </div>
            <div className="text-xl font-black text-amber-600 mt-1">
              {formatArabicNumber(monthlyStats.total_kwh)} <span className="text-xs font-normal">ك.و.س</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>إجمالي الشبة</span>
              <FlaskConical size={16} className="text-teal-500" />
            </div>
            <div className="text-xl font-black text-teal-600 mt-1">
              {toArabicDigits(monthlyStats.total_alum.toFixed(1))} <span className="text-xs font-normal">طن</span>
            </div>
          </div>
        </div>

        {/* Chart 1: Water Production vs Turbid Intake */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span>مخطط إنتاج المياه المرشحة والعكرة يومياً (م³)</span>
            </h3>
            <span className="text-xs text-slate-400">شهر {toArabicDigits(yearMonth)}</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTurbid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip formatter={(v: any, name: any) => [Number(v).toLocaleString('ar-EG') + ' م³', name === 'produced' ? 'الإنتاج المرشح' : 'المياه العكرة']} />
                <Legend formatter={(v) => (v === 'produced' ? 'المياه المرشحة (م³)' : 'المياه العكرة (م³)')} />
                <Area type="monotone" dataKey="produced" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" />
                <Area type="monotone" dataKey="turbid" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorTurbid)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Daily Efficiency vs Target */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>مخطط كفاءة التشغيل اليومية (%) مقارنة بالهدف</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">الهدف: {( (station?.static.targets.efficiency_target || 0.9) * 100 ).toFixed(0)}%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 9 }} />
                <Tooltip formatter={(v: any) => [`${v}%`, 'الكفاءة']} />
                <Legend formatter={(v) => (v === 'eff' ? 'الكفاءة الفعلية (%)' : 'المستهدف (%)')} />
                <Line type="monotone" dataKey="eff" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="targetEff" stroke="#f43f5e" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grid of 2 Charts: Electricity & Chemicals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 3: Electricity */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>مخطط استهلاك الطاقة الكهربائية (ك.و.س)</span>
            </h3>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip formatter={(v: any) => [Number(v).toLocaleString('ar-EG') + ' ك.و.س', 'استهلاك الكهرباء']} />
                  <Bar dataKey="kwh" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Chemicals */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal-500" />
              <span>مخطط جرعات الشبة والكلور (جم/م³)</span>
            </h3>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip formatter={(v: any, name: any) => [`${v} جم/م³`, name === 'alumDose' ? 'جرعة الشبة' : 'جرعة الكلور']} />
                  <Legend formatter={(v) => (v === 'alumDose' ? 'جرعة الشبة (جم/م³)' : 'جرعة الكلور (جم/م³)')} />
                  <Line type="monotone" dataKey="alumDose" stroke="#14b8a6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="chlorineDose" stroke="#0284c7" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
