import React from 'react';
import { appStore } from '../../store/appStore';
import { GitCompare, CheckCircle2, AlertTriangle, Building2, Droplets, Zap, FlaskConical } from 'lucide-react';

export const StationCompare: React.FC = () => {
  const allStats = appStore.allStats();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <GitCompare className="w-6 h-6" />
            </div>
            <span>مقارنة الأداء الشامل بين المحطات</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            تحليل وتقييم مؤشرات الأداء الفني والكهربائي والكيماويات لمختلف محطات شركة الجيزة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allStats.map(({ station, stats }) => {
          const targetEff = station.static.targets.efficiency_target;
          const isEffOk = stats.avg_eff >= targetEff;
          const openBds = appStore.getBreakdowns(station.id).filter((b) => b.status === 'جارٍ').length;

          return (
            <div key={station.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                  {station.static.general.sector_name}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {station.static.general.name}
                </h3>
                <p className="text-xs text-slate-400">
                  الطاقة التصميمية: {station.static.general.capacity_design_m3_day.toLocaleString('ar-EG')} م³/يوم
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Droplets size={14} className="text-sky-500" />
                    <span>إجمالي الإنتاج:</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {stats.total_prod.toLocaleString('ar-EG')} م³
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className={isEffOk ? 'text-emerald-500' : 'text-rose-500'} />
                    <span>الكفاءة الهيدروليكية:</span>
                  </span>
                  <span className={`font-mono font-bold ${isEffOk ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {(stats.avg_eff * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-500" />
                    <span>استهلاك الكهرباء / م³:</span>
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {stats.avg_kwh_m3.toFixed(4)} ك.و
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <FlaskConical size={14} className="text-teal-500" />
                    <span>إجمالي الشبة السائلة:</span>
                  </span>
                  <span className="font-mono font-bold text-teal-700">
                    {stats.total_alum.toFixed(1)} طن
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-600">الأعطال الجارية:</span>
                  <span className={`font-bold ${openBds > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {openBds > 0 ? `${openBds} أعطال` : 'لا يوجد أعطال'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
