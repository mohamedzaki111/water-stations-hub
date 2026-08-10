import React, { useState, useEffect, useMemo } from 'react';
import { appStore } from '../../store/appStore';
import { PenTool, CheckCircle, AlertCircle, Save, Zap, Droplets, FlaskConical, Gauge, ClipboardList, Activity } from 'lucide-react';

export const DailyDataEntry: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const defaultStationId = session?.station?.id || (appStore.stations.some(s => s.id === 'giza') ? 'giza' : appStore.stations[0]?.id) || 'giza';

  const [stationId, setStationId] = useState<string>(defaultStationId);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [producedM3, setProducedM3] = useState<string>('140000');
  const [turbidM3, setTurbidM3] = useState<string>('152000');
  const [backwashM3, setBackwashM3] = useState<string>('');
  const [coolingM3, setCoolingM3] = useState<string>('');
  const [nileLevel, setNileLevel] = useState<string>('');

  const [tank1High, setTank1High] = useState<string>('');
  const [tank1Low, setTank1Low] = useState<string>('');
  const [tank2High, setTank2High] = useState<string>('');
  const [tank2Low, setTank2Low] = useState<string>('');

  const [well1High, setWell1High] = useState<string>('');
  const [well1Low, setWell1Low] = useState<string>('');
  const [well2High, setWell2High] = useState<string>('');
  const [well2Low, setWell2Low] = useState<string>('');

  const [pressureHigh, setPressureHigh] = useState<string>('');
  const [pressureLow, setPressureLow] = useState<string>('');

  const [alumSolid, setAlumSolid] = useState<string>('');
  const [alumLiquid, setAlumLiquid] = useState<string>('7.85');
  const [chlorineGas, setChlorineGas] = useState<string>('1.25');
  const [hypochlorite, setHypochlorite] = useState<string>('');

  const [electricityKwh, setElectricityKwh] = useState<string>('34500');
  const [electricityKvar, setElectricityKvar] = useState<string>('16500');

  const [maintPeriodic, setMaintPeriodic] = useState<string>('');
  const [maintRepair, setMaintRepair] = useState<string>('');
  
  const [notes, setNotes] = useState<string>('');
  const [flowMetersOk, setFlowMetersOk] = useState<boolean>(true);
  const [shiftCrew, setShiftCrew] = useState<string>('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedStation = useMemo(() => appStore.stations.find((s) => s.id === stationId), [stationId]);
  const shifts = selectedStation?.static?.shifts || [];

  const activeShiftIndex = useMemo(() => {
    if (shifts.length === 0) return -1;
    const epoch = new Date('2023-12-31').getTime();
    const current = new Date(date).getTime();
    const diffDays = Math.floor((current - epoch) / (1000 * 60 * 60 * 24));
    return ((diffDays % shifts.length) + shifts.length) % shifts.length;
  }, [date, shifts]);

  useEffect(() => {
    if (activeShiftIndex >= 0 && shifts[activeShiftIndex]) {
      setShiftCrew(shifts[activeShiftIndex].crew);
    } else {
      setShiftCrew('');
    }
  }, [activeShiftIndex, shifts]);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    const res = await appStore.addRecord({
      station_id: stationId,
      date,
      produced_m3: prodNum,
      turbid_m3: turbNum,
      backwash_m3: Number(backwashM3) || undefined,
      cooling_m3: Number(coolingM3) || undefined,
      nile_level: Number(nileLevel) || undefined,
      tank1_high: Number(tank1High) || undefined,
      tank1_low: Number(tank1Low) || undefined,
      tank2_high: Number(tank2High) || undefined,
      tank2_low: Number(tank2Low) || undefined,
      well1_high: Number(well1High) || undefined,
      well1_low: Number(well1Low) || undefined,
      well2_high: Number(well2High) || undefined,
      well2_low: Number(well2Low) || undefined,
      pressure_high: Number(pressureHigh) || undefined,
      pressure_low: Number(pressureLow) || undefined,
      alum_solid: Number(alumSolid) || undefined,
      alum_liquid: alumNum,
      chlorine_gas: clNum,
      hypochlorite: Number(hypochlorite) || undefined,
      electricity_kwh: kwhNum,
      electricity_kvar: kvarNum,
      maintenance_periodic: Number(maintPeriodic) || undefined,
      maintenance_repair: Number(maintRepair) || undefined,
      flow_meters_ok: flowMetersOk,
      shift_crew: shiftCrew,
      notes: notes || undefined,
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
            تسجيل إنتاج المياه والعكارة واستهلاكات الكيماويات والكهرباء والمناسيب والضغوط
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
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ClipboardList size={16} />
            <span>المحطة والتاريخ والوردية</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المحطة</label>
              <select
                disabled={!isCentral}
                value={stationId}
                onChange={(e) => {
                  setStationId(e.target.value);
                  setShiftCrew('');
                }}
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
              <select
                value={shiftCrew}
                onChange={(e) => setShiftCrew(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="" disabled>اختر الطاقم</option>
                {shifts.map((shift, index) => {
                  const isTurn = index === activeShiftIndex;
                  return (
                    <option key={shift.id} value={shift.crew}>
                      {shift.label} - {shift.crew} {isTurn ? '* دورها اليوم' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Hydraulic Production */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <Droplets size={16} />
            <span>كميات المياه والكفاءة الهيدروليكية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                المياه العكرة (م³/يوم)
              </label>
              <input
                type="number"
                value={turbidM3}
                onChange={(e) => setTurbidM3(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                منسوب النيل
              </label>
              <input
                type="number"
                step="0.01"
                value={nileLevel}
                onChange={(e) => setNileLevel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                مياه غسيل المرشحات (م³/يوم)
              </label>
              <input
                type="number"
                value={backwashM3}
                onChange={(e) => setBackwashM3(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                مياه تبريد الطلمبات (م³/يوم)
              </label>
              <input
                type="number"
                value={coolingM3}
                onChange={(e) => setCoolingM3(e.target.value)}
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

        {/* Levels and Pressures */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <Gauge size={16} />
            <span>المناسيب والضغوط (حد أقصى / حد أدنى)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">الخزان 1</label>
              <div className="flex gap-2">
                <input type="number" step="0.1" placeholder="أعلى" value={tank1High} onChange={(e) => setTank1High(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
                <input type="number" step="0.1" placeholder="أقل" value={tank1Low} onChange={(e) => setTank1Low(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">الخزان 2</label>
              <div className="flex gap-2">
                <input type="number" step="0.1" placeholder="أعلى" value={tank2High} onChange={(e) => setTank2High(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
                <input type="number" step="0.1" placeholder="أقل" value={tank2Low} onChange={(e) => setTank2Low(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">بيارة مرشحة 1</label>
              <div className="flex gap-2">
                <input type="number" step="0.1" placeholder="أعلى" value={well1High} onChange={(e) => setWell1High(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
                <input type="number" step="0.1" placeholder="أقل" value={well1Low} onChange={(e) => setWell1Low(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">بيارة مرشحة 2</label>
              <div className="flex gap-2">
                <input type="number" step="0.1" placeholder="أعلى" value={well2High} onChange={(e) => setWell2High(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
                <input type="number" step="0.1" placeholder="أقل" value={well2Low} onChange={(e) => setWell2Low(e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200 lg:col-span-2">
              <label className="block text-xs font-bold text-indigo-900 mb-2">الضغوط (بار)</label>
              <div className="flex gap-2">
                <input type="number" step="0.1" placeholder="الضغط الأعلى" value={pressureHigh} onChange={(e) => setPressureHigh(e.target.value)} className="w-1/2 px-2 py-1.5 border border-indigo-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
                <input type="number" step="0.1" placeholder="الضغط الأقل" value={pressureLow} onChange={(e) => setPressureLow(e.target.value)} className="w-1/2 px-2 py-1.5 border border-indigo-300 rounded-lg text-xs font-mono text-center outline-none focus:border-indigo-500" />
              </div>
            </div>
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

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">الشبة السائلة (طن/يوم)</label>
                <input
                  type="number"
                  step="0.001"
                  value={alumLiquid}
                  onChange={(e) => setAlumLiquid(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">الجرعة: {alumDoseGmM3} جم/م³</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الشبة الصلبة (طن)</label>
                <input
                  type="number"
                  step="0.001"
                  value={alumSolid}
                  onChange={(e) => setAlumSolid(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">غاز الكلور (طن/يوم)</label>
                <input
                  type="number"
                  step="0.001"
                  value={chlorineGas}
                  onChange={(e) => setChlorineGas(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">الجرعة: {chlorineDoseGmM3} جم/م³</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">هيبوكلوريد (طن)</label>
                <input
                  type="number"
                  step="0.001"
                  value={hypochlorite}
                  onChange={(e) => setHypochlorite(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Electricity & Maintenance */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={16} />
              <span>الطاقة والصيانة</span>
            </h2>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الطاقة الفعالة (kWh)</label>
                  <input
                    type="number"
                    value={electricityKwh}
                    onChange={(e) => setElectricityKwh(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">غير الفعالة (kvar)</label>
                  <input
                    type="number"
                    value={electricityKvar}
                    onChange={(e) => setElectricityKvar(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
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

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Activity size={12}/> أوامر شغل دوري</label>
                  <input
                    type="number"
                    value={maintPeriodic}
                    onChange={(e) => setMaintPeriodic(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><AlertCircle size={12}/> أوامر شغل إصلاحي</label>
                  <input
                    type="number"
                    value={maintRepair}
                    onChange={(e) => setMaintRepair(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
           <label className="block text-xs font-bold text-slate-700">ملاحظات إضافية (أعطال أو أحداث)</label>
           <textarea
             rows={2}
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
             placeholder="أدخل أي ملاحظات على الوردية هنا..."
             className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
           />
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
