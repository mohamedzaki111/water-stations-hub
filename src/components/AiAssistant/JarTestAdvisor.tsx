import React, { useState, useMemo } from 'react';
import { appStore, useStore } from '../../store/appStore';
import {
  FlaskConical,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  TestTube,
  Calculator,
  Save,
  Trash2,
  TrendingUp,
  TrendingDown,
  Scale,
  Gauge,
  History,
  FileSpreadsheet,
  Clock,
  UserCheck,
  Droplet,
  Info
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const JarTestAdvisor: React.FC = () => {
  useStore(); // Subscribe to store updates

  const session = appStore.session;
  const isCentral = session?.isCentral || session?.isSystemAdmin;
  const defaultStationId = session?.station?.id || appStore.stations[0]?.id || 'giza';

  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');
  const [stationId, setStationId] = useState<string>(defaultStationId);
  const [testDate, setTestDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [testTime, setTestTime] = useState<string>(
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );
  const [shift, setShift] = useState<string>('الوردية الأولى (صباحية)');

  // Raw water parameters
  const [turbidity, setTurbidity] = useState<number>(35);
  const [ph, setPh] = useState<number>(7.8);
  const [temp, setTemp] = useState<number>(24);
  const [rawFlow, setRawFlow] = useState<number>(6000);

  // Alum doses: Lab Jar Test vs Actual Plant Dose
  const empiricalLabDose = +(15 + Math.pow(turbidity, 0.65) * 1.8).toFixed(1);
  const [labAlumDose, setLabAlumDose] = useState<number>(empiricalLabDose);
  const [actualAlumDose, setActualAlumDose] = useState<number>(empiricalLabDose);

  // Additional post-treatment lab parameters
  const [turbiditySettled, setTurbiditySettled] = useState<string>('1.8');
  const [turbidityFiltered, setTurbidityFiltered] = useState<string>('0.35');
  const [residualChlorine, setResidualChlorine] = useState<string>('2.2');
  const [testedBy, setTestedBy] = useState<string>(session?.user?.name || '');
  const [labNotes, setLabNotes] = useState<string>('');

  // History filtering
  const [filterMonth, setFilterMonth] = useState<string>('');

  // AI & Save Status
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiResultText, setAiResultText] = useState<string | null>(null);
  const [aiErrorMsg, setAiErrorMsg] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentStation = appStore.stations.find((s) => s.id === stationId);

  // Auto calculate empirical recommendation
  const handleAutoCalcDose = () => {
    setLabAlumDose(empiricalLabDose);
    setActionMessage({ type: 'success', text: `تم تحديث الجرعة المعملية إلى ${empiricalLabDose} جم/م³ بناءً على معادلة الجار تست القياسية.` });
  };

  // Fetch actual dose from latest daily record of this station
  const handleFetchLatestActualDose = () => {
    const records = appStore.getRecords({ station_id: stationId });
    if (records.length > 0 && records[0].alum_per_m3 > 0) {
      const latestDose = records[0].alum_per_m3;
      setActualAlumDose(latestDose);
      setActionMessage({
        type: 'success',
        text: `تم استيراد الجرعة الفعلية من سجل يوم ${records[0].date}: ${latestDose} جم/م³`,
      });
    } else {
      setActionMessage({
        type: 'error',
        text: 'لا توجد سجلات تشغيلية سابقة لحساب الجرعة الفعلية لهذه المحطة.',
      });
    }
  };

  // Calculations for Lab Dose
  const labAlumKgHr = +((rawFlow * labAlumDose) / 1000).toFixed(2);
  const labAlumLitersHr = +((labAlumKgHr / 1.33) * 10).toFixed(1); // 10% solution density ~1.33 kg/L
  const labAlumLitersMin = +(labAlumLitersHr / 60).toFixed(2);

  // Calculations for Actual Dose
  const actualAlumKgHr = +((rawFlow * actualAlumDose) / 1000).toFixed(2);
  const actualAlumLitersHr = +((actualAlumKgHr / 1.33) * 10).toFixed(1);
  const actualAlumLitersMin = +(actualAlumLitersHr / 60).toFixed(2);

  // Variance & Difference
  const alumDiff = +(actualAlumDose - labAlumDose).toFixed(2);
  const alumDiffPct = labAlumDose > 0 ? +((alumDiff / labAlumDose) * 100).toFixed(1) : 0;
  const alumKgDiffHr = +(actualAlumKgHr - labAlumKgHr).toFixed(2);
  const monthlyTonsDiff = +((alumKgDiffHr * 24 * 30) / 1000).toFixed(2);

  // Chlorine estimation
  const calcChlorinePrimaryPpm = +(1.8 + turbidity * 0.02).toFixed(2);
  const calcChlorinePrimaryKgHr = +((rawFlow * calcChlorinePrimaryPpm) / 1000).toFixed(2);

  // AI Advisor Call
  const handleCalculateAi = async () => {
    setLoadingAi(true);
    setAiErrorMsg(null);
    setAiResultText(null);

    try {
      const response = await fetch('/api/ai/jartest-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turbidityNTU: turbidity,
          pH: ph,
          temperatureC: temp,
          rawFlowM3h: rawFlow,
          stationName: currentStation?.static.general.name || 'محطة الجيزة',
          alumLabDose: labAlumDose,
          alumActualDose: actualAlumDose,
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setAiResultText(data.text);
      } else {
        setAiErrorMsg(data.error || 'تعذر الحصول على توصيات الذكاء الاصطناعي');
      }
    } catch (e: any) {
      setAiErrorMsg(e.message || 'خطأ في الاتصال بالخادم');
    } finally {
      setLoadingAi(false);
    }
  };

  // Save Lab Test Record
  const handleSaveLabRecord = async () => {
    setActionMessage(null);
    if (!stationId || labAlumDose <= 0 || actualAlumDose <= 0) {
      setActionMessage({ type: 'error', text: 'يرجى التأكد من إدخال الجرعة المعملية والجرعة الفعلية بشكل صحيح.' });
      return;
    }

    const payload = {
      station_id: stationId,
      date: testDate,
      time: testTime,
      shift,
      turbidity_raw: turbidity,
      ph_raw: ph,
      temp_raw: temp,
      flow_m3h: rawFlow,
      alum_lab_dose: labAlumDose,
      alum_actual_dose: actualAlumDose,
      alum_diff: alumDiff,
      alum_diff_pct: alumDiffPct,
      turbidity_settled: turbiditySettled ? Number(turbiditySettled) : undefined,
      turbidity_filtered: turbidityFiltered ? Number(turbidityFiltered) : undefined,
      residual_chlorine: residualChlorine ? Number(residualChlorine) : undefined,
      tested_by: testedBy || session?.user?.name || 'فني المعمل',
      notes: labNotes || undefined,
    };

    const res = await appStore.addLabRecord(payload);
    if (res.ok) {
      setActionMessage({
        type: 'success',
        text: `تم حفظ قياس المعمل بنجاح لـ ${currentStation?.static.general.name || 'المحطة'} بتاريخ ${testDate}`,
      });
    } else {
      setActionMessage({ type: 'error', text: res.error || 'تعذر حفظ سجل المعمل' });
    }
  };

  // Delete Lab Record
  const handleDeleteRecord = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السجل المعملي؟')) {
      const res = await appStore.deleteLabRecord(id);
      if (res.ok) {
        setActionMessage({ type: 'success', text: 'تم حذف السجل المعملي بنجاح' });
      } else {
        setActionMessage({ type: 'error', text: res.error || 'فشل في حذف السجل' });
      }
    }
  };

  // Lab records list & stats
  const labRecords = useMemo(() => {
    return appStore.getLabRecords({
      station_id: isCentral ? (stationId === 'all' ? undefined : stationId) : stationId,
      month: filterMonth || undefined,
    });
  }, [stationId, filterMonth, appStore.labRecords, isCentral]);

  const stats = useMemo(() => {
    return appStore.labStats(stationId === 'all' ? undefined : stationId);
  }, [stationId, appStore.labRecords]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-700 rounded-xl border border-teal-200/80">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span>إدارة المعمل وضبط جرعات الشبة (Jar Test & Dosage)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            تحديد الجرعة المعملية ومطابقتها مع الجرعة الفعلية وحساب معدلات حقن الطلمبات وسجل القياسات
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>حاسبة واختبار الجرعات</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-4 h-4" />
              <span>سجل قياسات المعمل ({labRecords.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none shadow-xs"
            >
              {isCentral && <option value="all">جميع المحطات</option>}
              {appStore.stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.static.general.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Notification Message */}
      {actionMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between gap-2.5 transition-all shadow-xs ${
            actionMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-[11px] underline cursor-pointer text-slate-500 hover:text-slate-800"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* TAB 1: CALCULATOR & DOSAGE COMPARISON */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Main Grid: Raw Inputs & Dosage Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column 1: Test & Raw Water Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 space-y-4">
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-4 h-4 text-sky-600" />
                    <span>قياسات المياه الخام بالمأخذ</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">اختبار الجار تست</span>
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الاختبار</label>
                    <input
                      type="date"
                      value={testDate}
                      onChange={(e) => setTestDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">وقت الاختبار</label>
                    <input
                      type="time"
                      value={testTime}
                      onChange={(e) => setTestTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوردية</label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="الوردية الأولى (صباحية)">الوردية الأولى (صباحية: 8 ص - 4 م)</option>
                    <option value="الوردية الثانية (مسائية)">الوردية الثانية (مسائية: 4 م - 12 ص)</option>
                    <option value="الوردية الثالثة (ليلية)">الوردية الثالثة (ليلية: 12 ص - 8 ص)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        عكارة المياه الخام (NTU)
                      </label>
                      <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded">
                        Raw Turbidity
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={turbidity}
                      onChange={(e) => setTurbidity(+e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base font-mono font-black text-sky-900 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        الرقم الهيدروجيني (pH)
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        value={ph}
                        onChange={(e) => setPh(+e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        درجة الحرارة (°م)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={temp}
                        onChange={(e) => setTemp(+e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      تصرف المياه الخام الحالي (م³/ساعة)
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={rawFlow}
                      onChange={(e) => setRawFlow(+e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Additional Treated Water Parameters */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-teal-600" />
                    <span>جودة المياه بعد المعالجة (اختياري)</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">عكارة المروق</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="NTU"
                        value={turbiditySettled}
                        onChange={(e) => setTurbiditySettled(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">عكارة المرشح</label>
                      <input
                        type="number"
                        step="0.05"
                        placeholder="NTU"
                        value={turbidityFiltered}
                        onChange={(e) => setTurbidityFiltered(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">الكلور المتبقي</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="PPM"
                        value={residualChlorine}
                        onChange={(e) => setResidualChlorine(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">فني / كيميائي المعمل</label>
                      <input
                        type="text"
                        value={testedBy}
                        onChange={(e) => setTestedBy(e.target.value)}
                        placeholder="اسم القائم بالاختبار"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">ملاحظات الفحص</label>
                      <input
                        type="text"
                        value={labNotes}
                        onChange={(e) => setLabNotes(e.target.value)}
                        placeholder="سرعة الترسيب، حجم الندف..."
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Dosage Input & Comparison Hub */}
            <div className="lg:col-span-7 space-y-4">
              {/* Dual Dose Entry Cards: Lab vs Actual */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 space-y-4">
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-teal-600" />
                    <span>إدخال ومطابقة جرعات الشبة (Lab vs Actual Alum Dose)</span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">
                    Alum Al2(SO4)3
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Lab Dose */}
                  <div className="p-4 rounded-xl border-2 border-teal-500/40 bg-teal-50/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-teal-950 flex items-center gap-1.5">
                        <FlaskConical className="w-4 h-4 text-teal-600" />
                        <span>الجرعة المعملية للشبة</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoCalcDose}
                        title="حساب الجرعة الاسترشادية حسب العكارة"
                        className="text-[10px] bg-teal-600 hover:bg-teal-700 text-white font-bold px-2 py-1 rounded cursor-pointer transition-colors"
                      >
                        حساب تلقائي ({empiricalLabDose})
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={labAlumDose}
                          onChange={(e) => setLabAlumDose(+e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-teal-300 rounded-xl text-xl font-mono font-black text-teal-900 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-xs font-bold text-teal-800 shrink-0">PPM (جم/م³)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/80 rounded-lg border border-teal-200/60 text-[11px] space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>معدل الحقن الوزني:</span>
                        <span className="font-mono font-bold text-slate-800">{labAlumKgHr} كجم/ساعة</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل ضخ محلول 10%:</span>
                        <span className="font-mono font-bold text-teal-700">{labAlumLitersHr} لتر/ساعة</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>معايرة الطلمبة:</span>
                        <span className="font-mono font-bold">{labAlumLitersMin} لتر/دقيقة</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Actual Plant Dose */}
                  <div className="p-4 rounded-xl border-2 border-indigo-500/40 bg-indigo-50/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-indigo-600" />
                        <span>الجرعة الفعلية بالمحطة</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleFetchLatestActualDose}
                        title="جلب الجرعة الحالية من آخر سجل يومي مسجل للمحطة"
                        className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1 rounded cursor-pointer transition-colors"
                      >
                        جلب من السجل اليومي
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={actualAlumDose}
                          onChange={(e) => setActualAlumDose(+e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xl font-mono font-black text-indigo-900 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-bold text-indigo-800 shrink-0">PPM (جم/م³)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/80 rounded-lg border border-indigo-200/60 text-[11px] space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>معدل الحقن الفعلي:</span>
                        <span className="font-mono font-bold text-slate-800">{actualAlumKgHr} كجم/ساعة</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل ضخ محلول 10%:</span>
                        <span className="font-mono font-bold text-indigo-700">{actualAlumLitersHr} لتر/ساعة</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>معايرة الطلمبة:</span>
                        <span className="font-mono font-bold">{actualAlumLitersMin} لتر/دقيقة</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variance & Status Banner */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between flex-wrap gap-4 ${
                    Math.abs(alumDiffPct) <= 3
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : alumDiff > 0
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl ${
                        Math.abs(alumDiffPct) <= 3
                          ? 'bg-emerald-100 text-emerald-700'
                          : alumDiff > 0
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {Math.abs(alumDiffPct) <= 3 ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : alumDiff > 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-black">
                        {Math.abs(alumDiffPct) <= 3
                          ? '✅ جرعة مثالية متطابقة مع تجربة المعمل'
                          : alumDiff > 0
                          ? '⚠️ فائض في جرعة الشبة (استهلاك زائد)'
                          : '⚠️ عجز في جرعة الشبة (مخاطر جودة الترويب)'}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {Math.abs(alumDiffPct) <= 3
                          ? 'نسبة الانحراف مقبولة تماماً ضمن حدود المعايرة الفنية (±3%)'
                          : alumDiff > 0
                          ? `الجرعة الفعلية أعلى بـ ${alumDiff} جم/م³ — يوصى بخفض شوط الطلمبات لتوفير الكيماويات`
                          : `الجرعة الفعلية أقل بـ ${Math.abs(alumDiff)} جم/م³ — قد يسبب ذلك هروب عكارة للمرشحات`}
                      </div>
                    </div>
                  </div>

                  <div className="text-left font-mono">
                    <div className="text-xs font-bold opacity-75">الانحراف (Variance):</div>
                    <div className="text-lg font-black tracking-tight">
                      {alumDiff >= 0 ? `+${alumDiff}` : alumDiff} <span className="text-xs font-normal">جم/م³</span> ({alumDiffPct >= 0 ? `+${alumDiffPct}` : alumDiffPct}%)
                    </div>
                  </div>
                </div>

                {/* Operations & Chlorine quick cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                    <div className="text-[10px] text-slate-500 font-bold">الكلور الابتدائي</div>
                    <div className="text-base font-black text-indigo-700 mt-1">
                      {calcChlorinePrimaryPpm} <span className="text-[10px] font-normal">PPM</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                    <div className="text-[10px] text-slate-500 font-bold">معدل غاز الكلور</div>
                    <div className="text-base font-black text-amber-700 mt-1">
                      {calcChlorinePrimaryKgHr} <span className="text-[10px] font-normal">كجم/ساعة</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                    <div className="text-[10px] text-slate-500 font-bold">فارق الحقن بالساعة</div>
                    <div className={`text-base font-black mt-1 ${alumKgDiffHr >= 0 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {alumKgDiffHr >= 0 ? `+${alumKgDiffHr}` : alumKgDiffHr} <span className="text-[10px] font-normal">كجم/س</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                    <div className="text-[10px] text-slate-500 font-bold">الأثر الشهري التقديري</div>
                    <div className={`text-base font-black mt-1 ${monthlyTonsDiff >= 0 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {monthlyTonsDiff >= 0 ? `+${monthlyTonsDiff}` : monthlyTonsDiff} <span className="text-[10px] font-normal">طن/شهر</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={handleSaveLabRecord}
                    className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ القياس في سجل المعمل</span>
                  </button>

                  <button
                    onClick={handleCalculateAi}
                    disabled={loadingAi}
                    className="py-3 px-5 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                  >
                    {loadingAi ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري استشارة الذكاء الاصطناعي...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>تحليل وتوصيات الكيميائي الذكي</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Advisor Response Area */}
              {aiErrorMsg && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{aiErrorMsg}</span>
                </div>
              )}

              {aiResultText && (
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>تقرير وتوصيات الكيميائي الذكي للمروقات والمرشحات</span>
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                      توصية هندسية معتمدة
                    </span>
                  </div>
                  <div className="markdown-body prose prose-slate max-w-none text-xs leading-relaxed text-right">
                    <ReactMarkdown>{aiResultText}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAB DOSAGE RECORDS & HISTORY LOG */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500">إجمالي قياسات المعمل</div>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{stats.count}</div>
              <div className="text-[10px] text-slate-400 mt-1">تجارب الجار تست المسجلة</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-teal-600">متوسط الجرعة المعملية</div>
              <div className="text-2xl font-black text-teal-700 mt-1 font-mono">
                {stats.avgLabDose} <span className="text-xs font-normal">PPM</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">الجرعة الموصى بها معملياً</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-indigo-600">متوسط الجرعة الفعلية</div>
              <div className="text-2xl font-black text-indigo-700 mt-1 font-mono">
                {stats.avgActualDose} <span className="text-xs font-normal">PPM</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">المطبقة فعلياً بالمحطة</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-emerald-600">نسبة التطابق والالتزام</div>
              <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
                {stats.matchRatePct}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">ضمن الانحراف المقبول (±5%)</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <label className="text-xs font-bold text-slate-700 ml-2">فلترة بالشهر:</label>
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              {filterMonth && (
                <button
                  onClick={() => setFilterMonth('')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  إلغاء الفلتر
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-bold">
              عرض <span className="font-mono text-teal-700 font-black">{labRecords.length}</span> تجربة معملية
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-3">التاريخ / الوقت</th>
                    <th className="py-3 px-3">المحطة / الوردية</th>
                    <th className="py-3 px-3 text-center">عكارة الخام</th>
                    <th className="py-3 px-3 text-center">pH / حرارة</th>
                    <th className="py-3 px-3 text-center text-teal-700 bg-teal-50/50">جرعة المعمل</th>
                    <th className="py-3 px-3 text-center text-indigo-700 bg-indigo-50/50">الجرعة الفعلية</th>
                    <th className="py-3 px-3 text-center">الانحراف</th>
                    <th className="py-3 px-3 text-center">مروق / مرشح</th>
                    <th className="py-3 px-3">القائم بالاختبار</th>
                    <th className="py-3 px-3 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {labRecords.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        لا توجد قياسات مسجلة للمعمل تطابق البحث الحالي
                      </td>
                    </tr>
                  ) : (
                    labRecords.map((r) => {
                      const st = appStore.stations.find((s) => s.id === r.station_id);
                      const diffPct = r.alum_diff_pct !== undefined ? r.alum_diff_pct : (r.alum_lab_dose > 0 ? +(((r.alum_actual_dose - r.alum_lab_dose) / r.alum_lab_dose) * 100).toFixed(1) : 0);
                      const isMatch = Math.abs(diffPct) <= 5;
                      const isOver = diffPct > 5;

                      return (
                        <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-slate-800">
                            <div>{r.date}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{r.time || '—'}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{st?.static.general.name || r.station_id}</div>
                            <div className="text-[10px] text-slate-400">{r.shift || '—'}</div>
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-sky-800">
                            {r.turbidity_raw} <span className="text-[10px] text-slate-400">NTU</span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-600">
                            {r.ph_raw || '—'} / {r.temp_raw ? `${r.temp_raw}°` : '—'}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-black text-teal-800 bg-teal-50/30">
                            {r.alum_lab_dose} <span className="text-[10px] font-normal">PPM</span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-black text-indigo-800 bg-indigo-50/30">
                            {r.alum_actual_dose} <span className="text-[10px] font-normal">PPM</span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                                isMatch
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : isOver
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {diffPct >= 0 ? `+${diffPct}` : diffPct}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-600">
                            {r.turbidity_settled !== undefined ? `${r.turbidity_settled}` : '—'} / {r.turbidity_filtered !== undefined ? `${r.turbidity_filtered}` : '—'}
                          </td>
                          <td className="py-3 px-3 text-slate-700 font-medium text-[11px]">
                            {r.tested_by || '—'}
                            {r.notes && <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{r.notes}</div>}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleDeleteRecord(r.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="حذف السجل"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
