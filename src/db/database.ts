import mysql from 'mysql2/promise';
import { initialStations, initialUsers, initialRecords, initialBreakdowns } from '../data/initialData.js';

// ── Connection Pool ───────────────────────────────────────────
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT || '3306'),
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME     || 'water_stations',
      waitForConnections: true,
      connectionLimit:    10,
      charset: 'utf8mb4',
    });
  }
  return pool;
}

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

// ── Initialize schema ─────────────────────────────────────────
export async function initDb() {
  const db = getPool();

  // Test connection
  try {
    await db.execute('SELECT 1');
    console.log('✅ MySQL connected');
  } catch (e) {
    console.error('❌ MySQL connection failed:', e);
    throw e;
  }

  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS stations (
      id      VARCHAR(50)  PRIMARY KEY,
      status  VARCHAR(20)  NOT NULL DEFAULT 'active',
      data    LONGTEXT     NOT NULL COMMENT 'JSON — static station data'
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
      id                    VARCHAR(50)   PRIMARY KEY,
      station_id            VARCHAR(50)   NOT NULL,
      date                  DATE          NOT NULL,
      produced_m3           DOUBLE        NOT NULL,
      turbid_m3             DOUBLE        NOT NULL DEFAULT 0,
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
      alum_liquid           DOUBLE        NOT NULL DEFAULT 0,
      chlorine_gas          DOUBLE,
      hypochlorite          DOUBLE,
      flow_meters_ok        TINYINT(1)    NOT NULL DEFAULT 1,
      electricity_kwh       DOUBLE        NOT NULL DEFAULT 0,
      electricity_kvar      DOUBLE,
      electricity_kva       DOUBLE,
      power_factor          DOUBLE,
      maintenance_periodic  INT,
      maintenance_repair    INT,
      shift_crew            VARCHAR(500)  NOT NULL DEFAULT '',
      notes                 TEXT,
      efficiency            DOUBLE        NOT NULL DEFAULT 0,
      kwh_per_m3            DOUBLE        NOT NULL DEFAULT 0,
      alum_per_m3           DOUBLE        NOT NULL DEFAULT 0,
      chlorine_per_m3       DOUBLE        NOT NULL DEFAULT 0,
      created_by            VARCHAR(50)   NOT NULL DEFAULT '',
      created_at            DATETIME      NOT NULL,
      UNIQUE KEY uq_station_date (station_id, date),
      INDEX idx_station_id (station_id),
      INDEX idx_date (date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS breakdowns (
      id                    VARCHAR(50)   PRIMARY KEY,
      station_id            VARCHAR(50)   NOT NULL,
      asset_type            VARCHAR(100)  NOT NULL,
      asset_label           VARCHAR(200)  NOT NULL,
      severity              VARCHAR(50)   NOT NULL,
      status                VARCHAR(50)   NOT NULL DEFAULT 'جارٍ',
      description           TEXT          NOT NULL,
      start_date            DATE          NOT NULL,
      start_time            VARCHAR(10),
      end_date              DATE,
      end_time              VARCHAR(10),
      production_loss_m3    DOUBLE,
      capacity_reduced_pct  DOUBLE,
      notes                 TEXT,
      created_by            VARCHAR(50)   NOT NULL DEFAULT '',
      created_at            DATETIME      NOT NULL,
      INDEX idx_station_id (station_id),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  console.log('✅ MySQL tables ready');

  // ── Seed if empty ─────────────────────────────────────────
  const [stationCount] = await db.execute('SELECT COUNT(*) as c FROM stations') as any;
  if (stationCount[0].c === 0) {
    console.log('🌱 Seeding database...');

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
          'INSERT IGNORE INTO users (id, username, name, role, station_id, active, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
          [r.id, r.station_id, r.date, r.produced_m3, r.turbid_m3,
           r.alum_liquid, r.chlorine_gas||0, r.electricity_kwh,
           r.flow_meters_ok ? 1 : 0, r.shift_crew,
           r.efficiency, r.kwh_per_m3, r.alum_per_m3, r.chlorine_per_m3,
           r.created_by, r.created_at.replace('T',' ').slice(0,19)]
        );
      }

      for (const b of (initialBreakdowns || [])) {
        await conn.execute(`
          INSERT IGNORE INTO breakdowns
            (id,station_id,asset_type,asset_label,severity,status,description,start_date,start_time,created_by,created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          [b.id,b.station_id,b.asset_type,b.asset_label,b.severity,
           b.status,b.description,b.start_date,b.start_time||'',
           b.created_by, b.created_at.replace('T',' ').slice(0,19)]
        );
      }

      await conn.commit();
      console.log(`✅ Seeded: ${initialStations.length} stations, ${initialUsers.length} users, ${initialRecords.length} records`);
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }
}
