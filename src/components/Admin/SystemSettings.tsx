import React, { useRef, useState } from 'react';
import { appStore } from '../../store/appStore';
import { Settings, Save, Download, Upload, RefreshCw, Server, Shield, Database, Trash2 } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [companyName, setCompanyName] = useState('الشركة القابضة لمياه الشرب والصرف الصحي');
  const [branchName, setBranchName] = useState('شركة مياه الشرب والصرف الصحي بالجيزة');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const res = appStore.importBackupJson(text);
          if (res.ok) {
            alert(`تم استعادة النسخة الاحتياطية بنجاح (${res.count} سجل)`);
          } else {
            alert(`خطأ في استعادة البيانات: ${res.error}`);
          }
        }
      };
      reader.readAsText(file);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveGeneral = () => {
    alert('تم حفظ الإعدادات العامة بنجاح (محاكاة)');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-white rounded-xl shadow-md">
              <Settings className="w-6 h-6" />
            </div>
            <span>الإعدادات العامة للنظام</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            إدارة الهوية المؤسسية، تفضيلات النظام، والنسخ الاحتياطي للبيانات
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Server className="w-5 h-5 text-indigo-500" />
            <h2 className="font-bold text-slate-800">الهوية والتهيئة العامة</h2>
          </div>
          <div className="p-5 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الجهة الأم (الشركة القابضة)</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الفرع / الشركة التابعة</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div className="pt-2">
              <button onClick={handleSaveGeneral} className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>

        {/* Data Backup & Restore */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Database className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold text-slate-800">قاعدة البيانات والنسخ الاحتياطي</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-1">تصدير البيانات (Backup)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                يقوم بتصدير كافة المحطات، المستخدمين، السجلات اليومية والأعطال في ملف JSON آمن يمكن استعادته لاحقاً.
              </p>
              <button
                onClick={() => appStore.exportBackupJson()}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                تنزيل نسخة احتياطية (JSON)
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-1">استعادة البيانات (Restore)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                استعادة النظام لحالة سابقة من ملف JSON. <span className="text-amber-600 font-bold">تحذير: سيتم دمج أو استبدال البيانات المتعارضة.</span>
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                رفع ملف استعادة
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="md:col-span-2 bg-rose-50 rounded-2xl border border-rose-200 overflow-hidden">
           <div className="px-5 py-4 border-b border-rose-200 flex items-center gap-3 bg-rose-100/50">
            <Shield className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-rose-900">منطقة الخطر (Danger Zone)</h2>
          </div>
          <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-rose-900 mb-1">إعادة ضبط المصنع (Factory Reset)</h3>
              <p className="text-xs text-rose-700/80 max-w-xl leading-relaxed">
                سيؤدي هذا الإجراء إلى مسح كافة البيانات المدخلة واستعادة قواعد البيانات إلى حالتها الأصلية (الافتراضية). هذا الإجراء لا يمكن التراجع عنه.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد تماماً من إرجاع البيانات الافتراضية؟ سيتم مسح كافة سجلاتك الحالية بلا رجعة.')) {
                  appStore.resetToDefaults();
                  alert('تم إعادة تعيين البيانات.');
                }
              }}
              className="shrink-0 px-5 py-2.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 hover:text-rose-800 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة ضبط البيانات
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
