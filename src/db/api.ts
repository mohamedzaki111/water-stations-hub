import { Router, Request, Response } from 'express';
import { query, queryOne, run } from './database.js';

export const apiRouter = Router();

// ══════════════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════════════
apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password = '123' } = req.body;
    const user = await queryOne<any>(
      'SELECT id,username,name,role,station_id,active,password FROM users WHERE username=? AND active=1',
      [username]
    );
    if (!user) return res.status(401).json({ error: 'اسم المستخدم غير موجود أو غير نشط' });
    if (password !== user.password) return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
    const { password: _, ...safeUser } = user;
    safeUser.active = !!safeUser.active;
    res.json({ user: safeUser });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  STATIONS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/stations', async (_req, res) => {
  try {
    const rows = await query<any>('SELECT id, status, data FROM stations');
    res.json(rows.map(r => ({ id: r.id, status: r.status, static: JSON.parse(r.data) })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/stations', async (req, res) => {
  try {
    const { id, status = 'active', static: staticData } = req.body;
    await run('INSERT INTO stations (id, status, data) VALUES (?, ?, ?)',
      [id, status, JSON.stringify(staticData)]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.put('/stations/:id', async (req, res) => {
  try {
    const { status, static: staticData } = req.body;
    if (status)     await run('UPDATE stations SET status=? WHERE id=?', [status, req.params.id]);
    if (staticData) await run('UPDATE stations SET data=? WHERE id=?',   [JSON.stringify(staticData), req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  USERS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/users', async (_req, res) => {
  try {
    const users = await query<any>('SELECT id,username,name,role,station_id,active FROM users');
    res.json(users.map(u => ({ ...u, active: !!u.active })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/users', async (req, res) => {
  try {
    const { username, name, role, station_id, password = '123' } = req.body;
    const id = 'u' + Date.now();
    await run('INSERT INTO users (id,username,name,role,station_id,active,password) VALUES (?,?,?,?,?,1,?)',
      [id, username, name, role, station_id || null, password]);
    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.put('/users/:id', async (req, res) => {
  try {
    const { active, name, role, station_id } = req.body;
    if (active !== undefined) await run('UPDATE users SET active=? WHERE id=?', [active ? 1 : 0, req.params.id]);
    if (name)                 await run('UPDATE users SET name=? WHERE id=?',   [name, req.params.id]);
    if (role)                 await run('UPDATE users SET role=?,station_id=? WHERE id=?', [role, station_id || null, req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  DAILY RECORDS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/records', async (req, res) => {
  try {
    const { station_id, month, limit = '500' } = req.query as any;
    let sql = 'SELECT * FROM daily_records WHERE 1=1';
    const params: any[] = [];
    if (station_id) { sql += ' AND station_id=?'; params.push(station_id); }
    if (month)      { sql += ' AND date LIKE ?';   params.push(month + '%'); }
    sql += ' ORDER BY date DESC LIMIT ?';
    params.push(parseInt(limit));
    const records = await query<any>(sql, params);
    res.json(records.map(r => ({
      ...r,
      date: typeof r.date === 'object' ? r.date.toISOString().slice(0,10) : r.date,
      flow_meters_ok: !!r.flow_meters_ok,
    })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/records', async (req, res) => {
  try {
    const d = req.body;
    // Check duplicate
    const dup = await queryOne<any>(
      'SELECT id FROM daily_records WHERE station_id=? AND date=?',
      [d.station_id, d.date]
    );
    if (dup) return res.status(409).json({ error: `يوجد سجل مسبق بتاريخ ${d.date}` });
    if (d.turbid_m3 > 0 && d.turbid_m3 < d.produced_m3)
      return res.status(400).json({ error: 'المياه العكرة يجب ≥ المياه المنتجة' });

    // Computed fields
    const eff    = d.turbid_m3   > 0 ? +(d.produced_m3 / d.turbid_m3).toFixed(4)               : 0;
    const kwh_m3 = d.produced_m3 > 0 ? +(d.electricity_kwh / d.produced_m3).toFixed(5)          : 0;
    const alum   = d.produced_m3 > 0 ? +(d.alum_liquid / d.produced_m3 * 1000).toFixed(5)       : 0;
    const cl     = d.produced_m3 > 0 ? +((d.chlorine_gas||0) / d.produced_m3 * 1000).toFixed(5) : 0;
    const kw     = d.electricity_kwh  || 0;
    const kvar   = d.electricity_kvar || 0;
    const kva    = kw > 0 && kvar > 0 ? +Math.sqrt(kw**2 + kvar**2).toFixed(2) : kw;
    const pf     = kva > 0 ? +(kw / kva).toFixed(4) : null;
    const id     = 'r' + Date.now();

    await run(`
      INSERT INTO daily_records
        (id,station_id,date,produced_m3,turbid_m3,backwash_m3,cooling_m3,nile_level,
         tank1_high,tank1_low,tank2_high,tank2_low,well1_high,well1_low,well2_high,well2_low,
         pressure_high,pressure_low,alum_solid,alum_liquid,chlorine_gas,hypochlorite,
         flow_meters_ok,electricity_kwh,electricity_kvar,electricity_kva,power_factor,
         maintenance_periodic,maintenance_repair,shift_crew,notes,
         efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, d.station_id, d.date,
       d.produced_m3, d.turbid_m3||0,
       d.backwash_m3||null, d.cooling_m3||null, d.nile_level||null,
       d.tank1_high||null, d.tank1_low||null, d.tank2_high||null, d.tank2_low||null,
       d.well1_high||null, d.well1_low||null, d.well2_high||null, d.well2_low||null,
       d.pressure_high||null, d.pressure_low||null,
       d.alum_solid||null, d.alum_liquid||0, d.chlorine_gas||null, d.hypochlorite||null,
       d.flow_meters_ok ? 1 : 0, kw,
       kvar||null, kva||null, pf,
       d.maintenance_periodic||null, d.maintenance_repair||null,
       d.shift_crew||'', d.notes||null,
       eff, kwh_m3, alum, cl,
       d.created_by||'', new Date().toISOString().replace('T',' ').slice(0,19)
      ]
    );
    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.put('/records/:id', async (req, res) => {
  try {
    const d = req.body;
    const eff    = d.turbid_m3   > 0 ? +(d.produced_m3 / d.turbid_m3).toFixed(4)               : 0;
    const kwh_m3 = d.produced_m3 > 0 ? +(d.electricity_kwh / d.produced_m3).toFixed(5)          : 0;
    const alum   = d.produced_m3 > 0 ? +(d.alum_liquid / d.produced_m3 * 1000).toFixed(5)       : 0;
    const cl     = d.produced_m3 > 0 ? +((d.chlorine_gas||0) / d.produced_m3 * 1000).toFixed(5) : 0;
    await run(`
      UPDATE daily_records SET
        produced_m3=?, turbid_m3=?, alum_liquid=?, chlorine_gas=?,
        electricity_kwh=?, shift_crew=?, notes=?,
        efficiency=?, kwh_per_m3=?, alum_per_m3=?, chlorine_per_m3=?
      WHERE id=?`,
      [d.produced_m3, d.turbid_m3, d.alum_liquid, d.chlorine_gas||0,
       d.electricity_kwh, d.shift_crew, d.notes||null,
       eff, kwh_m3, alum, cl, req.params.id]
    );
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.delete('/records/:id', async (req, res) => {
  try {
    await run('DELETE FROM daily_records WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  STATS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/stats/:stationId', async (req, res) => {
  try {
    const { month } = req.query as any;
    let sql = 'SELECT * FROM daily_records WHERE station_id=?';
    const params: any[] = [req.params.stationId];
    if (month) { sql += ' AND date LIKE ?'; params.push(month + '%'); }

    const records = await query<any>(sql, params);
    if (!records.length) return res.json({ count:0,total_prod:0,total_turbid:0,total_alum:0,total_chlorine:0,total_kwh:0,avg_eff:0,avg_kwh_m3:0,avg_production:0,avg_power_factor:0,sludge_m3:0 });

    const p  = records.reduce((s: number, r: any) => s + r.produced_m3, 0);
    const t  = records.reduce((s: number, r: any) => s + r.turbid_m3, 0);
    const al = records.reduce((s: number, r: any) => s + r.alum_liquid, 0);
    const cl = records.reduce((s: number, r: any) => s + (r.chlorine_gas||0), 0);
    const kw = records.reduce((s: number, r: any) => s + r.electricity_kwh, 0);
    const pfR = records.filter((r: any) => r.power_factor > 0);
    const avg_pf = pfR.length > 0
      ? +(pfR.reduce((s: number, r: any) => s + r.power_factor, 0) / pfR.length).toFixed(4)
      : 0;

    res.json({
      count: records.length,
      total_prod: Math.round(p), total_turbid: Math.round(t),
      total_alum: +al.toFixed(2), total_chlorine: +cl.toFixed(3),
      total_kwh: Math.round(kw),
      avg_eff:      t > 0 ? +(p/t).toFixed(4)  : 0,
      avg_kwh_m3:   p > 0 ? +(kw/p).toFixed(4) : 0,
      avg_production: records.length > 0 ? Math.round(p / records.length) : 0,
      avg_power_factor: avg_pf,
      sludge_m3: +(al * 500).toFixed(0),
    });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  BREAKDOWNS
// ══════════════════════════════════════════════════════════════
apiRouter.get('/breakdowns', async (req, res) => {
  try {
    const { station_id } = req.query as any;
    let sql = 'SELECT * FROM breakdowns';
    const params: any[] = [];
    if (station_id) { sql += ' WHERE station_id=?'; params.push(station_id); }
    sql += ' ORDER BY start_date DESC';
    const rows = await query<any>(sql, params);
    res.json(rows.map(r => ({
      ...r,
      start_date: typeof r.start_date === 'object' ? r.start_date.toISOString().slice(0,10) : r.start_date,
      end_date:   r.end_date && typeof r.end_date === 'object' ? r.end_date.toISOString().slice(0,10) : r.end_date,
    })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/breakdowns', async (req, res) => {
  try {
    const d = req.body;
    const id = 'bd' + Date.now();
    await run(`
      INSERT INTO breakdowns
        (id,station_id,asset_type,asset_label,severity,status,description,
         start_date,start_time,capacity_reduced_pct,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, d.station_id, d.asset_type, d.asset_label, d.severity,
       d.status||'جارٍ', d.description, d.start_date, d.start_time||'',
       d.capacity_reduced_pct||null, d.created_by||'',
       new Date().toISOString().replace('T',' ').slice(0,19)]
    );
    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.put('/breakdowns/:id/resolve', async (req, res) => {
  try {
    const { end_date, end_time, production_loss_m3, capacity_reduced_pct, notes } = req.body;
    await run(`
      UPDATE breakdowns SET
        status='مكتمل', end_date=?, end_time=?,
        production_loss_m3=?, capacity_reduced_pct=?, notes=?
      WHERE id=?`,
      [end_date, end_time, production_loss_m3||null, capacity_reduced_pct||null, notes||null, req.params.id]
    );
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.delete('/breakdowns/:id', async (req, res) => {
  try {
    await run('DELETE FROM breakdowns WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});



// Health check
apiRouter.get('/health', (_req, res) => res.json({ status: 'ok', db: 'mysql', timestamp: new Date().toISOString() }));

// ══════════════════════════════════════════════════════════════
//  AI ANALYSIS — Gemini API
// ══════════════════════════════════════════════════════════════
apiRouter.post('/ai/analyze-station', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '""' || apiKey === '') {
    return res.json({
      success: false,
      error: 'GEMINI_API_KEY غير مضبوط في ملف .env — أضف مفتاح Gemini API للحصول على التحليل الذكي',
    });
  }

  try {
    const { stationName, date, stats, targets, recentBreakdowns } = req.body;

    const prompt = `
أنت مهندس متخصص في محطات معالجة مياه الشرب. حلل بيانات المحطة التالية وقدم تقريراً هندسياً مختصراً بالعربية.

المحطة: ${stationName}
التاريخ: ${date}

البيانات:
- الإنتاج الكلي: ${stats?.total_prod?.toLocaleString() || 0} م³
- متوسط الإنتاج اليومي: ${stats?.avg_production?.toLocaleString() || 0} م³/يوم
- الكفاءة المتوسطة: ${stats?.avg_eff ? (stats.avg_eff * 100).toFixed(2) : 0}%
- الكفاءة المستهدفة: ${targets?.efficiency_target ? (targets.efficiency_target * 100).toFixed(0) : 90}%
- كهرباء/م³: ${stats?.avg_kwh_m3?.toFixed(4) || 0}
- نطاق الكهرباء المقبول: ${targets?.kwh_per_m3_min || 0.18} - ${targets?.kwh_per_m3_max || 0.28}
- إجمالي الشبة: ${stats?.total_alum?.toFixed(2) || 0} طن
- إجمالي الكلور: ${stats?.total_chlorine?.toFixed(3) || 0} طن
- روبة المروقات المقدرة: ${stats?.sludge_m3?.toLocaleString() || 0} م³

الأعطال الأخيرة: ${recentBreakdowns?.length || 0} عطل مسجل

قدم:
1. تقييم الكفاءة التشغيلية
2. تحليل استهلاك الكهرباء
3. ملاحظات على الكيماويات
4. توصيات للتحسين
5. تنبيهات إن وجدت
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1500 },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.json({ success: false, error: data.error.message });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.json({ success: false, error: 'لم يتم استلام رد من Gemini' });

    res.json({ success: true, text });
  } catch (e: any) {
    res.json({ success: false, error: e.message });
  }
});
