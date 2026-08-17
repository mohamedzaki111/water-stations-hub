import { Router, Request, Response } from 'express';
import { query, queryOne, run } from './database.js';
import { logger } from '../utils/logger.js';

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
    const existing = await queryOne<any>('SELECT * FROM daily_records WHERE id=?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'السجل المراد تعديله غير موجود' });
    }

    const produced_m3     = d.produced_m3 !== undefined && d.produced_m3 !== null ? Number(d.produced_m3) : existing.produced_m3;
    const turbid_m3       = d.turbid_m3 !== undefined && d.turbid_m3 !== null ? Number(d.turbid_m3) : existing.turbid_m3;
    const alum_liquid     = d.alum_liquid !== undefined && d.alum_liquid !== null ? Number(d.alum_liquid) : existing.alum_liquid;
    const chlorine_gas    = d.chlorine_gas !== undefined && d.chlorine_gas !== null ? Number(d.chlorine_gas) : (existing.chlorine_gas || 0);
    const electricity_kwh = d.electricity_kwh !== undefined && d.electricity_kwh !== null ? Number(d.electricity_kwh) : existing.electricity_kwh;
    const shift_crew      = d.shift_crew !== undefined ? String(d.shift_crew || '') : (existing.shift_crew || '');
    const notes           = d.notes !== undefined ? (d.notes || null) : existing.notes;

    const eff    = turbid_m3 > 0 ? +(produced_m3 / turbid_m3).toFixed(4) : 0;
    const kwh_m3 = produced_m3 > 0 ? +(electricity_kwh / produced_m3).toFixed(5) : 0;
    const alum   = produced_m3 > 0 ? +(alum_liquid / produced_m3 * 1000).toFixed(5) : 0;
    const cl     = produced_m3 > 0 ? +(chlorine_gas / produced_m3 * 1000).toFixed(5) : 0;

    await run(`
      UPDATE daily_records SET
        produced_m3=?, turbid_m3=?, alum_liquid=?, chlorine_gas=?,
        electricity_kwh=?, shift_crew=?, notes=?,
        efficiency=?, kwh_per_m3=?, alum_per_m3=?, chlorine_per_m3=?
      WHERE id=?`,
      [produced_m3, turbid_m3, alum_liquid, chlorine_gas,
       electricity_kwh, shift_crew, notes,
       eff, kwh_m3, alum, cl, req.params.id]
    );
    res.json({ ok: true });
  } catch (e: any) {
    logger.error(`Error updating record: ${e.message}`);
    res.status(500).json({ error: e.message });
  }
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



// ══════════════════════════════════════════════════════════════
//  LAB RECORDS (سجلات المعمل والجار تست)
// ══════════════════════════════════════════════════════════════
apiRouter.get('/lab-records', async (req, res) => {
  try {
    const { station_id, month, limit = '200' } = req.query as any;
    let sql = 'SELECT * FROM lab_records WHERE 1=1';
    const params: any[] = [];
    if (station_id) { sql += ' AND station_id=?'; params.push(station_id); }
    if (month)      { sql += ' AND date LIKE ?';   params.push(month + '%'); }
    sql += ' ORDER BY date DESC, time DESC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    const records = await query<any>(sql, params);
    res.json(records.map(r => ({
      ...r,
      date: typeof r.date === 'object' ? r.date.toISOString().slice(0,10) : r.date,
    })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/lab-records', async (req, res) => {
  try {
    const d = req.body;
    if (!d.station_id || !d.date || d.alum_lab_dose === undefined || d.alum_actual_dose === undefined) {
      return res.status(400).json({ error: 'المحطة والتاريخ والجرعة المعملية والفعلية مطلوبة' });
    }

    const id = d.id || 'lab_' + Date.now();
    const labDose = Number(d.alum_lab_dose) || 0;
    const actualDose = Number(d.alum_actual_dose) || 0;
    const diff = +(actualDose - labDose).toFixed(2);
    const diffPct = labDose > 0 ? +((diff / labDose) * 100).toFixed(2) : 0;

    await run(`
      INSERT INTO lab_records (
        id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
        alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct,
        turbidity_settled, turbidity_filtered, residual_chlorine,
        tested_by, notes, created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id, d.station_id, d.date, d.time || '', d.shift || '',
        Number(d.turbidity_raw) || 0, d.ph_raw !== undefined ? Number(d.ph_raw) : null,
        d.temp_raw !== undefined ? Number(d.temp_raw) : null, d.flow_m3h !== undefined ? Number(d.flow_m3h) : null,
        labDose, actualDose, diff, diffPct,
        d.turbidity_settled !== undefined && d.turbidity_settled !== null ? Number(d.turbidity_settled) : null,
        d.turbidity_filtered !== undefined && d.turbidity_filtered !== null ? Number(d.turbidity_filtered) : null,
        d.residual_chlorine !== undefined && d.residual_chlorine !== null ? Number(d.residual_chlorine) : null,
        d.tested_by || '', d.notes || '',
        new Date().toISOString().slice(0, 19).replace('T', ' ')
      ]
    );

    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.delete('/lab-records/:id', async (req, res) => {
  try {
    await run('DELETE FROM lab_records WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════
//  SUPPLY ORDERS & INVENTORY (إدارة المخازن وأوامر التوريد)
// ══════════════════════════════════════════════════════════════
apiRouter.get('/supply-orders', async (req, res) => {
  try {
    const { station_id, item_type, month, limit = '200' } = req.query as any;
    let sql = 'SELECT * FROM supply_orders WHERE 1=1';
    const params: any[] = [];
    if (station_id) { sql += ' AND station_id=?'; params.push(station_id); }
    if (item_type)  { sql += ' AND item_type=?';  params.push(item_type); }
    if (month)      { sql += ' AND date LIKE ?';   params.push(month + '%'); }
    sql += ' ORDER BY date DESC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    const orders = await query<any>(sql, params);
    res.json(orders.map(o => ({
      ...o,
      date: typeof o.date === 'object' ? o.date.toISOString().slice(0,10) : o.date,
    })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/supply-orders', async (req, res) => {
  try {
    const d = req.body;
    if (!d.station_id || !d.date || !d.quantity_tons || !d.supplier || !d.order_number) {
      return res.status(400).json({ error: 'المحطة ورقم الإذن والتاريخ والمورد والكمية مطلوبة' });
    }

    const id = d.id || 'so_' + Date.now();
    const qty = Number(d.quantity_tons) || 0;
    const unitPrice = d.unit_price ? Number(d.unit_price) : null;
    const totalCost = d.total_cost ? Number(d.total_cost) : (unitPrice ? +(qty * unitPrice).toFixed(2) : null);

    await run(`
      INSERT INTO supply_orders (
        id, station_id, item_type, item_name, order_number, supplier, date,
        quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
        invoice_number, purity_pct, lab_status, received_by, notes, created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id, d.station_id, d.item_type || 'alum_liquid', d.item_name || 'شبة سائلة',
        d.order_number, d.supplier, d.date, qty, unitPrice, totalCost,
        d.vehicle_plate || '', d.driver_name || '', d.invoice_number || '',
        d.purity_pct ? Number(d.purity_pct) : null,
        d.lab_status || 'مقبول', d.received_by || '', d.notes || '',
        new Date().toISOString().slice(0, 19).replace('T', ' ')
      ]
    );

    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.delete('/supply-orders/:id', async (req, res) => {
  try {
    await run('DELETE FROM supply_orders WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Inventory Settings (Capacity, Opening Stock, Safety Stock)
apiRouter.get('/inventory/settings', async (req, res) => {
  try {
    const { station_id } = req.query as any;
    let sql = 'SELECT * FROM inventory_settings';
    const params: any[] = [];
    if (station_id) { sql += ' WHERE station_id=?'; params.push(station_id); }
    const settings = await query<any>(sql, params);
    res.json(settings.map(s => ({
      ...s,
      opening_stock_date: typeof s.opening_stock_date === 'object' ? s.opening_stock_date.toISOString().slice(0,10) : s.opening_stock_date,
    })));
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

apiRouter.post('/inventory/settings', async (req, res) => {
  try {
    const { station_id, item_type = 'alum_liquid', tank_capacity_tons, opening_stock_tons, opening_stock_date, reorder_level_tons, safety_stock_tons } = req.body;
    if (!station_id) return res.status(400).json({ error: 'المحطة مطلوبة' });

    const id = `inv_${station_id}_${item_type}`;
    const cap = Number(tank_capacity_tons) || 100;
    const op = Number(opening_stock_tons) || 0;
    const opDate = opening_stock_date || '2026-05-01';
    const reorder = Number(reorder_level_tons) || 20;
    const safety = Number(safety_stock_tons) || 10;

    await run(`
      INSERT INTO inventory_settings (id, station_id, item_type, tank_capacity_tons, opening_stock_tons, opening_stock_date, reorder_level_tons, safety_stock_tons)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        tank_capacity_tons=VALUES(tank_capacity_tons),
        opening_stock_tons=VALUES(opening_stock_tons),
        opening_stock_date=VALUES(opening_stock_date),
        reorder_level_tons=VALUES(reorder_level_tons),
        safety_stock_tons=VALUES(safety_stock_tons)
    `, [id, station_id, item_type, cap, op, opDate, reorder, safety]);

    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Comprehensive Inventory Summary & Balance (حساب رصيد المخزون التراكمي الحي)
apiRouter.get('/inventory/summary', async (req, res) => {
  try {
    const { station_id, item_type = 'alum_liquid' } = req.query as any;

    // 1. Get stations
    let stationsSql = 'SELECT id, data FROM stations';
    const stParams: any[] = [];
    if (station_id && station_id !== 'all') {
      stationsSql += ' WHERE id=?';
      stParams.push(station_id);
    }
    const stationRows = await query<any>(stationsSql, stParams);

    // 2. Get settings, supply orders, and daily records
    const [settings, orders, records] = await Promise.all([
      query<any>('SELECT * FROM inventory_settings WHERE item_type=?', [item_type]),
      query<any>('SELECT station_id, quantity_tons, date FROM supply_orders WHERE item_type=? AND lab_status!="مرفوض"', [item_type]),
      query<any>('SELECT station_id, alum_liquid, alum_solid, date FROM daily_records'),
    ]);

    const summaries = stationRows.map(stRow => {
      const stId = stRow.id;
      const stData = JSON.parse(stRow.data || '{}');
      const stName = stData?.general?.name || stId;

      const stSetting = settings.find(s => s.station_id === stId);
      const cap = stSetting?.tank_capacity_tons || 100;
      const opStock = stSetting?.opening_stock_tons || 50;
      const reorderLevel = stSetting?.reorder_level_tons || 25;
      const safetyStock = stSetting?.safety_stock_tons || 15;

      // Calculate total supplies for this station
      const stOrders = orders.filter(o => o.station_id === stId);
      const totalReceived = +stOrders.reduce((sum, o) => sum + (Number(o.quantity_tons) || 0), 0).toFixed(2);

      // Calculate total consumed for this station (using alum_liquid for alum_liquid, alum_solid for alum_solid)
      const stRecords = records.filter(r => r.station_id === stId);
      const totalConsumed = +stRecords.reduce((sum, r) => {
        const val = item_type === 'alum_solid' ? (Number(r.alum_solid) || 0) : (Number(r.alum_liquid) || 0);
        return sum + val;
      }, 0).toFixed(2);

      // Current stock balance: Opening + Total Received - Total Consumed
      const currentStock = +(opStock + totalReceived - totalConsumed).toFixed(2);
      const stockPercentage = cap > 0 ? +((currentStock / cap) * 100).toFixed(1) : 0;

      // Average daily consumption (last 30 records or all)
      const recentRecs = stRecords.slice(0, 30);
      const avgDaily = recentRecs.length > 0
        ? +(recentRecs.reduce((sum, r) => sum + (item_type === 'alum_solid' ? (Number(r.alum_solid) || 0) : (Number(r.alum_liquid) || 0)), 0) / recentRecs.length).toFixed(2)
        : 5.0;

      const daysOfCover = avgDaily > 0 ? +(currentStock / avgDaily).toFixed(1) : 99;

      let status: 'optimal' | 'low' | 'critical' | 'excess' = 'optimal';
      if (currentStock <= safetyStock) status = 'critical';
      else if (currentStock <= reorderLevel) status = 'low';
      else if (currentStock > cap * 0.95) status = 'excess';

      return {
        station_id: stId,
        station_name: stName,
        item_type,
        item_name: item_type === 'alum_liquid' ? 'شبة سائلة' : item_type === 'alum_solid' ? 'شبة صلبة' : 'كيماويات',
        tank_capacity: cap,
        opening_stock: opStock,
        total_received: totalReceived,
        total_consumed: totalConsumed,
        current_stock: currentStock,
        stock_percentage: Math.max(0, Math.min(100, stockPercentage)),
        avg_daily_consumption: avgDaily,
        days_of_cover: Math.max(0, daysOfCover),
        reorder_level: reorderLevel,
        safety_stock: safetyStock,
        status,
      };
    });

    res.json(summaries);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Chronological Stock Movement Ledger (كشف حركة المخزن الموحد)
apiRouter.get('/inventory/ledger', async (req, res) => {
  try {
    const { station_id, item_type = 'alum_liquid' } = req.query as any;
    if (!station_id) return res.status(400).json({ error: 'المحطة مطلوبة' });

    const [stSetting, orders, records] = await Promise.all([
      queryOne<any>('SELECT * FROM inventory_settings WHERE station_id=? AND item_type=?', [station_id, item_type]),
      query<any>('SELECT id, order_number, supplier, date, quantity_tons, vehicle_plate, received_by, lab_status FROM supply_orders WHERE station_id=? AND item_type=? ORDER BY date ASC', [station_id, item_type]),
      query<any>('SELECT id, date, alum_liquid, alum_solid, shift_crew FROM daily_records WHERE station_id=? ORDER BY date ASC', [station_id]),
    ]);

    const openingStock = stSetting?.opening_stock_tons || 50;
    const opDate = stSetting?.opening_stock_date ? (typeof stSetting.opening_stock_date === 'object' ? stSetting.opening_stock_date.toISOString().slice(0,10) : stSetting.opening_stock_date) : '2026-05-01';

    type RawEvent = {
      date: string;
      type: 'in' | 'out' | 'opening';
      ref: string;
      desc: string;
      qty: number;
      actor: string;
    };

    const events: RawEvent[] = [
      {
        date: opDate,
        type: 'opening',
        ref: 'رصيد افتتاحي',
        desc: 'الرصيد الافتتاحي المعتمد لبداية الدورة المخزنية',
        qty: openingStock,
        actor: 'إدارة المخازن',
      }
    ];

    for (const o of orders) {
      const orderDate = typeof o.date === 'object' ? o.date.toISOString().slice(0,10) : o.date;
      events.push({
        date: orderDate,
        type: 'in',
        ref: o.order_number,
        desc: `توريد شحنة من ${o.supplier} ${o.vehicle_plate ? `(سيارة: ${o.vehicle_plate})` : ''}`,
        qty: Number(o.quantity_tons) || 0,
        actor: o.received_by || 'أمين المخزن',
      });
    }

    for (const r of records) {
      const recDate = typeof r.date === 'object' ? r.date.toISOString().slice(0,10) : r.date;
      const consumed = item_type === 'alum_solid' ? (Number(r.alum_solid) || 0) : (Number(r.alum_liquid) || 0);
      if (consumed > 0) {
        events.push({
          date: recDate,
          type: 'out',
          ref: `يومية ${recDate}`,
          desc: `استهلاك التشغيل اليومي بالمحطة`,
          qty: consumed,
          actor: r.shift_crew || 'طاقم الوردية',
        });
      }
    }

    // Sort chronologically by date
    events.sort((a, b) => a.date.localeCompare(b.date));

    // Calculate running balance
    let runningBalance = 0;
    const ledger = events.map((ev, idx) => {
      if (ev.type === 'opening') {
        runningBalance = ev.qty;
      } else if (ev.type === 'in') {
        runningBalance += ev.qty;
      } else if (ev.type === 'out') {
        runningBalance -= ev.qty;
      }

      return {
        id: `led_${idx}_${ev.date}`,
        date: ev.date,
        type: ev.type,
        type_label: ev.type === 'opening' ? 'رصيد افتتاحي' : ev.type === 'in' ? 'إذن إضافة (وارد)' : 'إذن صرف (استهلاك)',
        reference_no: ev.ref,
        description: ev.desc,
        in_qty: ev.type === 'in' ? ev.qty : (ev.type === 'opening' ? ev.qty : 0),
        out_qty: ev.type === 'out' ? ev.qty : 0,
        balance_after: +runningBalance.toFixed(2),
        actor: ev.actor,
      };
    });

    // Return reversed so latest transactions are at top
    res.json(ledger.reverse());
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Health check
apiRouter.get('/health', (_req, res) => res.json({ status: 'ok', db: 'mysql', timestamp: new Date().toISOString() }));

// ══════════════════════════════════════════════════════════════
//  AI JAR TEST ADVISOR & DOSAGE OPTIMIZER
// ══════════════════════════════════════════════════════════════
apiRouter.post('/ai/jartest-advisor', async (req, res) => {
  const { turbidityNTU, pH, temperatureC, rawFlowM3h, stationName, alumLabDose, alumActualDose } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const labDose = alumLabDose || +(15 + Math.pow(turbidityNTU || 35, 0.65) * 1.8).toFixed(1);
  const actualDose = alumActualDose || labDose;
  const variance = +(actualDose - labDose).toFixed(2);
  const variancePct = labDose > 0 ? +((variance / labDose) * 100).toFixed(1) : 0;

  if (!apiKey || apiKey === '""' || apiKey === '') {
    // Return structured engineering recommendation when API key is not configured
    let advice = `### 🧪 تقرير استشاري لجرعات الشبة والتشغيل - ${stationName || 'محطة مياه'}

**1. تحليل مواصفات المياه الخام:**
* العكارة: **${turbidityNTU || 35} NTU** | الرقم الهيدروجيني: **${pH || 7.8}** | الحرارة: **${temperatureC || 24} °م**
* التصرف الإجمالي: **${(rawFlowM3h || 6000).toLocaleString()} م³/ساعة**

**2. مطابقة الجرعات (المعملية vs الفعلية):**
* الجرعة المعملية المثالية (Jar Test): **${labDose} PPM (جم/م³)**
* الجرعة الفعلية المطبقة بالمحطة: **${actualDose} PPM (جم/م³)**
* الفارق والانحراف: **${variance >= 0 ? '+' : ''}${variance} جم/م³ (${variancePct >= 0 ? '+' : ''}${variancePct}%)**

**3. التقييم الهندسي والتشغيلي:**
`;
    if (Math.abs(variancePct) <= 3) {
      advice += `* ✅ **تطابق ممتاز**: الجرعة الفعلية مطابقة لتجربة الجار تست بنسبة عالية، مما يضمن كفاءة الترويب المثلى وترسيب متوازن بالمروقات دون هدر في الكيماويات.\n`;
    } else if (variance > 0) {
      advice += `* ⚠️ **فائض في جرعة الشبة**: الجرعة الفعلية أعلى من المعملية بمقدار ${variance} جم/م³ (${variancePct}%). يوصى بخفض شوط طلمبات الحقن (Stroke) بنسبة ${Math.min(15, Math.abs(variancePct))}% لتوفير الاستهلاك وتجنب تسرب بقايا الألومنيوم للمرشحات.\n`;
    } else {
      advice += `* ⚠️ **عجز في جرعة الشبة**: الجرعة الفعلية أقل من المعملية بمقدار ${Math.abs(variance)} جم/م³. قد يؤدي ذلك إلى تأخر تكوين الندف (Pin-point flocs) وزيادة حمل العكارة على المرشحات الرملية. يوصى بزيادة معدل الحقن تدريجياً.\n`;
    }

    advice += `
**4. معدلات ضخ محلول الشبة (تركيز 10%):**
* معدل الحقن للجرعة المعملية: **${+((rawFlowM3h * labDose / 1000) / 1.33 * 10).toFixed(1)} لتر/ساعة**
* معدل الحقن للجرعة الفعلية: **${+((rawFlowM3h * actualDose / 1000) / 1.33 * 10).toFixed(1)} لتر/ساعة**

**5. توصيات مراقبة المروقات:**
* فحص سرعة الترويب في حوض الخلط السريع (1-2 دقيقة).
* مراقبة طبقة الروبة في قاع المروق وتفريغها بانتظام لتجنب الطفو.`;

    return res.json({ success: true, text: advice });
  }

  try {
    const prompt = `
أنت رئيس قطاع المعامل والبحوث وخبير جودة مياه الشرب.
قم بتحليل بيانات الجار تست والجرعة المعملية مقابل الجرعة الفعلية للشبة للمحطة التالية وقدم تقريراً فنياً دقيقاً ومباشراً بالعربية:

المحطة: ${stationName || 'محطة مياه'}
- عكارة المياه الخام: ${turbidityNTU} NTU
- الرقم الهيدروجيني pH: ${pH}
- درجة الحرارة: ${temperatureC} °م
- تصرف المياه الخام: ${rawFlowM3h} م³/ساعة
- الجرعة المعملية للشبة (Jar Test): ${labDose} جم/م³
- الجرعة الفعلية المطبقة: ${actualDose} جم/م³
- نسبة الفارق/الانحراف: ${variancePct}%

قدم:
1. تقييم كفاءة الترويب والجرعة المثالية للشبة
2. تحليل دقيق للفارق بين الجرعة المعملية والفعلية وأثره الفني والمالي
3. توصيات فورية لضبط طلمبات الحقن ومعدلات التصرف الحجمي
4. إرشادات لمشغلي المروقات والمرشحات
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
    if (data.error) return res.json({ success: false, error: data.error.message });

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ success: true, text: text || 'تم التحليل بنجاح' });
  } catch (e: any) {
    res.json({ success: false, error: e.message });
  }
});

// ══════════════════════════════════════════════════════════════
//  AI BREAKDOWN DIAGNOSIS
// ══════════════════════════════════════════════════════════════
apiRouter.post('/ai/diagnose-breakdown', async (req, res) => {
  const { assetType, assetLabel, severity, description, stationName } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '""' || apiKey === '') {
    const advice = `### 🛠️ تشخيص العطل الهندسي - ${stationName || 'المحطة'}

* **المعدة المتأثرة:** ${assetLabel || assetType} (${assetType})
* **مستوى الخطورة:** ${severity}
* **التوصيف:** ${description}

**خطة العمل الفنية الموصى بها:**
1. عزل المعدة كهربائياً وهيدروليكياً وتطبيق إجراءات السلامة والصحة المهنية (LOTO).
2. فحص المحاذاة والسيور والرمان بلي والتسريب الميكانيكي.
3. تشغيل الوحدة الاحتياطية فوراً للحفاظ على استمرارية ضخ وتصرف المحطة.
4. طلب قطع الغيار اللازمة وإصدار أمر شغل صيانة عاجل.`;
    return res.json({ success: true, text: advice });
  }

  try {
    const prompt = `
أنت كبير مهندسي الصيانة والتشغيل في شركة مياه الشرب.
قدم تشخيصاً هندسياً عاجلاً وخطة صيانة للعطل التالي بالعربية:
- المحطة: ${stationName}
- نوع الأصل: ${assetType}
- بيان المعدة: ${assetLabel}
- درجة الخطورة: ${severity}
- وصف العطل: ${description}

المطلوب:
1. التشخيص الأرجح لسبب العطل
2. الخطوات الفنية الفورية لإصلاح العطل
3. الإجراءات الاحترازية لتجنب نقص الإنتاج
4. قطع الغيار المتوقعة
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ success: true, text: text || 'تم تشخيص العطل' });
  } catch (e: any) {
    res.json({ success: false, error: e.message });
  }
});

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

// ══════════════════════════════════════════════════════════════
//  CLIENT ERROR LOGGING
// ══════════════════════════════════════════════════════════════
apiRouter.post('/logs/client-error', (req: Request, res: Response) => {
  try {
    const { message, stack, context } = req.body;
    logger.error(`[Client Error] ${message} | Context: ${JSON.stringify(context || {})} | Stack: ${stack || 'N/A'}`);
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});


