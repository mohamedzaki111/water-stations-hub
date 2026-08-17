import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Droplets, ArrowLeft, Building2, ClipboardEdit, ShieldCheck, Gauge, Zap, FileSpreadsheet } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = appStore.login(username);
    if (!res.ok) {
      setError(res.error || 'اسم المستخدم غير صحيح');
    }
  };

  const handleQuickLogin = (usr: string) => {
    appStore.login(usr);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 select-none dir-rtl font-sans" dir="rtl">
      <div className="max-w-6xl w-full bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
        
        {/* Decorative background glows for the right panel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column (Login Form) - Displayed as right visually in RTL */}
        <div className="w-full lg:w-[450px] bg-white p-10 flex flex-col relative z-10 shrink-0">
          <div className="mb-10">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">تسجيل الدخول</h1>
            <p className="text-xs text-slate-500 mt-2 font-medium">أي كلمة مرور مقبولة في البيئة التجريبية</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 outline-none focus:border-slate-400 focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-400 hover:bg-slate-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>تسجيل الدخول</span>
              <ArrowLeft size={16} />
            </button>
          </form>

          <div className="mt-10">
            <div className="text-xs font-bold text-slate-500 mb-4">حسابات تجريبية:</div>
            
            <div className="space-y-3">
              <button onClick={() => handleQuickLogin('admin')} className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between group transition-all text-right">
                <div className="flex gap-4 items-center">
                  <span className="w-20 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 text-center">admin</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">الإدارة المركزية</div>
                    <div className="text-[10px] text-slate-500">كل المحطات + إدخال البيانات</div>
                  </div>
                </div>
              </button>

              <button onClick={() => handleQuickLogin('giza_mgr')} className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between group transition-all text-right">
                <div className="flex gap-4 items-center">
                  <span className="w-20 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 text-center">giza_mgr</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">مدير محطة الجيزة</div>
                    <div className="text-[10px] text-slate-500">بيانات ثابتة (4 تبويبات) + سجلات</div>
                  </div>
                </div>
              </button>

              <button onClick={() => handleQuickLogin('sally')} className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between group transition-all text-right">
                <div className="flex gap-4 items-center">
                  <span className="w-20 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 text-center">sally</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">سالي — محطة الجيزة</div>
                    <div className="text-[10px] text-slate-500">مسؤول محطة</div>
                  </div>
                </div>
              </button>

              <button onClick={() => handleQuickLogin('imbaba_mgr')} className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between group transition-all text-right">
                <div className="flex gap-4 items-center">
                  <span className="w-20 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 text-center">imbaba_mgr</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">مدير محطة إمبابة</div>
                    <div className="text-[10px] text-slate-500">بيانات ثابتة + سجلات</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Features) - Displayed as left visually in RTL */}
        <div className="flex-1 p-10 flex flex-col relative z-10 justify-center">
          <div className="flex items-center justify-between mb-10 text-white border-b border-slate-800 pb-8">
            <div className="text-right">
              <h1 className="text-2xl font-black text-white">مركز إدارة بيانات محطات المياه</h1>
              <p className="text-xs text-slate-400 mt-2">الشركة القابضة لمياه الشرب والصرف الصحي</p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">إدارة مركزية</div>
                <div className="text-xs text-slate-400">نظرة شاملة على جميع المحطات والمقارنة</div>
              </div>
              <Building2 className="w-6 h-6 text-slate-400" />
            </div>

            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">إدخال يومي</div>
                <div className="text-xs text-slate-400">نموذج مطابق لـ gcww.com.eg/psd/DailyEntries</div>
              </div>
              <ClipboardEdit className="w-6 h-6 text-slate-400" />
            </div>

            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">ملف فني كامل</div>
                <div className="text-xs text-slate-400">4 تبويبات: عام، أهداف، منظومات فنية، نطاق الخدمة</div>
              </div>
              <ShieldCheck className="w-6 h-6 text-slate-400" />
            </div>

            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">تقرير الكيماويات</div>
                <div className="text-xs text-slate-400">مطابق لـ Reports/Chemicals بفلتر القطاع</div>
              </div>
              <FileSpreadsheet className="w-6 h-6 text-slate-400" />
            </div>

            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">مراقبة المعايير</div>
                <div className="text-xs text-slate-400">تنبيه فوري عند الخروج عن الكفاءة أو الكهرباء</div>
              </div>
              <Gauge className="w-6 h-6 text-rose-400" />
            </div>

            <div className="p-4 rounded-xl border border-sky-900/60 bg-sky-900/20 flex items-center justify-between mt-6 hover:bg-sky-900/30 transition-colors">
              <div className="text-right flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <span className="text-sm font-bold text-sky-100">129 سجل حقيقي لمحطة الجيزة (يناير-مايو 2026) </span>
                  <span className="text-xs text-sky-300 block mt-1">بيانات PDF المرفوع مُحدّثة في النظام</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
