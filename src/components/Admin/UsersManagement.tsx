import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { User, UserRole } from '../../types';
import { Users, Plus, ShieldCheck, UserCheck, Power } from 'lucide-react';

export const UsersManagement: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<UserRole>('station_admin');
  const [stationId, setStationId] = useState<string>('giza');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !name.trim()) return;

    appStore.addUser({
      username: username.toLowerCase().trim(),
      name,
      role,
      station_id: role === 'station_admin' ? stationId : null,
      active: true,
    });

    setUsername('');
    setName('');
  };

  const handleToggleActive = (user: User) => {
    appStore.updateUser(user.id, { active: !user.active });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <span>إدارة المستخدمين والصلاحيات</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            إضافة حسابات مهندسي المحطات والمحاسبين والإدارة المركزية وتحديد الصلاحيات
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAddUser} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-bold text-slate-700 mb-1">اسم المستخدم (Login)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="مثال: ahmed_eng"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الثلاثي الكامل</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: م. أحمد عبد الفتاح"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
          />
        </div>

        <div className="w-44">
          <label className="block text-xs font-bold text-slate-700 mb-1">الدور الوظيفي / الصلاحية</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold bg-white"
          >
            <option value="system_admin">مدير نظام (System Admin)</option>
            <option value="central_admin">إدارة مركزية (Central Admin)</option>
            <option value="station_admin">مدير/مهندس محطة (Station Admin)</option>
            <option value="cost_accountant">محاسب تكاليف (Cost Accountant)</option>
            <option value="viewer">مشاهد عام (Viewer)</option>
          </select>
        </div>

        {role === 'station_admin' && (
          <div className="w-48">
            <label className="block text-xs font-bold text-slate-700 mb-1">المحطة المخصصة</label>
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

        <button
          type="submit"
          className="py-2.5 px-5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>إضافة الحساب</span>
        </button>
      </form>

      {/* Users List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">اسم المستخدم</th>
                <th className="py-3 px-4 font-bold">الاسم الكامل</th>
                <th className="py-3 px-4 font-bold">الصلاحية</th>
                <th className="py-3 px-4 font-bold">المحطة المخصصة</th>
                <th className="py-3 px-4 font-bold">الحالة</th>
                <th className="py-3 px-4 font-bold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appStore.users.map((u) => {
                const stName = u.station_id
                  ? appStore.stations.find((s) => s.id === u.station_id)?.static.general.name
                  : 'كافة المحطات';

                return (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{u.username}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{u.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-sky-700 font-bold">
                        {u.role === 'system_admin'
                          ? 'مدير نظام'
                          : u.role === 'central_admin'
                          ? 'إدارة مركزية'
                          : u.role === 'station_admin'
                          ? 'مدير محطة'
                          : u.role === 'cost_accountant'
                          ? 'محاسب تكاليف'
                          : 'مشاهد'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{stName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.active ? 'نشط' : 'معطل'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className={`p-1.5 rounded-lg text-xs font-bold ${
                          u.active ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {u.active ? 'تعطيل الحساب' : 'تنشيط الحساب'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
