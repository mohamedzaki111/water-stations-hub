import React, { useState, useEffect } from 'react';
import { appStore } from '../../store/appStore';
import { Activity, Play, Pause, AlertCircle, Droplets, Waves, Zap, Gauge, CheckCircle2, RefreshCw } from 'lucide-react';

export const ScadaMonitor: React.FC = () => {
  const [stationId, setStationId] = useState<string>(
    appStore.session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [tank1Level, setTank1Level] = useState<number>(82);
  const [tank2Level, setTank2Level] = useState<number>(76);
  const [turbidityNTU, setTurbidityNTU] = useState<number>(18.4);
  const [chlorinePpm, setChlorinePpm] = useState<number>(2.4);
  const [networkPressure, setPressure] = useState<number>(4.8);

  const station = appStore.stations.find((s) => s.id === stationId);
  const specs = station?.static.technical;

  // Live simulation effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTank1Level((prev) => Math.min(98, Math.max(20, +(prev + (Math.random() * 2 - 1)).toFixed(1))));
      setTank2Level((prev) => Math.min(98, Math.max(20, +(prev + (Math.random() * 2 - 1)).toFixed(1))));
      setTurbidityNTU((prev) => Math.min(100, Math.max(5, +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1))));
      setChlorinePpm((prev) => Math.min(4, Math.max(1.5, +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2))));
      setPressure((prev) => Math.min(6, Math.max(3.5, +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1))));
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Control Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <span>شاشة المراقبة اللحظية (SCADA Real-Time Telemetry)</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isRunning ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'}`}>
                {isRunning ? '● متصل ومباشر' : '⏸ إيقاف المراقبة'}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              التتبع اللحظي لمنااسيب الخزانات والضغط وضخ الطلمبات والكيماويات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-bold outline-none"
          >
            {appStore.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.static.general.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
            }`}
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
            <span>{isRunning ? 'إيقاف التحديث' : 'بدء التحديث المباشر'}</span>
          </button>
        </div>
      </div>

      {/* Hydraulic Process Diagram */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="text-xs font-mono text-slate-500 mb-4 flex items-center justify-between">
          <span>HYDRAULIC FLOW DIAGRAM - PROCESS CONTROL</span>
          <span className="text-sky-400">معدل التدفق التقديري: 6,120 م³/ساعة</span>
        </div>

        {/* Process Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {/* Stage 1: River Intake */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5 mb-2">
                <Waves size={16} />
                <span>1. المأخذ وطلمبات العكرة</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>المصدر: {station?.static.general.water_source}</div>
                <div>النوع: {station?.static.general.intake_type}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">العكارة الخام</div>
                <div className="text-base font-extrabold text-amber-400 font-mono">
                  {turbidityNTU} <span className="text-xs font-normal">NTU</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">الطلمبات:</span>
                <span className="text-emerald-400 font-bold">
                  {specs?.raw_pumps?.count || 2} تعمل (100%)
                </span>
              </div>
            </div>
          </div>

          {/* Stage 2: Clarifiers */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5 mb-2">
                <Droplets size={16} />
                <span>2. حوض الترويق والمروقات</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>نوع الشبة: {station?.static.general.alum_type}</div>
                <div>الجرعة: {station?.static.general.alum_dose_gm_m3} جم/م³</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">المروقات العاملة</div>
                <div className="text-base font-extrabold text-teal-400 font-mono">
                  {specs?.clarifiers?.reduce((sum, c) => sum + (c.count || 0), 0) || 4} مروق
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">كوبري الكسح:</span>
                <span className="text-emerald-400 font-bold">دوران منتظم</span>
              </div>
            </div>
          </div>

          {/* Stage 3: Filters */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
                <Activity size={16} />
                <span>3. المرشحات الرملية</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>إجمالي المرشحات: {specs?.filter_groups?.reduce((sum, f) => sum + (f.count || 0), 0) || 16}</div>
                <div>وسط الترشيح: زلط ورمل</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">العكارة المرشحة</div>
                <div className="text-base font-extrabold text-emerald-400 font-mono">
                  0.32 <span className="text-xs font-normal">NTU</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">الغسيل الدوري:</span>
                <span className="text-sky-400 font-bold">جاهز</span>
              </div>
            </div>
          </div>

          {/* Stage 4: Chlorine & Tanks */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <Zap size={16} />
                <span>4. التعقيم والخزانات</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>حقن الكلور: {specs?.chlorine_injectors_brand || 'جيسكو'}</div>
                <div>التأمين: {specs?.chlorine_safety_type || 'برج تعادل'}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              {/* Animated Tank Visual */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <div className="text-[9px] text-slate-400">خزان 1</div>
                  <div className="text-xs font-bold text-sky-300 font-mono">{tank1Level}%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-sky-500 h-full transition-all" style={{ width: `${tank1Level}%` }} />
                  </div>
                </div>

                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <div className="text-[9px] text-slate-400">خزان 2</div>
                  <div className="text-xs font-bold text-sky-300 font-mono">{tank2Level}%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-sky-500 h-full transition-all" style={{ width: `${tank2Level}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 5: Clean Water Pumps */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                <Gauge size={16} />
                <span>5. طلمبات المرشحة والشبكة</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>النوع: {specs?.clean_pumps?.type || 'KSB'}</div>
                <div>الهيد: {specs?.clean_pumps?.head_m || 50} م</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">ضغط الشبكة الرئيسي</div>
                <div className="text-base font-extrabold text-emerald-400 font-mono">
                  {networkPressure} <span className="text-xs font-normal">بار</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">الكلور المتبقي:</span>
                <span className="text-amber-300 font-bold">{chlorinePpm} PPM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
