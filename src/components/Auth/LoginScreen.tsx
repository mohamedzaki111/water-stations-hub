import React, { useState } from 'react';
import { appStore } from '../../store/appStore';
import { Droplets, Shield, User, Lock, ArrowLeft, Building2, KeyRound } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('admin');
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background Subtle Wave Accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 backdrop-blur-md">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-500 to-emerald-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-900/50">
            <Droplets className="w-9 h-9 animate-pulse" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight mt-2">
            مركز بيانات محطات مياه الشرب
          </h1>
          <p className="text-xs text-sky-400 font-medium">
            شركة مياه الشرب والصرف الصحي بالجيزة
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            تسجيل الدخول للمنظومة
          </button>
        </form>

        {/* Demo Quick Accounts */}
        <div className="border-t border-slate-800 pt-5 space-y-2.5">
          <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider flex items-center justify-center gap-1">
            <KeyRound size={12} className="text-sky-400" />
            <span>تسجيل دخول سريع بحسابات الديمو المجهزة:</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickLogin('admin')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-right flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-slate-200">الإدارة المركزية (Central Admin)</div>
                <div className="text-[10px] text-sky-400">اسم المستخدم: admin</div>
              </div>
              <ArrowLeft size={14} className="text-slate-500 group-hover:text-sky-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin('giza_mgr')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-right flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-slate-200">مدير محطة مياه الجيزة</div>
                <div className="text-[10px] text-teal-400">اسم المستخدم: giza_mgr</div>
              </div>
              <ArrowLeft size={14} className="text-slate-500 group-hover:text-teal-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin('sally')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-right flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-slate-200">مهندسة محطة الجيزة (سالي إبراهيم)</div>
                <div className="text-[10px] text-indigo-400">اسم المستخدم: sally</div>
              </div>
              <ArrowLeft size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin('cost_acct')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-right flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-slate-200">محاسب الكيماويات والتكاليف</div>
                <div className="text-[10px] text-amber-400">اسم المستخدم: cost_acct</div>
              </div>
              <ArrowLeft size={14} className="text-slate-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
