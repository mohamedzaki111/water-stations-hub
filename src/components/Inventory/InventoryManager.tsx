import React, { useState, useEffect, useMemo } from 'react';
import { appStore, useStore } from '../../store/appStore';
import { api } from '../../store/apiClient';
import {
  Boxes,
  Truck,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  Trash2,
  FileText,
  Clock,
  ShieldCheck,
  Scale,
  Settings,
  Download,
  Search,
  Filter,
  DollarSign,
  Droplets,
  Package,
  Layers,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { ChemicalItemType, InventoryLedgerEntry, SupplyOrder } from '../../types';

export const InventoryManager: React.FC = () => {
  useStore();

  const session = appStore.session;
  const isCentral = session?.isCentral || session?.isSystemAdmin || session?.isAcct;
  const defaultStationId = session?.station?.id || appStore.stations[0]?.id || 'giza';

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'ledger' | 'settings'>('overview');
  const [stationId, setStationId] = useState<string>(defaultStationId);
  const [itemType, setItemType] = useState<ChemicalItemType>('alum_liquid');

  // Search & Filter for Orders
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [orderMonth, setOrderMonth] = useState<string>('');

  // Ledger state
  const [ledgerEntries, setLedgerEntries] = useState<InventoryLedgerEntry[]>([]);
  const [loadingLedger, setLoadingLedger] = useState<boolean>(false);

  // New Supply Order Form State
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [formStationId, setFormStationId] = useState<string>(defaultStationId);
  const [formOrderNumber, setFormOrderNumber] = useState<string>(`توريد-${new Date().getFullYear()}/${String(Math.floor(Math.random() * 900) + 100)}`);
  const [formSupplier, setFormSupplier] = useState<string>('شركة أبو زعبل للأسمدة والمواد الكيماوية');
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [formQtyTons, setFormQtyTons] = useState<string>('25.5');
  const [formUnitPrice, setFormUnitPrice] = useState<string>('3450');
  const [formVehiclePlate, setFormVehiclePlate] = useState<string>('');
  const [formDriverName, setFormDriverName] = useState<string>('');
  const [formInvoiceNumber, setFormInvoiceNumber] = useState<string>('');
  const [formPurityPct, setFormPurityPct] = useState<string>('8.25');
  const [formLabStatus, setFormLabStatus] = useState<'مقبول' | 'مرفوض' | 'تحت الفحص'>('مقبول');
  const [formReceivedBy, setFormReceivedBy] = useState<string>(session?.user?.name || '');
  const [formNotes, setFormNotes] = useState<string>('');

  // Inventory Settings Form State
  const [tankCapacity, setTankCapacity] = useState<number>(120);
  const [openingStock, setOpeningStock] = useState<number>(65.5);
  const [openingStockDate, setOpeningStockDate] = useState<string>('2026-05-01');
  const [reorderLevel, setReorderLevel] = useState<number>(25);
  const [safetyStock, setSafetyStock] = useState<number>(15);

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load Inventory Summary on mount or station/item change
  useEffect(() => {
    appStore.refreshInventory(itemType);
  }, [itemType]);

  // Load Settings when station changes
  useEffect(() => {
    const currentSetting = appStore.inventorySettings.find(
      (s) => s.station_id === stationId && s.item_type === itemType
    );
    if (currentSetting) {
      setTankCapacity(currentSetting.tank_capacity_tons);
      setOpeningStock(currentSetting.opening_stock_tons);
      setOpeningStockDate(currentSetting.opening_stock_date || '2026-05-01');
      setReorderLevel(currentSetting.reorder_level_tons);
      setSafetyStock(currentSetting.safety_stock_tons);
    }
  }, [stationId, itemType, appStore.inventorySettings]);

  // Load Ledger when activeTab === 'ledger' or stationId changes
  useEffect(() => {
    if (activeTab === 'ledger' && stationId && stationId !== 'all') {
      setLoadingLedger(true);
      api.inventory
        .getLedger({ station_id: stationId, item_type: itemType })
        .then((res) => {
          setLedgerEntries(res || []);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingLedger(false);
        });
    }
  }, [activeTab, stationId, itemType, appStore.supplyOrders, appStore.records]);

  // Filter supply orders
  const supplyOrders = useMemo(() => {
    return appStore.getSupplyOrders({
      station_id: stationId === 'all' ? undefined : stationId,
      item_type: itemType,
      month: orderMonth || undefined,
    }).filter((o) => {
      if (!orderSearch) return true;
      const q = orderSearch.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.supplier.toLowerCase().includes(q) ||
        (o.vehicle_plate && o.vehicle_plate.toLowerCase().includes(q)) ||
        (o.driver_name && o.driver_name.toLowerCase().includes(q))
      );
    });
  }, [stationId, itemType, orderMonth, orderSearch, appStore.supplyOrders]);

  // Inventory summaries list
  const summaries = useMemo(() => {
    if (stationId === 'all') return appStore.inventorySummaries;
    return appStore.inventorySummaries.filter((s) => s.station_id === stationId);
  }, [stationId, appStore.inventorySummaries]);

  const selectedSummary = useMemo(() => {
    return (
      appStore.inventorySummaries.find((s) => s.station_id === stationId) ||
      summaries[0] || {
        station_id: stationId,
        station_name: appStore.stations.find((st) => st.id === stationId)?.static.general.name || 'المحطة',
        item_type: itemType,
        item_name: itemType === 'alum_liquid' ? 'شبة سائلة' : 'شبة صلبة',
        tank_capacity: 120,
        opening_stock: 65,
        total_received: 50,
        total_consumed: 30,
        current_stock: 85,
        stock_percentage: 70.8,
        avg_daily_consumption: 5.2,
        days_of_cover: 16.3,
        reorder_level: 25,
        safety_stock: 15,
        status: 'optimal',
      }
    );
  }, [stationId, itemType, summaries, appStore.inventorySummaries]);

  // Aggregated totals across visible stations
  const totals = useMemo(() => {
    const totalCurrent = summaries.reduce((s, x) => s + x.current_stock, 0);
    const totalReceived = summaries.reduce((s, x) => s + x.total_received, 0);
    const totalConsumed = summaries.reduce((s, x) => s + x.total_consumed, 0);
    const totalCapacity = summaries.reduce((s, x) => s + x.tank_capacity, 0);
    const avgDays = summaries.length > 0 ? summaries.reduce((s, x) => s + x.days_of_cover, 0) / summaries.length : 0;
    return {
      current: +totalCurrent.toFixed(2),
      received: +totalReceived.toFixed(2),
      consumed: +totalConsumed.toFixed(2),
      capacity: +totalCapacity.toFixed(2),
      avgDays: +avgDays.toFixed(1),
    };
  }, [summaries]);

  // Submit new supply order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const qty = Number(formQtyTons);
    if (!qty || qty <= 0) {
      setNotification({ type: 'error', text: 'يرجى إدخال كمية توريد صحيحة بالطن' });
      return;
    }

    const unitPrice = Number(formUnitPrice) || undefined;
    const totalCost = unitPrice ? +(qty * unitPrice).toFixed(2) : undefined;

    const res = await appStore.addSupplyOrder({
      station_id: formStationId,
      item_type: itemType,
      item_name: itemType === 'alum_liquid' ? 'شبة سائلة' : 'شبة صلبة',
      order_number: formOrderNumber,
      supplier: formSupplier,
      date: formDate,
      quantity_tons: qty,
      unit_price: unitPrice,
      total_cost: totalCost,
      vehicle_plate: formVehiclePlate || undefined,
      driver_name: formDriverName || undefined,
      invoice_number: formInvoiceNumber || undefined,
      purity_pct: formPurityPct ? Number(formPurityPct) : undefined,
      lab_status: formLabStatus,
      received_by: formReceivedBy || 'أمين المخزن',
      notes: formNotes || undefined,
    });

    if (res.ok) {
      setNotification({
        type: 'success',
        text: `تم تسجيل أمر التوريد ${formOrderNumber} بنجاح وزيادة رصيد مخزن الشبة بمقدار ${qty} طن!`,
      });
      setShowOrderModal(false);
      // Reset some fields
      setFormOrderNumber(`توريد-${new Date().getFullYear()}/${String(Math.floor(Math.random() * 900) + 100)}`);
      setFormVehiclePlate('');
      setFormDriverName('');
      setFormNotes('');
    } else {
      setNotification({ type: 'error', text: res.error || 'فشل في حفظ أمر التوريد' });
    }
  };

  // Delete supply order
  const handleDeleteOrder = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف إذن التوريد هذا؟ سيتم تعديل رصيد المخزون التراكمي تلقائياً.')) {
      const res = await appStore.deleteSupplyOrder(id, itemType);
      if (res.ok) {
        setNotification({ type: 'success', text: 'تم حذف أمر التوريد وتحديث رصيد المخزن بنجاح' });
      } else {
        setNotification({ type: 'error', text: res.error || 'فشل في حذف أمر التوريد' });
      }
    }
  };

  // Save Inventory Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const res = await appStore.updateInventorySettings({
      station_id: stationId,
      item_type: itemType,
      tank_capacity_tons: tankCapacity,
      opening_stock_tons: openingStock,
      opening_stock_date: openingStockDate,
      reorder_level_tons: reorderLevel,
      safety_stock_tons: safetyStock,
    });

    if (res.ok) {
      setNotification({
        type: 'success',
        text: 'تم تحديث سعة الخزانات والأرصدة الافتتاحية بنجاح وإعادة احتساب الرصيد اللحظي.',
      });
    } else {
      setNotification({ type: 'error', text: res.error || 'تعذر حفظ إعدادات المخزون' });
    }
  };

  // Export CSV
  const handleExportLedgerCsv = () => {
    if (!ledgerEntries.length) return;
    const headers = ['التاريخ', 'نوع الحركة', 'رقم المستند/الإذن', 'البيان', 'الوارد (طن)', 'المنصرف (طن)', 'الرصيد المتبقي (طن)', 'المسؤول'];
    const rows = ledgerEntries.map((l) => [
      l.date,
      l.type_label,
      `"${l.reference_no}"`,
      `"${l.description}"`,
      l.in_qty || 0,
      l.out_qty || 0,
      l.balance_after,
      `"${l.actor || ''}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `كشف_حركة_مخزن_الشبة_${stationId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-700 rounded-xl border border-amber-200/80">
              <Boxes className="w-6 h-6" />
            </div>
            <span>إدارة المخازن والمستودعات والكيماويات</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            تتبع أرصدة الشبة الحية، أوامر التوريد والوارد، الخصم المباشر من الاستهلاك، وكشف حركة المخزن
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Item Selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setItemType('alum_liquid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                itemType === 'alum_liquid'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets size={14} />
              <span>الشبة السائلة</span>
            </button>
            <button
              onClick={() => setItemType('alum_solid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                itemType === 'alum_solid'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package size={14} />
              <span>الشبة الصلبة</span>
            </button>
          </div>

          {/* Station Selector */}
          <div className="flex items-center gap-2">
            <select
              value={stationId}
              onChange={(e) => {
                setStationId(e.target.value);
                setFormStationId(e.target.value === 'all' ? appStore.stations[0]?.id : e.target.value);
              }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none shadow-xs"
            >
              {isCentral && <option value="all">جميع المحطات (إجمالي المخزون)</option>}
              {appStore.stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.static.general.name}
                </option>
              ))}
            </select>
          </div>

          {/* New Supply Order Button */}
          <button
            onClick={() => {
              setFormStationId(stationId === 'all' ? appStore.stations[0]?.id || 'giza' : stationId);
              setShowOrderModal(true);
            }}
            className="py-2 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <PlusCircle size={16} />
            <span>تسجيل إذن توريد شحنة (وارد)</span>
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between gap-2.5 shadow-xs transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <span>{notification.text}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-[11px] underline cursor-pointer text-slate-500 hover:text-slate-800"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs max-w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-amber-500/10 text-amber-900 border border-amber-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers size={16} />
          <span>لوحة المخزون والأرصدة الحية</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-amber-500/10 text-amber-900 border border-amber-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck size={16} />
          <span>أوامر التوريد وأذون الإضافة ({supplyOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'ledger'
              ? 'bg-amber-500/10 text-amber-900 border border-amber-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText size={16} />
          <span>كشف حركة المخزن التفصيلي (Ledger)</span>
        </button>

        {stationId !== 'all' && (
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-amber-500/10 text-amber-900 border border-amber-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings size={16} />
            <span>إعدادات سعة الخزانات والأرصدة</span>
          </button>
        )}
      </div>

      {/* TAB 1: OVERVIEW & LIVE STOCK */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Remaining Stock */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">الرصيد الحالي المتبقي</span>
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Boxes size={18} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono mt-2 tracking-tight">
                {stationId === 'all' ? totals.current : selectedSummary.current_stock}{' '}
                <span className="text-xs font-bold text-slate-500">طن</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">نسبة الامتلاء:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {stationId === 'all' ? +((totals.current / (totals.capacity || 1)) * 100).toFixed(1) : selectedSummary.stock_percentage}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, stationId === 'all' ? (totals.current / (totals.capacity || 1)) * 100 : selectedSummary.stock_percentage)}%` }}
                />
              </div>
            </div>

            {/* 2. Total Inward (Supplies) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">إجمالي الوارد (التوريدات)</span>
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                  <ArrowDownRight size={18} />
                </div>
              </div>
              <div className="text-3xl font-black text-sky-700 font-mono mt-2 tracking-tight">
                {stationId === 'all' ? totals.received : selectedSummary.total_received}{' '}
                <span className="text-xs font-bold text-slate-500">طن</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                من واقع أذون التوريد المعتمدة من المعمل
              </div>
            </div>

            {/* 3. Total Outward (Consumption) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">إجمالي المنصرف (الاستهلاك)</span>
                <div className="p-2 rounded-lg bg-orange-50 text-orange-700">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="text-3xl font-black text-orange-700 font-mono mt-2 tracking-tight">
                {stationId === 'all' ? totals.consumed : selectedSummary.total_consumed}{' '}
                <span className="text-xs font-bold text-slate-500">طن</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                مخصومة تلقائياً من تسجيلات التشغيل اليومية
              </div>
            </div>

            {/* 4. Days of Cover & Reorder Alert */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">كفاية المخزون التقديرية</span>
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <Clock size={18} />
                </div>
              </div>
              <div className="text-3xl font-black text-indigo-700 font-mono mt-2 tracking-tight">
                {stationId === 'all' ? totals.avgDays : selectedSummary.days_of_cover}{' '}
                <span className="text-xs font-bold text-slate-500">يوم</span>
              </div>
              <div className="mt-2 text-[11px] flex items-center justify-between">
                <span className="text-slate-500">معدل الاستهلاك:</span>
                <span className="font-mono font-bold text-slate-700">
                  {selectedSummary.avg_daily_consumption} طن/يوم
                </span>
              </div>
            </div>
          </div>

          {/* Stations Inventory Table (When All Stations Selected or Detailed Cards) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Building2 size={16} className="text-amber-600" />
                <span>حالة مخزون {itemType === 'alum_liquid' ? 'الشبة السائلة' : 'الشبة الصلبة'} بمحطات الجيزة</span>
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">
                تحديث لحظي مع كل توريد أو استهلاك يومي
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">المحطة</th>
                    <th className="py-3 px-4 text-center">سعة الخزانات</th>
                    <th className="py-3 px-4 text-center">الرصيد الافتتاحي</th>
                    <th className="py-3 px-4 text-center text-sky-700 bg-sky-50/50">+ الوارد (التوريد)</th>
                    <th className="py-3 px-4 text-center text-orange-700 bg-orange-50/50">- المنصرف (الاستهلاك)</th>
                    <th className="py-3 px-4 text-center text-emerald-800 bg-emerald-50 font-black">= الرصيد المتبقي</th>
                    <th className="py-3 px-4 text-center">نسبة الامتلاء</th>
                    <th className="py-3 px-4 text-center">أيام الكفاية</th>
                    <th className="py-3 px-4 text-center">حالة المخزون</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {summaries.map((s) => {
                    const isLow = s.status === 'low' || s.status === 'critical';
                    return (
                      <tr key={s.station_id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{s.station_name}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-slate-600">{s.tank_capacity} طن</td>
                        <td className="py-3.5 px-4 text-center font-mono text-slate-600">{s.opening_stock} طن</td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-sky-700 bg-sky-50/20">
                          +{s.total_received} طن
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-orange-700 bg-orange-50/20">
                          -{s.total_consumed} طن
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-black text-emerald-800 bg-emerald-50/60 text-sm">
                          {s.current_stock} طن
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-mono font-bold">{s.stock_percentage}%</span>
                            <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  s.stock_percentage > 50
                                    ? 'bg-emerald-500'
                                    : s.stock_percentage > 25
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                                style={{ width: `${s.stock_percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-700">
                          {s.days_of_cover} يوم
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              s.status === 'optimal'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : s.status === 'low'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : s.status === 'critical'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {s.status === 'optimal'
                              ? 'رصيد آمن'
                              : s.status === 'low'
                              ? 'وصل لحد الطلب'
                              : s.status === 'critical'
                              ? 'مخزون حرج'
                              : 'مخزون ممتلئ'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPLY ORDERS & DELIVERIES */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap flex-1">
              <div className="relative min-w-[220px]">
                <Search size={16} className="absolute right-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="بحث برقم الإذن، المورد، رقم السيارة..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-3 pr-9 py-1.5 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600">الشهر:</label>
                <input
                  type="month"
                  value={orderMonth}
                  onChange={(e) => setOrderMonth(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {orderMonth && (
                <button
                  onClick={() => setOrderMonth('')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  إلغاء الفلتر
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">
                إجمالي التوريدات المعروضة: <span className="font-mono text-amber-700 font-black">{supplyOrders.length}</span> إذن
              </span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">رقم الإذن / التاريخ</th>
                    <th className="py-3 px-4">المحطة</th>
                    <th className="py-3 px-4">الشركة الموردة</th>
                    <th className="py-3 px-4 text-center text-amber-800 bg-amber-50/60">الكمية الموردة</th>
                    <th className="py-3 px-4 text-center">السيارة / السائق</th>
                    <th className="py-3 px-4 text-center">تركيز المادة</th>
                    <th className="py-3 px-4 text-center">فحص المعمل</th>
                    <th className="py-3 px-4 text-center">التكلفة الإجمالية</th>
                    <th className="py-3 px-4">المستلم / الملاحظات</th>
                    <th className="py-3 px-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {supplyOrders.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        لا توجد أوامر توريد مسجلة تطابق معايير البحث الحالية
                      </td>
                    </tr>
                  ) : (
                    supplyOrders.map((o) => {
                      const st = appStore.stations.find((s) => s.id === o.station_id);
                      return (
                        <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div>{o.order_number}</div>
                            <div className="text-[10px] text-slate-400 font-mono font-normal">{o.date}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {st?.static.general.name || o.station_id}
                          </td>
                          <td className="py-3.5 px-4 text-slate-800 font-medium">
                            <div>{o.supplier}</div>
                            {o.invoice_number && (
                              <div className="text-[10px] text-slate-400">فاتورة: {o.invoice_number}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-black text-amber-800 bg-amber-50/30 text-sm">
                            +{o.quantity_tons} طن
                          </td>
                          <td className="py-3.5 px-4 text-center text-[11px] text-slate-700">
                            <div>{o.vehicle_plate || '—'}</div>
                            <div className="text-[10px] text-slate-400">{o.driver_name || ''}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono text-[11px] font-bold text-slate-700">
                            {o.purity_pct ? `${o.purity_pct}%` : '—'}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.lab_status === 'مقبول'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : o.lab_status === 'مرفوض'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {o.lab_status || 'مقبول'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                            {o.total_cost ? `${o.total_cost.toLocaleString()} ج.م` : '—'}
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-slate-600">
                            <div className="font-bold">{o.received_by || '—'}</div>
                            {o.notes && <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{o.notes}</div>}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleDeleteOrder(o.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="حذف أمر التوريد"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHRONOLOGICAL STOCK LEDGER */}
      {activeTab === 'ledger' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <FileText size={16} className="text-amber-600" />
                <span>كشف حركة المخزن التفصيلي لـ {appStore.stations.find((s) => s.id === stationId)?.static.general.name || 'المحطة'}</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                حساب الرصيد التراكمي المتبقي سطراً بسطر بعد كل إذن إضافة أو إذن صرف
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportLedgerCsv}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download size={14} />
                <span>تصدير كشف الحركة (CSV)</span>
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">نوع الحركة</th>
                    <th className="py-3 px-4">رقم المستند / الإذن</th>
                    <th className="py-3 px-4">البيان والشرح</th>
                    <th className="py-3 px-4 text-center text-sky-700 bg-sky-50/50">الوارد (+) طن</th>
                    <th className="py-3 px-4 text-center text-orange-700 bg-orange-50/50">المنصرف (-) طن</th>
                    <th className="py-3 px-4 text-center text-emerald-900 bg-emerald-100/60 font-black">الرصيد المتبقي (طن)</th>
                    <th className="py-3 px-4">المسؤول / الوردية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {loadingLedger ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        جاري تحميل كشف حركة المخزن...
                      </td>
                    </tr>
                  ) : ledgerEntries.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        لا توجد حركات مخزنية مسجلة
                      </td>
                    </tr>
                  ) : (
                    ledgerEntries.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{l.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              l.type === 'in'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : l.type === 'out'
                                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {l.type === 'in' && <ArrowDownRight size={12} />}
                            {l.type === 'out' && <ArrowUpRight size={12} />}
                            <span>{l.type_label}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{l.reference_no}</td>
                        <td className="py-3 px-4 text-slate-600">{l.description}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-sky-700 bg-sky-50/20">
                          {l.in_qty > 0 ? `+${l.in_qty}` : '—'}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-orange-700 bg-orange-50/20">
                          {l.out_qty > 0 ? `-${l.out_qty}` : '—'}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-black text-emerald-900 bg-emerald-50/80 text-sm">
                          {l.balance_after} طن
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500">{l.actor || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY SETTINGS */}
      {activeTab === 'settings' && stationId !== 'all' && (
        <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-600" />
              <span>إعدادات سعة الخزانات والأرصدة الافتتاحية للمحطة</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              تحديد سعة الخزانات الكلية والرصيد الافتتاحي وحدود الأمان لإعادة الطلب
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  السعة الإجمالية لخزانات الشبة (طن)
                </label>
                <input
                  type="number"
                  step="1"
                  value={tankCapacity}
                  onChange={(e) => setTankCapacity(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الرصيد الافتتاحي المعتمد (طن)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={openingStock}
                  onChange={(e) => setOpeningStock(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تاريخ الرصيد الافتتاحي
                </label>
                <input
                  type="date"
                  value={openingStockDate}
                  onChange={(e) => setOpeningStockDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  حد إعادة الطلب (Reorder Point) طن
                </label>
                <input
                  type="number"
                  step="1"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  حد الأمان الأدنى (Safety Stock) طن
                </label>
                <input
                  type="number"
                  step="1"
                  value={safetyStock}
                  onChange={(e) => setSafetyStock(+e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              حفظ وتطبيق الإعدادات
            </button>
          </form>
        </div>
      )}

      {/* NEW SUPPLY ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <Truck size={22} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">تسجيل إذن توريد شحنة شبة (وارد جديد)</h3>
                  <p className="text-xs text-slate-500">إضافة كمية للمخزن وتحديث الرصيد المتبقي فوراً</p>
                </div>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المحطة المستلمة</label>
                  <select
                    value={formStationId}
                    onChange={(e) => setFormStationId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {appStore.stations.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.static.general.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم إذن الإضافة / أمر التوريد</label>
                  <input
                    type="text"
                    required
                    value={formOrderNumber}
                    onChange={(e) => setFormOrderNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">الشركة الموردة</label>
                  <input
                    type="text"
                    required
                    value={formSupplier}
                    onChange={(e) => setFormSupplier(e.target.value)}
                    placeholder="مثل: شركة أبو زعبل للأسمدة والكيماويات"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الاستلام والوزن</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوزن الصافي المورد (طن)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formQtyTons}
                    onChange={(e) => setFormQtyTons(e.target.value)}
                    className="w-full px-3 py-2 border border-amber-300 bg-amber-50/40 rounded-xl text-base font-mono font-black text-amber-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">سعر الطن (ج.م - اختياري)</label>
                  <input
                    type="number"
                    step="1"
                    value={formUnitPrice}
                    onChange={(e) => setFormUnitPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم بوليصة الشحن / الفاتورة</label>
                  <input
                    type="text"
                    value={formInvoiceNumber}
                    onChange={(e) => setFormInvoiceNumber(e.target.value)}
                    placeholder="INV-..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم الفنطاس / السيارة</label>
                  <input
                    type="text"
                    value={formVehiclePlate}
                    onChange={(e) => setFormVehiclePlate(e.target.value)}
                    placeholder="مثل: أ ق ر 8532"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم السائق</label>
                  <input
                    type="text"
                    value={formDriverName}
                    onChange={(e) => setFormDriverName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تركيز المادة الفعالة %</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPurityPct}
                    onChange={(e) => setFormPurityPct(e.target.value)}
                    placeholder="8.2%"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">فحص ومطابقة المعمل</label>
                  <select
                    value={formLabStatus}
                    onChange={(e) => setFormLabStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold bg-white outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="مقبول">مقبول (مطابق للمواصفات)</option>
                    <option value="تحت الفحص">تحت الفحص المعملي</option>
                    <option value="مرفوض">مرفوض (لا يضاف للمخزون)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">أمين المخزن / المستلم</label>
                  <input
                    type="text"
                    value={formReceivedBy}
                    onChange={(e) => setFormReceivedBy(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">ملاحظات التفريغ والخزانات</label>
                  <textarea
                    rows={2}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="تم التفريغ في الخزان رقم 1 و 2..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  تأكيد وحفظ إذن التوريد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
