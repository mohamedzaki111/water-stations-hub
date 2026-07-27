import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Station } from '../../types';
import { Building2, Save, Layers, Target, Wrench, Users, CheckCircle2 } from 'lucide-react';

export const StationTechnicalProfile: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const [stationId, setStationId] = useState<string>(
    session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [activeTab, setActiveTab] = useState<'general' | 'targets' | 'technical' | 'zones'>('general');
  const [saveMsg, setSaveMsg] = useState<boolean>(false);

  const station = appStore.stations.find((s) => s.id === stationId) || appStore.stations[0];
  const staticData = station.static;

  const handleUpdateGeneral = (field: string, value: any) => {
    appStore.updateStatic(station.id, {
      general: { ...staticData.general, [field]: value },
    });
  };

  const handleUpdateTargets = (field: string, value: any) => {
    appStore.updateStatic(station.id, {
      targets: { ...staticData.targets, [field]: value },
    });
  };

  const handleSave = () => {
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <span>الملف الفني والبيانات الثابتة للمحطة</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مواصفات المأخذ والمروقات والمرشحات وطلمبات العكرة والمرشحة ومناطق الخدمة
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCentral && (
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
            >
              {appStore.stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.static.general.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save size={16} />
            <span>حفظ التحديثات</span>
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>تم حفظ تحديثات الملف الفني بنجاح</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-2 bg-slate-100/60 p-1.5 rounded-2xl">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'general' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers size={16} />
          <span>البيانات العامة للمحطة</span>
        </button>

        <button
          onClick={() => setActiveTab('targets')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'targets' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target size={16} />
          <span>المعدلات القومية والمستهدف</span>
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'technical' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench size={16} />
          <span>المواصفات الهيدروليكية والميكانيكية</span>
        </button>

        <button
          onClick={() => setActiveTab('zones')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'zones' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users size={16} />
          <span>مناطق التغذية والخدمة</span>
        </button>
      </div>

      {/* Tab 1: General */}
      {activeTab === 'general' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
            المعلومات الأساسية والهندسية
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم المحطة الكامل</label>
              <input
                type="text"
                value={staticData.general.name}
                onChange={(e) => handleUpdateGeneral('name', e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الشركة التابعة</label>
              <input
                type="text"
                value={staticData.general.subsidiary}
                onChange={(e) => handleUpdateGeneral('subsidiary', e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المصدر المائي</label>
              <input
                type="text"
                value={staticData.general.water_source}
                onChange={(e) => handleUpdateGeneral('water_source', e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الطاقة التصميمية (م³/يوم)</label>
              <input
                type="number"
                value={staticData.general.capacity_design_m3_day}
                onChange={(e) => handleUpdateGeneral('capacity_design_m3_day', +e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نوع المحطة</label>
              <input
                type="text"
                value={staticData.general.station_type}
                onChange={(e) => handleUpdateGeneral('station_type', e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">سنة الإنشاء</label>
              <input
                type="number"
                value={staticData.general.year_built}
                onChange={(e) => handleUpdateGeneral('year_built', +e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">المناطق المخدومة بالتفصيل</label>
            <textarea
              rows={3}
              value={staticData.general.service_areas}
              onChange={(e) => handleUpdateGeneral('service_areas', e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-xs"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Targets */}
      {activeTab === 'targets' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
            المستهدفات القياسية المعيارية
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نسبة الكفاءة المستهدفة</label>
              <input
                type="number"
                step="0.01"
                value={staticData.targets.efficiency_target}
                onChange={(e) => handleUpdateTargets('efficiency_target', +e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الحد الأدنى للكهرباء (ك.و/م³)</label>
              <input
                type="number"
                step="0.01"
                value={staticData.targets.kwh_per_m3_min}
                onChange={(e) => handleUpdateTargets('kwh_per_m3_min', +e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الحد الأقصى للكهرباء (ك.و/م³)</label>
              <input
                type="number"
                step="0.01"
                value={staticData.targets.kwh_per_m3_max}
                onChange={(e) => handleUpdateTargets('kwh_per_m3_max', +e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Technical Specs */}
      {activeTab === 'technical' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
            المواصفات الهيدروليكية والميكانيكية للمكونات الرئيسية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Raw Water Pumps */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-sky-800">طلمبات العكرة الرئيسية (Raw Water Pumps)</h3>
              <div className="space-y-1 text-slate-700 font-mono">
                <div>النوع / الماركة: {staticData.technical.raw_pumps?.type || '—'}</div>
                <div>العدد: {staticData.technical.raw_pumps?.count || '—'} طلمبات</div>
                <div>الرفع (Head): {staticData.technical.raw_pumps?.head_m || '—'} متر</div>
                <div>التصرف: {staticData.technical.raw_pumps?.flow_m3h || '—'} م³/ساعة</div>
              </div>
            </div>

            {/* Clarifiers */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-teal-800">المروقات (Clarifiers)</h3>
              <div className="space-y-1 text-slate-700">
                {staticData.technical.clarifiers?.map((c, i) => (
                  <div key={i} className="font-mono">
                    • {c.brand} ({c.shape}) — العدد: {c.count} — التصرف: {c.flow_m3h} م³/س
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-indigo-800">المرشحات (Filters)</h3>
              <div className="space-y-1 text-slate-700">
                {staticData.technical.filter_groups?.map((f, i) => (
                  <div key={i} className="font-mono">
                    • {f.type} — العدد: {f.count} — التصرف: {f.total_flow_m3h} م³/س
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Water Pumps */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-emerald-800">طلمبات المرشحة للشبكة (Clean Pumps)</h3>
              <div className="space-y-1 text-slate-700 font-mono">
                <div>النوع: {staticData.technical.clean_pumps?.type || '—'}</div>
                <div>العدد: {staticData.technical.clean_pumps?.count || '—'}</div>
                <div>الرفع: {staticData.technical.clean_pumps?.head_m || '—'} متر</div>
                <div>التصرف: {staticData.technical.clean_pumps?.flow_m3h || '—'} م³/ساعة</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Service Zones */}
      {activeTab === 'zones' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
            مناطق التغذية والتغطية السكانية
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-bold">منطقة التغذية</th>
                  <th className="py-2.5 px-3 font-bold">السكان (بالألف)</th>
                  <th className="py-2.5 px-3 font-bold">نصيب الفرد (لتر/يوم)</th>
                  <th className="py-2.5 px-3 font-bold">العجز الحالي (م³/يوم)</th>
                  <th className="py-2.5 px-3 font-bold">الحل المؤقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staticData.service_zones.map((z) => (
                  <tr key={z.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{z.area_name}</td>
                    <td className="py-2.5 px-3 font-mono">{z.population_thousands} ألف</td>
                    <td className="py-2.5 px-3 font-mono">{z.per_capita_liter_day} لتر</td>
                    <td className="py-2.5 px-3 font-mono text-rose-600 font-bold">
                      {z.deficit_m3_day ? `${z.deficit_m3_day} ألف` : 'لا يوجد عجز'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{z.temp_solution || 'تغذية منتظمة'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
