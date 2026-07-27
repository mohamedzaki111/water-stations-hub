import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { BreakdownRecord } from '../../types';
import { Wrench, AlertTriangle, CheckCircle, Clock, Sparkles, Loader2, Plus, Bot, ShieldAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const BreakdownManager: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const defaultStationId = session?.station?.id || appStore.stations[0]?.id || 'giza';

  const [stationId, setStationId] = useState<string>(defaultStationId);
  const [assetType, setAssetType] = useState<string>('طلمبة عكرة');
  const [assetLabel, setAssetLabel] = useState<string>('');
  const [severity, setSeverity] = useState<'طفيف' | 'متوسط' | 'حرج'>('متوسط');
  const [description, setDescription] = useState<string>('');
  const [capacityReducedPct, setCapacityReducedPct] = useState<number>(15);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState<string>('09:00');

  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);
  const [aiReportMap, setAiReportMap] = useState<Record<string, string>>({});

  const [resolveModalId, setResolveModalId] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [endTime, setEndTime] = useState<string>('14:00');
  const [lossM3, setLossM3] = useState<number>(2500);

  const breakdowns = appStore.getBreakdowns(isCentral ? (stationId || undefined) : defaultStationId);

  const handleAddBreakdown = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetLabel.trim()) return;

    appStore.addBreakdown({
      station_id: stationId,
      asset_type: assetType,
      asset_label: assetLabel,
      severity,
      status: 'جارٍ',
      description,
      start_date: startDate,
      start_time: startTime,
      capacity_reduced_pct: capacityReducedPct,
      created_by: session?.user.id || 'u0',
    });

    setAssetLabel('');
    setDescription('');
  };

  const handleDiagnoseAi = async (bd: BreakdownRecord) => {
    setAiLoadingId(bd.id);
    try {
      const response = await fetch('/api/ai/diagnose-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipmentName: bd.asset_label,
          breakdownType: bd.asset_type,
          description: bd.description,
          severity: bd.severity,
          stationName: appStore.stations.find((s) => s.id === bd.station_id)?.static.general.name || 'محطة مياه',
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setAiReportMap((prev) => ({ ...prev, [bd.id]: data.text }));
      } else {
        alert(data.error || 'فشل تشخيص العطل بالذكاء الاصطناعي');
      }
    } catch (err: any) {
      alert(err.message || 'خطأ في الاتصال بالخادم');
    } finally {
      setAiLoadingId(null);
    }
  };

  const handleResolve = (id: string) => {
    appStore.resolveBreakdown(id, endDate, endTime, lossM3, 0, 'تم إصلاح العطل وعودة المعدة للخدمة');
    setResolveModalId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl">
              <Wrench className="w-6 h-6" />
            </div>
            <span>إدارة الأعطال والتشخيص الفني الذكي</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            تسجيل توقفات المعدات والطلمبات واستدعاء التشخيص الهندي الفوري بالذكاء الاصطناعي
          </p>
        </div>

        {isCentral && (
          <select
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
          >
            <option value="">كافة المحطات</option>
            {appStore.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.static.general.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form to log new breakdown */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Plus size={16} className="text-rose-600" />
            <span>تسجيل بلاغ عطل جديد</span>
          </h2>

          <form onSubmit={handleAddBreakdown} className="space-y-3">
            {isCentral && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المحطة</label>
                <select
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold bg-white"
                >
                  {appStore.stations.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.static.general.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نوع المعدة</label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold bg-white"
                >
                  <option value="طلمبة عكرة">طلمبة عكرة</option>
                  <option value="طلمبة مرشحة">طلمبة مرشحة</option>
                  <option value="مروق">مروق / كوبري كسح</option>
                  <option value="مرشح">مرشح رملي</option>
                  <option value="طلمبة شبة">طلمبة حقن شبة</option>
                  <option value="منظومة كلور">منظومة كلور</option>
                  <option value="محول كهرباء">محول / لوحة جهد</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">خطورة العطل</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold bg-white"
                >
                  <option value="طفيف">طفيف (لا يؤثر)</option>
                  <option value="متوسط">متوسط (تأثير جزئي)</option>
                  <option value="حرج">حرج (توقف الإنتاج)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">مسمى/رقم المعدة المعطلة</label>
              <input
                type="text"
                value={assetLabel}
                onChange={(e) => setAssetLabel(e.target.value)}
                placeholder="مثال: طلمبة KSB عكرة رقم 3"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تأثير العطل على الطاقة %</label>
              <input
                type="number"
                value={capacityReducedPct}
                onChange={(e) => setCapacityReducedPct(+e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ التوقف</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وقت التوقف</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">وصف العطل الظاهري</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل تفاصيل الصوت، الاهتزاز، الحرارة، أسباب التوقف..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              تسجيل بلاغ العطل
            </button>
          </form>
        </div>

        {/* Breakdowns List & AI Diagnoses */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800">
              سجل بلاغات الأعطال والتوقفات ({breakdowns.length} بلاغ)
            </h2>
            <div className="flex gap-2 text-[11px] font-bold">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {breakdowns.filter((b) => b.status === 'جارٍ').length} أعطال جارية
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {breakdowns.filter((b) => b.status === 'مكتمل').length} مكتملة
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {breakdowns.map((bd) => {
              const stName = appStore.stations.find((s) => s.id === bd.station_id)?.static.general.name || bd.station_id;
              const aiText = aiReportMap[bd.id];
              const isLoadingThisAi = aiLoadingId === bd.id;

              return (
                <div key={bd.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          bd.status === 'جارٍ' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {bd.status === 'جارٍ' ? '● جارٍ الإصلاح' : '✓ تم الإصلاح'}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{bd.asset_label}</span>
                      <span className="text-[10px] text-slate-400">({stName})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDiagnoseAi(bd)}
                        disabled={isLoadingThisAi}
                        className="py-1 px-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-[11px] rounded-lg shadow-xs hover:opacity-95 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        {isLoadingThisAi ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Sparkles size={12} className="text-amber-300" />
                        )}
                        <span>تشخيص AI</span>
                      </button>

                      {bd.status === 'جارٍ' && (
                        <button
                          onClick={() => setResolveModalId(bd.id)}
                          className="py-1 px-2.5 bg-emerald-600 text-white font-bold text-[11px] rounded-lg shadow-xs hover:bg-emerald-700 transition-all cursor-pointer"
                        >
                          إغلاق العطل
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700">{bd.description}</p>

                  <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 font-mono">
                    <div>البداية: {bd.start_date} {bd.start_time}</div>
                    {bd.duration_hours && <div>المدة: {bd.duration_hours} ساعة</div>}
                    {bd.production_loss_m3 && <div>الفاقد: {bd.production_loss_m3.toLocaleString('ar-EG')} م³</div>}
                  </div>

                  {/* AI Diagnosis Output Block */}
                  {aiText && (
                    <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
                      <div className="font-bold text-sky-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                        <Bot size={14} className="text-sky-600" />
                        <span>تشخيص الخبير الهندسي الذكي للـ {bd.asset_label}</span>
                      </div>
                      <div className="markdown-body prose prose-slate max-w-none text-right">
                        <ReactMarkdown>{aiText}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resolve Modal */}
      {resolveModalId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 space-y-4 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800">إغلاق بلاغ العطل وتوثيق التوقيت</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الانتهاء</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">وقت الانتهاء</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الفاقد الإنتاجي التقديري (م³)</label>
                <input
                  type="number"
                  value={lossM3}
                  onChange={(e) => setLossM3(+e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResolveModalId(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleResolve(resolveModalId)}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                تأكيد الإصلاح
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
