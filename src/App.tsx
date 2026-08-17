import React, { useState, useEffect } from 'react';
import { appStore } from './store/appStore';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { LoginScreen } from './components/Auth/LoginScreen';

import { CentralDashboard } from './components/Dashboard/CentralDashboard';
import { StationDashboard } from './components/Dashboard/StationDashboard';
import { ScadaMonitor } from './components/Scada/ScadaMonitor';
import { DailyDataEntry } from './components/Forms/DailyDataEntry';
import { RecordsTable } from './components/Tables/RecordsTable';
import { MonthlyReport } from './components/Reports/MonthlyReport';
import { MonthlyChartsReport } from './components/Reports/MonthlyChartsReport';
import { ChemicalsReport } from './components/Reports/ChemicalsReport';
import { JarTestAdvisor } from './components/AiAssistant/JarTestAdvisor';
import { InventoryManager } from './components/Inventory/InventoryManager';
import { BreakdownManager } from './components/Breakdowns/BreakdownManager';
import { StationTechnicalProfile } from './components/Stations/StationTechnicalProfile';
import { StationCompare } from './components/Stations/StationCompare';
import { StationsManagement } from './components/Stations/StationsManagement';
import { UsersManagement } from './components/Admin/UsersManagement';
import { SystemSettings } from './components/Admin/SystemSettings';

import { AiOperationsConsultant } from './components/AiAssistant/AiOperationsConsultant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(appStore.page);
  const [session, setSession] = useState(appStore.session);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      setCurrentPage(appStore.page);
      setSession(appStore.session);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!session || currentPage === 'login') {
    return <LoginScreen />;
  }

  const getPageTitle = (page: string) => {
    switch (page) {
      case 'central/dashboard':
        return { title: 'لوحة التحكم المركزية', subtitle: 'نظرة شمولية حية على إنتاج وكفاءة وأعطال محطات مياه الجيزة' };
      case 'central/scada':
      case 'station/scada':
        return { title: 'شاشة المراقبة اللحظية والسكادا', subtitle: 'التتبع المباشر لمناسيب الخزانات والضغوط والعكارة وضخ الكيماويات' };
      case 'central/compare':
        return { title: 'مقارنة الأداء بين المحطات', subtitle: 'مقارنة هيدروليكية وكهربائية وكيماوية شاملة' };
      case 'central/entry':
      case 'station/entry':
        return { title: 'تسجيل البيانات التشغيلية اليومية', subtitle: 'إدخال كميات الإنتاج والكيماويات وقراءات الطاقة الكهربائية' };
      case 'central/records':
      case 'station/records':
        return { title: 'سجل البيانات التفصيلي', subtitle: 'جدول البيانات اليومية مع التصفية والبحث والتعديل والتصدير للإكسل' };
      case 'central/monthly':
      case 'station/monthly':
        return { title: 'التقرير الشهري (جداول البيانات)', subtitle: 'الجداول والإحصائيات التجميعية لإنتاج المياه والكيماويات والطاقة' };
      case 'central/charts':
      case 'station/charts':
        return { title: 'تقرير الرسومات البيانية والتحليلات', subtitle: 'المنحنيات البيانية التفاعلية للإنتاج والكفاءة واستهلاك الطاقة والكيماويات' };
      case 'central/inventory':
      case 'station/inventory':
      case 'acct/inventory':
        return { title: 'إدارة المخازن والمستودعات والكيماويات', subtitle: 'أوامر التوريد والوارد والخصم المباشر من الاستهلاك ورصيد الشبة المتبقي' };
      case 'acct/overview':
      case 'acct/chemicals':
        return { title: 'تقرير الكيماويات والصيانة', subtitle: 'تحليل استهلاك الشبة والكلور وأوامر الشغل وتكاليف التشغيل' };
      case 'central/jartest':
      case 'station/jartest':
        return { title: 'إدارة المعمل وضبط جرعات الشبة (Jar Test)', subtitle: 'إدخال ومطابقة الجرعة المعملية والفعلية ومعدلات ضخ الطلمبات وسجل القياسات' };
      case 'central/breakdowns':
      case 'station/breakdowns':
        return { title: 'إدارة الأعطال والتوقفات', subtitle: 'تسجيل الأعطال والتوقفات واستدعاء التشخيص الفني الذكي' };
      case 'central/stations':
        return { title: 'إدارة المحطات وحالات التشغيل', subtitle: 'تنشيط وتغيير حالات المحطات وإضافة محطات جديدة' };
      case 'central/static':
      case 'station/static':
        return { title: 'الملف الفني والمواصفات الثابتة', subtitle: 'مواصفات المأخذ والمروقات والمرشحات وطلمبات العكرة والمرشحة' };
      case 'system/users':
        return { title: 'إدارة المستخدمين والصلاحيات', subtitle: 'إضافة الحسابات وتحديد مستويات الوصول والأدوار' };
      case 'system/settings':
        return { title: 'الإعدادات العامة والنسخ الاحتياطي', subtitle: 'تهيئة النظام والنسخ الاحتياطي واستعادة البيانات' };
      default:
        return { title: 'مركز بيانات محطات المياه', subtitle: 'شركة مياه الشرب والصرف الصحي بالجيزة' };
    }
  };

  const { title, subtitle } = getPageTitle(currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case 'central/dashboard':
        return <CentralDashboard />;
      case 'station/dashboard':
        return <StationDashboard />;
      case 'central/scada':
      case 'station/scada':
        return <ScadaMonitor />;
      case 'central/compare':
        return <StationCompare />;
      case 'central/entry':
      case 'station/entry':
        return <DailyDataEntry />;
      case 'central/records':
      case 'station/records':
        return <RecordsTable />;
      case 'central/monthly':
      case 'station/monthly':
        return <MonthlyReport />;
      case 'central/charts':
      case 'station/charts':
        return <MonthlyChartsReport />;
      case 'central/inventory':
      case 'station/inventory':
      case 'acct/inventory':
        return <InventoryManager />;
      case 'acct/overview':
      case 'acct/chemicals':
        return <ChemicalsReport />;
      case 'central/jartest':
      case 'station/jartest':
        return <JarTestAdvisor />;
      case 'central/breakdowns':
      case 'station/breakdowns':
        return <BreakdownManager />;
      case 'central/stations':
        return <StationsManagement />;
      case 'central/static':
      case 'station/static':
        return <StationTechnicalProfile />;
      case 'system/users':
        return <UsersManagement />;
      case 'system/settings':
        return <SystemSettings />;
      default:
        return session.isSystemAdmin ? <SystemSettings /> : session.isCentral ? <CentralDashboard /> : <StationDashboard />;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 flex text-slate-900 font-sans text-right">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => appStore.navigate(page)}
        openAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          title={title}
          subtitle={subtitle}
          openAiModal={() => setIsAiModalOpen(true)}
        />

        <main className="flex-1 pb-12">
          {renderContent()}
        </main>
      </div>

      {/* Global AI Operations Assistant Modal */}
      <AiOperationsConsultant
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
