import React, { useState, useRef } from 'react';
import { appStore } from '../../store/appStore';
import { FlaskConical, DollarSign, AlertCircle, CheckCircle2, TrendingUp, Building } from 'lucide-react';
import { PdfExportButton } from '../Common/PdfExportButton';

export const ChemicalsReport: React.FC = () => {
  const [alumPriceEgp, setAlumPriceEgp] = useState<number>(4200); // EGP per ton liquid alum
  const [chlorinePriceEgp, setChlorinePriceEgp] = useState<number>(18500); // EGP per ton chlorine gas
  const [electricityPriceEgp, setElectricityPriceEgp] = useState<number>(1.85); // EGP per kWh
  const reportRef = useRef<HTMLDivElement>(null);

  const allStats = appStore.allStats();

  const grandTotalAlumTons = allStats.reduce((sum, item) => sum + item.stats.total_alum, 0);
  const grandTotalChlorineTons = allStats.reduce((sum, item) => sum + item.stats.total_chlorine, 0);
  const grandTotalKwh = allStats.reduce((sum, item) => sum + item.stats.total_kwh, 0);
  const grandTotalProd = allStats.reduce((sum, item) => sum + item.stats.total_prod, 0);

  const totalAlumCost = grandTotalAlumTons * alumPriceEgp;
  const totalChlorineCost = grandTotalChlorineTons * chlorinePriceEgp;
  const totalElectricityCost = grandTotalKwh * electricityPriceEgp;
  const grandTotalCost = totalAlumCost + totalChlorineCost + totalElectricityCost;

  const costPerM3 = grandTotalProd > 0 ? +(grandTotalCost / grandTotalProd).toFixed(3) : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-600 rounded-xl">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span>تقرير الكيماويات والتكاليف التشغيلية المباشرة</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            حساب الجرعات ومعدلات استهلاك الشبة السائلة والكلور والتكلفة المباشرة لكل متر مكعب
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PdfExportButton
            targetRef={reportRef}
            filename={`تقرير_الكيماويات_والتكاليف_${new Date().toISOString().slice(0, 10)}`}
            variant="secondary"
            size="md"
            label="تصدير تقرير PDF"
          />
        </div>
      </div>

      <div ref={reportRef} id="chemicals-report-content" className="space-y-6 bg-slate-50/40 p-2 rounded-2xl">

      {/* Unit Price Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          أسعار التكلفة المباشرة لتشغيل المحطات (جنيه مصري)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سعر طن الشبة السائلة (جنيه)
            </label>
            <input
              type="number"
              value={alumPriceEgp}
              onChange={(e) => setAlumPriceEgp(+e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سعر طن غاز الكلور (جنيه)
            </label>
            <input
              type="number"
              value={chlorinePriceEgp}
              onChange={(e) => setChlorinePriceEgp(+e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سعر الكيلووات ساعة كهرباء (جنيه)
            </label>
            <input
              type="number"
              step="0.05"
              value={electricityPriceEgp}
              onChange={(e) => setElectricityPriceEgp(+e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grand Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
          <div className="text-xs text-slate-400">تكلفة الشبة السائلة</div>
          <div className="text-2xl font-black font-mono text-teal-400">
            {totalAlumCost.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} <span className="text-xs font-normal">ج.م</span>
          </div>
          <div className="text-[11px] text-slate-500">{grandTotalAlumTons.toFixed(1)} طن</div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
          <div className="text-xs text-slate-400">تكلفة غاز الكلور</div>
          <div className="text-2xl font-black font-mono text-sky-400">
            {totalChlorineCost.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} <span className="text-xs font-normal">ج.م</span>
          </div>
          <div className="text-[11px] text-slate-500">{grandTotalChlorineTons.toFixed(2)} طن</div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
          <div className="text-xs text-slate-400">تكلفة الطاقة الكهربائية</div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {totalElectricityCost.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} <span className="text-xs font-normal">ج.م</span>
          </div>
          <div className="text-[11px] text-slate-500">{grandTotalKwh.toLocaleString('ar-EG')} ك.و.س</div>
        </div>

        <div className="bg-gradient-to-tr from-teal-700 to-emerald-700 text-white p-5 rounded-2xl shadow-md space-y-1">
          <div className="text-xs text-emerald-200">تكلفة التشغيل المباشرة / م³</div>
          <div className="text-2xl font-black font-mono">
            {costPerM3.toFixed(3)} <span className="text-xs font-normal">ج.م / م³</span>
          </div>
          <div className="text-[11px] text-emerald-100">
            إجمالي التكلفة: {grandTotalCost.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} ج.م
          </div>
        </div>
      </div>

      {/* Breakdown per Station Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
          تحليل التكاليف والكيماويات المباشرة حسب المحطة
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">المحطة</th>
                <th className="py-3 px-4 font-bold">الإنتاج (م³)</th>
                <th className="py-3 px-4 font-bold">الشبة (طن)</th>
                <th className="py-3 px-4 font-bold">جرعة الشبة (جم/م³)</th>
                <th className="py-3 px-4 font-bold">الكلور (طن)</th>
                <th className="py-3 px-4 font-bold">جرعة الكلور (جم/م³)</th>
                <th className="py-3 px-4 font-bold">ت. الكيماويات والكهرباء (ج.م)</th>
                <th className="py-3 px-4 font-bold">تكلفة م³ (ج.م)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allStats.map(({ station, stats }) => {
                const alumCost = stats.total_alum * alumPriceEgp;
                const chlorineCost = stats.total_chlorine * chlorinePriceEgp;
                const elecCost = stats.total_kwh * electricityPriceEgp;
                const totalStCost = alumCost + chlorineCost + elecCost;

                const alumDoseGmM3 = stats.total_prod > 0 ? +((stats.total_alum * 1000000) / stats.total_prod).toFixed(2) : 0;
                const chlorineDoseGmM3 = stats.total_prod > 0 ? +((stats.total_chlorine * 1000000) / stats.total_prod).toFixed(2) : 0;
                const stCostPerM3 = stats.total_prod > 0 ? +(totalStCost / stats.total_prod).toFixed(3) : 0;

                return (
                  <tr key={station.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {station.static.general.name}
                    </td>
                    <td className="py-3 px-4 font-mono">{stats.total_prod.toLocaleString('ar-EG')}</td>
                    <td className="py-3 px-4 font-mono text-teal-700 font-bold">{stats.total_alum.toFixed(2)}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{alumDoseGmM3} جم/م³</td>
                    <td className="py-3 px-4 font-mono text-sky-700 font-bold">{stats.total_chlorine.toFixed(2)}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{chlorineDoseGmM3} جم/م³</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {totalStCost.toLocaleString('ar-EG', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                      {stCostPerM3.toFixed(3)} ج.م
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};
