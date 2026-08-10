import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Building2, Save, Layers, Target, Wrench, Users, CheckCircle2 } from 'lucide-react';

const SectionGroup: React.FC<{ title: string; icon?: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-[13px] font-bold text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

const Field: React.FC<{ label: string; span?: number; children: React.ReactNode }> = ({ label, span, children }) => (
  <div className={span ? `col-span-1 sm:col-span-${Math.min(span, 2)} lg:col-span-${Math.min(span, 3)} xl:col-span-${span}` : ''}>
    <label className="block text-[11px] font-bold text-slate-500 mb-1">{label}</label>
    {children}
  </div>
);

export const StationTechnicalProfile: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const [stationId, setStationId] = useState<string>(
    session?.station?.id || (appStore.stations.some(s => s.id === 'giza') ? 'giza' : appStore.stations[0]?.id) || 'giza'
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


  const handleUpdateTechnical = (field: string, value: any) => {
    appStore.updateStatic(station.id, {
      technical: { ...staticData.technical, [field]: value },
    });
  };

  const handleUpdatePump = (group: 'raw_pumps' | 'alum_pumps' | 'clean_pumps', field: string, value: any) => {
    appStore.updateStatic(station.id, {
      technical: { 
        ...staticData.technical, 
        [group]: { ...(staticData.technical as any)[group], [field]: value } 
      },
    });
  };

  const handleUpdateClarifier = (index: number, field: string, value: any) => {
    const newArr = [...(staticData.technical.clarifiers || [])];
    newArr[index] = { ...newArr[index], [field]: value };
    handleUpdateTechnical('clarifiers', newArr);
  };

  const handleUpdateFilter = (index: number, field: string, value: any) => {
    const newArr = [...(staticData.technical.filter_groups || [])];
    newArr[index] = { ...newArr[index], [field]: value };
    handleUpdateTechnical('filter_groups', newArr);
  };

  const handleUpdateZone = (index: number, field: string, value: any) => {
    const newArr = [...(staticData.service_zones || [])];
    newArr[index] = { ...newArr[index], [field]: value };
    appStore.updateStatic(station.id, { service_zones: newArr });
  };

  const handleSave = () => {
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2500);
  };

  const inputClass = "w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <span>الملف الفني والبيانات الثابتة للمحطة</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مسؤول المحطة يمكنه تعديل هذه البيانات — البيانات اليومية تدخلها الإدارة المركزية
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

      {/* Tabs */}
      <div className="flex border-b-2 border-slate-200 mb-5 overflow-x-auto hide-scrollbar">
        {[
          ['general', '📋 البيانات العامة'],
          ['targets', '🎯 المعايير والأهداف'],
          ['technical', '⚙️ الملف الفني'],
          ['zones', '🗺 نطاق الخدمة'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-5 py-3 border-b-[3px] text-[13px] whitespace-nowrap transition-all -mb-[2px] ${
              activeTab === key
                ? 'border-sky-500 text-sky-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700 font-semibold'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div>
            <SectionGroup title="الهوية والموقع" icon="🏷">
              <Field label="الشركة القابضة" span={2}>
                <input type="text" className={inputClass} value={staticData.general.company || ''} onChange={(e) => handleUpdateGeneral('company', e.target.value)} />
              </Field>
              <Field label="الشركة التابعة" span={2}>
                <input type="text" className={inputClass} value={staticData.general.subsidiary || ''} onChange={(e) => handleUpdateGeneral('subsidiary', e.target.value)} />
              </Field>
              <Field label="اسم المحطة">
                <input type="text" className={inputClass} value={staticData.general.name || ''} onChange={(e) => handleUpdateGeneral('name', e.target.value)} />
              </Field>
              <Field label="اسم القطاع">
                <input type="text" className={inputClass} value={staticData.general.sector_name || ''} onChange={(e) => handleUpdateGeneral('sector_name', e.target.value)} />
              </Field>
              <Field label="المحافظة">
                <input type="text" className={inputClass} value={staticData.general.governorate || ''} onChange={(e) => handleUpdateGeneral('governorate', e.target.value)} />
              </Field>
              <Field label="المنطقة">
                <input type="text" className={inputClass} value={staticData.general.region || ''} onChange={(e) => handleUpdateGeneral('region', e.target.value)} />
              </Field>
              <Field label="العنوان" span={2}>
                <input type="text" className={inputClass} value={staticData.general.address || ''} onChange={(e) => handleUpdateGeneral('address', e.target.value)} />
              </Field>
              <Field label="خط العرض GPS">
                <input type="number" step="0.0001" className={inputClass + " font-mono"} value={staticData.general.gps_lat || ''} onChange={(e) => handleUpdateGeneral('gps_lat', +e.target.value)} />
              </Field>
              <Field label="خط الطول GPS">
                <input type="number" step="0.0001" className={inputClass + " font-mono"} value={staticData.general.gps_lng || ''} onChange={(e) => handleUpdateGeneral('gps_lng', +e.target.value)} />
              </Field>
              <Field label="تاريخ الإنشاء">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.year_built || ''} onChange={(e) => handleUpdateGeneral('year_built', +e.target.value)} />
              </Field>
              <Field label="تاريخ دخول الخدمة">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.year_service || ''} onChange={(e) => handleUpdateGeneral('year_service', +e.target.value)} />
              </Field>
            </SectionGroup>

            <SectionGroup title="البيانات التشغيلية" icon="⚡">
              <Field label="الطاقة التصميمية (م³/يوم)">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.capacity_design_m3_day || ''} onChange={(e) => handleUpdateGeneral('capacity_design_m3_day', +e.target.value)} />
              </Field>
              <Field label="الطاقة الفعلية (م³/يوم)">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.capacity_actual_m3_day || ''} onChange={(e) => handleUpdateGeneral('capacity_actual_m3_day', +e.target.value)} />
              </Field>
              <Field label="نوع المحطة">
                <input type="text" className={inputClass} value={staticData.general.station_type || ''} onChange={(e) => handleUpdateGeneral('station_type', e.target.value)} />
              </Field>
              <Field label="مصدر المياه الخام">
                <input type="text" className={inputClass} value={staticData.general.water_source || ''} onChange={(e) => handleUpdateGeneral('water_source', e.target.value)} />
              </Field>
              <Field label="نوع المأخذ">
                <input type="text" className={inputClass} value={staticData.general.intake_type || ''} onChange={(e) => handleUpdateGeneral('intake_type', e.target.value)} />
              </Field>
              <Field label="نوع الشبة">
                <input type="text" className={inputClass} value={staticData.general.alum_type || ''} onChange={(e) => handleUpdateGeneral('alum_type', e.target.value)} />
              </Field>
              <Field label="متوسط جرعة الشبة (جم/م³)">
                <input type="number" step="0.1" className={inputClass + " font-mono"} value={staticData.general.alum_dose_gm_m3 || ''} onChange={(e) => handleUpdateGeneral('alum_dose_gm_m3', +e.target.value)} />
              </Field>
              <Field label="متوسط استهلاك الشبة (طن/شهر)">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.alum_monthly_ton || ''} onChange={(e) => handleUpdateGeneral('alum_monthly_ton', +e.target.value)} />
              </Field>
              <Field label="متوسط استهلاك الكلور (طن/شهر)">
                <input type="number" className={inputClass + " font-mono"} value={staticData.general.chlorine_monthly_ton || ''} onChange={(e) => handleUpdateGeneral('chlorine_monthly_ton', +e.target.value)} />
              </Field>
              <Field label="المقنن المائي">
                <input type="text" className={inputClass} value={staticData.general.water_permit || ''} onChange={(e) => handleUpdateGeneral('water_permit', e.target.value)} />
              </Field>
              <Field label="الحماية المدنية" span={2}>
                <input type="text" className={inputClass} value={staticData.general.civil_protection || ''} onChange={(e) => handleUpdateGeneral('civil_protection', e.target.value)} />
              </Field>
              <Field label="مناطق الخدمة (مفصولة بفاصلة)" span={4}>
                <textarea rows={2} className={inputClass} value={staticData.general.service_areas || ''} onChange={(e) => handleUpdateGeneral('service_areas', e.target.value)} />
              </Field>
            </SectionGroup>
          </div>
        )}

        {/* Tab 2: Targets */}
        {activeTab === 'targets' && (
          <div>
            <SectionGroup title="المستهدفات القياسية المعيارية" icon="🎯">
              <Field label="الكفاءة المستهدفة (0-1)">
                <input type="number" step="0.01" className={inputClass + " font-mono"} value={staticData.targets.efficiency_target || ''} onChange={(e) => handleUpdateTargets('efficiency_target', +e.target.value)} />
              </Field>
              <Field label="الحد الأدنى (كيلوواط/م³)">
                <input type="number" step="0.01" className={inputClass + " font-mono"} value={staticData.targets.kwh_per_m3_min || ''} onChange={(e) => handleUpdateTargets('kwh_per_m3_min', +e.target.value)} />
              </Field>
              <Field label="الحد الأعلى (كيلوواط/م³)">
                <input type="number" step="0.01" className={inputClass + " font-mono"} value={staticData.targets.kwh_per_m3_max || ''} onChange={(e) => handleUpdateTargets('kwh_per_m3_max', +e.target.value)} />
              </Field>
              <Field label="الشبة المستهدفة (كجم/م³)">
                <input type="number" step="0.01" className={inputClass + " font-mono"} value={staticData.targets.alum_per_m3_target || ''} onChange={(e) => handleUpdateTargets('alum_per_m3_target', +e.target.value)} />
              </Field>
              <Field label="الكلور المستهدف (كجم/م³)">
                <input type="number" step="0.01" className={inputClass + " font-mono"} value={staticData.targets.chlorine_per_m3_target || ''} onChange={(e) => handleUpdateTargets('chlorine_per_m3_target', +e.target.value)} />
              </Field>
            </SectionGroup>
          </div>
        )}

        
        {/* Tab 3: Technical */}
        {activeTab === 'technical' && (
          <div className="space-y-8">
            <SectionGroup title="1. مأخذ المحطة" icon="💧">
              <Field label="الحالة الفنية للمأخذ"><input type="text" className={inputClass} value={staticData.technical.intake_condition || ''} onChange={(e) => handleUpdateTechnical('intake_condition', e.target.value)} /></Field>
              <Field label="عدد خطوط السحب"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.intake_lines_count || ''} onChange={(e) => handleUpdateTechnical('intake_lines_count', +e.target.value)} /></Field>
              <Field label="أقطار خطوط السحب" span={2}><input type="text" className={inputClass} value={staticData.technical.intake_diameters || ''} onChange={(e) => handleUpdateTechnical('intake_diameters', e.target.value)} /></Field>
              <Field label="الحالة الفنية للإسكرينات"><input type="text" className={inputClass} value={staticData.technical.screen_condition || ''} onChange={(e) => handleUpdateTechnical('screen_condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="2. بيارات العكرة" icon="🕳">
              <Field label="هل يوجد بيارات عكرة">
                <select className={inputClass} value={staticData.technical.turbid_tank_exists ? 'yes' : 'no'} onChange={(e) => handleUpdateTechnical('turbid_tank_exists', e.target.value === 'yes')}>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </Field>
              <Field label="ملاحظات" span={3}><input type="text" className={inputClass} value={staticData.technical.turbid_tank_notes || ''} onChange={(e) => handleUpdateTechnical('turbid_tank_notes', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="3. طلمبات العكرة" icon="⚙️">
              <Field label="نوع الطلمبة"><input type="text" className={inputClass} value={staticData.technical.raw_pumps?.type || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'type', e.target.value)} /></Field>
              <Field label="الهيد (م)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.raw_pumps?.head_m || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'head_m', +e.target.value)} /></Field>
              <Field label="التصرف (م³/س)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.raw_pumps?.flow_m3h || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'flow_m3h', +e.target.value)} /></Field>
              <Field label="عدد الطلمبات"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.raw_pumps?.count || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'count', +e.target.value)} /></Field>
              <Field label="الجهد/الامبير"><input type="text" className={inputClass} value={staticData.technical.raw_pumps?.voltage || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'voltage', e.target.value)} /></Field>
              <Field label="الحالة الفنية"><input type="text" className={inputClass} value={staticData.technical.raw_pumps?.condition || ''} onChange={(e) => handleUpdatePump('raw_pumps', 'condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="4. طلمبات الشبة" icon="🧪">
              <Field label="نوع الطلمبة"><input type="text" className={inputClass} value={staticData.technical.alum_pumps?.type || ''} onChange={(e) => handleUpdatePump('alum_pumps', 'type', e.target.value)} /></Field>
              <Field label="الهيد (م)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.alum_pumps?.head_m || ''} onChange={(e) => handleUpdatePump('alum_pumps', 'head_m', +e.target.value)} /></Field>
              <Field label="التصرف (م³/س)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.alum_pumps?.flow_m3h || ''} onChange={(e) => handleUpdatePump('alum_pumps', 'flow_m3h', +e.target.value)} /></Field>
              <Field label="عدد الطلمبات"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.alum_pumps?.count || ''} onChange={(e) => handleUpdatePump('alum_pumps', 'count', +e.target.value)} /></Field>
              <Field label="الحالة الفنية"><input type="text" className={inputClass} value={staticData.technical.alum_pumps?.condition || ''} onChange={(e) => handleUpdatePump('alum_pumps', 'condition', e.target.value)} /></Field>
              <Field label="عدد خطوط الحقن"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.alum_injection_lines || ''} onChange={(e) => handleUpdateTechnical('alum_injection_lines', +e.target.value)} /></Field>
              <Field label="ملاحظات" span={2}><input type="text" className={inputClass} value={staticData.technical.alum_injection_notes || ''} onChange={(e) => handleUpdateTechnical('alum_injection_notes', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="5. عنبر حقن الكلور" icon="💨">
              <Field label="نوع الأجهزة"><input type="text" className={inputClass} value={staticData.technical.chlorine_injectors_brand || ''} onChange={(e) => handleUpdateTechnical('chlorine_injectors_brand', e.target.value)} /></Field>
              <Field label="القدرة (كجم/س)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.chlorine_injectors_capacity_kgh || ''} onChange={(e) => handleUpdateTechnical('chlorine_injectors_capacity_kgh', +e.target.value)} /></Field>
              <Field label="عدد الأجهزة الابتدائية"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.chlorine_injectors_primary || ''} onChange={(e) => handleUpdateTechnical('chlorine_injectors_primary', +e.target.value)} /></Field>
              <Field label="عدد الأجهزة النهائية"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.chlorine_injectors_final || ''} onChange={(e) => handleUpdateTechnical('chlorine_injectors_final', +e.target.value)} /></Field>
              <Field label="حالة أجهزة الحقن" span={2}><input type="text" className={inputClass} value={staticData.technical.chlorine_injection_condition || ''} onChange={(e) => handleUpdateTechnical('chlorine_injection_condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="6. منظومة تأمين الكلور" icon="🛡">
              <Field label="نوع التأمين"><input type="text" className={inputClass} value={staticData.technical.chlorine_safety_type || ''} onChange={(e) => handleUpdateTechnical('chlorine_safety_type', e.target.value)} /></Field>
              <Field label="حالة المنظومة"><input type="text" className={inputClass} value={staticData.technical.chlorine_safety_condition || ''} onChange={(e) => handleUpdateTechnical('chlorine_safety_condition', e.target.value)} /></Field>
              <Field label="منظومة الانذار"><input type="text" className={inputClass} value={staticData.technical.chlorine_alarm_condition || ''} onChange={(e) => handleUpdateTechnical('chlorine_alarm_condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="7. المروقات" icon="🌊">
              <div className="col-span-full overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-y border-slate-200">
                      <th className="p-2 font-bold text-slate-700">الماركة</th>
                      <th className="p-2 font-bold text-slate-700">الشكل</th>
                      <th className="p-2 font-bold text-slate-700">العدد</th>
                      <th className="p-2 font-bold text-slate-700">التصرف (م³/س)</th>
                      <th className="p-2 font-bold text-slate-700">حالة كوبري كسح الروبة</th>
                      <th className="p-2 font-bold text-slate-700">الحالة المدنية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticData.technical.clarifiers?.map((c, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="p-2"><input type="text" className={inputClass} value={c.brand || ''} onChange={(e) => handleUpdateClarifier(i, 'brand', e.target.value)} /></td>
                        <td className="p-2"><input type="text" className={inputClass} value={c.shape || ''} onChange={(e) => handleUpdateClarifier(i, 'shape', e.target.value)} /></td>
                        <td className="p-2"><input type="number" className={inputClass + " w-16"} value={c.count || ''} onChange={(e) => handleUpdateClarifier(i, 'count', +e.target.value)} /></td>
                        <td className="p-2"><input type="number" className={inputClass + " w-24"} value={c.flow_m3h || ''} onChange={(e) => handleUpdateClarifier(i, 'flow_m3h', +e.target.value)} /></td>
                        <td className="p-2"><input type="text" className={inputClass} value={c.condition_bridge || ''} onChange={(e) => handleUpdateClarifier(i, 'condition_bridge', e.target.value)} /></td>
                        <td className="p-2"><input type="text" className={inputClass} value={c.condition_civil || ''} onChange={(e) => handleUpdateClarifier(i, 'condition_civil', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionGroup>

            <SectionGroup title="8. المرشحات" icon="🎛">
              <div className="col-span-full overflow-x-auto">
                <table className="w-full text-[11px] text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-y border-slate-200">
                      <th className="p-2 font-bold text-slate-700">النوع</th>
                      <th className="p-2 font-bold text-slate-700">العدد</th>
                      <th className="p-2 font-bold text-slate-700">إجمالي التصرف</th>
                      <th className="p-2 font-bold text-slate-700">وسط الترشيح</th>
                      <th className="p-2 font-bold text-slate-700">الحالة المدنية</th>
                      <th className="p-2 font-bold text-slate-700">حالة المحابس</th>
                      <th className="p-2 font-bold text-slate-700">طلمبات الغسيل</th>
                      <th className="p-2 font-bold text-slate-700">تصرف الغسيل</th>
                      <th className="p-2 font-bold text-slate-700">هيد الغسيل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticData.technical.filter_groups?.map((c, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="p-1"><input type="text" className={inputClass} value={c.type || ''} onChange={(e) => handleUpdateFilter(i, 'type', e.target.value)} /></td>
                        <td className="p-1"><input type="number" className={inputClass + " w-12"} value={c.count || ''} onChange={(e) => handleUpdateFilter(i, 'count', +e.target.value)} /></td>
                        <td className="p-1"><input type="number" className={inputClass + " w-16"} value={c.total_flow_m3h || ''} onChange={(e) => handleUpdateFilter(i, 'total_flow_m3h', +e.target.value)} /></td>
                        <td className="p-1"><input type="text" className={inputClass} value={c.medium || ''} onChange={(e) => handleUpdateFilter(i, 'medium', e.target.value)} /></td>
                        <td className="p-1"><input type="text" className={inputClass} value={c.condition_civil || ''} onChange={(e) => handleUpdateFilter(i, 'condition_civil', e.target.value)} /></td>
                        <td className="p-1"><input type="text" className={inputClass} value={c.condition_valves || ''} onChange={(e) => handleUpdateFilter(i, 'condition_valves', e.target.value)} /></td>
                        <td className="p-1"><input type="number" className={inputClass + " w-12"} value={c.backwash_pump_count || ''} onChange={(e) => handleUpdateFilter(i, 'backwash_pump_count', +e.target.value)} /></td>
                        <td className="p-1"><input type="number" className={inputClass + " w-16"} value={c.backwash_flow_m3h || ''} onChange={(e) => handleUpdateFilter(i, 'backwash_flow_m3h', +e.target.value)} /></td>
                        <td className="p-1"><input type="number" className={inputClass + " w-16"} value={c.backwash_head_m || ''} onChange={(e) => handleUpdateFilter(i, 'backwash_head_m', +e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionGroup>

            <SectionGroup title="9. طلمبات المرشحة (النقية)" icon="⚙️">
              <Field label="نوع الطلمبة"><input type="text" className={inputClass} value={staticData.technical.clean_pumps?.type || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'type', e.target.value)} /></Field>
              <Field label="الهيد (م)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.clean_pumps?.head_m || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'head_m', +e.target.value)} /></Field>
              <Field label="التصرف (م³/س)"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.clean_pumps?.flow_m3h || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'flow_m3h', +e.target.value)} /></Field>
              <Field label="عدد الطلمبات"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.clean_pumps?.count || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'count', +e.target.value)} /></Field>
              <Field label="الجهد/الامبير"><input type="text" className={inputClass} value={staticData.technical.clean_pumps?.voltage || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'voltage', e.target.value)} /></Field>
              <Field label="الحالة الفنية"><input type="text" className={inputClass} value={staticData.technical.clean_pumps?.condition || ''} onChange={(e) => handleUpdatePump('clean_pumps', 'condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="10. الخزانات" icon="🟦">
              <Field label="أنواع الخزانات" span={2}><input type="text" className={inputClass} value={staticData.technical.tank_types || ''} onChange={(e) => handleUpdateTechnical('tank_types', e.target.value)} /></Field>
              <Field label="الحالة المدنية"><input type="text" className={inputClass} value={staticData.technical.tank_ground_condition || ''} onChange={(e) => handleUpdateTechnical('tank_ground_condition', e.target.value)} /></Field>
              <Field label="حالة الخزانات أسفل المرشحات"><input type="text" className={inputClass} value={staticData.technical.tank_filter_condition || ''} onChange={(e) => handleUpdateTechnical('tank_filter_condition', e.target.value)} /></Field>
              <Field label="الهوايات"><input type="text" className={inputClass} value={staticData.technical.tank_vents_condition || ''} onChange={(e) => handleUpdateTechnical('tank_vents_condition', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="11. المعمل" icon="🔬">
              <Field label="هل يوجد معمل">
                <select className={inputClass} value={staticData.technical.lab_exists ? 'yes' : 'no'} onChange={(e) => handleUpdateTechnical('lab_exists', e.target.value === 'yes')}>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </Field>
              <Field label="القياسات المجراة" span={3}><input type="text" className={inputClass} value={staticData.technical.lab_tests || ''} onChange={(e) => handleUpdateTechnical('lab_tests', e.target.value)} /></Field>
            </SectionGroup>

            <SectionGroup title="13 - 16. الكهرباء والأنظمة المساندة" icon="⚡">
              <Field label="عدد مصادر الكهرباء"><input type="number" className={inputClass + " font-mono"} value={staticData.technical.power_sources_count || ''} onChange={(e) => handleUpdateTechnical('power_sources_count', +e.target.value)} /></Field>
              <Field label="هل يوجد مولدات">
                <select className={inputClass} value={staticData.technical.generators_exist ? 'yes' : 'no'} onChange={(e) => handleUpdateTechnical('generators_exist', e.target.value === 'yes')}>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </Field>
              <Field label="المحولات" span={2}><input type="text" className={inputClass} value={staticData.technical.power_transformers || ''} onChange={(e) => handleUpdateTechnical('power_transformers', e.target.value)} /></Field>
              <Field label="نوع عدادات القياس" span={2}><input type="text" className={inputClass} value={staticData.technical.flow_meters_type || ''} onChange={(e) => handleUpdateTechnical('flow_meters_type', e.target.value)} /></Field>
              <Field label="حالة عدادات القياس"><input type="text" className={inputClass} value={staticData.technical.flow_meters_condition || ''} onChange={(e) => handleUpdateTechnical('flow_meters_condition', e.target.value)} /></Field>
              <Field label="معالجة الروبة وصرف الغسيل" span={3}><input type="text" className={inputClass} value={staticData.technical.sludge_treatment || ''} onChange={(e) => handleUpdateTechnical('sludge_treatment', e.target.value)} /></Field>
            </SectionGroup>
          </div>
        )}

        {/* Tab 4: Zones */}
        {activeTab === 'zones' && (
          <div className="space-y-6">
            <h3 className="text-[13px] font-bold text-slate-800 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-base">🗺</span>
              نطاق الخدمة
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-200">
                    <th className="p-3 font-bold text-slate-700">المنطقة</th>
                    <th className="p-3 font-bold text-slate-700">تعداد السكان (بالألف)</th>
                    <th className="p-3 font-bold text-slate-700">نصيب الفرد (لتر/يوم)</th>
                    <th className="p-3 font-bold text-slate-700">العجز (م³/يوم)</th>
                    <th className="p-3 font-bold text-slate-700">نسبة العجز (%)</th>
                    <th className="p-3 font-bold text-slate-700">الحل المؤقت</th>
                    <th className="p-3 font-bold text-slate-700">الحل الدائم</th>
                  </tr>
                </thead>
                <tbody>
                  {staticData.service_zones?.map((z, i) => (
                    <tr key={z.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-2"><input type="text" className={inputClass} value={z.area_name || ''} onChange={(e) => handleUpdateZone(i, 'area_name', e.target.value)} /></td>
                      <td className="p-2"><input type="number" className={inputClass + " w-24"} value={z.population_thousands || ''} onChange={(e) => handleUpdateZone(i, 'population_thousands', +e.target.value)} /></td>
                      <td className="p-2"><input type="number" className={inputClass + " w-24"} value={z.per_capita_liter_day || ''} onChange={(e) => handleUpdateZone(i, 'per_capita_liter_day', +e.target.value)} /></td>
                      <td className="p-2"><input type="number" className={inputClass + " w-24"} value={z.deficit_m3_day || ''} onChange={(e) => handleUpdateZone(i, 'deficit_m3_day', +e.target.value)} /></td>
                      <td className="p-2"><input type="number" className={inputClass + " w-20"} value={z.deficit_pct || ''} onChange={(e) => handleUpdateZone(i, 'deficit_pct', +e.target.value)} /></td>
                      <td className="p-2"><input type="text" className={inputClass} value={z.temp_solution || ''} onChange={(e) => handleUpdateZone(i, 'temp_solution', e.target.value)} /></td>
                      <td className="p-2"><input type="text" className={inputClass} value={z.perm_solution || ''} onChange={(e) => handleUpdateZone(i, 'perm_solution', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

