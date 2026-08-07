import React, { useState, useEffect } from 'react';
import { appStore } from '../../store/appStore';
import { Activity, Pause, Play, Gauge, Droplets, AlertCircle } from 'lucide-react';

// ══════════════════════════════════════════════════════════════
//  SCADA Monitor — Flow & Pressure (مطابق لشاشة Giza Station)
//  Lines: GIZA | HARON | CZECH
// ══════════════════════════════════════════════════════════════

interface LineData {
  name: string;
  nameEn: string;
  pressure?: number;
  flow: number;
  totalFlow: number;
  lastDayFlow: number;
  color: string;
}

const INITIAL: LineData[] = [
  { name:'خط الجيزة',  nameEn:'GIZA LINE',  pressure:3.00, flow:3454.28, totalFlow:38641.14, lastDayFlow:65000.92, color:'#00e5ff' },
  { name:'خط هارون',  nameEn:'HARON LINE', pressure:3.39, flow:3415.32, totalFlow:40337.65, lastDayFlow:81198.37, color:'#69ff47' },
  { name:'خط التشيكي',nameEn:'CZECH LINE', pressure:undefined, flow:2731.20, totalFlow:32905.24, lastDayFlow:63809.16, color:'#ff6d00' },
];

function fluctuate(v: number, range: number) {
  return +(v + (Math.random() * range * 2 - range)).toFixed(2);
}

export const ScadaMonitor: React.FC = () => {
  const [stationId, setStationId] = useState(
    appStore.session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [isRunning, setIsRunning] = useState(true);
  const [lines, setLines] = useState<LineData[]>(INITIAL);
  const [totalizetime] = useState('7 AM');
  const now = new Date();

  const station = appStore.stations.find(s => s.id === stationId);
  const isCentral = appStore.session?.isCentral;

  // Live simulation
  useEffect(() => {
    if (!isRunning) return;
    const t = setInterval(() => {
      setLines(prev => prev.map(l => ({
        ...l,
        pressure: l.pressure != null ? fluctuate(l.pressure, 0.05) : undefined,
        flow:      fluctuate(l.flow, 12),
        totalFlow: +(l.totalFlow + l.flow / 3600).toFixed(2),
      })));
    }, 2000);
    return () => clearInterval(t);
  }, [isRunning]);

  const totalNow  = lines.reduce((s, l) => s + l.flow, 0);
  const totalM3   = lines.reduce((s, l) => s + l.totalFlow, 0);
  const totalLast = lines.reduce((s, l) => s + l.lastDayFlow, 0);

  const Blink = ({ ok }: { ok: boolean }) => (
    <span className={`inline-block w-2 h-2 rounded-full mr-1 ${ok ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}/>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4 font-mono" dir="rtl">

      {/* Header bar — مطابق للشاشة الحقيقية */}
      <div className="bg-[#0a0e1a] border border-[#1e3a5f] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
            <Activity className="w-5 h-5 text-sky-400 animate-pulse"/>
          </div>
          <div>
            <div className="text-white font-bold flex items-center gap-2">
              SCADA Real-Time Telemetry
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${isRunning ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                <Blink ok={isRunning}/>{isRunning ? 'متصل ومباشر' : 'موقوف'}
              </span>
            </div>
            <div className="text-slate-400 text-xs">HYDRAULIC FLOW DIAGRAM — PROCESS CONTROL</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isCentral && (
            <select
              className="bg-[#0d1b2a] border border-slate-700 text-white text-sm rounded-lg px-3 py-1.5"
              value={stationId}
              onChange={e => setStationId(e.target.value)}
            >
              {appStore.stations.map(s => (
                <option key={s.id} value={s.id}>{s.static.general?.name || s.id}</option>
              ))}
            </select>
          )}
          {!isCentral && (
            <span className="text-white text-sm font-bold">{station?.static.general?.name}</span>
          )}
          <button
            onClick={() => setIsRunning(v => !v)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${isRunning ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' : 'bg-green-500/20 text-green-400 border-green-500/40 hover:bg-green-500/30'}`}
          >
            {isRunning ? <><Pause className="w-4 h-4"/> إيقاف</> : <><Play className="w-4 h-4"/> تشغيل</>}
          </button>
        </div>
      </div>

      {/* TOTALIZE TIME */}
      <div className="bg-[#0a0e1a] border border-[#1e3a5f] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">TOTALIZE TIME</div>
            <div className="text-green-400 font-bold text-sm bg-green-900/30 px-3 py-1 rounded border border-green-500/30">{totalizetime}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">TIME</div>
            <div className="text-blue-400 font-bold text-sm bg-blue-900/30 px-3 py-1 rounded border border-blue-500/30">
              {now.toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit'})}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">DATE</div>
            <div className="text-blue-400 font-bold text-sm bg-blue-900/30 px-3 py-1 rounded border border-blue-500/30">
              {now.toLocaleDateString('ar-EG')}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-slate-500 uppercase">معدل التدفق التقديري الكلي</div>
          <div className="text-cyan-400 font-bold text-lg">{totalNow.toLocaleString('ar-EG', {maximumFractionDigits:1})} م³/ساعة</div>
        </div>
      </div>

      {/* Lines Table — مطابق لشاشة الجيزة */}
      <div className="bg-[#0a0e1a] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#0d1b35] border-b border-slate-700">
              <th className="p-3 text-slate-400 text-right font-semibold">الخط / LINE</th>
              <th className="p-3 text-slate-400 text-center font-semibold">
                <div className="flex items-center justify-center gap-1"><Gauge className="w-3 h-3"/> PRESSURE (BAR)</div>
              </th>
              <th className="p-3 text-slate-400 text-center font-semibold">
                <div className="flex items-center justify-center gap-1"><Droplets className="w-3 h-3"/> FLOW (M³/HR)</div>
              </th>
              <th className="p-3 text-slate-400 text-center font-semibold">TOTAL FLOW (M³)</th>
              <th className="p-3 text-slate-400 text-center font-semibold">LAST DAY (M³/DAY)</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/40 transition-colors">
                {/* Line Name */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 rounded-full" style={{background: line.color}}/>
                    <div>
                      <div className="font-bold" style={{color: line.color}}>{line.nameEn}</div>
                      <div className="text-slate-500 text-xs">{line.name}</div>
                    </div>
                  </div>
                </td>
                {/* Pressure */}
                <td className="p-3 text-center">
                  {line.pressure != null ? (
                    <div className="flex flex-col items-center">
                      <div className="text-yellow-300 font-bold text-lg">{line.pressure.toFixed(2)}</div>
                      <div className="text-slate-500 text-[10px]">BAR</div>
                      {/* Mini gauge bar */}
                      <div className="w-20 h-1.5 bg-slate-800 rounded-full mt-1">
                        <div className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
                          style={{width: `${Math.min(100, (line.pressure / 6) * 100)}%`}}/>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-600 text-xs">—</span>
                  )}
                </td>
                {/* Flow */}
                <td className="p-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-lg" style={{color: line.color}}>{line.flow.toLocaleString('en', {maximumFractionDigits:2})}</div>
                    <div className="text-slate-500 text-[10px]">M³/HR</div>
                    {/* Flow bar */}
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{width: `${Math.min(100, (line.flow / 5000) * 100)}%`, background: line.color}}/>
                    </div>
                  </div>
                </td>
                {/* Total Flow */}
                <td className="p-3 text-center">
                  <div className="text-white font-bold">{line.totalFlow.toLocaleString('en', {maximumFractionDigits:2})}</div>
                  <div className="text-slate-500 text-[10px]">M³</div>
                </td>
                {/* Last Day */}
                <td className="p-3 text-center">
                  <div className="text-emerald-400 font-bold">{line.lastDayFlow.toLocaleString('en', {maximumFractionDigits:2})}</div>
                  <div className="text-slate-500 text-[10px]">M³/DAY</div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Totals Row */}
          <tfoot>
            <tr className="bg-[#0d1b35] border-t border-slate-600">
              <td className="p-3 text-slate-300 font-bold">TOTAL</td>
              <td className="p-3 text-center text-slate-500 text-xs">—</td>
              <td className="p-3 text-center">
                <div className="text-cyan-400 font-bold">{totalNow.toLocaleString('en', {maximumFractionDigits:2})}</div>
                <div className="text-slate-500 text-[10px]">M³/HR</div>
              </td>
              <td className="p-3 text-center">
                <div className="text-white font-bold">{totalM3.toLocaleString('en', {maximumFractionDigits:2})}</div>
                <div className="text-slate-500 text-[10px]">M³</div>
              </td>
              <td className="p-3 text-center">
                <div className="text-emerald-400 font-bold">{totalLast.toLocaleString('en', {maximumFractionDigits:2})}</div>
                <div className="text-slate-500 text-[10px]">M³/DAY</div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Quick Nav — FT&PT / PUMPS / LEVEL 1 / LEVEL 2 / ALARMS مثل الشاشة الأصلية */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label:'FT & PT', sub:'Flow & Pressure', icon:'📊', active:true },
          { label:'PUMPS',   sub:'الطلمبات',        icon:'⚡', active:false },
          { label:'LEVEL 1', sub:'خزان 1',           icon:'🏗', active:false },
          { label:'LEVEL 2', sub:'خزان 2',           icon:'🏗', active:false },
          { label:'ALARMS',  sub:'التنبيهات',        icon:'🔔', active:false },
        ].map(btn => (
          <div key={btn.label}
            className={`rounded-xl p-3 text-center cursor-pointer border transition-all ${btn.active ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'}`}
          >
            <div className="text-2xl mb-1">{btn.icon}</div>
            <div className="font-bold text-sm">{btn.label}</div>
            <div className="text-[10px] opacity-70">{btn.sub}</div>
          </div>
        ))}
      </div>

      {/* Status note */}
      <div className="flex items-center gap-2 text-xs text-slate-500 text-center justify-center">
        <AlertCircle className="w-3 h-3"/>
        البيانات محاكاة لحظية — للربط الفعلي بـ SCADA يلزم API اتصال مباشر
      </div>
    </div>
  );
};
