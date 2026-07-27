import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { PenTool, CheckCircle, AlertCircle, Save, Calculator, Zap, Droplets, FlaskConical, Users } from 'lucide-react';

export const DailyDataEntry: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const defaultStationId = session?.station?.id || appStore.stations[0]?.id || 'giza';

  const [stationId, setStationId] = useState<string>(defaultStationId);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [producedM3, setProducedM3] = useState<string>('140000');
  const [turbidM3, setTurbidM3] = useState<string>('152000');
  const [alumLiquid, setAlumLiquid] = useState<string>('7.85');
  const [chlorineGas, setChlorineGas] = useState<string>('1.25');
  const [electricityKwh, setElectricityKwh] = useState<string>('34500');
  const [electricityKvar, setElectricityKvar] = useState<string>('16500');
  const [flowMetersOk, setFlowMetersOk] = useState<boolean>(true);
  const [shiftCrew, setShiftCrew] = useState<string>('م عماد مراد + حماده مصطفى');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const prodNum = Number(producedM3) || 0;
  const turbNum = Number(turbidM3) || 0;
  const kwhNum = Number(electricityKwh) || 0;
  const kvarNum = Number(electricityKvar) || 0;
  const alumNum = Number(alumLiquid) || 0;
  const clNum = Number(chlorineGas) || 0;

  // Real-time calculations
  const eff = turbNum > 0 ? +(prodNum / turbNum).toFixed(4) : 0;
  const kva = kwhNum > 0 && kvarNum > 0 ? +Math.sqrt(kwhNum ** 2 + kvarNum ** 2).toFixed(2) : 0;
  const pf = kva > 0 ? +(kwhNum / kva).toFixed(4) : 0;
  const kwhPerM3 = prodNum > 0 ? +(kwhNum / prodNum).toFixed(5) : 0;
  const alumDoseGmM3 = prodNum > 0 ? +((alumNum * 1000000) / prodNum).toFixed(2) : 0; // grams/m³
  const chlorineDoseGmM3 = prodNum > 0 ? +((clNum * 1000000) / prodNum).toFixed(2) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (prodNum <= 0) {
      setMessage({ type: 'error', text: 'يرجى إدخال كمية مياه منتجة صحيحة' });
      return;
    }

    if (turbNum < prodNum) {
      setMessage({ type: 'error', text: 'المياه العكرة يجب أن تكون أكبر من أو تساوي المياه المنتجة' });
      return;
    }

    const res = appStore.addRecord({
      station_id: stationId,
      date,
      produced_m3: prodNum,
      turbid_m3: turbNum,
      alum_liquid: alumNum,
      chlorine_gas: clNum,
      electricity_kwh: kwhNum,
      electricity_kvar: kvarNum,
      flow_meters_ok: flowMetersOk,
      shift_crew: shiftCrew,
      created_by: session?.user.id || 'u0',
    });

    if (res.ok) {
      setMessage({ type: 'success', text: `تم حفظ بيانات يوم ${date} بنجاح للـ ${appStore.stations.find((s) => s.id === stationId)?.static.general.name}` });
    } else {
      setMessage({ type: 'error', text: res.error || 'تعذر حفظ البيانات' });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <PenTool className="w-6 h-6" />
            </div>
            <span>إدخال البيانات التشغيلية اليومية</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            تسجيل إنتاج المياه والعكارة واستهلاكات الكيماويات والكهرباء ورديات التشغيل
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            المحطة والتاريخ والوردية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المحطة</label>
              <select
                disabled={!isCentral}
                value={stationId}
                onChange={(e) => setStationId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-slate-100"
              >
                {appStore.stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.static.general.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ التسجيل</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">مسؤول الوردية / الطاقم</label>
              <input
                type="text"
                value={shiftCrew}
                onChange={(e) => setShiftCrew(e.target.value)}
                placeholder="أدخل أسماء الطاقم القائم بالوردية"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Hydraulic Production */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <Droplets size={16} />
            <span>كميات المياه والكفاءة الهيدروليكية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                المياه المنتجة المرشحة (م³/يوم)
              </label>
              <input
                type="number"
                value={producedM3}
                onChange={(e) => setProducedM3(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                المياه العكرة المسحوبة من المأخذ (م³/يوم)
              </label>
              <input
                type="number"
                value={turbidM3}
                onChange={(e) => setTurbidM3(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200/80 flex items-center justify-between text-xs">
            <span className="font-bold text-sky-900">الكفاءة الهيدروليكية المحسوبة:</span>
            <span className={`text-base font-extrabold font-mono ${eff >= 0.9 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {(eff * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Chemicals & Electricity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chemicals */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical size={16} />
              <span>استهلاك الكيماويات</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الشبة السائلة (طن/يوم)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={alumLiquid}
                  onChange={(e) => setAlumLiquid(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  الجرعة الفعالة التقديرية: {alumDoseGmM3} جم/م³ (PPM)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  غاز الكلور (طن/يوم)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={chlorineGas}
                  onChange={(e) => setChlorineGas(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  الجرعة الفعالة التقديرية: {chlorineDoseGmM3} جم/م³
                </span>
              </div>
            </div>
          </div>

          {/* Electricity */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={16} />
              <span>القدرة الكهربائية للطاقة</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الطاقة الفعالة (ك.و.س - kWh)
                </label>
                <input
                  type="number"
                  value={electricityKwh}
                  onChange={(e) => setElectricityKwh(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الطاقة غير الفعالة (ك.ف.أ.ر - kvar)
                </label>
                <input
                  type="number"
                  value={electricityKvar}
                  onChange={(e) => setElectricityKvar(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs space-y-1">
                <div className="flex justify-between font-bold text-amber-900">
                  <span>معامل القدرة (Power Factor):</span>
                  <span className={`font-mono ${pf >= 0.9 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {pf > 0 ? pf.toFixed(2) : '—'}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>الاستهلاك النوعي:</span>
                  <span className="font-mono">{kwhPerM3.toFixed(4)} ك.و/م³</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification & Submit */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
            <input
              type="checkbox"
              checked={flowMetersOk}
              onChange={(e) => setFlowMetersOk(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded-md focus:ring-sky-500"
            />
            <span>أقر بصحة قراءات العدادات الكهرومغناطيسية وتطابقها مع السجلات الدفترية</span>
          </label>

          <button
            type="submit"
            className="py-3 px-8 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save size={16} />
            <span>حفظ التسجيل اليومي الآن</span>
          </button>
        </div>
      </form>
    </div>
  );
};
