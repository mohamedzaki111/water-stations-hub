import { useState, useEffect, useCallback } from 'react';
import { Station, User, DailyRecord, BreakdownRecord, StationStats } from '../types.js';
import { api } from './apiClient.js';

// ── Stats calculator ──────────────────────────────────────────
export function calculateStats(records: DailyRecord[]): StationStats {
  if (!records.length) return { count:0,total_prod:0,total_turbid:0,total_alum:0,total_chlorine:0,total_kwh:0,avg_eff:0,avg_kwh_m3:0,avg_production:0,avg_power_factor:0,sludge_m3:0 };
  const p=records.reduce((s,r)=>s+r.produced_m3,0);
  const t=records.reduce((s,r)=>s+r.turbid_m3,0);
  const al=records.reduce((s,r)=>s+r.alum_liquid,0);
  const cl=records.reduce((s,r)=>s+(r.chlorine_gas||0),0);
  const kw=records.reduce((s,r)=>s+r.electricity_kwh,0);
  const pfR=records.filter(r=>r.power_factor!=null&&(r.power_factor||0)>0);
  const avg_pf=pfR.length>0?+(pfR.reduce((s,r)=>s+(r.power_factor||0),0)/pfR.length).toFixed(4):0;
  return { count:records.length,total_prod:Math.round(p),total_turbid:Math.round(t),total_alum:+al.toFixed(2),total_chlorine:+cl.toFixed(3),total_kwh:Math.round(kw),avg_eff:t>0?+(p/t).toFixed(4):0,avg_kwh_m3:p>0?+(kw/p).toFixed(4):0,avg_production:records.length>0?Math.round(p/records.length):0,avg_power_factor:avg_pf,sludge_m3:+(al*500).toFixed(0) };
}

// ── App State ─────────────────────────────────────────────────
interface AppState {
  session: { user: User; station: Station | null; isSystemAdmin: boolean; isCentral: boolean; isAcct: boolean } | null;
  stations: Station[];
  users: User[];
  records: DailyRecord[];
  breakdowns: BreakdownRecord[];
  page: string;
  loading: boolean;
  error: string | null;
}

const listeners = new Set<() => void>();
let state: AppState = {
  session: null, stations: [], users: [], records: [], breakdowns: [],
  page: 'login', loading: false, error: null,
};

function notify() { listeners.forEach(fn => fn()); }
function setState(patch: Partial<AppState>) { state = { ...state, ...patch }; notify(); }

// ── Store actions ─────────────────────────────────────────────
export const store = {
  get session()    { return state.session; },
  get stations()   { return state.stations; },
  get users()      { return state.users; },
  get records()    { return state.records; },
  get breakdowns() { return state.breakdowns; },
  get page()       { return state.page; },
  get loading()    { return state.loading; },
  get error()      { return state.error; },

  subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn); },
  navigate(page: string)    { setState({ page }); },

  // ── Auth ──────────────────────────────────────────────────
  async login(username: string) {
    try {
      setState({ loading: true, error: null });
      const { user } = await api.auth.login(username);
      // Load all data after login
      const [stations, users, records, breakdowns] = await Promise.all([
        api.stations.getAll(),
        api.users.getAll(),
        api.records.getAll({ limit: 500 }),
        api.breakdowns.getAll(),
      ]);
      const station = user.station_id ? stations.find((s: Station) => s.id === user.station_id) || null : null;
      const isSystemAdmin = user.role === 'system_admin';
      const isCentral = user.role === 'central_admin';
      const isAcct    = user.role === 'cost_accountant';
      const page = isSystemAdmin ? 'system/settings' : isCentral ? 'central/dashboard' : isAcct ? 'acct/overview' : 'station/dashboard';
      setState({ session: { user, station, isSystemAdmin, isCentral, isAcct }, stations, users, records, breakdowns, page, loading: false });
      return { ok: true };
    } catch (e: any) {
      setState({ loading: false, error: e.message });
      return { ok: false, error: e.message };
    }
  },

  logout() { setState({ session: null, page: 'login', records: [], breakdowns: [] }); },

  // ── Records ───────────────────────────────────────────────
  getRecords(filters: { station_id?: string; month?: string } = {}) {
    let r = state.records;
    if (filters.station_id) r = r.filter(x => x.station_id === filters.station_id);
    if (filters.month)      r = r.filter(x => x.date.startsWith(filters.month!));
    return r.sort((a, b) => b.date.localeCompare(a.date));
  },

  async addRecord(draft: any) {
    try {
      const result = await api.records.create({ ...draft, created_by: state.session?.user.id || '' });
      // Refresh records
      const records = await api.records.getAll({ limit: 500 });
      setState({ records });
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  },

  async updateRecord(id: string, patch: any) {
    try {
      await api.records.update(id, patch);
      const records = await api.records.getAll({ limit: 500 });
      setState({ records });
    } catch (e: any) { setState({ error: e.message }); }
  },

  async deleteRecord(id: string) {
    try {
      await api.records.delete(id);
      setState({ records: state.records.filter(r => r.id !== id) });
    } catch (e: any) { setState({ error: e.message }); }
  },

  // ── Stats ─────────────────────────────────────────────────
  stats(stationId: string): StationStats {
    return calculateStats(state.records.filter(r => r.station_id === stationId));
  },

  monthlyStats(stationId: string, year: number, month: number): StationStats {
    const m = `${year}-${String(month).padStart(2,'0')}`;
    return calculateStats(state.records.filter(r => r.station_id === stationId && r.date.startsWith(m)));
  },

  trend(stationId: string, days = 30) {
    return state.records.filter(r => r.station_id === stationId).slice(0, days).reverse()
      .map(r => ({ date: r.date.slice(5), eff: +(r.efficiency * 100).toFixed(2), kwh: +r.kwh_per_m3.toFixed(4), prod: r.produced_m3 }));
  },

  allStats() { return state.stations.map(st => ({ station: st, stats: this.stats(st.id) })); },

  // ── Stations ──────────────────────────────────────────────
  async updateStatic(id: string, staticData: any) {
    try {
      await api.stations.update(id, { static: staticData });
      const stations = await api.stations.getAll();
      const session = state.session && state.session.station?.id === id
        ? { ...state.session, station: stations.find((s: Station) => s.id === id) || null }
        : state.session;
      setState({ stations, session });
    } catch (e: any) { setState({ error: e.message }); }
  },

  async toggleStation(id: string) {
    const st = state.stations.find(s => s.id === id);
    if (!st) return;
    const newStatus = st.status === 'active' ? 'suspended' : 'active';
    await api.stations.update(id, { status: newStatus });
    setState({ stations: state.stations.map(s => s.id === id ? { ...s, status: newStatus } : s) });
  },

  // ── Users ─────────────────────────────────────────────────
  async addUser(u: any) {
    try {
      await api.users.create(u);
      const users = await api.users.getAll();
      setState({ users });
    } catch (e: any) { setState({ error: e.message }); }
  },

  async updateUser(id: string, patch: any) {
    try {
      await api.users.update(id, patch);
      setState({ users: state.users.map(u => u.id === id ? { ...u, ...patch } : u) });
    } catch (e: any) { setState({ error: e.message }); }
  },

  // ── Breakdowns ────────────────────────────────────────────
  getBreakdowns(stationId?: string) {
    const all = state.breakdowns.sort((a, b) => b.start_date.localeCompare(a.start_date));
    return stationId ? all.filter(b => b.station_id === stationId) : all;
  },

  async addBreakdown(d: any) {
    try {
      await api.breakdowns.create({ ...d, created_by: state.session?.user.id || '' });
      const breakdowns = await api.breakdowns.getAll();
      setState({ breakdowns });
      return { ok: true };
    } catch (e: any) { return { ok: false, error: e.message }; }
  },

  async resolveBreakdown(id: string, data: any) {
    try {
      await api.breakdowns.resolve(id, data);
      const breakdowns = await api.breakdowns.getAll();
      setState({ breakdowns });
    } catch (e: any) { setState({ error: e.message }); }
  },

  async deleteBreakdown(id: string) {
    try {
      await api.breakdowns.delete(id);
      setState({ breakdowns: state.breakdowns.filter(b => b.id !== id) });
    } catch (e: any) { setState({ error: e.message }); }
  },

  breakdownStats(stationId: string) {
    const bds = state.breakdowns.filter(b => b.station_id === stationId);
    return { total: bds.length, open: bds.filter(b => b.status === 'جارٍ').length, resolved: bds.filter(b => b.status === 'مكتمل').length, total_loss: bds.reduce((s, b) => s + (b.production_loss_m3 || 0), 0) };
  },
};

// ── React hook ────────────────────────────────────────────────
export function useStore() {
  const [, tick] = useState(0);
  useEffect(() => { return store.subscribe(() => tick(n => n + 1)); }, []);
  return store;
}

// Alias for backward compatibility with components
export const appStore = store;
