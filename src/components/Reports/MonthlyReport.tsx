import React, { useState, useMemo, useRef } from 'react';
import { appStore } from '../../store/appStore';
import {
  Calendar,
  Printer,
  Droplets,
  Zap,
  FlaskConical,
  TrendingUp,
  Table,
} from 'lucide-react';
import { PdfExportButton } from '../Common/PdfExportButton';
import { formatArabicNumber, toArabicDigits } from '../../utils/formatters';

export const MonthlyReport: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const [stationId, setStationId] = useState<string>(
    session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [yearMonth, setYearMonth] = useState<string>('2026-05');
  const reportRef = useRef<HTMLDivElement>(null);

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
    return appStore.getRecords({ station_id: stationId, month: yearMonth }).reverse();
  }, [appStore.records.length, stationId, yearMonth]);

  const handlePrint = () => {
    window.print();
  };

  const reportFileName = `تقرير_بيانات_التشغيل_${stationName.replace(/\s+/g, '_')}_${yearMonth}`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <span>التقرير الشهري التجميعي للتشغيل (جداول البيانات)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            الجداول التفصيلية والمؤشرات الحسابية الشهرية لإنتاج المياه واستهلاك الكيماويات والطاقة
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
            targetRef={reportRef}
            filename={reportFileName}
            variant="primary"
            size="md"
            label="فتح التقرير PDF"
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

      {/* Printable / Exportable Container */}
      <div ref={reportRef} id="monthly-report-content" className="space-y-6 bg-slate-50/50 p-2 rounded-2xl">
        {/* Report Header for PDF */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 font-black">
              💧
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{stationName}</h2>
              <p className="text-xs text-slate-500">
                تقرير تشغيل شهر: <span className="font-bold text-slate-700">{toArabicDigits(yearMonth)}</span>
              </p>
            </div>
          </div>
          <div className="text-left text-xs text-slate-500">
            <div>تاريخ الاستخراج: {toArabicDigits(new Date().toLocaleDateString('ar-EG'))}</div>
            <div>إجمالي الأيام المسجلة: {toArabicDigits(monthRecords.length)} يوم</div>
          </div>
        </div>

        {/* Monthly KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>إجمالي الإنتاج الشهري</span>
              <Droplets className="w-5 h-5 text-sky-500" />
            </div>
            <div className="text-2xl font-black text-sky-700">
              {formatArabicNumber(monthlyStats.total_prod)} <span className="text-xs font-normal">م³</span>
            </div>
            <p className="text-[11px] text-slate-400">
              العكرة: {formatArabicNumber(monthlyStats.total_turbid)} م³
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>متوسط الكفاءة الشهرية</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {toArabicDigits((monthlyStats.avg_eff * 100).toFixed(1))}%
            </div>
            <p className="text-[11px] text-slate-400">
              الهدف المستهدف: {toArabicDigits(((station?.static.targets.efficiency_target || 0.9) * 100).toFixed(0))}%
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>استهلاك الكهرباء الشهري</span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {formatArabicNumber(monthlyStats.total_kwh)} <span className="text-xs font-normal">ك.و.س</span>
            </div>
            <p className="text-[11px] text-slate-400">
              معدل الاستهلاك: {toArabicDigits(monthlyStats.avg_kwh_m3.toFixed(4))} ك.و/م³
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>الشبة والكلور المستهلك</span>
              <FlaskConical className="w-5 h-5 text-teal-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-xl font-black text-teal-600">
                {toArabicDigits(monthlyStats.total_alum.toFixed(1))} <span className="text-xs font-normal">شبة</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-xl font-black text-sky-600">
                {toArabicDigits(monthlyStats.total_chlorine.toFixed(2))} <span className="text-xs font-normal">كلور</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              الروبة المتولدة التقديرية: {formatArabicNumber(monthlyStats.sludge_m3)} م³
            </p>
          </div>
        </div>

        {/* Detailed Days Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden break-inside-avoid">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-2">
              <Table size={16} className="text-slate-600" />
              <span>جدول بيانات أيام شهر {toArabicDigits(yearMonth)} التفصيلية ({toArabicDigits(monthRecords.length)} يوم مسجل)</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-bold">اليوم</th>
                  <th className="py-2.5 px-3 font-bold">الإنتاج المرشح (م³)</th>
                  <th className="py-2.5 px-3 font-bold">المياه العكرة (م³)</th>
                  <th className="py-2.5 px-3 font-bold">الكفاءة %</th>
                  <th className="py-2.5 px-3 font-bold">الشبة (طن)</th>
                  <th className="py-2.5 px-3 font-bold">الكلور (طن)</th>
                  <th className="py-2.5 px-3 font-bold">الكهرباء (ك.و.س)</th>
                  <th className="py-2.5 px-3 font-bold">معامل القدرة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 break-inside-avoid font-medium">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{toArabicDigits(r.date)}</td>
                    <td className="py-2.5 px-3 text-slate-800">{formatArabicNumber(r.produced_m3)}</td>
                    <td className="py-2.5 px-3 text-slate-600">{formatArabicNumber(r.turbid_m3)}</td>
                    <td className={`py-2.5 px-3 font-bold ${r.efficiency >= 0.9 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {toArabicDigits((r.efficiency * 100).toFixed(1))}%
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">{toArabicDigits(r.alum_liquid.toFixed(3))}</td>
                    <td className="py-2.5 px-3 text-slate-800">{r.chlorine_gas ? toArabicDigits(r.chlorine_gas.toFixed(3)) : '—'}</td>
                    <td className="py-2.5 px-3 text-slate-800">{formatArabicNumber(r.electricity_kwh)}</td>
                    <td className="py-2.5 px-3 text-slate-700">{r.power_factor ? toArabicDigits(r.power_factor.toFixed(2)) : '—'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 break-inside-avoid">
                <tr>
                  <td className="py-3 px-3 text-slate-900 font-black">الإجمالي الشهري</td>
                  <td className="py-3 px-3 text-sky-700 font-black">{formatArabicNumber(monthlyStats.total_prod)}</td>
                  <td className="py-3 px-3 text-slate-700 font-black">{formatArabicNumber(monthlyStats.total_turbid)}</td>
                  <td className="py-3 px-3 text-emerald-700 font-black">{toArabicDigits((monthlyStats.avg_eff * 100).toFixed(1))}%</td>
                  <td className="py-3 px-3 text-teal-700 font-black">{toArabicDigits(monthlyStats.total_alum.toFixed(2))}</td>
                  <td className="py-3 px-3 text-sky-700 font-black">{toArabicDigits(monthlyStats.total_chlorine.toFixed(3))}</td>
                  <td className="py-3 px-3 text-amber-700 font-black">{formatArabicNumber(monthlyStats.total_kwh)}</td>
                  <td className="py-3 px-3 text-slate-700 font-black">{monthlyStats.avg_power_factor > 0 ? toArabicDigits(monthlyStats.avg_power_factor.toFixed(2)) : '—'}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
