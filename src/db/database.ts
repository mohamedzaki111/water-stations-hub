import mysql from 'mysql2/promise';
import {
  initialStations,
  initialUsers,
  initialRecords,
  initialBreakdowns,
  initialLabRecords,
  initialSupplyOrders,
  initialInventorySettings
} from '../data/initialData.js';

// ── Connection Pool (with database) ──────────────────────────
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host:               process.env.DB_HOST     || 'localhost',
      port:               parseInt(process.env.DB_PORT || '3306'),
      user:               process.env.DB_USER     || 'root',
      password:           process.env.DB_PASSWORD || '',
      database:           process.env.DB_NAME     || 'water_stations',
      waitForConnections: true,
      connectionLimit:    10,
      charset:            'utf8mb4',
    });
  }
  return pool;
}

// ── Root connection (no database — to create DB if missing) ───
async function getRootConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '3306'),
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    charset:  'utf8mb4',
  });
}

// ── Query helpers ─────────────────────────────────────────────
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T[];
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function run(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().execute(sql, params);
  return result as mysql.ResultSetHeader;
}

// ── Initialize DB + Schema + Seed ────────────────────────────
export async function initDb() {
  const dbName = process.env.DB_NAME || 'water_stations';

  // Step 1: Create database if it doesn't exist
  console.log('Connecting to MySQL...');
  let rootConn: mysql.Connection | null = null;
  try {
    rootConn = await getRootConnection();
    await rootConn.execute(
      'CREATE DATABASE IF NOT EXISTS `' + dbName + '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
    );
    console.log('Database `' + dbName + '` is ready');
    await rootConn.end();
  } catch (e: any) {
    if (rootConn) await rootConn.end().catch(() => {});
    console.error('MySQL connection failed:', e.message);
    console.error('Make sure MySQL is running and credentials in .env are correct');
    throw e;
  }

  // Step 2: Connect pool to the database
  const db = getPool();
  await db.execute('SELECT 1');
  console.log('MySQL pool connected');

  // Step 3: Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS stations (
      id      VARCHAR(50)  PRIMARY KEY,
      status  VARCHAR(20)  NOT NULL DEFAULT 'active',
      data    LONGTEXT     NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id          VARCHAR(50)  PRIMARY KEY,
      username    VARCHAR(100) UNIQUE NOT NULL,
      name        VARCHAR(200) NOT NULL,
      role        VARCHAR(50)  NOT NULL,
      station_id  VARCHAR(50),
      active      TINYINT(1)   NOT NULL DEFAULT 1,
      password    VARCHAR(255) NOT NULL DEFAULT '123'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS daily_records (
      id                    VARCHAR(50)  PRIMARY KEY,
      station_id            VARCHAR(50)  NOT NULL,
      date                  DATE         NOT NULL,
      produced_m3           DOUBLE       NOT NULL,
      turbid_m3             DOUBLE       NOT NULL DEFAULT 0,
      backwash_m3           DOUBLE,
      cooling_m3            DOUBLE,
      nile_level            DOUBLE,
      tank1_high            DOUBLE,
      tank1_low             DOUBLE,
      tank2_high            DOUBLE,
      tank2_low             DOUBLE,
      well1_high            DOUBLE,
      well1_low             DOUBLE,
      well2_high            DOUBLE,
      well2_low             DOUBLE,
      pressure_high         DOUBLE,
      pressure_low          DOUBLE,
      alum_solid            DOUBLE,
      alum_liquid           DOUBLE       NOT NULL DEFAULT 0,
      alum_lab_dose         DOUBLE,
      chlorine_gas          DOUBLE,
      hypochlorite          DOUBLE,
      flow_meters_ok        TINYINT(1)   NOT NULL DEFAULT 1,
      electricity_kwh       DOUBLE       NOT NULL DEFAULT 0,
      electricity_kvar      DOUBLE,
      electricity_kva       DOUBLE,
      power_factor          DOUBLE,
      maintenance_periodic  INT,
      maintenance_repair    INT,
      shift_crew            VARCHAR(500) NOT NULL DEFAULT '',
      notes                 TEXT,
      efficiency            DOUBLE       NOT NULL DEFAULT 0,
      kwh_per_m3            DOUBLE       NOT NULL DEFAULT 0,
      alum_per_m3           DOUBLE       NOT NULL DEFAULT 0,
      chlorine_per_m3       DOUBLE       NOT NULL DEFAULT 0,
      created_by            VARCHAR(50)  NOT NULL DEFAULT '',
      created_at            DATETIME     NOT NULL,
      UNIQUE KEY uq_station_date (station_id, date),
      INDEX idx_station (station_id),
      INDEX idx_date (date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  // Ensure column alum_lab_dose exists in daily_records
  try {
    await db.execute('ALTER TABLE daily_records ADD COLUMN alum_lab_dose DOUBLE AFTER alum_liquid');
  } catch (err: any) {
    // Column already exists or table freshly created
  }

  await db.execute(`
    CREATE TABLE IF NOT EXISTS breakdowns (
      id                    VARCHAR(50)  PRIMARY KEY,
      station_id            VARCHAR(50)  NOT NULL,
      asset_type            VARCHAR(100) NOT NULL,
      asset_label           VARCHAR(200) NOT NULL,
      severity              VARCHAR(50)  NOT NULL,
      status                VARCHAR(50)  NOT NULL DEFAULT 'جارٍ',
      description           TEXT         NOT NULL,
      start_date            DATE         NOT NULL,
      start_time            VARCHAR(10),
      end_date              DATE,
      end_time              VARCHAR(10),
      production_loss_m3    DOUBLE,
      capacity_reduced_pct  DOUBLE,
      notes                 TEXT,
      created_by            VARCHAR(50)  NOT NULL DEFAULT '',
      created_at            DATETIME     NOT NULL,
      INDEX idx_station (station_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS lab_records (
      id                    VARCHAR(50)  PRIMARY KEY,
      station_id            VARCHAR(50)  NOT NULL,
      date                  DATE         NOT NULL,
      time                  VARCHAR(10),
      shift                 VARCHAR(100),
      turbidity_raw         DOUBLE       NOT NULL,
      ph_raw                DOUBLE,
      temp_raw              DOUBLE,
      flow_m3h              DOUBLE,
      alum_lab_dose         DOUBLE       NOT NULL,
      alum_actual_dose      DOUBLE       NOT NULL,
      alum_diff             DOUBLE,
      alum_diff_pct         DOUBLE,
      turbidity_settled     DOUBLE,
      turbidity_filtered    DOUBLE,
      residual_chlorine     DOUBLE,
      tested_by             VARCHAR(150),
      notes                 TEXT,
      created_at            DATETIME     NOT NULL,
      INDEX idx_station (station_id),
      INDEX idx_date (date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS supply_orders (
      id                 VARCHAR(50)  PRIMARY KEY,
      station_id         VARCHAR(50)  NOT NULL,
      item_type          VARCHAR(50)  NOT NULL DEFAULT 'alum_liquid',
      item_name          VARCHAR(150) NOT NULL DEFAULT 'شبة سائلة',
      order_number       VARCHAR(100) NOT NULL,
      supplier           VARCHAR(200) NOT NULL,
      date               DATE         NOT NULL,
      quantity_tons      DOUBLE       NOT NULL,
      unit_price         DOUBLE,
      total_cost         DOUBLE,
      vehicle_plate      VARCHAR(50),
      driver_name        VARCHAR(100),
      invoice_number     VARCHAR(100),
      purity_pct         DOUBLE,
      lab_status         VARCHAR(50)  DEFAULT 'مقبول',
      received_by        VARCHAR(100),
      notes              TEXT,
      created_at         DATETIME     NOT NULL,
      INDEX idx_station (station_id),
      INDEX idx_date (date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory_settings (
      id                  VARCHAR(50) PRIMARY KEY,
      station_id          VARCHAR(50) NOT NULL,
      item_type           VARCHAR(50) NOT NULL,
      tank_capacity_tons  DOUBLE      NOT NULL DEFAULT 100,
      opening_stock_tons  DOUBLE      NOT NULL DEFAULT 0,
      opening_stock_date  DATE        NOT NULL,
      reorder_level_tons  DOUBLE      NOT NULL DEFAULT 20,
      safety_stock_tons   DOUBLE      NOT NULL DEFAULT 10,
      UNIQUE KEY uq_station_item (station_id, item_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  console.log('Tables ready');

  // Step 4: Seed if empty
  const [rows] = await db.execute('SELECT COUNT(*) as c FROM stations') as any;
  if (rows[0].c > 0) {
    // Check if lab_records needs initial seed
    const [labRows] = await db.execute('SELECT COUNT(*) as c FROM lab_records') as any;
    if (labRows[0].c === 0 && (initialLabRecords || []).length > 0) {
      for (const l of initialLabRecords) {
        await db.execute(`
          INSERT IGNORE INTO lab_records
            (id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
             alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct, turbidity_settled,
             turbidity_filtered, residual_chlorine, tested_by, notes, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [l.id, l.station_id, l.date, l.time || '', l.shift || '',
           l.turbidity_raw, l.ph_raw || null, l.temp_raw || null, l.flow_m3h || null,
           l.alum_lab_dose, l.alum_actual_dose, l.alum_diff || (l.alum_actual_dose - l.alum_lab_dose),
           l.alum_diff_pct || (l.alum_lab_dose > 0 ? +(((l.alum_actual_dose - l.alum_lab_dose) / l.alum_lab_dose) * 100).toFixed(2) : 0),
           l.turbidity_settled || null, l.turbidity_filtered || null, l.residual_chlorine || null,
           l.tested_by || '', l.notes || '', l.created_at.replace('T', ' ').slice(0, 19)]
        );
      }
      console.log('Seeded initial lab records');
    }

    // Check if supply_orders needs initial seed
    const [soRows] = await db.execute('SELECT COUNT(*) as c FROM supply_orders') as any;
    if (soRows[0].c === 0 && (initialSupplyOrders || []).length > 0) {
      for (const so of initialSupplyOrders) {
        await db.execute(`
          INSERT IGNORE INTO supply_orders
            (id, station_id, item_type, item_name, order_number, supplier, date,
             quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
             invoice_number, purity_pct, lab_status, received_by, notes, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [so.id, so.station_id, so.item_type, so.item_name, so.order_number, so.supplier, so.date,
           so.quantity_tons, so.unit_price || null, so.total_cost || null, so.vehicle_plate || '',
           so.driver_name || '', so.invoice_number || '', so.purity_pct || null, so.lab_status || 'مقبول',
           so.received_by || '', so.notes || '', so.created_at.replace('T', ' ').slice(0, 19)]
        );
      }
      console.log('Seeded initial supply orders');
    }

    // Check if inventory_settings needs initial seed
    const [invRows] = await db.execute('SELECT COUNT(*) as c FROM inventory_settings') as any;
    if (invRows[0].c === 0 && (initialInventorySettings || []).length > 0) {
      for (const inv of initialInventorySettings) {
        await db.execute(`
          INSERT IGNORE INTO inventory_settings
            (id, station_id, item_type, tank_capacity_tons, opening_stock_tons,
             opening_stock_date, reorder_level_tons, safety_stock_tons)
          VALUES (?,?,?,?,?,?,?,?)`,
          [inv.id, inv.station_id, inv.item_type, inv.tank_capacity_tons, inv.opening_stock_tons,
           inv.opening_stock_date, inv.reorder_level_tons, inv.safety_stock_tons]
        );
      }
      console.log('Seeded initial inventory settings');
    }

    console.log('Database already initialized');
    return;
  }

  console.log('Seeding initial data...');
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    for (const st of initialStations) {
      await conn.execute(
        'INSERT IGNORE INTO stations (id, status, data) VALUES (?, ?, ?)',
        [st.id, st.status, JSON.stringify(st.static)]
      );
    }

    for (const u of initialUsers) {
      await conn.execute(
        'INSERT IGNORE INTO users (id,username,name,role,station_id,active,password) VALUES (?,?,?,?,?,?,?)',
        [u.id, u.username, u.name, u.role, u.station_id || null, u.active ? 1 : 0, '123']
      );
    }

    for (const r of initialRecords) {
      await conn.execute(`
        INSERT IGNORE INTO daily_records
          (id,station_id,date,produced_m3,turbid_m3,alum_liquid,chlorine_gas,
           electricity_kwh,flow_meters_ok,shift_crew,
           efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [r.id, r.station_id, r.date,
         r.produced_m3, r.turbid_m3, r.alum_liquid, r.chlorine_gas || 0,
         r.electricity_kwh, r.flow_meters_ok ? 1 : 0, r.shift_crew,
         r.efficiency, r.kwh_per_m3, r.alum_per_m3, r.chlorine_per_m3,
         r.created_by, r.created_at.replace('T', ' ').slice(0, 19)]
      );
    }

    for (const b of (initialBreakdowns || [])) {
      await conn.execute(`
        INSERT IGNORE INTO breakdowns
          (id,station_id,asset_type,asset_label,severity,status,
           description,start_date,start_time,created_by,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [b.id, b.station_id, b.asset_type, b.asset_label, b.severity, b.status,
         b.description, b.start_date, b.start_time || '',
         b.created_by, b.created_at.replace('T', ' ').slice(0, 19)]
      );
    }

    for (const l of (initialLabRecords || [])) {
      await conn.execute(`
        INSERT IGNORE INTO lab_records
          (id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
           alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct, turbidity_settled,
           turbidity_filtered, residual_chlorine, tested_by, notes, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [l.id, l.station_id, l.date, l.time || '', l.shift || '',
         l.turbidity_raw, l.ph_raw || null, l.temp_raw || null, l.flow_m3h || null,
         l.alum_lab_dose, l.alum_actual_dose, l.alum_diff || (l.alum_actual_dose - l.alum_lab_dose),
         l.alum_diff_pct || (l.alum_lab_dose > 0 ? +(((l.alum_actual_dose - l.alum_lab_dose) / l.alum_lab_dose) * 100).toFixed(2) : 0),
         l.turbidity_settled || null, l.turbidity_filtered || null, l.residual_chlorine || null,
         l.tested_by || '', l.notes || '', l.created_at.replace('T', ' ').slice(0, 19)]
      );
    }

    for (const so of (initialSupplyOrders || [])) {
      await conn.execute(`
        INSERT IGNORE INTO supply_orders
          (id, station_id, item_type, item_name, order_number, supplier, date,
           quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
           invoice_number, purity_pct, lab_status, received_by, notes, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [so.id, so.station_id, so.item_type, so.item_name, so.order_number, so.supplier, so.date,
         so.quantity_tons, so.unit_price || null, so.total_cost || null, so.vehicle_plate || '',
         so.driver_name || '', so.invoice_number || '', so.purity_pct || null, so.lab_status || 'مقبول',
         so.received_by || '', so.notes || '', so.created_at.replace('T', ' ').slice(0, 19)]
      );
    }

    for (const inv of (initialInventorySettings || [])) {
      await conn.execute(`
        INSERT IGNORE INTO inventory_settings
          (id, station_id, item_type, tank_capacity_tons, opening_stock_tons,
           opening_stock_date, reorder_level_tons, safety_stock_tons)
        VALUES (?,?,?,?,?,?,?,?)`,
        [inv.id, inv.station_id, inv.item_type, inv.tank_capacity_tons, inv.opening_stock_tons,
         inv.opening_stock_date, inv.reorder_level_tons, inv.safety_stock_tons]
      );
    }

    await conn.commit();
    console.log('Seeded: ' + initialStations.length + ' stations, ' + initialUsers.length + ' users, ' + initialRecords.length + ' records, ' + initialLabRecords.length + ' lab records, ' + initialSupplyOrders.length + ' supply orders');
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}


