import { Station, User, DailyRecord, BreakdownRecord, StationStats } from '../types';
import { initialStations, initialUsers, initialRecords, initialBreakdowns } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'water_plants_data_v2';

export function calculateStats(records: DailyRecord[]): StationStats {
  if (!records.length) {
    return {
      count: 0,
      total_prod: 0,
      total_turbid: 0,
      total_alum: 0,
      total_chlorine: 0,
      total_kwh: 0,
      avg_eff: 0,
      avg_kwh_m3: 0,
      avg_production: 0,
      avg_power_factor: 0,
      sludge_m3: 0,
    };
  }

  const total_prod = records.reduce((sum, r) => sum + r.produced_m3, 0);
  const total_turbid = records.reduce((sum, r) => sum + r.turbid_m3, 0);
  const total_alum = records.reduce((sum, r) => sum + r.alum_liquid, 0);
  const total_chlorine = records.reduce((sum, r) => sum + (r.chlorine_gas || 0), 0);
  const total_kwh = records.reduce((sum, r) => sum + r.electricity_kwh, 0);

  const pfRecords = records.filter((r) => r.power_factor != null && r.power_factor > 0);
  const avg_power_factor = pfRecords.length > 0
    ? +(pfRecords.reduce((sum, r) => sum + (r.power_factor || 0), 0) / pfRecords.length).toFixed(4)
    : 0;

  const sludge_m3 = +(total_alum * 500).toFixed(0);

  return {
    count: records.length,
    total_prod: Math.round(total_prod),
    total_turbid: Math.round(total_turbid),
    total_alum: +total_alum.toFixed(2),
    total_chlorine: +total_chlorine.toFixed(3),
    total_kwh: Math.round(total_kwh),
    avg_eff: total_turbid > 0 ? +(total_prod / total_turbid).toFixed(4) : 0,
    avg_kwh_m3: total_prod > 0 ? +(total_kwh / total_prod).toFixed(4) : 0,
    avg_production: records.length > 0 ? Math.round(total_prod / records.length) : 0,
    avg_power_factor,
    sludge_m3,
  };
}

class AppStoreManager {
  stations: Station[] = [];
  users: User[] = [];
  records: DailyRecord[] = [];
  breakdowns: BreakdownRecord[] = [];
  session: {
    user: User;
    station: Station | null;
    isCentral: boolean;
    isAcct: boolean;
  } | null = null;
  page: string = 'login';
  listeners = new Set<() => void>();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.stations = parsed.stations || structuredClone(initialStations);
        this.users = parsed.users || structuredClone(initialUsers);
        this.records = parsed.records || structuredClone(initialRecords);
        this.breakdowns = parsed.breakdowns || structuredClone(initialBreakdowns);
      } else {
        this.resetToDefaults();
      }
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
      this.resetToDefaults();
    }
  }

  private saveToStorage() {
    try {
      const payload = {
        stations: this.stations,
        users: this.users,
        records: this.records,
        breakdowns: this.breakdowns,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  resetToDefaults() {
    this.stations = structuredClone(initialStations);
    this.users = structuredClone(initialUsers);
    this.records = structuredClone(initialRecords);
    this.breakdowns = structuredClone(initialBreakdowns);
    this.saveToStorage();
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  login(username: string) {
    const user = this.users.find((u) => u.username === username && u.active);
    if (!user) return { ok: false, error: 'اسم المستخدم غير موجود أو معطل' };

    const station = user.station_id
      ? this.stations.find((s) => s.id === user.station_id) || null
      : null;

    this.session = {
      user,
      station,
      isCentral: user.role === 'central_admin',
      isAcct: user.role === 'cost_accountant',
    };

    if (user.role === 'central_admin') {
      this.page = 'central/dashboard';
    } else if (user.role === 'cost_accountant') {
      this.page = 'acct/overview';
    } else {
      this.page = 'station/dashboard';
    }

    this.notify();
    return { ok: true };
  }

  logout() {
    this.session = null;
    this.page = 'login';
    this.notify();
  }

  navigate(newPage: string) {
    this.page = newPage;
    this.notify();
  }

  getRecords(opts: { station_id?: string; month?: string; startDate?: string; endDate?: string } = {}) {
    let list = this.records;
    if (opts.station_id) {
      list = list.filter((r) => r.station_id === opts.station_id);
    }
    if (opts.month) {
      list = list.filter((r) => r.date.startsWith(opts.month!));
    }
    if (opts.startDate) {
      list = list.filter((r) => r.date >= opts.startDate!);
    }
    if (opts.endDate) {
      list = list.filter((r) => r.date <= opts.endDate!);
    }
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }

  addRecord(recordData: Omit<DailyRecord, 'id' | 'efficiency' | 'kwh_per_m3' | 'alum_per_m3' | 'chlorine_per_m3' | 'created_at'>) {
    const existing = this.records.find(
      (r) => r.station_id === recordData.station_id && r.date === recordData.date
    );
    if (existing) {
      return { ok: false, error: `يوجد سجل مسبق لهذه المحطة بتاريخ ${recordData.date}` };
    }

    if (recordData.turbid_m3 > 0 && recordData.turbid_m3 < recordData.produced_m3) {
      return { ok: false, error: 'المياه العكرة يجب أن تكون أكبر من أو تساوي المياه المنتجة' };
    }

    const eff = recordData.turbid_m3 > 0 ? +(recordData.produced_m3 / recordData.turbid_m3).toFixed(4) : 0;
    const kva = recordData.electricity_kvar && recordData.electricity_kwh > 0
      ? +Math.sqrt(recordData.electricity_kwh ** 2 + recordData.electricity_kvar ** 2).toFixed(2)
      : undefined;
    const pf = kva && kva > 0 ? +(recordData.electricity_kwh / kva).toFixed(4) : undefined;

    const kwh_m3 = recordData.produced_m3 > 0 ? +(recordData.electricity_kwh / recordData.produced_m3).toFixed(5) : 0;
    const alum_m3 = recordData.produced_m3 > 0 ? +(recordData.alum_liquid / recordData.produced_m3 * 1000).toFixed(5) : 0;
    const cl_m3 = recordData.produced_m3 > 0 ? +((recordData.chlorine_gas || 0) / recordData.produced_m3 * 1000).toFixed(5) : 0;

    const newRecord: DailyRecord = {
      ...recordData,
      id: `r_${Date.now()}`,
      efficiency: eff,
      electricity_kva: kva,
      power_factor: pf,
      kwh_per_m3: kwh_m3,
      alum_per_m3: alum_m3,
      chlorine_per_m3: cl_m3,
      created_at: new Date().toISOString(),
    };

    this.records.unshift(newRecord);
    this.saveToStorage();
    this.notify();
    return { ok: true, record: newRecord };
  }

  updateRecord(id: string, updates: Partial<DailyRecord>) {
    const idx = this.records.findIndex((r) => r.id === id);
    if (idx < 0) return;

    const current = this.records[idx];
    const merged = { ...current, ...updates };

    merged.efficiency = merged.turbid_m3 > 0 ? +(merged.produced_m3 / merged.turbid_m3).toFixed(4) : 0;
    merged.electricity_kva = merged.electricity_kvar && merged.electricity_kwh > 0
      ? +Math.sqrt(merged.electricity_kwh ** 2 + merged.electricity_kvar ** 2).toFixed(2)
      : undefined;
    merged.power_factor = merged.electricity_kva && merged.electricity_kva > 0
      ? +(merged.electricity_kwh / merged.electricity_kva).toFixed(4)
      : undefined;

    merged.kwh_per_m3 = merged.produced_m3 > 0 ? +(merged.electricity_kwh / merged.produced_m3).toFixed(5) : 0;
    merged.alum_per_m3 = merged.produced_m3 > 0 ? +(merged.alum_liquid / merged.produced_m3 * 1000).toFixed(5) : 0;
    merged.chlorine_per_m3 = merged.produced_m3 > 0 ? +((merged.chlorine_gas || 0) / merged.produced_m3 * 1000).toFixed(5) : 0;

    this.records[idx] = merged;
    this.saveToStorage();
    this.notify();
  }

  deleteRecord(id: string) {
    this.records = this.records.filter((r) => r.id !== id);
    this.saveToStorage();
    this.notify();
  }

  stats(stationId: string, startDate?: string, endDate?: string) {
    let list = this.records.filter((r) => r.station_id === stationId);
    if (startDate) list = list.filter((r) => r.date >= startDate);
    if (endDate) list = list.filter((r) => r.date <= endDate);
    return calculateStats(list);
  }

  monthlyStats(stationId: string, year: number, month: number) {
    const mStr = `${year}-${String(month).padStart(2, '0')}`;
    const list = this.records.filter((r) => r.station_id === stationId && r.date.startsWith(mStr));
    return calculateStats(list);
  }

  trend(stationId: string, limit = 30) {
    const list = this.records
      .filter((r) => r.station_id === stationId)
      .slice(0, limit)
      .reverse();

    return list.map((r) => ({
      date: r.date.slice(5),
      fullDate: r.date,
      eff: +(r.efficiency * 100).toFixed(2),
      kwh: +r.kwh_per_m3.toFixed(4),
      prod: r.produced_m3,
      turb: r.turbid_m3,
      pf: r.power_factor || 0,
      alum: r.alum_liquid,
      chlorine: r.chlorine_gas || 0
    }));
  }

  allStats() {
    return this.stations.map((s) => ({
      station: s,
      stats: this.stats(s.id),
    }));
  }

  updateStatic(stationId: string, updates: Partial<Station['static']>) {
    const st = this.stations.find((s) => s.id === stationId);
    if (st) {
      st.static = { ...st.static, ...updates };
      if (this.session?.station?.id === stationId) {
        this.session.station = { ...st };
      }
      this.saveToStorage();
      this.notify();
    }
  }

  toggleStation(stationId: string) {
    const st = this.stations.find((s) => s.id === stationId);
    if (st) {
      st.status = st.status === 'active' ? 'suspended' : 'active';
      this.saveToStorage();
      this.notify();
    }
  }

  addStation(newStation: Station) {
    this.stations.push(newStation);
    this.saveToStorage();
    this.notify();
  }

  getBreakdowns(stationId?: string) {
    let list = [...this.breakdowns].sort((a, b) => b.start_date.localeCompare(a.start_date));
    if (stationId) {
      list = list.filter((b) => b.station_id === stationId);
    }
    return list;
  }

  addBreakdown(bd: Omit<BreakdownRecord, 'id' | 'created_at'>) {
    const newBd: BreakdownRecord = {
      ...bd,
      id: `bd_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.breakdowns.unshift(newBd);
    this.saveToStorage();
    this.notify();
    return newBd;
  }

  resolveBreakdown(
    id: string,
    endDate: string,
    endTime?: string,
    lossM3?: number,
    capReduced?: number,
    notes?: string
  ) {
    const item = this.breakdowns.find((b) => b.id === id);
    if (item) {
      item.status = 'مكتمل';
      item.end_date = endDate;
      item.end_time = endTime;
      if (lossM3 != null) item.production_loss_m3 = lossM3;
      if (capReduced != null) item.capacity_reduced_pct = capReduced;
      if (notes) item.notes = notes;

      if (item.start_date && endDate) {
        try {
          const t1 = new Date(`${item.start_date}T${item.start_time || '00:00'}`).getTime();
          const t2 = new Date(`${endDate}T${endTime || '00:00'}`).getTime();
          item.duration_hours = +((t2 - t1) / (1000 * 3600)).toFixed(1);
        } catch (e) {
          // ignore date parse issues
        }
      }

      this.saveToStorage();
      this.notify();
    }
  }

  deleteBreakdown(id: string) {
    this.breakdowns = this.breakdowns.filter((b) => b.id !== id);
    this.saveToStorage();
    this.notify();
  }

  breakdownStats(stationId?: string) {
    const list = stationId ? this.breakdowns.filter((b) => b.station_id === stationId) : this.breakdowns;
    const total_loss = list.reduce((sum, b) => sum + (b.production_loss_m3 || 0), 0);
    const open = list.filter((b) => b.status === 'جارٍ').length;
    const resolved = list.filter((b) => b.status === 'مكتمل').length;
    return {
      total: list.length,
      open,
      resolved,
      total_loss,
    };
  }

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      ...user,
      id: `u_${Date.now()}`,
    };
    this.users.push(newUser);
    this.saveToStorage();
    this.notify();
  }

  updateUser(id: string, updates: Partial<User>) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx >= 0) {
      this.users[idx] = { ...this.users[idx], ...updates };
      this.saveToStorage();
      this.notify();
    }
  }

  exportBackupJson() {
    const payload = {
      version: '2.0',
      exported_at: new Date().toISOString(),
      stations: this.stations,
      users: this.users,
      records: this.records,
      breakdowns: this.breakdowns,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `water_plants_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importBackupJson(jsonString: string) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.stations && parsed.records) {
        this.stations = parsed.stations;
        this.records = parsed.records;
        if (parsed.users) this.users = parsed.users;
        if (parsed.breakdowns) this.breakdowns = parsed.breakdowns;
        this.saveToStorage();
        this.notify();
        return { ok: true, count: this.records.length };
      } else {
        return { ok: false, error: 'تنسيق الملف غير صحيح' };
      }
    } catch (e: any) {
      return { ok: false, error: e.message || 'فشل في تحليل ملف JSON' };
    }
  }
}

export const appStore = new AppStoreManager();
