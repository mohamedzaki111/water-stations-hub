import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialStations, initialUsers, initialRecords, initialBreakdowns } from '../data/initialData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../../data/water_stations.db');

// ── Create / open database ────────────────────────────────────
export function getDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

// ── Initialize schema + seed data ────────────────────────────
export function initDb() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS stations (
      id          TEXT PRIMARY KEY,
      status      TEXT NOT NULL DEFAULT 'active',
      data        TEXT NOT NULL  -- JSON blob for static
    );

    CREATE TABLE IF NOT EXISTS users (
      id          TEXT PRIMARY KEY,
      username    TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      role        TEXT NOT NULL,
      station_id  TEXT,
      active      INTEGER NOT NULL DEFAULT 1,
      password    TEXT NOT NULL DEFAULT '123'
    );

    CREATE TABLE IF NOT EXISTS daily_records (
      id                    TEXT PRIMARY KEY,
      station_id            TEXT NOT NULL,
      date                  TEXT NOT NULL,
      produced_m3           REAL NOT NULL,
      turbid_m3             REAL NOT NULL DEFAULT 0,
      backwash_m3           REAL,
      cooling_m3            REAL,
      nile_level            REAL,
      tank1_high            REAL,
      tank1_low             REAL,
      tank2_high            REAL,
      tank2_low             REAL,
      well1_high            REAL,
      well1_low             REAL,
      well2_high            REAL,
      well2_low             REAL,
      pressure_high         REAL,
      pressure_low          REAL,
      alum_solid            REAL,
      alum_liquid           REAL NOT NULL DEFAULT 0,
      chlorine_gas          REAL,
      hypochlorite          REAL,
      flow_meters_ok        INTEGER NOT NULL DEFAULT 1,
      electricity_kwh       REAL NOT NULL DEFAULT 0,
      electricity_kvar      REAL,
      electricity_kva       REAL,
      power_factor          REAL,
      maintenance_periodic  INTEGER,
      maintenance_repair    INTEGER,
      shift_crew            TEXT NOT NULL DEFAULT '',
      notes                 TEXT,
      efficiency            REAL NOT NULL DEFAULT 0,
      kwh_per_m3            REAL NOT NULL DEFAULT 0,
      alum_per_m3           REAL NOT NULL DEFAULT 0,
      chlorine_per_m3       REAL NOT NULL DEFAULT 0,
      avg_production        REAL,
      created_by            TEXT NOT NULL DEFAULT '',
      created_at            TEXT NOT NULL,
      UNIQUE(station_id, date)
    );

    CREATE TABLE IF NOT EXISTS breakdowns (
      id                    TEXT PRIMARY KEY,
      station_id            TEXT NOT NULL,
      asset_type            TEXT NOT NULL,
      asset_label           TEXT NOT NULL,
      severity              TEXT NOT NULL,
      status                TEXT NOT NULL DEFAULT 'جارٍ',
      description           TEXT NOT NULL,
      start_date            TEXT NOT NULL,
      start_time            TEXT,
      end_date              TEXT,
      end_time              TEXT,
      production_loss_m3    REAL,
      capacity_reduced_pct  REAL,
      notes                 TEXT,
      created_by            TEXT NOT NULL DEFAULT '',
      created_at            TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_records_station_date ON daily_records(station_id, date);
    CREATE INDEX IF NOT EXISTS idx_records_date ON daily_records(date);
    CREATE INDEX IF NOT EXISTS idx_breakdowns_station ON breakdowns(station_id);
  `);

  // Seed if empty
  const stationCount = (db.prepare('SELECT COUNT(*) as c FROM stations').get() as any).c;
  if (stationCount === 0) {
    console.log('🌱 Seeding database with initial data...');

    const insertStation = db.prepare('INSERT OR IGNORE INTO stations (id, status, data) VALUES (?, ?, ?)');
    for (const st of initialStations) {
      insertStation.run(st.id, st.status, JSON.stringify(st.static));
    }

    const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, username, name, role, station_id, active, password) VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const u of initialUsers) {
      insertUser.run(u.id, u.username, u.name, u.role, u.station_id, u.active ? 1 : 0, '123');
    }

    const insertRecord = db.prepare(`
      INSERT OR IGNORE INTO daily_records
        (id,station_id,date,produced_m3,turbid_m3,alum_liquid,chlorine_gas,electricity_kwh,
         flow_meters_ok,shift_crew,efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);
    for (const r of initialRecords) {
      insertRecord.run(
        r.id, r.station_id, r.date,
        r.produced_m3, r.turbid_m3, r.alum_liquid, r.chlorine_gas||0, r.electricity_kwh,
        r.flow_meters_ok?1:0, r.shift_crew,
        r.efficiency, r.kwh_per_m3, r.alum_per_m3, r.chlorine_per_m3,
        r.created_by, r.created_at
      );
    }

    const insertBd = db.prepare(`
      INSERT OR IGNORE INTO breakdowns
        (id,station_id,asset_type,asset_label,severity,status,description,start_date,start_time,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `);
    for (const b of (initialBreakdowns || [])) {
      insertBd.run(b.id,b.station_id,b.asset_type,b.asset_label,b.severity,b.status,b.description,b.start_date,b.start_time||'',b.created_by,b.created_at);
    }

    console.log(`✅ Seeded: ${initialStations.length} stations, ${initialUsers.length} users, ${initialRecords.length} records`);
  }

  db.close();
}
