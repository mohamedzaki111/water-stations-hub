import React, { useState, useMemo, useRef } from 'react';
import { appStore, calculateStats } from '../../store/appStore';
import { DailyRecord } from '../../types';
import { Table, Search, Download, Trash2, Edit3, Check, X, Filter, Calendar } from 'lucide-react';
import { PdfExportButton } from '../Common/PdfExportButton';
import { formatArabicNumber, toArabicDigits } from '../../utils/formatters';

export const RecordsTable: React.FC = () => {
  const session = appStore.session;
  const isCentral = session?.isCentral;
  const initialStation = isCentral ? '' : session?.station?.id || '';

  const [selectedStation, setSelectedStation] = useState<string>(initialStation);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<DailyRecord>>({});
  const tableRef = useRef<HTMLDivElement>(null);

  const filteredRecords = useMemo(() => {
    let list = appStore.getRecords({
      station_id: selectedStation || undefined,
      month: selectedMonth || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (r) => r.date.includes(q) || (r.shift_crew && r.shift_crew.toLowerCase().includes(q))
      );
    }

    return list;
  }, [appStore.records.length, selectedStation, selectedMonth, startDate, endDate, searchTerm]);

  const stats = useMemo(() => calculateStats(filteredRecords), [filteredRecords]);

  const handleStartEdit = (r: DailyRecord) => {
    setEditingId(r.id);
    setEditForm({ ...r });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const res = await appStore.updateRecord(id, editForm);
      if (res && !res.ok) {
        alert(`تعذر حفظ التعديلات: ${res.error}`);
        return;
      }
      setEditingId(null);
    } catch (err: any) {
      alert(`حدث خطأ أثناء الحفظ: ${err?.message || err}`);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متاكد من حذف هذا السجل التشغيلي؟')) {
      appStore.deleteRecord(id);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'التاريخ',
      'المحطة',
      'الإنتاج (م³)',
      'العكرة (م³)',
      'الكفاءة %',
      'الشبة السائلة (طن)',
      'غاز الكلور (طن)',
      'الكهرباء (ك.و.س)',
      'معامل القدرة',
      'طاقم الوردية',
    ];

    const rows = filteredRecords.map((r) => {
      const stName = appStore.stations.find((s) => s.id === r.station_id)?.static.general.name || r.station_id;
      return [
        r.date,
        `"${stName}"`,
        r.produced_m3,
        r.turbid_m3,
        (r.efficiency * 100).toFixed(2),
        r.alum_liquid,
        r.chlorine_gas || 0,
        r.electricity_kwh,
        r.power_factor || '',
        `"${r.shift_crew || ''}"`,
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `water_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-600 rounded-xl">
              <Table className="w-6 h-6" />
            </div>
            <span>سجل البيانات التشغيلية التفصيلي</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            البحث والتصفية والتعديل والتصدير لكافة السجلات اليومية المعتمدة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PdfExportButton
            targetRef={tableRef}
            filename={`سجل_البيانات_التشغيلية_${new Date().toISOString().slice(0, 10)}`}
            variant="dark"
            size="md"
            options={{ orientation: 'landscape' }}
            label="تصدير PDF"
          />

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download size={16} />
            <span>تصدير إكسل (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        {isCentral && (
          <div className="flex-1 min-w-[160px]">
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white outline-none"
            >
              <option value="">جميع المحطات</option>
              {appStore.stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.static.general.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="w-40">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 outline-none"
            placeholder="من تاريخ"
          />
          <span className="text-slate-400 text-xs">إلى</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 outline-none"
            placeholder="إلى تاريخ"
          />
        </div>

        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث بطاقم الوردية أو التاريخ..."
            className="w-full pr-9 pl-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Exportable Container */}
      <div ref={tableRef} id="records-table-printable" className="space-y-6">
        {/* Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <div className="text-[10px] text-slate-400">عدد السجلات</div>
            <div className="text-lg font-bold">{toArabicDigits(stats.count)}</div>
          </div>
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <div className="text-[10px] text-slate-400">إجمالي المياه (م³)</div>
            <div className="text-lg font-bold text-sky-400">
              {formatArabicNumber(stats.total_prod)}
            </div>
          </div>
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <div className="text-[10px] text-slate-400">متوسط الكفاءة</div>
            <div className="text-lg font-bold text-emerald-400">
              {toArabicDigits((stats.avg_eff * 100).toFixed(1))}%
            </div>
          </div>
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <div className="text-[10px] text-slate-400">الشبة الإجمالية (طن)</div>
            <div className="text-lg font-bold text-teal-400">{toArabicDigits(stats.total_alum)}</div>
          </div>
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <div className="text-[10px] text-slate-400">الكهرباء (ك.و.س)</div>
            <div className="text-lg font-bold text-amber-400">
              {formatArabicNumber(stats.total_kwh)}
            </div>
          </div>
        </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                <th className="py-3 px-3 font-bold">التاريخ</th>
                <th className="py-3 px-3 font-bold">المحطة</th>
                <th className="py-3 px-3 font-bold">الإنتاج (م³)</th>
                <th className="py-3 px-3 font-bold">العكرة (م³)</th>
                <th className="py-3 px-3 font-bold">الكفاءة</th>
                <th className="py-3 px-3 font-bold">الشبة (طن)</th>
                <th className="py-3 px-3 font-bold">الكلور (طن)</th>
                <th className="py-3 px-3 font-bold">الكهرباء (ك.و)</th>
                <th className="py-3 px-3 font-bold">معامل القدرة</th>
                <th className="py-3 px-3 font-bold">طاقم الوردية</th>
                <th className="py-3 px-3 font-bold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((r) => {
                const isEditing = editingId === r.id;
                const stName = appStore.stations.find((s) => s.id === r.station_id)?.static.general.name || r.station_id;

                if (isEditing) {
                  return (
                    <tr key={r.id} className="bg-sky-50/60">
                      <td className="py-2 px-2 font-mono font-bold">{r.date}</td>
                      <td className="py-2 px-2 font-bold">{stName}</td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={editForm.produced_m3 ?? r.produced_m3}
                          onChange={(e) => setEditForm({ ...editForm, produced_m3: +e.target.value })}
                          className="w-24 px-2 py-1 border border-slate-300 rounded-md font-mono text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={editForm.turbid_m3 ?? r.turbid_m3}
                          onChange={(e) => setEditForm({ ...editForm, turbid_m3: +e.target.value })}
                          className="w-24 px-2 py-1 border border-slate-300 rounded-md font-mono text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2 font-mono text-slate-500">
                        {(( (editForm.produced_m3 || r.produced_m3) / (editForm.turbid_m3 || r.turbid_m3) ) * 100).toFixed(1)}%
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.alum_liquid ?? r.alum_liquid}
                          onChange={(e) => setEditForm({ ...editForm, alum_liquid: +e.target.value })}
                          className="w-16 px-2 py-1 border border-slate-300 rounded-md font-mono text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.chlorine_gas ?? r.chlorine_gas}
                          onChange={(e) => setEditForm({ ...editForm, chlorine_gas: +e.target.value })}
                          className="w-16 px-2 py-1 border border-slate-300 rounded-md font-mono text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={editForm.electricity_kwh ?? r.electricity_kwh}
                          onChange={(e) => setEditForm({ ...editForm, electricity_kwh: +e.target.value })}
                          className="w-20 px-2 py-1 border border-slate-300 rounded-md font-mono text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2 font-mono">{r.power_factor || '—'}</td>
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={editForm.shift_crew ?? r.shift_crew}
                          onChange={(e) => setEditForm({ ...editForm, shift_crew: e.target.value })}
                          className="w-32 px-2 py-1 border border-slate-300 rounded-md text-xs bg-white"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleSaveEdit(r.id)}
                            className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 rounded bg-slate-300 text-slate-700 hover:bg-slate-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors break-inside-avoid">
                    <td className="py-3 px-3 font-bold text-slate-900">{toArabicDigits(r.date)}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{stName}</td>
                    <td className="py-3 px-3 text-slate-800">{formatArabicNumber(r.produced_m3)}</td>
                    <td className="py-3 px-3 text-slate-600">{formatArabicNumber(r.turbid_m3)}</td>
                    <td className="py-3 px-3 font-bold">
                      <span className={r.efficiency >= 0.9 ? 'text-emerald-600' : 'text-rose-600'}>
                        {toArabicDigits((r.efficiency * 100).toFixed(1))}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-800">{toArabicDigits(r.alum_liquid.toFixed(3))}</td>
                    <td className="py-3 px-3 text-slate-800">{r.chlorine_gas ? toArabicDigits(r.chlorine_gas.toFixed(3)) : '—'}</td>
                    <td className="py-3 px-3 text-slate-800">{formatArabicNumber(r.electricity_kwh)}</td>
                    <td className="py-3 px-3 text-slate-700">{r.power_factor ? toArabicDigits(r.power_factor.toFixed(2)) : '—'}</td>
                    <td className="py-3 px-3 text-slate-500 max-w-[140px] truncate">{r.shift_crew}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleStartEdit(r)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};
