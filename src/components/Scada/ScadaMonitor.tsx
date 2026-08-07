import React, { useState, useEffect } from 'react';
import { appStore } from '../../store/appStore';
import { Activity, Pause, Play, AlertCircle } from 'lucide-react';

// ══════════════════════════════════════════════════════════════
//  SCADA — Giza Station Real-Time Monitor
//  مطابق للشاشة الحقيقية مع البيانات الفعلية
// ══════════════════════════════════════════════════════════════

function fluct(v: number, r: number) { return +(v + (Math.random() * r * 2 - r)).toFixed(2); }

// ── Styled box helper ──────────────────────────────────────────
const Box = ({ label, value, unit, color = '#fff', bg = 'rgba(255,255,255,0.04)', border = '#334155' }: any) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', minWidth: 120 }}>
    <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4, whiteSpace: 'nowrap' }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>{unit}</div>
  </div>
);

// ── Gauge bar ──────────────────────────────────────────────────
const Bar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div style={{ width: '100%', height: 4, background: '#1e293b', borderRadius: 2, marginTop: 4 }}>
    <div style={{ height: '100%', borderRadius: 2, background: color, width: `${Math.min(100, (value / max) * 100)}%`, transition: 'width 1s' }} />
  </div>
);

export const ScadaMonitor: React.FC = () => {
  const [stationId, setStationId] = useState(
    appStore.session?.station?.id || appStore.stations[0]?.id || 'giza'
  );
  const [running, setRunning] = useState(true);

  // ── Filtered water lines (GIZA + HARON) ───────────────────
  const [gizaFlow,  setGizaFlow]  = useState(3454.28);
  const [haronFlow, setHaronFlow] = useState(3415.32);
  const [gizaPres,  setGizaPres]  = useState(3.00);
  const [haronPres, setHaronPres] = useState(3.39);
  const [gizaTotal,  setGizaTotal]  = useState(65000.92);  // LAST DAY
  const [haronTotal, setHaronTotal] = useState(81198.37);  // LAST DAY
  const [filteredTotal] = useState(145261);                // إجمالي المياه المرشحة

  // ── Turbid water line (CZECH = العكرة) ────────────────────
  const [czechFlow,  setCzechFlow]  = useState(2731.20);
  const [czechTotal, setCzechTotal] = useState(63809.16);   // LAST DAY
  const [turbidTotal] = useState(157892);                   // إجمالي المياه العكرة

  // ── Other readings ─────────────────────────────────────────
  const [nileLevel,    setNileLevel]    = useState(17.26);
  const [tank1Level,   setTank1Level]   = useState(4.15);
  const [tank2Level,   setTank2Level]   = useState(4.05);
  const [washLoss,     setWashLoss]     = useState(8684);
  const [gardenIrrig,  setGardenIrrig]  = useState(2075);

  const isCentral = appStore.session?.isCentral;
  const now = new Date();

  // Live simulation
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setGizaFlow(v  => fluct(v,  15));
      setHaronFlow(v => fluct(v,  15));
      setCzechFlow(v => fluct(v,  10));
      setGizaPres(v  => fluct(v,  0.04));
      setHaronPres(v => fluct(v,  0.04));
      setNileLevel(v => fluct(v,  0.01));
      setTank1Level(v => fluct(v, 0.02));
      setTank2Level(v => fluct(v, 0.02));
    }, 2000);
    return () => clearInterval(t);
  }, [running]);

  const filteredNow = gizaFlow + haronFlow;
  const turbidNow   = czechFlow;
  const lossNow     = filteredNow - turbidNow;

  const S: React.CSSProperties = { fontFamily: "'Cairo', monospace, sans-serif", direction: 'rtl' };

  return (
    <div style={{ ...S, padding: 16, maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── Header ── */}
      <div style={{ background: '#0a0e1a', border: '1px solid #1e3a5f', borderRadius: 14, padding: '14px 18px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity style={{ width: 20, height: 20, color: '#38bdf8' }} />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
              SCADA — Real-Time Telemetry
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: running ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: running ? '#4ade80' : '#fbbf24', border: `1px solid ${running ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
                {running ? '● متصل ومباشر' : '⏸ موقوف'}
              </span>
            </div>
            <div style={{ color: '#64748b', fontSize: 11 }}>HYDRAULIC FLOW DIAGRAM — PROCESS CONTROL</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isCentral && (
            <select style={{ background: '#0d1b2a', border: '1px solid #334155', color: '#fff', fontSize: 13, borderRadius: 8, padding: '6px 10px' }}
              value={stationId} onChange={e => setStationId(e.target.value)}>
              {appStore.stations.map(s => <option key={s.id} value={s.id}>{s.static.general?.name || s.id}</option>)}
            </select>
          )}
          <div style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700 }}>{now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</div>
            <div style={{ fontSize: 10 }}>{now.toLocaleDateString('ar-EG')}</div>
          </div>
          <button onClick={() => setRunning(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1px solid ${running ? 'rgba(245,158,11,0.4)' : 'rgba(34,197,94,0.4)'}`, background: running ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)', color: running ? '#fbbf24' : '#4ade80', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
            {running ? <><Pause style={{ width: 14, height: 14 }} /> إيقاف</> : <><Play style={{ width: 14, height: 14 }} /> تشغيل</>}
          </button>
        </div>
      </div>

      {/* ── Section 1: المياه المرشحة (GIZA + HARON) ── */}
      <div style={{ background: '#0a0e1a', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: 'rgba(34,197,94,0.1)', padding: '10px 16px', borderBottom: '1px solid rgba(34,197,94,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#4ade80', fontWeight: 800, fontSize: 14 }}>💧 المياه المرشحة — FILTERED WATER</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b' }}>معدل التدفق الكلي</div>
              <div style={{ color: '#4ade80', fontWeight: 800, fontSize: 18, fontFamily: 'monospace' }}>{filteredNow.toFixed(2)} <span style={{ fontSize: 11 }}>M³/HR</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b' }}>إجمالي المياه المرشحة</div>
              <div style={{ color: '#86efac', fontWeight: 800, fontSize: 18, fontFamily: 'monospace' }}>{filteredTotal.toLocaleString('en')} <span style={{ fontSize: 11 }}>M³</span></div>
            </div>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              {['الخط / LINE', 'PRESSURE (BAR)', 'FLOW (M³/HR)', 'LAST DAY (M³/DAY)'].map(h => (
                <th key={h} style={{ padding: '8px 14px', color: '#64748b', fontWeight: 600, fontSize: 11, textAlign: 'center', borderBottom: '1px solid #1e293b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { nameEn: 'GIZA LINE',  nameAr: 'خط الجيزة',  color: '#00e5ff', pres: gizaPres,  flow: gizaFlow,  lastDay: gizaTotal },
              { nameEn: 'HARON LINE', nameAr: 'خط هارون',   color: '#69ff47', pres: haronPres, flow: haronFlow, lastDay: haronTotal },
            ].map(row => (
              <tr key={row.nameEn} style={{ borderBottom: '1px solid #0f172a' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 3, height: 36, background: row.color, borderRadius: 2 }} />
                    <div>
                      <div style={{ color: row.color, fontWeight: 800, fontSize: 13 }}>{row.nameEn}</div>
                      <div style={{ color: '#64748b', fontSize: 11 }}>{row.nameAr}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <div style={{ color: '#fde68a', fontWeight: 800, fontSize: 20, fontFamily: 'monospace' }}>{row.pres.toFixed(2)}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>BAR</div>
                  <Bar value={row.pres} max={6} color="#fde68a" />
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <div style={{ color: row.color, fontWeight: 800, fontSize: 20, fontFamily: 'monospace' }}>{row.flow.toFixed(2)}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>M³/HR</div>
                  <Bar value={row.flow} max={5000} color={row.color} />
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <div style={{ color: '#86efac', fontWeight: 700, fontSize: 16, fontFamily: 'monospace' }}>{row.lastDay.toLocaleString('en', { maximumFractionDigits: 2 })}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>M³/DAY</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Section 2: المياه العكرة (CZECH) ── */}
      <div style={{ background: '#0a0e1a', border: '1px solid rgba(251,146,60,0.3)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: 'rgba(251,146,60,0.1)', padding: '10px 16px', borderBottom: '1px solid rgba(251,146,60,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fb923c', fontWeight: 800, fontSize: 14 }}>🔶 المياه العكرة — TURBID WATER (CZECH LINE)</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b' }}>معدل التدفق</div>
              <div style={{ color: '#fb923c', fontWeight: 800, fontSize: 18, fontFamily: 'monospace' }}>{turbidNow.toFixed(2)} <span style={{ fontSize: 11 }}>M³/HR</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b' }}>إجمالي المياه العكرة</div>
              <div style={{ color: '#fdba74', fontWeight: 800, fontSize: 18, fontFamily: 'monospace' }}>{turbidTotal.toLocaleString('en')} <span style={{ fontSize: 11 }}>M³</span></div>
            </div>
          </div>
        </div>
        <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 3, height: 36, background: '#fb923c', borderRadius: 2 }} />
            <div>
              <div style={{ color: '#fb923c', fontWeight: 800 }}>CZECH LINE</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>خط التشيكي</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fb923c', fontWeight: 800, fontSize: 28, fontFamily: 'monospace' }}>{czechFlow.toFixed(2)} <span style={{ fontSize: 14, color: '#64748b' }}>M³/HR</span></div>
            <Bar value={czechFlow} max={5000} color="#fb923c" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#64748b' }}>LAST DAY</div>
            <div style={{ color: '#fdba74', fontWeight: 700, fontSize: 18, fontFamily: 'monospace' }}>{czechTotal.toLocaleString('en')}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>M³/DAY</div>
          </div>
        </div>
      </div>

      {/* ── Section 3: ملخص الفاقد والإجماليات ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        <Box label="إجمالي المياه المرشحة" value={filteredTotal.toLocaleString('en')} unit="M³" color="#4ade80" bg="rgba(34,197,94,0.08)" border="rgba(34,197,94,0.25)" />
        <Box label="إجمالي المياه العكرة" value={turbidTotal.toLocaleString('en')} unit="M³" color="#fb923c" bg="rgba(251,146,60,0.08)" border="rgba(251,146,60,0.25)" />
        <Box label="فاقد الغسيل" value={washLoss.toLocaleString('en')} unit="M³" color="#f87171" bg="rgba(248,113,113,0.08)" border="rgba(248,113,113,0.25)" />
      </div>

      {/* ── Section 4: منسوب النيل والخزانات وري الحدائق ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>🌊 منسوب النيل</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace' }}>{nileLevel.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>م (متر)</div>
          <Bar value={nileLevel} max={20} color="#38bdf8" />
        </div>
        <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>🏗 خزان أرضي 1</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#a78bfa', fontFamily: 'monospace' }}>{tank1Level.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>م (منسوب)</div>
          <Bar value={tank1Level} max={6} color="#a78bfa" />
        </div>
        <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>🏗 خزان أرضي 2</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#a78bfa', fontFamily: 'monospace' }}>{tank2Level.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>م (منسوب)</div>
          <Bar value={tank2Level} max={6} color="#a78bfa" />
        </div>
        <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>🌿 ري الحدائق</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#86efac', fontFamily: 'monospace' }}>{gardenIrrig.toLocaleString('en')}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>M³</div>
        </div>
      </div>

      {/* ── Navigation buttons ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
        {[
          { label: 'FT & PT',  sub: 'Flow & Pressure', icon: '📊', active: true,  color: '#38bdf8' },
          { label: 'PUMPS',    sub: 'الطلمبات',        icon: '⚡', active: false, color: '#94a3b8' },
          { label: 'LEVEL 1',  sub: 'خزان 1',           icon: '🏗', active: false, color: '#94a3b8' },
          { label: 'LEVEL 2',  sub: 'خزان 2',           icon: '🏗', active: false, color: '#94a3b8' },
          { label: 'ALARMS',   sub: 'التنبيهات',        icon: '🔔', active: false, color: '#94a3b8' },
        ].map(btn => (
          <div key={btn.label} style={{
            background: btn.active ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${btn.active ? 'rgba(56,189,248,0.4)' : '#1e293b'}`,
            borderRadius: 12, padding: '12px 8px', textAlign: 'center', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{btn.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 12, color: btn.color }}>{btn.label}</div>
            <div style={{ fontSize: 10, color: '#475569' }}>{btn.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <AlertCircle style={{ width: 12, height: 12 }} />
        البيانات محاكاة لحظية — للربط الفعلي بـ SCADA يلزم API اتصال مباشر
      </div>
    </div>
  );
};
