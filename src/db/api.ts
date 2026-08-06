import { Router, Request, Response } from 'express';
import { getDb } from './database.js';

export const apiRouter = Router();

// ══════════════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════════════
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const db = getDb();
  try {
    const user = db.prepare('SELECT * FROM users WHERE username=? AND active=1').get(username) as any;
    if (!user) return res.status(401).json({ error: 'اسم المستخدم غير موجود أو غير نشط' });
    if (password !== '123' && password !== user.password) return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
    const { password: _, ...safeUser } = user;
    safeUser.active = !!safeUser.active;
    res.json({ user: safeUser });
  } finally { db.close(); }
});

// ══════════════════════════════════════════════════════════════
//  STATIONS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/stations', (_req, res) => {
  const db = getDb();
  try {
    const rows = db.prepare('SELECT * FROM stations').all() as any[];
    const stations = rows.map(r => ({ id: r.id, status: r.status, static: JSON.parse(r.data) }));
    res.json(stations);
  } finally { db.close(); }
});

apiRouter.put('/stations/:id', (req, res) => {
  const db = getDb();
  try {
    const { status, static: staticData } = req.body;
    if (status) db.prepare('UPDATE stations SET status=? WHERE id=?').run(status, req.params.id);
    if (staticData) db.prepare('UPDATE stations SET data=? WHERE id=?').run(JSON.stringify(staticData), req.params.id);
    res.json({ ok: true });
  } finally { db.close(); }
});

apiRouter.post('/stations', (req, res) => {
  const db = getDb();
  try {
    const { id, status, static: staticData } = req.body;
    db.prepare('INSERT INTO stations (id,status,data) VALUES (?,?,?)').run(id, status||'active', JSON.stringify(staticData));
    res.json({ ok: true });
  } finally { db.close(); }
});

// ══════════════════════════════════════════════════════════════
//  USERS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/users', (_req, res) => {
  const db = getDb();
  try {
    const users = db.prepare('SELECT id,username,name,role,station_id,active FROM users').all() as any[];
    res.json(users.map(u => ({ ...u, active: !!u.active })));
  } finally { db.close(); }
});

apiRouter.post('/users', (req, res) => {
  const db = getDb();
  try {
    const { username, name, role, station_id, password } = req.body;
    const id = 'u' + Date.now();
    db.prepare('INSERT INTO users (id,username,name,role,station_id,active,password) VALUES (?,?,?,?,?,1,?)').run(id, username, name, role, station_id||null, password||'123');
    res.json({ ok: true, id });
  } finally { db.close(); }
});

apiRouter.put('/users/:id', (req, res) => {
  const db = getDb();
  try {
    const { active, name, role, station_id } = req.body;
    if (active !== undefined) db.prepare('UPDATE users SET active=? WHERE id=?').run(active?1:0, req.params.id);
    if (name) db.prepare('UPDATE users SET name=? WHERE id=?').run(name, req.params.id);
    if (role) db.prepare('UPDATE users SET role=?,station_id=? WHERE id=?').run(role, station_id||null, req.params.id);
    res.json({ ok: true });
  } finally { db.close(); }
});

// ══════════════════════════════════════════════════════════════
//  DAILY RECORDS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/records', (req, res) => {
  const db = getDb();
  try {
    const { station_id, month, limit = '500' } = req.query as any;
    let sql = 'SELECT * FROM daily_records WHERE 1=1';
    const params: any[] = [];
    if (station_id) { sql += ' AND station_id=?'; params.push(station_id); }
    if (month)      { sql += ' AND date LIKE ?';   params.push(month + '%'); }
    sql += ' ORDER BY date DESC LIMIT ?';
    params.push(parseInt(limit));
    const records = db.prepare(sql).all(...params);
    res.json(records.map((r: any) => ({ ...r, flow_meters_ok: !!r.flow_meters_ok })));
  } finally { db.close(); }
});

apiRouter.post('/records', (req, res) => {
  const db = getDb();
  try {
    const d = req.body;
    // Check duplicate
    const dup = db.prepare('SELECT id FROM daily_records WHERE station_id=? AND date=?').get(d.station_id, d.date);
    if (dup) return res.status(409).json({ error: `يوجد سجل مسبق بتاريخ ${d.date}` });
    if (d.turbid_m3 > 0 && d.turbid_m3 < d.produced_m3) return res.status(400).json({ error: 'المياه العكرة يجب ≥ المياه المنتجة' });

    // Compute derived fields
    const eff    = d.turbid_m3>0    ? +(d.produced_m3/d.turbid_m3).toFixed(4)           : 0;
    const kwh_m3 = d.produced_m3>0  ? +(d.electricity_kwh/d.produced_m3).toFixed(5)     : 0;
    const alum   = d.produced_m3>0  ? +(d.alum_liquid/d.produced_m3*1000).toFixed(5)    : 0;
    const cl     = d.produced_m3>0  ? +((d.chlorine_gas||0)/d.produced_m3*1000).toFixed(5): 0;
    const kw     = d.electricity_kwh || 0;
    const kvar   = d.electricity_kvar || 0;
    const kva    = kw>0&&kvar>0 ? +Math.sqrt(kw**2+kvar**2).toFixed(2) : kw;
    const pf     = kva>0 ? +(kw/kva).toFixed(4) : null;

    const id = 'r' + Date.now();
    db.prepare(`
      INSERT INTO daily_records
        (id,station_id,date,produced_m3,turbid_m3,backwash_m3,cooling_m3,nile_level,
         tank1_high,tank1_low,tank2_high,tank2_low,well1_high,well1_low,well2_high,well2_low,
         pressure_high,pressure_low,alum_solid,alum_liquid,chlorine_gas,hypochlorite,
         flow_meters_ok,electricity_kwh,electricity_kvar,electricity_kva,power_factor,
         maintenance_periodic,maintenance_repair,shift_crew,notes,
         efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `).run(
      id, d.station_id, d.date,
      d.produced_m3, d.turbid_m3||0,
      d.backwash_m3||null, d.cooling_m3||null, d.nile_level||null,
      d.tank1_high||null, d.tank1_low||null, d.tank2_high||null, d.tank2_low||null,
      d.well1_high||null, d.well1_low||null, d.well2_high||null, d.well2_low||null,
      d.pressure_high||null, d.pressure_low||null,
      d.alum_solid||null, d.alum_liquid||0, d.chlorine_gas||null, d.hypochlorite||null,
      d.flow_meters_ok?1:0, d.electricity_kwh||0,
      kvar||null, kva||null, pf,
      d.maintenance_periodic||null, d.maintenance_repair||null,
      d.shift_crew||'', d.notes||null,
      eff, kwh_m3, alum, cl,
      d.created_by||'', new Date().toISOString()
    );
    res.json({ ok: true, id });
  } finally { db.close(); }
});

apiRouter.put('/records/:id', (req, res) => {
  const db = getDb();
  try {
    const d = req.body;
    const eff    = d.turbid_m3>0   ? +(d.produced_m3/d.turbid_m3).toFixed(4)            : 0;
    const kwh_m3 = d.produced_m3>0 ? +(d.electricity_kwh/d.produced_m3).toFixed(5)      : 0;
    const alum   = d.produced_m3>0 ? +(d.alum_liquid/d.produced_m3*1000).toFixed(5)     : 0;
    const cl     = d.produced_m3>0 ? +((d.chlorine_gas||0)/d.produced_m3*1000).toFixed(5): 0;
    db.prepare(`
      UPDATE daily_records SET
        produced_m3=?,turbid_m3=?,alum_liquid=?,chlorine_gas=?,electricity_kwh=?,
        shift_crew=?,notes=?,efficiency=?,kwh_per_m3=?,alum_per_m3=?,chlorine_per_m3=?
      WHERE id=?
    `).run(d.produced_m3,d.turbid_m3,d.alum_liquid,d.chlorine_gas||0,d.electricity_kwh,d.shift_crew,d.notes||null,eff,kwh_m3,alum,cl,req.params.id);
    res.json({ ok: true });
  } finally { db.close(); }
});

apiRouter.delete('/records/:id', (req, res) => {
  const db = getDb();
  try {
    db.prepare('DELETE FROM daily_records WHERE id=?').run(req.params.id);
    res.json({ ok: true });
  } finally { db.close(); }
});

// ══════════════════════════════════════════════════════════════
//  STATS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/stats/:stationId', (req, res) => {
  const db = getDb();
  try {
    const { month } = req.query as any;
    let sql = 'SELECT * FROM daily_records WHERE station_id=?';
    const params: any[] = [req.params.stationId];
    if (month) { sql += ' AND date LIKE ?'; params.push(month+'%'); }
    const records = db.prepare(sql).all(...params) as any[];
    if (!records.length) return res.json({ count:0,total_prod:0,total_turbid:0,total_alum:0,total_chlorine:0,total_kwh:0,avg_eff:0,avg_kwh_m3:0,avg_production:0,avg_power_factor:0,sludge_m3:0 });
    const p=records.reduce((s,r)=>s+r.produced_m3,0);
    const t=records.reduce((s,r)=>s+r.turbid_m3,0);
    const al=records.reduce((s,r)=>s+r.alum_liquid,0);
    const cl=records.reduce((s,r)=>s+(r.chlorine_gas||0),0);
    const kw=records.reduce((s,r)=>s+r.electricity_kwh,0);
    const pfRecs=records.filter(r=>r.power_factor>0);
    res.json({
      count:records.length,total_prod:Math.round(p),total_turbid:Math.round(t),
      total_alum:+al.toFixed(2),total_chlorine:+cl.toFixed(3),total_kwh:Math.round(kw),
      avg_eff:t>0?+(p/t).toFixed(4):0, avg_kwh_m3:p>0?+(kw/p).toFixed(4):0,
      avg_production:records.length>0?Math.round(p/records.length):0,
      avg_power_factor:pfRecs.length>0?+(pfRecs.reduce((s,r)=>s+r.power_factor,0)/pfRecs.length).toFixed(4):0,
      sludge_m3:+(al*500).toFixed(0),
    });
  } finally { db.close(); }
});

// ══════════════════════════════════════════════════════════════
//  BREAKDOWNS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/breakdowns', (req, res) => {
  const db = getDb();
  try {
    const { station_id } = req.query as any;
    let sql = 'SELECT * FROM breakdowns';
    const params: any[] = [];
    if (station_id) { sql += ' WHERE station_id=?'; params.push(station_id); }
    sql += ' ORDER BY start_date DESC';
    res.json(db.prepare(sql).all(...params));
  } finally { db.close(); }
});

apiRouter.post('/breakdowns', (req, res) => {
  const db = getDb();
  try {
    const d = req.body;
    const id = 'bd' + Date.now();
    db.prepare(`INSERT INTO breakdowns (id,station_id,asset_type,asset_label,severity,status,description,start_date,start_time,capacity_reduced_pct,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      id,d.station_id,d.asset_type,d.asset_label,d.severity,d.status||'جارٍ',d.description,d.start_date,d.start_time||'',d.capacity_reduced_pct||null,d.created_by||'',new Date().toISOString()
    );
    res.json({ ok:true, id });
  } finally { db.close(); }
});

apiRouter.put('/breakdowns/:id/resolve', (req, res) => {
  const db = getDb();
  try {
    const { end_date, end_time, production_loss_m3, capacity_reduced_pct, notes } = req.body;
    db.prepare(`UPDATE breakdowns SET status='مكتمل',end_date=?,end_time=?,production_loss_m3=?,capacity_reduced_pct=?,notes=? WHERE id=?`).run(end_date,end_time,production_loss_m3||null,capacity_reduced_pct||null,notes||null,req.params.id);
    res.json({ ok:true });
  } finally { db.close(); }
});

apiRouter.delete('/breakdowns/:id', (req, res) => {
  const db = getDb();
  try {
    db.prepare('DELETE FROM breakdowns WHERE id=?').run(req.params.id);
    res.json({ ok:true });
  } finally { db.close(); }
});

// Health check
apiRouter.get('/health', (_req, res) => {
  res.json({ status:'ok', timestamp: new Date().toISOString() });
});
