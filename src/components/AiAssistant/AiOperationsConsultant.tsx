import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Bot, Loader2, Sparkles, AlertCircle, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AiOperationsConsultant: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [stationId, setStationId] = useState<string>(
    appStore.session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const station = appStore.stations.find((s) => s.id === stationId);
  const stats = appStore.stats(stationId);
  const recentBreakdowns = appStore.getBreakdowns(stationId).slice(0, 5);

  const handleRunAnalysis = async () => {
    setLoading(true);
    setErrorMessage(null);
    setAnalysisText(null);

    try {
      const response = await fetch('/api/ai/analyze-station', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationName: station?.static.general.name || 'محطة مياه',
          date: new Date().toISOString().slice(0, 10),
          stats,
          targets: station?.static.targets,
          recentBreakdowns,
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setAnalysisText(data.text);
      } else {
        setErrorMessage(data.error || 'فشل في استلام التحليل الهندي الذكي');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'تعذر الاتصال بالخادم. تحقق من إعداد مفتاح GEMINI_API_KEY');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <span>المستشار الهندسي الذكي للتشغيل</span>
                <span className="text-[10px] bg-sky-500/30 text-sky-300 font-mono px-2 py-0.5 rounded-md border border-sky-400/30">
                  Gemini 3.6
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                تحليل الكفاءة ورصد الانحرافات واقتراح التوصيات الفنية فوراً
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Station Selector & Configuration */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700">المحطة المراد تحليلها:</label>
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              {appStore.stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.static.general.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-sky-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري معالجة البيانات بالذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>توليد التقرير الهندي الآن</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Body / Report Output */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">تعذر استخراج التحليل</div>
                <div>{errorMessage}</div>
              </div>
            </div>
          )}

          {!analysisText && !loading && !errorMessage && (
            <div className="py-12 text-center text-slate-500 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center border border-sky-100 shadow-inner">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <p className="font-bold text-slate-800 text-sm">
                  اضغط "توليد التقرير الهندسي الآن" للبدء
                </p>
                <p className="text-xs text-slate-500">
                  سيقوم النموذج الذكي بتحليل معدلات الكفاءة، جرعات الكيماويات، معامل القدرة الكهربائي، وفحص التوافق مع المعايير القومية للشركة القابضة.
                </p>
              </div>

              {/* Current Station Metrics Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-4 text-right">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">إجمالي الإنتاج</div>
                  <div className="text-sm font-extrabold text-sky-700">
                    {stats.total_prod.toLocaleString('ar-EG')} م³
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">الكفاءة الحالية</div>
                  <div className={`text-sm font-extrabold ${stats.avg_eff >= (station?.static.targets.efficiency_target || 0.9) ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {(stats.avg_eff * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">كهرباء / م³</div>
                  <div className="text-sm font-extrabold text-slate-800">
                    {stats.avg_kwh_m3.toFixed(4)}
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">الشبة السائلة</div>
                  <div className="text-sm font-extrabold text-emerald-700">
                    {stats.total_alum.toFixed(1)} طن
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="py-16 text-center space-y-4">
              <div className="inline-flex p-4 bg-sky-50 rounded-2xl border border-sky-100 text-sky-600 animate-bounce">
                <Bot className="w-10 h-10" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  يقوم خبير AI بجمع مؤشرات محطة {station?.static.general.name}...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  حساب الفاقد الهيدروليكي، معالجة الجرعات الفعالة، وتحليل خطوط التغذية
                </p>
              </div>
            </div>
          )}

          {analysisText && (
            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200 text-slate-800 text-sm leading-relaxed font-sans space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تقرير هندسي صادر من خبير التشغيل الذكي</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date().toLocaleTimeString('ar-EG')}
                </span>
              </div>
              <div className="markdown-body prose prose-slate max-w-none text-right">
                <ReactMarkdown>{analysisText}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            مطابق للمعايير القياسية للشركة القابضة لمياه الشرب
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
