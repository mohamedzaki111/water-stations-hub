import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { FlaskConical, Sparkles, Loader2, Calculator, CheckCircle, AlertCircle, TestTube, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const JarTestAdvisor: React.FC = () => {
  const [stationId, setStationId] = useState<string>(
    appStore.session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [turbidity, setTurbidity] = useState<number>(35);
  const [ph, setPh] = useState<number>(7.8);
  const [temp, setTemp] = useState<number>(24);
  const [rawFlow, setRawFlow] = useState<number>(6000);

  const [loading, setLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentStation = appStore.stations.find((s) => s.id === stationId);

  // Math estimation formula (Jar Test Empirical Approximation)
  const calcAlumDosePpm = +(15 + Math.pow(turbidity, 0.65) * 1.8).toFixed(1);
  const calcAlumKgHr = +((rawFlow * calcAlumDosePpm) / 1000).toFixed(1);
  const calcAlumLitersHr = +((calcAlumKgHr / 1.33) * 10).toFixed(1); // 10% Alum solution density ~1.33 g/ml
  const calcChlorinePrimaryPpm = +(1.8 + turbidity * 0.02).toFixed(2);
  const calcChlorinePrimaryKgHr = +((rawFlow * calcChlorinePrimaryPpm) / 1000).toFixed(2);

  const handleCalculateAi = async () => {
    setLoading(true);
    setErrorMsg(null);
    setResultText(null);

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
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setResultText(data.text);
      } else {
        setErrorMsg(data.error || 'تعذر الحصول على حسابات الجار تست');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-700 rounded-xl border border-teal-200">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span>مستشار المعمل الجار تست (Jar Test Advisor)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            حساب الجرعات المثالية للشبة والكلور ومعدلات ضخ المضخات حسب مواصفات المياه الخام
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700">المحطة:</label>
          <select
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Parameters Box */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <TestTube className="w-4 h-4 text-sky-600" />
            <span>قياسات المياه الخام بالمأخذ</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                درجة العكارة (Turbidity - NTU)
              </label>
              <input
                type="number"
                value={turbidity}
                onChange={(e) => setTurbidity(+e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-left font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الرقم الهيدروجيني (pH)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-left font-mono text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  درجة الحرارة (°م)
                </label>
                <input
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-left font-mono text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-left font-mono font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <button
            onClick={handleCalculateAi}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري استشارة الذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>حساب وتوصيات خبير المعمل الذكي</span>
              </>
            )}
          </button>
        </div>

        {/* Calculated Results & AI Report */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Empirical Calculator Cards */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              الحسابات الرياضية المباشرة (Empirical Estimation)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">جرعة الشبة</div>
                <div className="text-lg font-extrabold text-teal-700 mt-1">
                  {calcAlumDosePpm} <span className="text-xs font-normal">PPM</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">ضخ الشبة 10%</div>
                <div className="text-lg font-extrabold text-sky-700 mt-1">
                  {calcAlumLitersHr} <span className="text-xs font-normal">لتر/ساعة</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">الكلور الابتدائي</div>
                <div className="text-lg font-extrabold text-indigo-700 mt-1">
                  {calcChlorinePrimaryPpm} <span className="text-xs font-normal">PPM</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">معدل غاز الكلور</div>
                <div className="text-lg font-extrabold text-amber-700 mt-1">
                  {calcChlorinePrimaryKgHr} <span className="text-xs font-normal">كجم/ساعة</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Advisor Response */}
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {resultText && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>توصيات الكيميائي الذكي للمروقات والترشيح</span>
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  جاهز للتشغيل
                </span>
              </div>
              <div className="markdown-body prose prose-slate max-w-none text-xs leading-relaxed text-right">
                <ReactMarkdown>{resultText}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
