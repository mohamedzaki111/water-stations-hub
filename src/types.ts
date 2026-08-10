export type UserRole = 'system_admin' | 'central_admin' | 'station_admin' | 'cost_accountant' | 'viewer';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  station_id: string | null;
  active: boolean;
}

export interface StationTargets {
  efficiency_target: number; // e.g. 0.90
  kwh_per_m3_min: number; // e.g. 0.18
  kwh_per_m3_max: number; // e.g. 0.28
  alum_per_m3_target?: number; // g/m3
  chlorine_per_m3_target?: number; // g/m3
}

export interface GeneralInfo {
  company: string;
  subsidiary: string;
  name: string;
  governorate: string;
  region: string;
  address: string;
  sector_name: string;
  year_built?: number;
  year_service?: number;
  gps_lat?: number;
  gps_lng?: number;
  capacity_design_m3_day: number;
  capacity_actual_m3_day?: number;
  station_type?: string;
  water_source: string;
  intake_type?: string;
  alum_type?: string;
  alum_dose_gm_m3?: number;
  alum_monthly_ton?: number;
  chlorine_monthly_ton?: number;
  water_permit?: string;
  civil_protection?: string;
  service_areas?: string;
}

export interface PumpSpec {
  type?: string;
  head_m?: number;
  flow_m3h?: number;
  count?: number;
  voltage?: string;
  condition?: 'جيدة' | 'متوسطة' | 'ردئ' | string;
  notes?: string;
}

export interface ClarifierSpec {
  brand?: string;
  shape?: string;
  count?: number;
  flow_m3h?: number;
  condition_bridge?: string;
  condition_civil?: string;
}

export interface FilterGroupSpec {
  type?: string;
  count?: number;
  total_flow_m3h?: number;
  medium?: string;
  condition_civil?: string;
  condition_valves?: string;
  backwash_pump_count?: number;
  backwash_flow_m3h?: number;
  backwash_head_m?: number;
}

export interface TechnicalSpecs {
  intake_condition?: string;
  intake_lines_count?: number;
  intake_diameters?: string;
  screen_condition?: string;
  turbid_tank_exists?: boolean;
  turbid_tank_notes?: string;
  raw_pumps?: PumpSpec;
  alum_pumps?: PumpSpec;
  alum_injection_lines?: number;
  alum_injection_notes?: string;
  chlorine_injectors_brand?: string;
  chlorine_injectors_capacity_kgh?: number;
  chlorine_injectors_primary?: number;
  chlorine_injectors_final?: number;
  chlorine_injection_condition?: string;
  chlorine_safety_type?: string;
  chlorine_safety_condition?: string;
  chlorine_alarm_condition?: string;
  clarifiers?: ClarifierSpec[];
  filter_groups?: FilterGroupSpec[];
  clean_pumps?: PumpSpec;
  tank_types?: string;
  tank_ground_condition?: string;
  tank_filter_condition?: string;
  tank_vents_condition?: string;
  lab_exists?: boolean;
  lab_tests?: string;
  sludge_treatment?: string;
  power_sources_count?: number;
  power_transformers?: string;
  generators_exist?: boolean;
  generators_notes?: string;
  flow_meters_type?: string;
  flow_meters_condition?: string;
}

export interface ServiceZone {
  id: string;
  area_name: string;
  population_thousands?: number;
  per_capita_liter_day?: number;
  deficit_m3_day?: number;
  deficit_pct?: number;
  temp_solution?: string;
  perm_solution?: string;
  funding_needed_million?: number;
}

export interface ShiftInfo {
  id: string;
  label: string;
  crew: string;
}

export interface StationStaticData {
  general: GeneralInfo;
  targets: StationTargets;
  technical: TechnicalSpecs;
  service_zones: ServiceZone[];
  shifts: ShiftInfo[];
  river_intakes?: number;
  pumps_produced?: number;
  pumps_turbid?: number;
}

export interface Station {
  id: string;
  status: 'active' | 'suspended';
  static: StationStaticData;
}

export interface DailyRecord {
  id: string;
  station_id: string;
  date: string; // YYYY-MM-DD
  produced_m3: number;
  turbid_m3: number;
  backwash_m3?: number;
  cooling_m3?: number;
  nile_level?: number;
  tank_high?: number;
  tank_low?: number;
  tank1_high?: number;
  tank1_low?: number;
  tank2_high?: number;
  tank2_low?: number;
  well1_high?: number;
  well1_low?: number;
  well2_high?: number;
  well2_low?: number;
  pressure_high?: number;
  pressure_low?: number;
  alum_solid?: number; // tons
  alum_liquid: number; // tons
  chlorine_gas?: number; // tons
  hypochlorite?: number; // tons
  electricity_kwh: number;
  electricity_kvar?: number;
  electricity_kva?: number;
  power_factor?: number; // cos phi
  efficiency: number; // produced / turbid
  kwh_per_m3: number; // electricity_kwh / produced_m3
  alum_per_m3: number; // g/m3
  chlorine_per_m3: number; // g/m3
  flow_meters_ok: boolean;
  maintenance_periodic?: number;
  maintenance_repair?: number;
  shift_crew: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface BreakdownRecord {
  id: string;
  station_id: string;
  asset_type: string; // e.g. طلمبة عكرة, مروق, مرشح
  asset_label: string;
  severity: 'طفيف' | 'متوسط' | 'حرج';
  status: 'جارٍ' | 'مكتمل';
  description: string;
  start_date: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  duration_hours?: number;
  capacity_reduced_pct?: number;
  production_loss_m3?: number;
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface StationStats {
  count: number;
  total_prod: number;
  total_turbid: number;
  total_alum: number;
  total_chlorine: number;
  total_kwh: number;
  avg_eff: number;
  avg_kwh_m3: number;
  avg_production: number;
  avg_power_factor: number;
  sludge_m3: number;
}
