// ══════════════════════════════════════════════════════════════
//  API Client — connects frontend to backend SQLite database
// ══════════════════════════════════════════════════════════════

const BASE = '/api';

async function req<T>(method: string, path: string, body?: any): Promise<T> {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────
export const api = {
  auth: {
    login: (username: string, password = '123') =>
      req<{ user: any }>('POST', '/auth/login', { username, password }),
  },

  // ── Stations ────────────────────────────────────────────────
  stations: {
    getAll:  ()                    => req<any[]>('GET',  '/stations'),
    create:  (data: any)           => req<any>  ('POST', '/stations', data),
    update:  (id: string, d: any)  => req<any>  ('PUT',  `/stations/${id}`, d),
  },

  // ── Users ───────────────────────────────────────────────────
  users: {
    getAll:  ()                    => req<any[]>('GET',  '/users'),
    create:  (data: any)           => req<any>  ('POST', '/users', data),
    update:  (id: string, d: any)  => req<any>  ('PUT',  `/users/${id}`, d),
  },

  // ── Daily Records ───────────────────────────────────────────
  records: {
    getAll:   (params: { station_id?: string; month?: string; limit?: number } = {}) => {
      const qs = new URLSearchParams(params as any).toString();
      return req<any[]>('GET', `/records${qs ? '?' + qs : ''}`);
    },
    create:  (data: any)           => req<any>  ('POST', '/records', data),
    update:  (id: string, d: any)  => req<any>  ('PUT',  `/records/${id}`, d),
    delete:  (id: string)          => req<any>  ('DELETE',`/records/${id}`),
  },

  // ── Stats ───────────────────────────────────────────────────
  stats: {
    get: (stationId: string, month?: string) => {
      const qs = month ? `?month=${month}` : '';
      return req<any>('GET', `/stats/${stationId}${qs}`);
    },
  },

  // ── Breakdowns ──────────────────────────────────────────────
  breakdowns: {
    getAll:  (station_id?: string) => {
      const qs = station_id ? `?station_id=${station_id}` : '';
      return req<any[]>('GET', `/breakdowns${qs}`);
    },
    create:  (data: any)           => req<any>  ('POST', '/breakdowns', data),
    resolve: (id: string, d: any)  => req<any>  ('PUT',  `/breakdowns/${id}/resolve`, d),
    delete:  (id: string)          => req<any>  ('DELETE',`/breakdowns/${id}`),
  },

  // ── Lab Records (قياسات وتجارب المعمل والجرعات) ─────────────
  labRecords: {
    getAll: (params: { station_id?: string; month?: string; limit?: number } = {}) => {
      const qs = new URLSearchParams(params as any).toString();
      return req<any[]>('GET', `/lab-records${qs ? '?' + qs : ''}`);
    },
    create: (data: any)  => req<any>('POST', '/lab-records', data),
    delete: (id: string) => req<any>('DELETE', `/lab-records/${id}`),
  },

  // ── Supply Orders (أوامر التوريد وأذون الإضافة) ─────────────
  supplyOrders: {
    getAll: (params: { station_id?: string; item_type?: string; month?: string; limit?: number } = {}) => {
      const qs = new URLSearchParams(params as any).toString();
      return req<any[]>('GET', `/supply-orders${qs ? '?' + qs : ''}`);
    },
    create: (data: any)  => req<any>('POST', '/supply-orders', data),
    delete: (id: string) => req<any>('DELETE', `/supply-orders/${id}`),
  },

  // ── Inventory & Stock (المخزون والرصيد وكشف الحركة) ────────
  inventory: {
    getSummary: (params: { station_id?: string; item_type?: string } = {}) => {
      const qs = new URLSearchParams(params as any).toString();
      return req<any[]>('GET', `/inventory/summary${qs ? '?' + qs : ''}`);
    },
    getLedger: (params: { station_id: string; item_type?: string }) => {
      const qs = new URLSearchParams(params as any).toString();
      return req<any[]>('GET', `/inventory/ledger?${qs}`);
    },
    getSettings: (stationId?: string) => {
      const qs = stationId ? `?station_id=${stationId}` : '';
      return req<any[]>('GET', `/inventory/settings${qs}`);
    },
    updateSettings: (data: any) => req<any>('POST', '/inventory/settings', data),
  },
};
