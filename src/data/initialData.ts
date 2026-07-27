import { Station, User, DailyRecord, BreakdownRecord } from '../types';

export const initialStations: Station[] = [
  {
    id: "giza",
    status: "active",
    static: {
      general: {
        company: "الشركة القابضة لمياه الشرب والصرف الصحي",
        subsidiary: "شركة مياه الشرب والصرف الصحي بالجيزة",
        name: "محطة مياه الجيزة",
        governorate: "الجيزة",
        region: "وسط الجيزة",
        address: "كورنيش النيل، الجيزة",
        sector_name: "وسط",
        year_built: 1892,
        year_service: 1895,
        gps_lat: 30.041,
        gps_lng: 31.212,
        capacity_design_m3_day: 150000,
        capacity_actual_m3_day: 145000,
        station_type: "سطحية تقليدية",
        water_source: "نهر النيل",
        intake_type: "ممتد",
        alum_type: "سائلة",
        alum_dose_gm_m3: 50,
        alum_monthly_ton: 232,
        chlorine_monthly_ton: 36,
        water_permit: "مصرح به",
        civil_protection: "يوجد نظام وغير مقنن",
        service_areas: "بين السرايات، شارع جامعة القاهرة، شارع مراد، ميدان الجيزة، حى الدقى، حى العجوزة، شارع النيل"
      },
      targets: {
        efficiency_target: 0.90,
        kwh_per_m3_min: 0.18,
        kwh_per_m3_max: 0.28,
        alum_per_m3_target: 0.05,
        chlorine_per_m3_target: 0.009
      },
      technical: {
        intake_condition: "جيدة",
        intake_lines_count: 6,
        intake_diameters: "6 خطوط بأقطار 800/1000/1200 مم",
        screen_condition: "جيدة",
        turbid_tank_exists: false,
        turbid_tank_notes: "لا يوجد بيارات — السحب من النيل مباشرة",
        raw_pumps: { type: "KSB كيوبوتا", head_m: 18, flow_m3h: 4000, count: 2, voltage: "3.3 ك.ف", condition: "جيدة" },
        alum_pumps: { type: "brane lubbe obl", head_m: 50, flow_m3h: 1.5, count: 7, condition: "جيدة" },
        alum_injection_lines: 8,
        alum_injection_notes: "4 أساسي + 4 احتياطي — مواسير PVC",
        chlorine_injectors_brand: "جيسكو",
        chlorine_injectors_capacity_kgh: 40,
        chlorine_injectors_primary: 8,
        chlorine_injectors_final: 1,
        chlorine_injection_condition: "جيدة",
        chlorine_safety_type: "برج تعادل",
        chlorine_safety_condition: "جيدة",
        chlorine_alarm_condition: "جيدة",
        clarifiers: [
          { brand: "باترسون", shape: "مربع", count: 1, flow_m3h: 750, condition_bridge: "جيدة", condition_civil: "متوسطة" },
          { brand: "برموتيت", shape: "اسطواني", count: 2, flow_m3h: 1500, condition_bridge: "جيدة", condition_civil: "جيدة" },
          { brand: "باماج", shape: "اسطواني", count: 2, flow_m3h: 2000, condition_bridge: "جيدة", condition_civil: "متوسطة" },
          { brand: "تشيكي", shape: "اسطواني", count: 1, flow_m3h: 2000, condition_bridge: "جيدة", condition_civil: "جيدة" }
        ],
        filter_groups: [
          { type: "رملية سريعة", count: 16, total_flow_m3h: 750, medium: "زلط ورمل", condition_civil: "متوسطة", condition_valves: "متوسطة", backwash_pump_count: 2, backwash_flow_m3h: 500, backwash_head_m: 18 },
          { type: "رملية سريعة", count: 16, total_flow_m3h: 1500, medium: "زلط ورمل", condition_civil: "متوسطة", condition_valves: "جيدة", backwash_pump_count: 2, backwash_flow_m3h: 400, backwash_head_m: 15 },
          { type: "رملية سريعة", count: 12, total_flow_m3h: 2000, medium: "زلط ورمل", condition_civil: "متوسطة", condition_valves: "جيدة", backwash_pump_count: 2, backwash_flow_m3h: 720, backwash_head_m: 15 },
          { type: "رملية سريعة", count: 4, total_flow_m3h: 2000, medium: "زلط ورمل", condition_civil: "متوسطة", condition_valves: "جيدة", backwash_pump_count: 2, backwash_flow_m3h: 1620, backwash_head_m: 10 }
        ],
        clean_pumps: { type: "KSB", head_m: 50, flow_m3h: 1440, count: 6, voltage: "3.3 ك.ف", condition: "جيدة" },
        tank_types: "أرضي + أسفل المرشحات",
        tank_ground_condition: "ردئ",
        tank_filter_condition: "متوسطة",
        tank_vents_condition: "جيدة",
        lab_exists: true,
        lab_tests: "عكارة — أس هيدروجيني — كلور متبقي (كل ساعتين) — Jar Test للشبة — Break Point للكلور",
        sludge_treatment: "بيارة غسيل المرشحات + بيارة روبة المروقات — صرف على النيل",
        power_sources_count: 2,
        power_transformers: "4 محولات 3.3/10.5 ك.ف (2 ميجا ف.أ) + 2 محولات 380ف (1 ميجا ف.أ)",
        generators_exist: false,
        generators_notes: "لا يوجد",
        flow_meters_type: "U.S (Siemens)",
        flow_meters_condition: "جيدة"
      },
      service_zones: [
        { id: "z1", area_name: "بين السرايات", population_thousands: 85, per_capita_liter_day: 180 },
        { id: "z2", area_name: "شارع جامعة القاهرة", population_thousands: 62, per_capita_liter_day: 165 },
        { id: "z3", area_name: "شارع مراد", population_thousands: 43, per_capita_liter_day: 170 },
        { id: "z4", area_name: "ميدان الجيزة", population_thousands: 78, per_capita_liter_day: 175 },
        { id: "z5", area_name: "حى الدقى", population_thousands: 95, per_capita_liter_day: 190 },
        { id: "z6", area_name: "حى العجوزة", population_thousands: 71, per_capita_liter_day: 185 },
        { id: "z7", area_name: "شارع النيل (الدقى-الجيزة)", population_thousands: 34, per_capita_liter_day: 160 }
      ],
      shifts: [
        { id: "s1", label: "وردية أ — 7ص لـ 7ص", crew: "م عماد مراد + حماده مصطفى" },
        { id: "s2", label: "وردية ب — 7ص لـ 7ص", crew: "حسام صالح + حربى السيد" },
        { id: "s3", label: "وردية ج — 7ص لـ 7ص", crew: "حسام طعيمه + مسعد" }
      ],
      river_intakes: 3,
      pumps_produced: 6,
      pumps_turbid: 4
    }
  },
  {
    id: "imbaba",
    status: "active",
    static: {
      general: {
        company: "الشركة القابضة لمياه الشرب والصرف الصحي",
        subsidiary: "شركة مياه الشرب والصرف الصحي بالجيزة",
        name: "محطة مياه إمبابة",
        governorate: "الجيزة",
        region: "إمبابة",
        address: "شارع الجلاء، إمبابة",
        sector_name: "وسط",
        year_built: 1992,
        year_service: 1994,
        gps_lat: 30.075,
        gps_lng: 31.210,
        capacity_design_m3_day: 90000,
        capacity_actual_m3_day: 85000,
        station_type: "سطحية تقليدية",
        water_source: "نهر النيل",
        intake_type: "شاطئ",
        alum_type: "سائلة",
        alum_dose_gm_m3: 55,
        alum_monthly_ton: 148,
        chlorine_monthly_ton: 22,
        water_permit: "مصرح به",
        service_areas: "إمبابة، محرم بك، الوراق، أجا"
      },
      targets: {
        efficiency_target: 0.88,
        kwh_per_m3_min: 0.20,
        kwh_per_m3_max: 0.32
      },
      technical: {
        intake_condition: "جيدة",
        intake_lines_count: 4,
        raw_pumps: { type: "KSB", head_m: 16, flow_m3h: 3000, count: 4, condition: "جيدة" },
        alum_pumps: { type: "brane lubbe", head_m: 45, count: 5, condition: "جيدة" },
        chlorine_injectors_brand: "جيسكو",
        chlorine_injectors_capacity_kgh: 30,
        chlorine_injectors_primary: 6,
        chlorine_safety_type: "برج تعادل",
        chlorine_safety_condition: "جيدة",
        clarifiers: [{ brand: "برموتيت", shape: "اسطواني", count: 3, flow_m3h: 1200, condition_bridge: "جيدة", condition_civil: "متوسطة" }],
        filter_groups: [{ type: "رملية سريعة", count: 8, total_flow_m3h: 1500, medium: "زلط ورمل", condition_civil: "متوسطة", backwash_pump_count: 2, backwash_flow_m3h: 400, backwash_head_m: 16 }],
        clean_pumps: { type: "KSB", head_m: 45, flow_m3h: 1200, count: 4, condition: "جيدة" },
        tank_types: "أسفل المرشحات",
        tank_filter_condition: "جيدة",
        lab_exists: true,
        power_sources_count: 2,
        generators_exist: false,
        flow_meters_type: "Siemens",
        flow_meters_condition: "جيدة"
      },
      service_zones: [
        { id: "z1", area_name: "إمبابة", population_thousands: 120, per_capita_liter_day: 160 },
        { id: "z2", area_name: "محرم بك", population_thousands: 55, per_capita_liter_day: 155 },
        { id: "z3", area_name: "الوراق", population_thousands: 80, per_capita_liter_day: 150, deficit_m3_day: 5, deficit_pct: 8, temp_solution: "مناوبات" },
        { id: "z4", area_name: "أجا", population_thousands: 30, per_capita_liter_day: 145 }
      ],
      shifts: [
        { id: "s1", label: "وردية أ — 7ص لـ 7ص", crew: "محمد عاطف + إبراهيم سعد" },
        { id: "s2", label: "وردية ب — 7ص لـ 7ص", crew: "أحمد رمضان + سعيد علي" },
        { id: "s3", label: "وردية ج — 7ص لـ 7ص", crew: "كريم محمود + وليد فتحي" }
      ],
      river_intakes: 2,
      pumps_produced: 4,
      pumps_turbid: 3
    }
  },
  {
    id: "dahab",
    status: "active",
    static: {
      general: {
        company: "الشركة القابضة لمياه الشرب والصرف الصحي",
        subsidiary: "شركة مياه الشرب والصرف الصحي بالجيزة",
        name: "محطة مياه جزيرة الدهب",
        governorate: "الجيزة",
        region: "جزيرة الدهب",
        address: "جزيرة الدهب، نهر النيل، الجيزة",
        sector_name: "وسط",
        year_built: 2001,
        year_service: 2003,
        gps_lat: 29.9671,
        gps_lng: 31.2184,
        capacity_design_m3_day: 70000,
        capacity_actual_m3_day: 65000,
        station_type: "سطحية تقليدية",
        water_source: "نهر النيل",
        intake_type: "ممتد",
        alum_type: "سائلة",
        alum_dose_gm_m3: 45,
        alum_monthly_ton: 98,
        chlorine_monthly_ton: 14,
        water_permit: "مصرح به",
        service_areas: "جزيرة الدهب، الطالبية، الهرم الشمالي"
      },
      targets: {
        efficiency_target: 0.91,
        kwh_per_m3_min: 0.22,
        kwh_per_m3_max: 0.34
      },
      technical: {
        intake_condition: "جيدة",
        intake_lines_count: 3,
        raw_pumps: { type: "KSB", head_m: 15, flow_m3h: 2500, count: 3, condition: "جيدة" },
        alum_pumps: { type: "brane lubbe", head_m: 40, count: 4, condition: "جيدة" },
        chlorine_injectors_brand: "جيسكو",
        chlorine_injectors_capacity_kgh: 25,
        chlorine_injectors_primary: 5,
        chlorine_safety_type: "غرفة اعدام",
        chlorine_safety_condition: "جيدة",
        clarifiers: [{ brand: "باماج", shape: "اسطواني", count: 2, flow_m3h: 1500, condition_bridge: "جيدة", condition_civil: "جيدة" }],
        filter_groups: [{ type: "رملية سريعة", count: 6, total_flow_m3h: 1200, medium: "زلط ورمل", condition_civil: "جيدة", backwash_pump_count: 2, backwash_flow_m3h: 350, backwash_head_m: 16 }],
        clean_pumps: { type: "KSB", head_m: 48, flow_m3h: 1000, count: 3, condition: "جيدة" },
        tank_types: "أسفل المرشحات",
        tank_filter_condition: "جيدة",
        lab_exists: true,
        power_sources_count: 2,
        generators_exist: false,
        flow_meters_type: "Siemens",
        flow_meters_condition: "جيدة"
      },
      service_zones: [
        { id: "z1", area_name: "جزيرة الدهب", population_thousands: 70, per_capita_liter_day: 170 },
        { id: "z2", area_name: "الطالبية", population_thousands: 45, per_capita_liter_day: 160 },
        { id: "z3", area_name: "الهرم الشمالي", population_thousands: 38, per_capita_liter_day: 155, deficit_m3_day: 3, deficit_pct: 6, temp_solution: "مناوبات", perm_solution: "توسعة المحطة" }
      ],
      shifts: [
        { id: "s1", label: "وردية أ — 7ص لـ 7ص", crew: "محمود رأفت + أيمن صبري" },
        { id: "s2", label: "وردية ب — 7ص لـ 7ص", crew: "طارق حسني + عمرو سامي" },
        { id: "s3", label: "وردية ج — 7ص لـ 7ص", crew: "هشام جمال + ياسر فؤاد" }
      ],
      river_intakes: 1,
      pumps_produced: 3,
      pumps_turbid: 2
    }
  }
];

export const initialUsers: User[] = [
  { id: 'u0', username: 'admin', name: 'الإدارة المركزية', role: 'central_admin', station_id: null, active: true },
  { id: 'u1', username: 'giza_mgr', name: 'مدير محطة الجيزة', role: 'station_admin', station_id: 'giza', active: true },
  { id: 'u2', username: 'sally', name: 'سالي إبراهيم', role: 'station_admin', station_id: 'giza', active: true },
  { id: 'u3', username: 'imbaba_mgr', name: 'مدير محطة إمبابة', role: 'station_admin', station_id: 'imbaba', active: true },
  { id: 'u4', username: 'dahab_mgr', name: 'مدير محطة الدهب', role: 'station_admin', station_id: 'dahab', active: true },
  { id: 'u5', username: 'cost_acct', name: 'محاسب التكاليف', role: 'cost_accountant', station_id: null, active: true },
  { id: 'u6', username: 'viewer', name: 'مشاهد عام', role: 'viewer', station_id: null, active: true },
];

export const rawGizaRecords = [
  { date: "2026-01-01", produced_m3: 132160, turbid_m3: 143652, alum_liquid: 7.410, chlorine_gas: 1.211, electricity_kwh: 27361, electricity_kvar: 13500, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-02", produced_m3: 137806, turbid_m3: 151586, alum_liquid: 7.819, chlorine_gas: 1.278, electricity_kwh: 27363, electricity_kvar: 13200, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-03", produced_m3: 142865, turbid_m3: 155288, alum_liquid: 8.010, chlorine_gas: 1.309, electricity_kwh: 25414, electricity_kvar: 12100, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-04", produced_m3: 140353, turbid_m3: 152557, alum_liquid: 7.870, chlorine_gas: 1.286, electricity_kwh: 38019, electricity_kvar: 18400, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-05", produced_m3: 146224, turbid_m3: 160846, alum_liquid: 8.297, chlorine_gas: 1.356, electricity_kwh: 34177, electricity_kvar: 16200, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-06", produced_m3: 146014, turbid_m3: 160455, alum_liquid: 8.277, chlorine_gas: 1.353, electricity_kwh: 35749, electricity_kvar: 17100, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-07", produced_m3: 144112, turbid_m3: 156643, alum_liquid: 8.080, chlorine_gas: 1.321, electricity_kwh: 41403, electricity_kvar: 20100, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-08", produced_m3: 140123, turbid_m3: 151367, alum_liquid: 7.808, chlorine_gas: 1.276, electricity_kwh: 36527, electricity_kvar: 17500, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-09", produced_m3: 118899, turbid_m3: 129238, alum_liquid: 6.667, chlorine_gas: 1.089, electricity_kwh: 32442, electricity_kvar: 15800, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-10", produced_m3: 134996, turbid_m3: 147145, alum_liquid: 7.590, chlorine_gas: 1.240, electricity_kwh: 38857, electricity_kvar: 18900, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-11", produced_m3: 137619, turbid_m3: 151380, alum_liquid: 7.809, chlorine_gas: 1.276, electricity_kwh: 35687, electricity_kvar: 17200, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-12", produced_m3: 135919, turbid_m3: 147738, alum_liquid: 7.621, chlorine_gas: 1.245, electricity_kwh: 35177, electricity_kvar: 16900, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-13", produced_m3: 135212, turbid_m3: 146969, alum_liquid: 7.581, chlorine_gas: 1.239, electricity_kwh: 37277, electricity_kvar: 18100, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-14", produced_m3: 138778, turbid_m3: 152655, alum_liquid: 7.875, chlorine_gas: 1.287, electricity_kwh: 34208, electricity_kvar: 16500, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-15", produced_m3: 135965, turbid_m3: 147788, alum_liquid: 7.623, chlorine_gas: 1.246, electricity_kwh: 33645, electricity_kvar: 16200, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-16", produced_m3: 115130, turbid_m3: 125141, alum_liquid: 6.455, chlorine_gas: 1.055, electricity_kwh: 35845, electricity_kvar: 17300, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-17", produced_m3: 108689, turbid_m3: 119557, alum_liquid: 6.167, chlorine_gas: 1.008, electricity_kwh: 25916, electricity_kvar: 12500, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-18", produced_m3: 129365, turbid_m3: 140614, alum_liquid: 7.253, chlorine_gas: 1.185, electricity_kwh: 32944, electricity_kvar: 15900, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-19", produced_m3: 122407, turbid_m3: 133423, alum_liquid: 6.882, chlorine_gas: 1.125, electricity_kwh: 35580, electricity_kvar: 17100, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-20", produced_m3: 134419, turbid_m3: 146516, alum_liquid: 7.558, chlorine_gas: 1.235, electricity_kwh: 32876, electricity_kvar: 15700, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-21", produced_m3: 137461, turbid_m3: 149414, alum_liquid: 7.707, chlorine_gas: 1.260, electricity_kwh: 33520, electricity_kvar: 16100, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-22", produced_m3: 133475, turbid_m3: 145082, alum_liquid: 7.484, chlorine_gas: 1.223, electricity_kwh: 34658, electricity_kvar: 16700, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-23", produced_m3: 137161, turbid_m3: 148516, alum_liquid: 7.661, chlorine_gas: 1.252, electricity_kwh: 33825, electricity_kvar: 16200, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-24", produced_m3: 136129, turbid_m3: 147964, alum_liquid: 7.633, chlorine_gas: 1.247, electricity_kwh: 32014, electricity_kvar: 15400, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-25", produced_m3: 138632, turbid_m3: 151108, alum_liquid: 7.795, chlorine_gas: 1.274, electricity_kwh: 34719, electricity_kvar: 16700, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-26", produced_m3: 136435, turbid_m3: 150078, alum_liquid: 7.742, chlorine_gas: 1.265, electricity_kwh: 34769, electricity_kvar: 16800, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-27", produced_m3: 138899, turbid_m3: 152655, alum_liquid: 7.875, chlorine_gas: 1.287, electricity_kwh: 32980, electricity_kvar: 15800, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-28", produced_m3: 138004, turbid_m3: 150000, alum_liquid: 7.738, chlorine_gas: 1.264, electricity_kwh: 35580, electricity_kvar: 17100, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-01-29", produced_m3: 136987, turbid_m3: 150685, alum_liquid: 7.773, chlorine_gas: 1.270, electricity_kwh: 34701, electricity_kvar: 16600, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-01-30", produced_m3: 131967, turbid_m3: 145018, alum_liquid: 7.481, chlorine_gas: 1.223, electricity_kwh: 32504, electricity_kvar: 15600, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-01-31", produced_m3: 131897, turbid_m3: 143366, alum_liquid: 7.395, chlorine_gas: 1.209, electricity_kwh: 34182, electricity_kvar: 16400, shift_crew: "حسام صالح + حربى السيد" },
  // February
  { date: "2026-02-01", produced_m3: 141393, turbid_m3: 155532, alum_liquid: 8.082, chlorine_gas: 1.208, electricity_kwh: 34812, electricity_kvar: 16700, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-02-02", produced_m3: 137836, turbid_m3: 151468, alum_liquid: 7.871, chlorine_gas: 1.177, electricity_kwh: 33553, electricity_kvar: 16100, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-02-03", produced_m3: 133851, turbid_m3: 145897, alum_liquid: 7.582, chlorine_gas: 1.134, electricity_kwh: 34007, electricity_kvar: 16300, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-02-04", produced_m3: 140029, turbid_m3: 153932, alum_liquid: 7.999, chlorine_gas: 1.196, electricity_kwh: 34366, electricity_kvar: 16500, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-02-05", produced_m3: 141101, turbid_m3: 153371, alum_liquid: 7.970, chlorine_gas: 1.192, electricity_kwh: 35314, electricity_kvar: 16900, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-02-06", produced_m3: 93550,  turbid_m3: 101685, alum_liquid: 5.284, chlorine_gas: 0.790, electricity_kwh: 30459, electricity_kvar: 14600, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-02-07", produced_m3: 141828, turbid_m3: 156006, alum_liquid: 8.107, chlorine_gas: 1.212, electricity_kwh: 30378, electricity_kvar: 14500, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-02-08", produced_m3: 140741, turbid_m3: 156378, alum_liquid: 8.126, chlorine_gas: 1.215, electricity_kwh: 36193, electricity_kvar: 17300, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-02-09", produced_m3: 134480, turbid_m3: 146175, alum_liquid: 7.596, chlorine_gas: 1.136, electricity_kwh: 37867, electricity_kvar: 18100, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-02-10", produced_m3: 138010, turbid_m3: 149175, alum_liquid: 7.752, chlorine_gas: 1.159, electricity_kwh: 32368, electricity_kvar: 15500, shift_crew: "حسام طعيمه + مسعد" },
  // March
  { date: "2026-03-01", produced_m3: 132769, turbid_m3: 146045, alum_liquid: 7.623, chlorine_gas: 1.233, electricity_kwh: 31083, electricity_kvar: 14900, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-03-02", produced_m3: 133591, turbid_m3: 145207, alum_liquid: 7.580, chlorine_gas: 1.226, electricity_kwh: 37373, electricity_kvar: 17900, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-03-03", produced_m3: 135016, turbid_m3: 147247, alum_liquid: 7.686, chlorine_gas: 1.243, electricity_kwh: 32808, electricity_kvar: 15700, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-03-04", produced_m3: 134439, turbid_m3: 147883, alum_liquid: 7.719, chlorine_gas: 1.248, electricity_kwh: 35804, electricity_kvar: 17200, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-03-05", produced_m3: 136570, turbid_m3: 148445, alum_liquid: 7.749, chlorine_gas: 1.253, electricity_kwh: 32412, electricity_kvar: 15500, shift_crew: "حسام صالح + حربى السيد" },
  // April
  { date: "2026-04-01", produced_m3: 130526, turbid_m3: 141876, alum_liquid: 7.647, chlorine_gas: 1.312, electricity_kwh: 35575, electricity_kvar: 17000, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-04-02", produced_m3: 138234, turbid_m3: 152890, alum_liquid: 8.241, chlorine_gas: 1.414, electricity_kwh: 35879, electricity_kvar: 17200, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-04-03", produced_m3: 135133, turbid_m3: 146744, alum_liquid: 7.910, chlorine_gas: 1.357, electricity_kwh: 34961, electricity_kvar: 16700, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-04-04", produced_m3: 130978, turbid_m3: 142367, alum_liquid: 7.674, chlorine_gas: 1.317, electricity_kwh: 35473, electricity_kvar: 17000, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-04-05", produced_m3: 140134, turbid_m3: 154890, alum_liquid: 8.349, chlorine_gas: 1.433, electricity_kwh: 32466, electricity_kvar: 15500, shift_crew: "حسام طعيمه + مسعد" },
  // May
  { date: "2026-05-01", produced_m3: 129624, turbid_m3: 140895, alum_liquid: 7.594, chlorine_gas: 1.189, electricity_kwh: 36767, electricity_kvar: 17600, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-05-02", produced_m3: 132012, turbid_m3: 145812, alum_liquid: 7.859, chlorine_gas: 1.231, electricity_kwh: 35613, electricity_kvar: 17000, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-05-03", produced_m3: 131102, turbid_m3: 145668, alum_liquid: 7.852, chlorine_gas: 1.229, electricity_kwh: 34640, electricity_kvar: 16500, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-05-04", produced_m3: 132431, turbid_m3: 143946, alum_liquid: 7.759, chlorine_gas: 1.215, electricity_kwh: 41520, electricity_kvar: 19800, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-05-05", produced_m3: 134813, turbid_m3: 148789, alum_liquid: 8.020, chlorine_gas: 1.256, electricity_kwh: 29575, electricity_kvar: 14100, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-05-06", produced_m3: 132628, turbid_m3: 147217, alum_liquid: 7.935, chlorine_gas: 1.243, electricity_kwh: 35332, electricity_kvar: 16900, shift_crew: "م عماد مراد + حماده مصطفى" },
  { date: "2026-05-07", produced_m3: 140096, turbid_m3: 152278, alum_liquid: 8.208, chlorine_gas: 1.285, electricity_kwh: 33508, electricity_kvar: 16000, shift_crew: "حسام صالح + حربى السيد" },
  { date: "2026-05-08", produced_m3: 135678, turbid_m3: 150345, alum_liquid: 8.104, chlorine_gas: 1.269, electricity_kwh: 33508, electricity_kvar: 16000, shift_crew: "حسام طعيمه + مسعد" },
  { date: "2026-05-09", produced_m3: 137441, turbid_m3: 152712, alum_liquid: 8.231, chlorine_gas: 1.289, electricity_kwh: 35073, electricity_kvar: 16800, shift_crew: "م عماد مراد + حماده مصطفى" }
];

export function buildRecord(id: string, station_id: string, raw: any, created_by = 'u0'): DailyRecord {
  const eff = raw.turbid_m3 > 0 ? +(raw.produced_m3 / raw.turbid_m3).toFixed(4) : 0;
  const kwh_m3 = raw.produced_m3 > 0 ? +(raw.electricity_kwh / raw.produced_m3).toFixed(5) : 0;
  const alum_m3 = raw.produced_m3 > 0 ? +(raw.alum_liquid / raw.produced_m3 * 1000).toFixed(5) : 0;
  const cl_m3 = raw.produced_m3 > 0 ? +((raw.chlorine_gas || 0) / raw.produced_m3 * 1000).toFixed(5) : 0;
  const kva = raw.electricity_kvar && raw.electricity_kwh > 0 ? +Math.sqrt(raw.electricity_kwh ** 2 + raw.electricity_kvar ** 2).toFixed(2) : undefined;
  const pf = kva && kva > 0 ? +(raw.electricity_kwh / kva).toFixed(4) : undefined;

  return {
    id,
    station_id,
    date: raw.date,
    produced_m3: raw.produced_m3,
    turbid_m3: raw.turbid_m3,
    alum_liquid: raw.alum_liquid,
    chlorine_gas: raw.chlorine_gas,
    electricity_kwh: raw.electricity_kwh,
    electricity_kvar: raw.electricity_kvar,
    electricity_kva: kva,
    power_factor: pf,
    flow_meters_ok: true,
    shift_crew: raw.shift_crew,
    efficiency: eff,
    kwh_per_m3: kwh_m3,
    alum_per_m3: alum_m3,
    chlorine_per_m3: cl_m3,
    created_by,
    created_at: raw.date + 'T20:00:00'
  };
}

function generateStationRecords(stationId: string, idPrefix: string, baseConfig: { p: number; t: number; al: number; cl: number; kwh: number }, crews: string[]): DailyRecord[] {
  return rawGizaRecords.map((r, i) => {
    const factor = () => 0.92 + Math.sin(i * 0.5) * 0.08 + Math.random() * 0.04;
    const prod = Math.round(baseConfig.p * factor());
    const turb = Math.round(baseConfig.t * factor());
    const alum = +(baseConfig.al * factor()).toFixed(3);
    const cl = +(baseConfig.cl * factor()).toFixed(3);
    const kwh = Math.round(baseConfig.kwh * factor());
    const kvar = Math.round(kwh * 0.48);

    return buildRecord(
      `${idPrefix}${i}`,
      stationId,
      {
        date: r.date,
        produced_m3: prod,
        turbid_m3: turb,
        alum_liquid: alum,
        chlorine_gas: cl,
        electricity_kwh: kwh,
        electricity_kvar: kvar,
        shift_crew: crews[i % crews.length]
      },
      'u0'
    );
  });
}

export const initialRecords: DailyRecord[] = [
  ...rawGizaRecords.map((r, i) => buildRecord(`gz${i}`, 'giza', r, 'u1')),
  ...generateStationRecords(
    'imbaba',
    'im',
    { p: 78000, t: 89000, al: 4.9, cl: 0.61, kwh: 22000 },
    ["أحمد رمضان + سعيد علي", "كريم محمود + وليد فتحي", "محمد عاطف + إبراهيم سعد"]
  ),
  ...generateStationRecords(
    'dahab',
    'dh',
    { p: 53000, t: 58500, al: 2.9, cl: 0.38, kwh: 16500 },
    ["طارق حسني + عمرو سامي", "هشام جمال + ياسر فؤاد", "محمود رأفت + أيمن صبري"]
  )
];

export const initialBreakdowns: BreakdownRecord[] = [
  {
    id: "bd101",
    station_id: "giza",
    asset_type: "طلمبة عكرة",
    asset_label: "طلمبة عكرة KSB رقم 2",
    severity: "متوسط",
    status: "مكتمل",
    description: "ارتفاع حرارة المحامل وتسريب مائي في الحشو الميكانيكي.",
    start_date: "2026-05-02",
    start_time: "08:30",
    end_date: "2026-05-02",
    end_time: "14:15",
    duration_hours: 5.8,
    capacity_reduced_pct: 15,
    production_loss_m3: 3200,
    notes: "تم تغيير الحشو الميكانيكي وإعادة موازنة المحور.",
    created_by: "u1",
    created_at: "2026-05-02T08:30:00"
  },
  {
    id: "bd102",
    station_id: "giza",
    asset_type: "مروق",
    asset_label: "مروق برموتيت رقم 1",
    severity: "طفيف",
    status: "مكتمل",
    description: "انسداد جزئي في خطوط سحب الروبة وتوقف كوبري الكسح.",
    start_date: "2026-05-05",
    start_time: "11:00",
    end_date: "2026-05-05",
    end_time: "15:00",
    duration_hours: 4.0,
    capacity_reduced_pct: 10,
    production_loss_m3: 1800,
    notes: "تم تطهير الخطوط وعمل تسليك بالهواء المضغوط.",
    created_by: "u2",
    created_at: "2026-05-05T11:00:00"
  },
  {
    id: "bd103",
    station_id: "imbaba",
    asset_type: "طلمبة شبة",
    asset_label: "طلمبة حقن الشبة brane lubbe #3",
    severity: "حرج",
    status: "جارٍ",
    description: "عطل في الموتور الكهربائي وانخفاض الضغط بالحاقن الرئيسية.",
    start_date: "2026-05-08",
    start_time: "19:00",
    capacity_reduced_pct: 20,
    created_by: "u3",
    created_at: "2026-05-08T19:00:00"
  }
];
