import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Station } from '../../types';
import { Building2, Plus, Power, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

export const StationsManagement: React.FC = () => {
  const [newStationName, setNewStationName] = useState<string>('');
  const [newCapacity, setNewCapacity] = useState<number>(50000);

  const handleToggleStatus = (id: string) => {
    appStore.toggleStation(id);
  };

  const handleAddStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStationName.trim()) return;

    const newId = `st_${Date.now()}`;
    const newStation: Station = {
      id: newId,
      status: 'active',
      static: {
        general: {
          company: 'الشركة القابضة لمياه الشرب والصرف الصحي',
          subsidiary: 'شركة مياه الشرب والصرف الصحي بالجيزة',
          name: newStationName,
          governorate: 'الجيزة',
          region: 'الجيزة',
          address: 'الجيزة',
          sector_name: 'جديد',
          year_built: new Date().getFullYear(),
          year_service: new Date().getFullYear(),
          capacity_design_m3_day: newCapacity,
          capacity_actual_m3_day: newCapacity,
          station_type: 'سطحية',
          water_source: 'نهر النيل',
          intake_type: 'شاطئ',
          alum_type: 'سائلة',
          alum_dose_gm_m3: 45,
          alum_monthly_ton: 50,
          chlorine_monthly_ton: 10,
          water_permit: 'مصرح به',
          service_areas: 'منطقة جديدة'
        },
        targets: {
          efficiency_target: 0.90,
          kwh_per_m3_min: 0.20,
          kwh_per_m3_max: 0.30
        },
        technical: {
          intake_condition: 'جديدة',
          intake_lines_count: 2,
          lab_exists: true,
          power_sources_count: 2,
          generators_exist: false
        },
        service_zones: [],
        shifts: []
      }
    };

    appStore.addStation(newStation);
    setNewStationName('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <span>إدارة المحطات وحالات التشغيل</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            إضافة محطات جديدة وتنشيط أو تعليق عمل المحطات في منظومة شركة الجيزة
          </p>
        </div>
      </div>

      {/* Add New Station Form */}
      <form onSubmit={handleAddStation} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-slate-700 mb-1">اسم المحطة الجديدة</label>
          <input
            type="text"
            value={newStationName}
            onChange={(e) => setNewStationName(e.target.value)}
            placeholder="مثال: محطة مياه أطفيح"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
          />
        </div>

        <div className="w-40">
          <label className="block text-xs font-bold text-slate-700 mb-1">الطاقة التصميمية (م³)</label>
          <input
            type="number"
            value={newCapacity}
            onChange={(e) => setNewCapacity(+e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
          />
        </div>

        <button
          type="submit"
          className="py-2.5 px-5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>إضافة المحطة</span>
        </button>
      </form>

      {/* Stations Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appStore.stations.map((s) => {
          const stats = appStore.stats(s.id);

          return (
            <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{s.static.general.name}</h3>
                  <p className="text-[11px] text-slate-400">{s.static.general.governorate} — {s.static.general.water_source}</p>
                </div>

                <button
                  onClick={() => handleToggleStatus(s.id)}
                  title="تغيير حالة المحطة"
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    s.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                  }`}
                >
                  <Power size={14} />
                  <span>{s.status === 'active' ? 'نشطة' : 'معلقة'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400">الطاقة التصميمية</div>
                  <div className="font-bold text-slate-800">{s.static.general.capacity_design_m3_day.toLocaleString('ar-EG')} م³</div>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400">إجمالي الإنتاج المسجل</div>
                  <div className="font-bold text-sky-700">{stats.total_prod.toLocaleString('ar-EG')} م³</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
