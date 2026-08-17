var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express2 = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);

// src/db/database.ts
var import_promise = __toESM(require("mysql2/promise"), 1);

// src/data/initialData.ts
var initialStations = [
  {
    "id": "giza",
    "status": "active",
    "static": {
      "technical": {
        "intake_condition": "\u062C\u064A\u062F\u0629",
        "intake_lines_count": 6,
        "intake_diameters": "6 \u062E\u0637\u0648\u0637 \u0628\u0623\u0642\u0637\u0627\u0631 800/1000/1200 \u0645\u0645",
        "screen_condition": "\u062C\u064A\u062F\u0629",
        "turbid_tank_exists": false,
        "turbid_tank_notes": "\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0631\u0627\u062A \u2014 \u0627\u0644\u0633\u062D\u0628 \u0645\u0646 \u0627\u0644\u0646\u064A\u0644 \u0645\u0628\u0627\u0634\u0631\u0629",
        "raw_pumps": {
          "type": "KSB \u0643\u064A\u0648\u0628\u0648\u062A\u0627",
          "head_m": 18,
          "flow_m3h": 4e3,
          "count": 2,
          "voltage": "3.3 \u0643.\u0641",
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "alum_pumps": {
          "type": "brane lubbe obl",
          "head_m": 50,
          "flow_m3h": 1.5,
          "count": 7,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "alum_injection_lines": 8,
        "alum_injection_notes": "4 \u0623\u0633\u0627\u0633\u064A + 4 \u0627\u062D\u062A\u064A\u0627\u0637\u064A \u2014 \u0645\u0648\u0627\u0633\u064A\u0631 PVC",
        "chlorine_injectors_brand": "\u062C\u064A\u0633\u0643\u0648",
        "chlorine_injectors_capacity_kgh": 40,
        "chlorine_injectors_primary": 8,
        "chlorine_injectors_final": 1,
        "chlorine_injection_condition": "\u062C\u064A\u062F\u0629",
        "chlorine_safety_type": "\u0628\u0631\u062C \u062A\u0639\u0627\u062F\u0644",
        "chlorine_safety_condition": "\u062C\u064A\u062F\u0629",
        "chlorine_alarm_condition": "\u062C\u064A\u062F\u0629",
        "clarifiers": [
          {
            "brand": "\u0628\u0627\u062A\u0631\u0633\u0648\u0646",
            "shape": "\u0645\u0631\u0628\u0639",
            "count": 1,
            "flow_m3h": 750,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629"
          },
          {
            "brand": "\u0628\u0631\u0645\u0648\u062A\u064A\u062A",
            "shape": "\u0627\u0633\u0637\u0648\u0627\u0646\u064A",
            "count": 2,
            "flow_m3h": 1500,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u062C\u064A\u062F\u0629"
          },
          {
            "brand": "\u0628\u0627\u0645\u0627\u062C",
            "shape": "\u0627\u0633\u0637\u0648\u0627\u0646\u064A",
            "count": 2,
            "flow_m3h": 2e3,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629"
          },
          {
            "brand": "\u062A\u0634\u064A\u0643\u064A",
            "shape": "\u0627\u0633\u0637\u0648\u0627\u0646\u064A",
            "count": 1,
            "flow_m3h": 2e3,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u062C\u064A\u062F\u0629"
          }
        ],
        "filter_groups": [
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 16,
            "total_flow_m3h": 750,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "condition_valves": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 500,
            "backwash_head_m": 18
          },
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 16,
            "total_flow_m3h": 1500,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "condition_valves": "\u062C\u064A\u062F\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 400,
            "backwash_head_m": 15
          },
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 12,
            "total_flow_m3h": 2e3,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "condition_valves": "\u062C\u064A\u062F\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 720,
            "backwash_head_m": 15
          },
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 4,
            "total_flow_m3h": 2e3,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "condition_valves": "\u062C\u064A\u062F\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 1620,
            "backwash_head_m": 10
          }
        ],
        "clean_pumps": {
          "type": "KSB",
          "head_m": 50,
          "flow_m3h": 1440,
          "count": 6,
          "voltage": "3.3 \u0643.\u0641",
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "tank_types": "\u0623\u0631\u0636\u064A + \u0623\u0633\u0641\u0644 \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A",
        "tank_ground_condition": "\u0631\u062F\u0626",
        "tank_filter_condition": "\u0645\u062A\u0648\u0633\u0637\u0629",
        "tank_vents_condition": "\u062C\u064A\u062F\u0629",
        "lab_exists": true,
        "lab_tests": "\u0639\u0643\u0627\u0631\u0629 \u2014 \u0623\u0633 \u0647\u064A\u062F\u0631\u0648\u062C\u064A\u0646\u064A \u2014 \u0643\u0644\u0648\u0631 \u0645\u062A\u0628\u0642\u064A (\u0643\u0644 \u0633\u0627\u0639\u062A\u064A\u0646) \u2014 Jar Test \u0644\u0644\u0634\u0628\u0629 \u2014 Break Point \u0644\u0644\u0643\u0644\u0648\u0631",
        "sludge_treatment": "\u0628\u064A\u0627\u0631\u0629 \u063A\u0633\u064A\u0644 \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A + \u0628\u064A\u0627\u0631\u0629 \u0631\u0648\u0628\u0629 \u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A \u2014 \u0635\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0646\u064A\u0644",
        "power_sources_count": 2,
        "power_transformers": "4 \u0645\u062D\u0648\u0644\u0627\u062A 3.3/10.5 \u0643.\u0641 (2 \u0645\u064A\u062C\u0627 \u0641.\u0623) + 2 \u0645\u062D\u0648\u0644\u0627\u062A 380\u0641 (1 \u0645\u064A\u062C\u0627 \u0641.\u0623)",
        "generators_exist": false,
        "generators_notes": "\u0644\u0627 \u064A\u0648\u062C\u062F",
        "flow_meters_type": "U.S (Siemens)",
        "flow_meters_condition": "\u062C\u064A\u062F\u0629"
      },
      "service_zones": [
        {
          "id": "z1",
          "area_name": "\u0628\u064A\u0646 \u0627\u0644\u0633\u0631\u0627\u064A\u0627\u062A",
          "population_thousands": 85,
          "per_capita_liter_day": 180
        },
        {
          "id": "z2",
          "area_name": "\u0634\u0627\u0631\u0639 \u062C\u0627\u0645\u0639\u0629 \u0627\u0644\u0642\u0627\u0647\u0631\u0629",
          "population_thousands": 62,
          "per_capita_liter_day": 165
        },
        {
          "id": "z3",
          "area_name": "\u0634\u0627\u0631\u0639 \u0645\u0631\u0627\u062F",
          "population_thousands": 43,
          "per_capita_liter_day": 170
        },
        {
          "id": "z4",
          "area_name": "\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u062C\u064A\u0632\u0629",
          "population_thousands": 78,
          "per_capita_liter_day": 175
        },
        {
          "id": "z5",
          "area_name": "\u062D\u0649 \u0627\u0644\u062F\u0642\u0649",
          "population_thousands": 95,
          "per_capita_liter_day": 190
        },
        {
          "id": "z6",
          "area_name": "\u062D\u0649 \u0627\u0644\u0639\u062C\u0648\u0632\u0629",
          "population_thousands": 71,
          "per_capita_liter_day": 185
        },
        {
          "id": "z7",
          "area_name": "\u0634\u0627\u0631\u0639 \u0627\u0644\u0646\u064A\u0644 (\u0627\u0644\u062F\u0642\u0649-\u0627\u0644\u062C\u064A\u0632\u0629)",
          "population_thousands": 34,
          "per_capita_liter_day": 160
        }
      ],
      "river_intakes": 3,
      "pumps_produced": 6,
      "pumps_turbid": 4,
      "shifts": [
        {
          "id": "s1",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0623 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649"
        },
        {
          "id": "s2",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0628 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F"
        },
        {
          "id": "s3",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u062C \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F"
        }
      ],
      "general": {
        "company": "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0642\u0627\u0628\u0636\u0629 \u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A",
        "subsidiary": "\u0634\u0631\u0643\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A \u0628\u0627\u0644\u062C\u064A\u0632\u0629",
        "name": "\u0645\u062D\u0637\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u062C\u064A\u0632\u0629",
        "governorate": "\u0627\u0644\u062C\u064A\u0632\u0629",
        "region": "\u0648\u0633\u0637 \u0627\u0644\u062C\u064A\u0632\u0629",
        "address": "\u0643\u0648\u0631\u0646\u064A\u0634 \u0627\u0644\u0646\u064A\u0644\u060C \u0627\u0644\u062C\u064A\u0632\u0629",
        "sector_name": "\u0648\u0633\u0637",
        "year_built": 1892,
        "year_service": 1895,
        "gps_lat": 30.041,
        "gps_lng": 31.212,
        "capacity_design_m3_day": 15e4,
        "capacity_actual_m3_day": 145e3,
        "station_type": "\u0633\u0637\u062D\u064A\u0629 \u062A\u0642\u0644\u064A\u062F\u064A\u0629",
        "water_source": "\u0646\u0647\u0631 \u0627\u0644\u0646\u064A\u0644",
        "intake_type": "\u0645\u0645\u062A\u062F",
        "alum_type": "\u0633\u0627\u0626\u0644\u0629",
        "alum_dose_gm_m3": 50,
        "alum_monthly_ton": 232,
        "chlorine_monthly_ton": 36,
        "water_permit": "\u0645\u0635\u0631\u062D \u0628\u0647",
        "civil_protection": "\u064A\u0648\u062C\u062F \u0646\u0638\u0627\u0645 \u0648\u063A\u064A\u0631 \u0645\u0642\u0646\u0646",
        "service_areas": "\u0628\u064A\u0646 \u0627\u0644\u0633\u0631\u0627\u064A\u0627\u062A\u060C \u0634\u0627\u0631\u0639 \u062C\u0627\u0645\u0639\u0629 \u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060C \u0634\u0627\u0631\u0639 \u0645\u0631\u0627\u062F\u060C \u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u062C\u064A\u0632\u0629\u060C \u062D\u0649 \u0627\u0644\u062F\u0642\u0649\u060C \u062D\u0649 \u0627\u0644\u0639\u062C\u0648\u0632\u0629\u060C \u0634\u0627\u0631\u0639 \u0627\u0644\u0646\u064A\u0644"
      },
      "targets": {
        "efficiency_target": 0.9,
        "kwh_per_m3_min": 0.18,
        "kwh_per_m3_max": 0.28,
        "alum_per_m3_target": 0.05,
        "chlorine_per_m3_target": 9e-3
      }
    }
  },
  {
    "id": "imbaba",
    "status": "active",
    "static": {
      "technical": {
        "intake_condition": "\u062C\u064A\u062F\u0629",
        "intake_lines_count": 4,
        "raw_pumps": {
          "type": "KSB",
          "head_m": 16,
          "flow_m3h": 3e3,
          "count": 4,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "alum_pumps": {
          "type": "brane lubbe",
          "head_m": 45,
          "count": 5,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "chlorine_injectors_brand": "\u062C\u064A\u0633\u0643\u0648",
        "chlorine_injectors_capacity_kgh": 30,
        "chlorine_injectors_primary": 6,
        "chlorine_safety_type": "\u0628\u0631\u062C \u062A\u0639\u0627\u062F\u0644",
        "chlorine_safety_condition": "\u062C\u064A\u062F\u0629",
        "clarifiers": [
          {
            "brand": "\u0628\u0631\u0645\u0648\u062A\u064A\u062A",
            "shape": "\u0627\u0633\u0637\u0648\u0627\u0646\u064A",
            "count": 3,
            "flow_m3h": 1200,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629"
          }
        ],
        "filter_groups": [
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 8,
            "total_flow_m3h": 1500,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u0645\u062A\u0648\u0633\u0637\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 400,
            "backwash_head_m": 16
          }
        ],
        "clean_pumps": {
          "type": "KSB",
          "head_m": 45,
          "flow_m3h": 1200,
          "count": 4,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "tank_types": "\u0623\u0633\u0641\u0644 \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A",
        "tank_filter_condition": "\u062C\u064A\u062F\u0629",
        "lab_exists": true,
        "power_sources_count": 2,
        "generators_exist": false,
        "flow_meters_type": "Siemens",
        "flow_meters_condition": "\u062C\u064A\u062F\u0629"
      },
      "service_zones": [
        {
          "id": "z1",
          "area_name": "\u0625\u0645\u0628\u0627\u0628\u0629",
          "population_thousands": 120,
          "per_capita_liter_day": 160
        },
        {
          "id": "z2",
          "area_name": "\u0645\u062D\u0631\u0645 \u0628\u0643",
          "population_thousands": 55,
          "per_capita_liter_day": 155
        },
        {
          "id": "z3",
          "area_name": "\u0627\u0644\u0648\u0631\u0627\u0642",
          "population_thousands": 80,
          "per_capita_liter_day": 150,
          "deficit_m3_day": 5,
          "deficit_pct": 8,
          "temp_solution": "\u0645\u0646\u0627\u0648\u0628\u0627\u062A"
        },
        {
          "id": "z4",
          "area_name": "\u0623\u062C\u0627",
          "population_thousands": 30,
          "per_capita_liter_day": 145
        }
      ],
      "river_intakes": 2,
      "pumps_produced": 4,
      "pumps_turbid": 3,
      "shifts": [
        {
          "id": "s1",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0623 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F"
        },
        {
          "id": "s2",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0628 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A"
        },
        {
          "id": "s3",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u062C \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A"
        }
      ],
      "general": {
        "company": "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0642\u0627\u0628\u0636\u0629 \u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A",
        "subsidiary": "\u0634\u0631\u0643\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A \u0628\u0627\u0644\u062C\u064A\u0632\u0629",
        "name": "\u0645\u062D\u0637\u0629 \u0645\u064A\u0627\u0647 \u0625\u0645\u0628\u0627\u0628\u0629",
        "governorate": "\u0627\u0644\u062C\u064A\u0632\u0629",
        "region": "\u0625\u0645\u0628\u0627\u0628\u0629",
        "address": "\u0634\u0627\u0631\u0639 \u0627\u0644\u062C\u0644\u0627\u0621\u060C \u0625\u0645\u0628\u0627\u0628\u0629",
        "sector_name": "\u0648\u0633\u0637",
        "year_built": 1992,
        "year_service": 1994,
        "gps_lat": 30.075,
        "gps_lng": 31.21,
        "capacity_design_m3_day": 9e4,
        "capacity_actual_m3_day": 85e3,
        "station_type": "\u0633\u0637\u062D\u064A\u0629 \u062A\u0642\u0644\u064A\u062F\u064A\u0629",
        "water_source": "\u0646\u0647\u0631 \u0627\u0644\u0646\u064A\u0644",
        "intake_type": "\u0634\u0627\u0637\u0626",
        "alum_type": "\u0633\u0627\u0626\u0644\u0629",
        "alum_dose_gm_m3": 55,
        "alum_monthly_ton": 148,
        "chlorine_monthly_ton": 22,
        "water_permit": "\u0645\u0635\u0631\u062D \u0628\u0647",
        "service_areas": "\u0625\u0645\u0628\u0627\u0628\u0629\u060C \u0645\u062D\u0631\u0645 \u0628\u0643\u060C \u0627\u0644\u0648\u0631\u0627\u0642\u060C \u0623\u062C\u0627"
      },
      "targets": {
        "efficiency_target": 0.88,
        "kwh_per_m3_min": 0.2,
        "kwh_per_m3_max": 0.32
      }
    }
  },
  {
    "id": "dahab",
    "status": "active",
    "static": {
      "technical": {
        "intake_condition": "\u062C\u064A\u062F\u0629",
        "intake_lines_count": 3,
        "raw_pumps": {
          "type": "KSB",
          "head_m": 15,
          "flow_m3h": 2500,
          "count": 3,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "alum_pumps": {
          "type": "brane lubbe",
          "head_m": 40,
          "count": 4,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "chlorine_injectors_brand": "\u062C\u064A\u0633\u0643\u0648",
        "chlorine_injectors_capacity_kgh": 25,
        "chlorine_injectors_primary": 5,
        "chlorine_safety_type": "\u063A\u0631\u0641\u0629 \u0627\u0639\u062F\u0627\u0645",
        "chlorine_safety_condition": "\u062C\u064A\u062F\u0629",
        "clarifiers": [
          {
            "brand": "\u0628\u0627\u0645\u0627\u062C",
            "shape": "\u0627\u0633\u0637\u0648\u0627\u0646\u064A",
            "count": 2,
            "flow_m3h": 1500,
            "condition_bridge": "\u062C\u064A\u062F\u0629",
            "condition_civil": "\u062C\u064A\u062F\u0629"
          }
        ],
        "filter_groups": [
          {
            "type": "\u0631\u0645\u0644\u064A\u0629 \u0633\u0631\u064A\u0639\u0629",
            "count": 6,
            "total_flow_m3h": 1200,
            "medium": "\u0632\u0644\u0637 \u0648\u0631\u0645\u0644",
            "condition_civil": "\u062C\u064A\u062F\u0629",
            "backwash_pump_count": 2,
            "backwash_flow_m3h": 350,
            "backwash_head_m": 16
          }
        ],
        "clean_pumps": {
          "type": "KSB",
          "head_m": 48,
          "flow_m3h": 1e3,
          "count": 3,
          "condition": "\u062C\u064A\u062F\u0629"
        },
        "tank_types": "\u0623\u0633\u0641\u0644 \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A",
        "tank_filter_condition": "\u062C\u064A\u062F\u0629",
        "lab_exists": true,
        "power_sources_count": 2,
        "generators_exist": false,
        "flow_meters_type": "Siemens",
        "flow_meters_condition": "\u062C\u064A\u062F\u0629"
      },
      "service_zones": [
        {
          "id": "z1",
          "area_name": "\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u062F\u0647\u0628",
          "population_thousands": 70,
          "per_capita_liter_day": 170
        },
        {
          "id": "z2",
          "area_name": "\u0627\u0644\u0637\u0627\u0644\u0628\u064A\u0629",
          "population_thousands": 45,
          "per_capita_liter_day": 160
        },
        {
          "id": "z3",
          "area_name": "\u0627\u0644\u0647\u0631\u0645 \u0627\u0644\u0634\u0645\u0627\u0644\u064A",
          "population_thousands": 38,
          "per_capita_liter_day": 155,
          "deficit_m3_day": 3,
          "deficit_pct": 6,
          "temp_solution": "\u0645\u0646\u0627\u0648\u0628\u0627\u062A",
          "perm_solution": "\u062A\u0648\u0633\u0639\u0629 \u0627\u0644\u0645\u062D\u0637\u0629"
        }
      ],
      "river_intakes": 1,
      "pumps_produced": 3,
      "pumps_turbid": 2,
      "shifts": [
        {
          "id": "s1",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0623 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A"
        },
        {
          "id": "s2",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u0628 \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A"
        },
        {
          "id": "s3",
          "label": "\u0648\u0631\u062F\u064A\u0629 \u062C \u2014 7\u0635 \u0644\u0640 7\u0635",
          "crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F"
        }
      ],
      "general": {
        "company": "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0642\u0627\u0628\u0636\u0629 \u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A",
        "subsidiary": "\u0634\u0631\u0643\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0635\u062D\u064A \u0628\u0627\u0644\u062C\u064A\u0632\u0629",
        "name": "\u0645\u062D\u0637\u0629 \u0645\u064A\u0627\u0647 \u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u062F\u0647\u0628",
        "governorate": "\u0627\u0644\u062C\u064A\u0632\u0629",
        "region": "\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u062F\u0647\u0628",
        "address": "\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u062F\u0647\u0628\u060C \u0646\u0647\u0631 \u0627\u0644\u0646\u064A\u0644\u060C \u0627\u0644\u062C\u064A\u0632\u0629",
        "sector_name": "\u0648\u0633\u0637",
        "year_built": 2001,
        "year_service": 2003,
        "gps_lat": 29.9671,
        "gps_lng": 31.2184,
        "capacity_design_m3_day": 7e4,
        "capacity_actual_m3_day": 65e3,
        "station_type": "\u0633\u0637\u062D\u064A\u0629 \u062A\u0642\u0644\u064A\u062F\u064A\u0629",
        "water_source": "\u0646\u0647\u0631 \u0627\u0644\u0646\u064A\u0644",
        "intake_type": "\u0645\u0645\u062A\u062F",
        "alum_type": "\u0633\u0627\u0626\u0644\u0629",
        "alum_dose_gm_m3": 45,
        "alum_monthly_ton": 98,
        "chlorine_monthly_ton": 14,
        "water_permit": "\u0645\u0635\u0631\u062D \u0628\u0647",
        "service_areas": "\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u062F\u0647\u0628\u060C \u0627\u0644\u0637\u0627\u0644\u0628\u064A\u0629\u060C \u0627\u0644\u0647\u0631\u0645 \u0627\u0644\u0634\u0645\u0627\u0644\u064A"
      },
      "targets": {
        "efficiency_target": 0.91,
        "kwh_per_m3_min": 0.22,
        "kwh_per_m3_max": 0.34
      }
    }
  }
];
var initialUsers = [
  {
    "id": "u_sys",
    "username": "sysadmin",
    "name": "\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",
    "role": "system_admin",
    "station_id": null,
    "active": true
  },
  {
    "id": "u0",
    "username": "admin",
    "name": "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629",
    "role": "central_admin",
    "station_id": null,
    "active": true
  },
  {
    "id": "u1",
    "username": "giza_mgr",
    "name": "\u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629 \u0627\u0644\u062C\u064A\u0632\u0629",
    "role": "station_admin",
    "station_id": "giza",
    "active": true
  },
  {
    "id": "u2",
    "username": "sally",
    "name": "\u0633\u0627\u0644\u064A \u0625\u0628\u0631\u0627\u0647\u064A\u0645",
    "role": "station_admin",
    "station_id": "giza",
    "active": true
  },
  {
    "id": "u3",
    "username": "imbaba_mgr",
    "name": "\u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629 \u0625\u0645\u0628\u0627\u0628\u0629",
    "role": "station_admin",
    "station_id": "imbaba",
    "active": true
  },
  {
    "id": "u4",
    "username": "dahab_mgr",
    "name": "\u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629 \u0627\u0644\u062F\u0647\u0628",
    "role": "station_admin",
    "station_id": "dahab",
    "active": true
  },
  {
    "id": "u5",
    "username": "cost_acct",
    "name": "\u0645\u062D\u0627\u0633\u0628 \u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641",
    "role": "cost_accountant",
    "station_id": null,
    "active": true
  },
  {
    "id": "u6",
    "username": "viewer",
    "name": "\u0645\u0634\u0627\u0647\u062F \u0639\u0627\u0645",
    "role": "viewer",
    "station_id": null,
    "active": true
  }
];
var initialRecords = [
  {
    "id": "gz0",
    "station_id": "giza",
    "date": "2026-01-01",
    "produced_m3": 132160,
    "turbid_m3": 143652,
    "alum_liquid": 7.41,
    "chlorine_gas": 1.211,
    "electricity_kwh": 27361,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.20703,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-01T20:00:00"
  },
  {
    "id": "gz1",
    "station_id": "giza",
    "date": "2026-01-02",
    "produced_m3": 137806,
    "turbid_m3": 151586,
    "alum_liquid": 7.819,
    "chlorine_gas": 1.278,
    "electricity_kwh": 27363,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.19856,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-02T20:00:00"
  },
  {
    "id": "gz2",
    "station_id": "giza",
    "date": "2026-01-03",
    "produced_m3": 142865,
    "turbid_m3": 155288,
    "alum_liquid": 8.01,
    "chlorine_gas": 1.309,
    "electricity_kwh": 25414,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.17789,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-03T20:00:00"
  },
  {
    "id": "gz3",
    "station_id": "giza",
    "date": "2026-01-04",
    "produced_m3": 140353,
    "turbid_m3": 152557,
    "alum_liquid": 7.87,
    "chlorine_gas": 1.286,
    "electricity_kwh": 38019,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27088,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-04T20:00:00"
  },
  {
    "id": "gz4",
    "station_id": "giza",
    "date": "2026-01-05",
    "produced_m3": 146224,
    "turbid_m3": 160846,
    "alum_liquid": 8.297,
    "chlorine_gas": 1.356,
    "electricity_kwh": 34177,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23373,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-05T20:00:00"
  },
  {
    "id": "gz5",
    "station_id": "giza",
    "date": "2026-01-06",
    "produced_m3": 146014,
    "turbid_m3": 160455,
    "alum_liquid": 8.277,
    "chlorine_gas": 1.353,
    "electricity_kwh": 35749,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.24483,
    "alum_per_m3": 0.05669,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-06T20:00:00"
  },
  {
    "id": "gz6",
    "station_id": "giza",
    "date": "2026-01-07",
    "produced_m3": 144112,
    "turbid_m3": 156643,
    "alum_liquid": 8.08,
    "chlorine_gas": 1.321,
    "electricity_kwh": 41403,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.2873,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-01-07T20:00:00"
  },
  {
    "id": "gz7",
    "station_id": "giza",
    "date": "2026-01-08",
    "produced_m3": 140123,
    "turbid_m3": 151367,
    "alum_liquid": 7.808,
    "chlorine_gas": 1.276,
    "electricity_kwh": 36527,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9257,
    "kwh_per_m3": 0.26068,
    "alum_per_m3": 0.05572,
    "chlorine_per_m3": 911e-5,
    "created_by": "u1",
    "created_at": "2026-01-08T20:00:00"
  },
  {
    "id": "gz8",
    "station_id": "giza",
    "date": "2026-01-09",
    "produced_m3": 118899,
    "turbid_m3": 129238,
    "alum_liquid": 6.667,
    "chlorine_gas": 1.089,
    "electricity_kwh": 32442,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27285,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-09T20:00:00"
  },
  {
    "id": "gz9",
    "station_id": "giza",
    "date": "2026-01-10",
    "produced_m3": 134996,
    "turbid_m3": 147145,
    "alum_liquid": 7.59,
    "chlorine_gas": 1.24,
    "electricity_kwh": 38857,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.28784,
    "alum_per_m3": 0.05622,
    "chlorine_per_m3": 919e-5,
    "created_by": "u1",
    "created_at": "2026-01-10T20:00:00"
  },
  {
    "id": "gz10",
    "station_id": "giza",
    "date": "2026-01-11",
    "produced_m3": 137619,
    "turbid_m3": 151380,
    "alum_liquid": 7.809,
    "chlorine_gas": 1.276,
    "electricity_kwh": 35687,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25932,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-11T20:00:00"
  },
  {
    "id": "gz11",
    "station_id": "giza",
    "date": "2026-01-12",
    "produced_m3": 135919,
    "turbid_m3": 147738,
    "alum_liquid": 7.621,
    "chlorine_gas": 1.245,
    "electricity_kwh": 35177,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25881,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-12T20:00:00"
  },
  {
    "id": "gz12",
    "station_id": "giza",
    "date": "2026-01-13",
    "produced_m3": 135212,
    "turbid_m3": 146969,
    "alum_liquid": 7.581,
    "chlorine_gas": 1.239,
    "electricity_kwh": 37277,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27569,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-13T20:00:00"
  },
  {
    "id": "gz13",
    "station_id": "giza",
    "date": "2026-01-14",
    "produced_m3": 138778,
    "turbid_m3": 152655,
    "alum_liquid": 7.875,
    "chlorine_gas": 1.287,
    "electricity_kwh": 34208,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.24649,
    "alum_per_m3": 0.05675,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-14T20:00:00"
  },
  {
    "id": "gz14",
    "station_id": "giza",
    "date": "2026-01-15",
    "produced_m3": 135965,
    "turbid_m3": 147788,
    "alum_liquid": 7.623,
    "chlorine_gas": 1.246,
    "electricity_kwh": 33645,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.24745,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-15T20:00:00"
  },
  {
    "id": "gz15",
    "station_id": "giza",
    "date": "2026-01-16",
    "produced_m3": 115130,
    "turbid_m3": 125141,
    "alum_liquid": 6.455,
    "chlorine_gas": 1.055,
    "electricity_kwh": 35845,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.31134,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-16T20:00:00"
  },
  {
    "id": "gz16",
    "station_id": "giza",
    "date": "2026-01-17",
    "produced_m3": 108689,
    "turbid_m3": 119557,
    "alum_liquid": 6.167,
    "chlorine_gas": 1.008,
    "electricity_kwh": 25916,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23844,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-17T20:00:00"
  },
  {
    "id": "gz17",
    "station_id": "giza",
    "date": "2026-01-18",
    "produced_m3": 129365,
    "turbid_m3": 140614,
    "alum_liquid": 7.253,
    "chlorine_gas": 1.185,
    "electricity_kwh": 32944,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25466,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-18T20:00:00"
  },
  {
    "id": "gz18",
    "station_id": "giza",
    "date": "2026-01-19",
    "produced_m3": 122407,
    "turbid_m3": 133423,
    "alum_liquid": 6.882,
    "chlorine_gas": 1.125,
    "electricity_kwh": 35580,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.29067,
    "alum_per_m3": 0.05622,
    "chlorine_per_m3": 919e-5,
    "created_by": "u1",
    "created_at": "2026-01-19T20:00:00"
  },
  {
    "id": "gz19",
    "station_id": "giza",
    "date": "2026-01-20",
    "produced_m3": 134419,
    "turbid_m3": 146516,
    "alum_liquid": 7.558,
    "chlorine_gas": 1.235,
    "electricity_kwh": 32876,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.24458,
    "alum_per_m3": 0.05623,
    "chlorine_per_m3": 919e-5,
    "created_by": "u1",
    "created_at": "2026-01-20T20:00:00"
  },
  {
    "id": "gz20",
    "station_id": "giza",
    "date": "2026-01-21",
    "produced_m3": 137461,
    "turbid_m3": 149414,
    "alum_liquid": 7.707,
    "chlorine_gas": 1.26,
    "electricity_kwh": 33520,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.24385,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-01-21T20:00:00"
  },
  {
    "id": "gz21",
    "station_id": "giza",
    "date": "2026-01-22",
    "produced_m3": 133475,
    "turbid_m3": 145082,
    "alum_liquid": 7.484,
    "chlorine_gas": 1.223,
    "electricity_kwh": 34658,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25966,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-22T20:00:00"
  },
  {
    "id": "gz22",
    "station_id": "giza",
    "date": "2026-01-23",
    "produced_m3": 137161,
    "turbid_m3": 148516,
    "alum_liquid": 7.661,
    "chlorine_gas": 1.252,
    "electricity_kwh": 33825,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9235,
    "kwh_per_m3": 0.24661,
    "alum_per_m3": 0.05585,
    "chlorine_per_m3": 913e-5,
    "created_by": "u1",
    "created_at": "2026-01-23T20:00:00"
  },
  {
    "id": "gz23",
    "station_id": "giza",
    "date": "2026-01-24",
    "produced_m3": 136129,
    "turbid_m3": 147964,
    "alum_liquid": 7.633,
    "chlorine_gas": 1.247,
    "electricity_kwh": 32014,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.23517,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-24T20:00:00"
  },
  {
    "id": "gz24",
    "station_id": "giza",
    "date": "2026-01-25",
    "produced_m3": 138632,
    "turbid_m3": 151108,
    "alum_liquid": 7.795,
    "chlorine_gas": 1.274,
    "electricity_kwh": 34719,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.25044,
    "alum_per_m3": 0.05623,
    "chlorine_per_m3": 919e-5,
    "created_by": "u1",
    "created_at": "2026-01-25T20:00:00"
  },
  {
    "id": "gz25",
    "station_id": "giza",
    "date": "2026-01-26",
    "produced_m3": 136435,
    "turbid_m3": 150078,
    "alum_liquid": 7.742,
    "chlorine_gas": 1.265,
    "electricity_kwh": 34769,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25484,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-26T20:00:00"
  },
  {
    "id": "gz26",
    "station_id": "giza",
    "date": "2026-01-27",
    "produced_m3": 138899,
    "turbid_m3": 152655,
    "alum_liquid": 7.875,
    "chlorine_gas": 1.287,
    "electricity_kwh": 32980,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9099,
    "kwh_per_m3": 0.23744,
    "alum_per_m3": 0.0567,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-27T20:00:00"
  },
  {
    "id": "gz27",
    "station_id": "giza",
    "date": "2026-01-28",
    "produced_m3": 138004,
    "turbid_m3": 15e4,
    "alum_liquid": 7.738,
    "chlorine_gas": 1.264,
    "electricity_kwh": 35580,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25782,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-01-28T20:00:00"
  },
  {
    "id": "gz28",
    "station_id": "giza",
    "date": "2026-01-29",
    "produced_m3": 136987,
    "turbid_m3": 150685,
    "alum_liquid": 7.773,
    "chlorine_gas": 1.27,
    "electricity_kwh": 34701,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25332,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-29T20:00:00"
  },
  {
    "id": "gz29",
    "station_id": "giza",
    "date": "2026-01-30",
    "produced_m3": 131967,
    "turbid_m3": 145018,
    "alum_liquid": 7.481,
    "chlorine_gas": 1.223,
    "electricity_kwh": 32504,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.2463,
    "alum_per_m3": 0.05669,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-01-30T20:00:00"
  },
  {
    "id": "gz30",
    "station_id": "giza",
    "date": "2026-01-31",
    "produced_m3": 131897,
    "turbid_m3": 143366,
    "alum_liquid": 7.395,
    "chlorine_gas": 1.209,
    "electricity_kwh": 34182,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25916,
    "alum_per_m3": 0.05607,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-01-31T20:00:00"
  },
  {
    "id": "gz31",
    "station_id": "giza",
    "date": "2026-02-01",
    "produced_m3": 141393,
    "turbid_m3": 155532,
    "alum_liquid": 8.082,
    "chlorine_gas": 1.208,
    "electricity_kwh": 34812,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.24621,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-01T20:00:00"
  },
  {
    "id": "gz32",
    "station_id": "giza",
    "date": "2026-02-02",
    "produced_m3": 137836,
    "turbid_m3": 151468,
    "alum_liquid": 7.871,
    "chlorine_gas": 1.177,
    "electricity_kwh": 33553,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.24343,
    "alum_per_m3": 0.0571,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-02T20:00:00"
  },
  {
    "id": "gz33",
    "station_id": "giza",
    "date": "2026-02-03",
    "produced_m3": 133851,
    "turbid_m3": 145897,
    "alum_liquid": 7.582,
    "chlorine_gas": 1.134,
    "electricity_kwh": 34007,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.25407,
    "alum_per_m3": 0.05665,
    "chlorine_per_m3": 847e-5,
    "created_by": "u1",
    "created_at": "2026-02-03T20:00:00"
  },
  {
    "id": "gz34",
    "station_id": "giza",
    "date": "2026-02-04",
    "produced_m3": 140029,
    "turbid_m3": 153932,
    "alum_liquid": 7.999,
    "chlorine_gas": 1.196,
    "electricity_kwh": 34366,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9097,
    "kwh_per_m3": 0.24542,
    "alum_per_m3": 0.05712,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-04T20:00:00"
  },
  {
    "id": "gz35",
    "station_id": "giza",
    "date": "2026-02-05",
    "produced_m3": 141101,
    "turbid_m3": 153371,
    "alum_liquid": 7.97,
    "chlorine_gas": 1.192,
    "electricity_kwh": 35314,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25027,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-05T20:00:00"
  },
  {
    "id": "gz36",
    "station_id": "giza",
    "date": "2026-02-06",
    "produced_m3": 93550,
    "turbid_m3": 101685,
    "alum_liquid": 5.284,
    "chlorine_gas": 0.79,
    "electricity_kwh": 30459,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.32559,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 844e-5,
    "created_by": "u1",
    "created_at": "2026-02-06T20:00:00"
  },
  {
    "id": "gz37",
    "station_id": "giza",
    "date": "2026-02-07",
    "produced_m3": 141828,
    "turbid_m3": 156006,
    "alum_liquid": 8.107,
    "chlorine_gas": 1.212,
    "electricity_kwh": 30378,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.21419,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 855e-5,
    "created_by": "u1",
    "created_at": "2026-02-07T20:00:00"
  },
  {
    "id": "gz38",
    "station_id": "giza",
    "date": "2026-02-08",
    "produced_m3": 140741,
    "turbid_m3": 156378,
    "alum_liquid": 8.126,
    "chlorine_gas": 1.215,
    "electricity_kwh": 36193,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9,
    "kwh_per_m3": 0.25716,
    "alum_per_m3": 0.05774,
    "chlorine_per_m3": 863e-5,
    "created_by": "u1",
    "created_at": "2026-02-08T20:00:00"
  },
  {
    "id": "gz39",
    "station_id": "giza",
    "date": "2026-02-09",
    "produced_m3": 134480,
    "turbid_m3": 146175,
    "alum_liquid": 7.596,
    "chlorine_gas": 1.136,
    "electricity_kwh": 37867,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.28158,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-09T20:00:00"
  },
  {
    "id": "gz40",
    "station_id": "giza",
    "date": "2026-02-10",
    "produced_m3": 138010,
    "turbid_m3": 149175,
    "alum_liquid": 7.752,
    "chlorine_gas": 1.159,
    "electricity_kwh": 32368,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9252,
    "kwh_per_m3": 0.23453,
    "alum_per_m3": 0.05617,
    "chlorine_per_m3": 84e-4,
    "created_by": "u1",
    "created_at": "2026-02-10T20:00:00"
  },
  {
    "id": "gz41",
    "station_id": "giza",
    "date": "2026-02-11",
    "produced_m3": 137825,
    "turbid_m3": 149810,
    "alum_liquid": 7.785,
    "chlorine_gas": 1.164,
    "electricity_kwh": 35670,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25881,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-11T20:00:00"
  },
  {
    "id": "gz42",
    "station_id": "giza",
    "date": "2026-02-12",
    "produced_m3": 134019,
    "turbid_m3": 145672,
    "alum_liquid": 7.57,
    "chlorine_gas": 1.132,
    "electricity_kwh": 34955,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.26082,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-12T20:00:00"
  },
  {
    "id": "gz43",
    "station_id": "giza",
    "date": "2026-02-13",
    "produced_m3": 136865,
    "turbid_m3": 150551,
    "alum_liquid": 7.823,
    "chlorine_gas": 1.17,
    "electricity_kwh": 34563,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25253,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 855e-5,
    "created_by": "u1",
    "created_at": "2026-02-13T20:00:00"
  },
  {
    "id": "gz44",
    "station_id": "giza",
    "date": "2026-02-14",
    "produced_m3": 130505,
    "turbid_m3": 141853,
    "alum_liquid": 7.371,
    "chlorine_gas": 1.102,
    "electricity_kwh": 30880,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.92,
    "kwh_per_m3": 0.23662,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 844e-5,
    "created_by": "u1",
    "created_at": "2026-02-14T20:00:00"
  },
  {
    "id": "gz45",
    "station_id": "giza",
    "date": "2026-02-15",
    "produced_m3": 138278,
    "turbid_m3": 150302,
    "alum_liquid": 7.81,
    "chlorine_gas": 1.168,
    "electricity_kwh": 35637,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25772,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-15T20:00:00"
  },
  {
    "id": "gz46",
    "station_id": "giza",
    "date": "2026-02-16",
    "produced_m3": 138211,
    "turbid_m3": 152032,
    "alum_liquid": 7.9,
    "chlorine_gas": 1.181,
    "electricity_kwh": 32332,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23393,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-16T20:00:00"
  },
  {
    "id": "gz47",
    "station_id": "giza",
    "date": "2026-02-17",
    "produced_m3": 134826,
    "turbid_m3": 148160,
    "alum_liquid": 7.699,
    "chlorine_gas": 1.151,
    "electricity_kwh": 35563,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.26377,
    "alum_per_m3": 0.0571,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-17T20:00:00"
  },
  {
    "id": "gz48",
    "station_id": "giza",
    "date": "2026-02-18",
    "produced_m3": 138211,
    "turbid_m3": 150229,
    "alum_liquid": 7.807,
    "chlorine_gas": 1.167,
    "electricity_kwh": 34527,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.24981,
    "alum_per_m3": 0.05649,
    "chlorine_per_m3": 844e-5,
    "created_by": "u1",
    "created_at": "2026-02-18T20:00:00"
  },
  {
    "id": "gz49",
    "station_id": "giza",
    "date": "2026-02-19",
    "produced_m3": 141843,
    "turbid_m3": 156027,
    "alum_liquid": 8.108,
    "chlorine_gas": 1.212,
    "electricity_kwh": 34528,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.24342,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-19T20:00:00"
  },
  {
    "id": "gz50",
    "station_id": "giza",
    "date": "2026-02-20",
    "produced_m3": 131395,
    "turbid_m3": 144534,
    "alum_liquid": 7.511,
    "chlorine_gas": 1.123,
    "electricity_kwh": 34254,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.26069,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 855e-5,
    "created_by": "u1",
    "created_at": "2026-02-20T20:00:00"
  },
  {
    "id": "gz51",
    "station_id": "giza",
    "date": "2026-02-21",
    "produced_m3": 130491,
    "turbid_m3": 141805,
    "alum_liquid": 7.369,
    "chlorine_gas": 1.102,
    "electricity_kwh": 33960,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9202,
    "kwh_per_m3": 0.26025,
    "alum_per_m3": 0.05647,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-21T20:00:00"
  },
  {
    "id": "gz52",
    "station_id": "giza",
    "date": "2026-02-22",
    "produced_m3": 137011,
    "turbid_m3": 149908,
    "alum_liquid": 7.79,
    "chlorine_gas": 1.165,
    "electricity_kwh": 34130,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.914,
    "kwh_per_m3": 0.2491,
    "alum_per_m3": 0.05686,
    "chlorine_per_m3": 85e-4,
    "created_by": "u1",
    "created_at": "2026-02-22T20:00:00"
  },
  {
    "id": "gz53",
    "station_id": "giza",
    "date": "2026-02-23",
    "produced_m3": 133037,
    "turbid_m3": 146341,
    "alum_liquid": 7.605,
    "chlorine_gas": 1.137,
    "electricity_kwh": 33531,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25204,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 855e-5,
    "created_by": "u1",
    "created_at": "2026-02-23T20:00:00"
  },
  {
    "id": "gz54",
    "station_id": "giza",
    "date": "2026-02-24",
    "produced_m3": 130213,
    "turbid_m3": 141535,
    "alum_liquid": 7.355,
    "chlorine_gas": 1.1,
    "electricity_kwh": 36156,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27767,
    "alum_per_m3": 0.05648,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-24T20:00:00"
  },
  {
    "id": "gz55",
    "station_id": "giza",
    "date": "2026-02-25",
    "produced_m3": 131849,
    "turbid_m3": 145033,
    "alum_liquid": 7.537,
    "chlorine_gas": 1.127,
    "electricity_kwh": 32208,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.24428,
    "alum_per_m3": 0.05716,
    "chlorine_per_m3": 855e-5,
    "created_by": "u1",
    "created_at": "2026-02-25T20:00:00"
  },
  {
    "id": "gz56",
    "station_id": "giza",
    "date": "2026-02-26",
    "produced_m3": 133061,
    "turbid_m3": 146220,
    "alum_liquid": 7.598,
    "chlorine_gas": 1.136,
    "electricity_kwh": 33957,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.2552,
    "alum_per_m3": 0.0571,
    "chlorine_per_m3": 854e-5,
    "created_by": "u1",
    "created_at": "2026-02-26T20:00:00"
  },
  {
    "id": "gz57",
    "station_id": "giza",
    "date": "2026-02-27",
    "produced_m3": 132366,
    "turbid_m3": 143876,
    "alum_liquid": 7.477,
    "chlorine_gas": 1.118,
    "electricity_kwh": 36092,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27267,
    "alum_per_m3": 0.05649,
    "chlorine_per_m3": 845e-5,
    "created_by": "u1",
    "created_at": "2026-02-27T20:00:00"
  },
  {
    "id": "gz58",
    "station_id": "giza",
    "date": "2026-02-28",
    "produced_m3": 134137,
    "turbid_m3": 144867,
    "alum_liquid": 7.528,
    "chlorine_gas": 1.126,
    "electricity_kwh": 32020,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.23871,
    "alum_per_m3": 0.05612,
    "chlorine_per_m3": 839e-5,
    "created_by": "u1",
    "created_at": "2026-02-28T20:00:00"
  },
  {
    "id": "gz59",
    "station_id": "giza",
    "date": "2026-03-01",
    "produced_m3": 132769,
    "turbid_m3": 146045,
    "alum_liquid": 7.623,
    "chlorine_gas": 1.233,
    "electricity_kwh": 31083,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23411,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 929e-5,
    "created_by": "u1",
    "created_at": "2026-03-01T20:00:00"
  },
  {
    "id": "gz60",
    "station_id": "giza",
    "date": "2026-03-02",
    "produced_m3": 133591,
    "turbid_m3": 145207,
    "alum_liquid": 7.58,
    "chlorine_gas": 1.226,
    "electricity_kwh": 37373,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27976,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 918e-5,
    "created_by": "u1",
    "created_at": "2026-03-02T20:00:00"
  },
  {
    "id": "gz61",
    "station_id": "giza",
    "date": "2026-03-03",
    "produced_m3": 135016,
    "turbid_m3": 147247,
    "alum_liquid": 7.686,
    "chlorine_gas": 1.243,
    "electricity_kwh": 32808,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9169,
    "kwh_per_m3": 0.24299,
    "alum_per_m3": 0.05693,
    "chlorine_per_m3": 921e-5,
    "created_by": "u1",
    "created_at": "2026-03-03T20:00:00"
  },
  {
    "id": "gz62",
    "station_id": "giza",
    "date": "2026-03-04",
    "produced_m3": 134439,
    "turbid_m3": 147883,
    "alum_liquid": 7.719,
    "chlorine_gas": 1.248,
    "electricity_kwh": 35804,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.26632,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-04T20:00:00"
  },
  {
    "id": "gz63",
    "station_id": "giza",
    "date": "2026-03-05",
    "produced_m3": 136570,
    "turbid_m3": 148445,
    "alum_liquid": 7.749,
    "chlorine_gas": 1.253,
    "electricity_kwh": 32412,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.23733,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-03-05T20:00:00"
  },
  {
    "id": "gz64",
    "station_id": "giza",
    "date": "2026-03-06",
    "produced_m3": 135790,
    "turbid_m3": 146653,
    "alum_liquid": 7.655,
    "chlorine_gas": 1.238,
    "electricity_kwh": 31469,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.23175,
    "alum_per_m3": 0.05637,
    "chlorine_per_m3": 912e-5,
    "created_by": "u1",
    "created_at": "2026-03-06T20:00:00"
  },
  {
    "id": "gz65",
    "station_id": "giza",
    "date": "2026-03-07",
    "produced_m3": 130446,
    "turbid_m3": 143491,
    "alum_liquid": 7.49,
    "chlorine_gas": 1.211,
    "electricity_kwh": 35081,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.26893,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-07T20:00:00"
  },
  {
    "id": "gz66",
    "station_id": "giza",
    "date": "2026-03-08",
    "produced_m3": 133838,
    "turbid_m3": 145475,
    "alum_liquid": 7.594,
    "chlorine_gas": 1.228,
    "electricity_kwh": 33075,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.24713,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 918e-5,
    "created_by": "u1",
    "created_at": "2026-03-08T20:00:00"
  },
  {
    "id": "gz67",
    "station_id": "giza",
    "date": "2026-03-09",
    "produced_m3": 137234,
    "turbid_m3": 148890,
    "alum_liquid": 7.772,
    "chlorine_gas": 1.257,
    "electricity_kwh": 32896,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9217,
    "kwh_per_m3": 0.23971,
    "alum_per_m3": 0.05663,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-03-09T20:00:00"
  },
  {
    "id": "gz68",
    "station_id": "giza",
    "date": "2026-03-10",
    "produced_m3": 134236,
    "turbid_m3": 147660,
    "alum_liquid": 7.708,
    "chlorine_gas": 1.246,
    "electricity_kwh": 30521,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.22737,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-10T20:00:00"
  },
  {
    "id": "gz69",
    "station_id": "giza",
    "date": "2026-03-11",
    "produced_m3": 133912,
    "turbid_m3": 145964,
    "alum_liquid": 7.619,
    "chlorine_gas": 1.232,
    "electricity_kwh": 34787,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.25978,
    "alum_per_m3": 0.0569,
    "chlorine_per_m3": 92e-4,
    "created_by": "u1",
    "created_at": "2026-03-11T20:00:00"
  },
  {
    "id": "gz70",
    "station_id": "giza",
    "date": "2026-03-12",
    "produced_m3": 132712,
    "turbid_m3": 145900,
    "alum_liquid": 7.616,
    "chlorine_gas": 1.231,
    "electricity_kwh": 33968,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9096,
    "kwh_per_m3": 0.25595,
    "alum_per_m3": 0.05739,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-12T20:00:00"
  },
  {
    "id": "gz71",
    "station_id": "giza",
    "date": "2026-03-13",
    "produced_m3": 120976,
    "turbid_m3": 133074,
    "alum_liquid": 6.946,
    "chlorine_gas": 1.123,
    "electricity_kwh": 30916,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25555,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-13T20:00:00"
  },
  {
    "id": "gz72",
    "station_id": "giza",
    "date": "2026-03-14",
    "produced_m3": 130784,
    "turbid_m3": 142156,
    "alum_liquid": 7.42,
    "chlorine_gas": 1.2,
    "electricity_kwh": 33180,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.2537,
    "alum_per_m3": 0.05673,
    "chlorine_per_m3": 918e-5,
    "created_by": "u1",
    "created_at": "2026-03-14T20:00:00"
  },
  {
    "id": "gz73",
    "station_id": "giza",
    "date": "2026-03-15",
    "produced_m3": 141782,
    "turbid_m3": 153124,
    "alum_liquid": 7.993,
    "chlorine_gas": 1.292,
    "electricity_kwh": 33169,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.23394,
    "alum_per_m3": 0.05638,
    "chlorine_per_m3": 911e-5,
    "created_by": "u1",
    "created_at": "2026-03-15T20:00:00"
  },
  {
    "id": "gz74",
    "station_id": "giza",
    "date": "2026-03-16",
    "produced_m3": 136456,
    "turbid_m3": 150102,
    "alum_liquid": 7.835,
    "chlorine_gas": 1.267,
    "electricity_kwh": 34167,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25039,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 929e-5,
    "created_by": "u1",
    "created_at": "2026-03-16T20:00:00"
  },
  {
    "id": "gz75",
    "station_id": "giza",
    "date": "2026-03-17",
    "produced_m3": 131985,
    "turbid_m3": 143863,
    "alum_liquid": 7.509,
    "chlorine_gas": 1.214,
    "electricity_kwh": 35682,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.27035,
    "alum_per_m3": 0.05689,
    "chlorine_per_m3": 92e-4,
    "created_by": "u1",
    "created_at": "2026-03-17T20:00:00"
  },
  {
    "id": "gz76",
    "station_id": "giza",
    "date": "2026-03-18",
    "produced_m3": 139695,
    "turbid_m3": 150870,
    "alum_liquid": 7.875,
    "chlorine_gas": 1.273,
    "electricity_kwh": 30753,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.22014,
    "alum_per_m3": 0.05637,
    "chlorine_per_m3": 911e-5,
    "created_by": "u1",
    "created_at": "2026-03-18T20:00:00"
  },
  {
    "id": "gz77",
    "station_id": "giza",
    "date": "2026-03-19",
    "produced_m3": 133857,
    "turbid_m3": 147095,
    "alum_liquid": 7.678,
    "chlorine_gas": 1.241,
    "electricity_kwh": 34010,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.25408,
    "alum_per_m3": 0.05736,
    "chlorine_per_m3": 927e-5,
    "created_by": "u1",
    "created_at": "2026-03-19T20:00:00"
  },
  {
    "id": "gz78",
    "station_id": "giza",
    "date": "2026-03-20",
    "produced_m3": 130608,
    "turbid_m3": 142362,
    "alum_liquid": 7.431,
    "chlorine_gas": 1.202,
    "electricity_kwh": 34041,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.26063,
    "alum_per_m3": 0.0569,
    "chlorine_per_m3": 92e-4,
    "created_by": "u1",
    "created_at": "2026-03-20T20:00:00"
  },
  {
    "id": "gz79",
    "station_id": "giza",
    "date": "2026-03-21",
    "produced_m3": 135074,
    "turbid_m3": 145879,
    "alum_liquid": 7.615,
    "chlorine_gas": 1.231,
    "electricity_kwh": 34024,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.25189,
    "alum_per_m3": 0.05638,
    "chlorine_per_m3": 911e-5,
    "created_by": "u1",
    "created_at": "2026-03-21T20:00:00"
  },
  {
    "id": "gz80",
    "station_id": "giza",
    "date": "2026-03-22",
    "produced_m3": 134315,
    "turbid_m3": 147746,
    "alum_liquid": 7.712,
    "chlorine_gas": 1.247,
    "electricity_kwh": 31919,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23764,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-22T20:00:00"
  },
  {
    "id": "gz81",
    "station_id": "giza",
    "date": "2026-03-23",
    "produced_m3": 132656,
    "turbid_m3": 144190,
    "alum_liquid": 7.526,
    "chlorine_gas": 1.217,
    "electricity_kwh": 36494,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.2751,
    "alum_per_m3": 0.05673,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-03-23T20:00:00"
  },
  {
    "id": "gz82",
    "station_id": "giza",
    "date": "2026-03-24",
    "produced_m3": 139890,
    "turbid_m3": 151081,
    "alum_liquid": 7.886,
    "chlorine_gas": 1.275,
    "electricity_kwh": 31776,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.22715,
    "alum_per_m3": 0.05637,
    "chlorine_per_m3": 911e-5,
    "created_by": "u1",
    "created_at": "2026-03-24T20:00:00"
  },
  {
    "id": "gz83",
    "station_id": "giza",
    "date": "2026-03-25",
    "produced_m3": 134196,
    "turbid_m3": 147616,
    "alum_liquid": 7.705,
    "chlorine_gas": 1.246,
    "electricity_kwh": 33625,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.25057,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-25T20:00:00"
  },
  {
    "id": "gz84",
    "station_id": "giza",
    "date": "2026-03-26",
    "produced_m3": 133867,
    "turbid_m3": 145507,
    "alum_liquid": 7.595,
    "chlorine_gas": 1.228,
    "electricity_kwh": 35438,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.26473,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-03-26T20:00:00"
  },
  {
    "id": "gz85",
    "station_id": "giza",
    "date": "2026-03-27",
    "produced_m3": 133257,
    "turbid_m3": 144507,
    "alum_liquid": 7.543,
    "chlorine_gas": 1.22,
    "electricity_kwh": 34008,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9221,
    "kwh_per_m3": 0.25521,
    "alum_per_m3": 0.0566,
    "chlorine_per_m3": 916e-5,
    "created_by": "u1",
    "created_at": "2026-03-27T20:00:00"
  },
  {
    "id": "gz86",
    "station_id": "giza",
    "date": "2026-03-28",
    "produced_m3": 135385,
    "turbid_m3": 148924,
    "alum_liquid": 7.774,
    "chlorine_gas": 1.257,
    "electricity_kwh": 31534,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.23292,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-28T20:00:00"
  },
  {
    "id": "gz87",
    "station_id": "giza",
    "date": "2026-03-29",
    "produced_m3": 134722,
    "turbid_m3": 146436,
    "alum_liquid": 7.644,
    "chlorine_gas": 1.236,
    "electricity_kwh": 35325,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.26221,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-03-29T20:00:00"
  },
  {
    "id": "gz88",
    "station_id": "giza",
    "date": "2026-03-30",
    "produced_m3": 140150,
    "turbid_m3": 155250,
    "alum_liquid": 8.104,
    "chlorine_gas": 1.31,
    "electricity_kwh": 32600,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9027,
    "kwh_per_m3": 0.23261,
    "alum_per_m3": 0.05782,
    "chlorine_per_m3": 935e-5,
    "created_by": "u1",
    "created_at": "2026-03-30T20:00:00"
  },
  {
    "id": "gz89",
    "station_id": "giza",
    "date": "2026-03-31",
    "produced_m3": 139490,
    "turbid_m3": 153439,
    "alum_liquid": 8.009,
    "chlorine_gas": 1.295,
    "electricity_kwh": 34785,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9091,
    "kwh_per_m3": 0.24937,
    "alum_per_m3": 0.05742,
    "chlorine_per_m3": 928e-5,
    "created_by": "u1",
    "created_at": "2026-03-31T20:00:00"
  },
  {
    "id": "gz90",
    "station_id": "giza",
    "date": "2026-04-01",
    "produced_m3": 130526,
    "turbid_m3": 141876,
    "alum_liquid": 7.647,
    "chlorine_gas": 1.312,
    "electricity_kwh": 35575,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27255,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-01T20:00:00"
  },
  {
    "id": "gz91",
    "station_id": "giza",
    "date": "2026-04-02",
    "produced_m3": 138234,
    "turbid_m3": 152890,
    "alum_liquid": 8.241,
    "chlorine_gas": 1.414,
    "electricity_kwh": 35879,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9041,
    "kwh_per_m3": 0.25955,
    "alum_per_m3": 0.05962,
    "chlorine_per_m3": 0.01023,
    "created_by": "u1",
    "created_at": "2026-04-02T20:00:00"
  },
  {
    "id": "gz92",
    "station_id": "giza",
    "date": "2026-04-03",
    "produced_m3": 135133,
    "turbid_m3": 146744,
    "alum_liquid": 7.91,
    "chlorine_gas": 1.357,
    "electricity_kwh": 34961,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9209,
    "kwh_per_m3": 0.25872,
    "alum_per_m3": 0.05853,
    "chlorine_per_m3": 0.01004,
    "created_by": "u1",
    "created_at": "2026-04-03T20:00:00"
  },
  {
    "id": "gz93",
    "station_id": "giza",
    "date": "2026-04-04",
    "produced_m3": 130978,
    "turbid_m3": 142367,
    "alum_liquid": 7.674,
    "chlorine_gas": 1.317,
    "electricity_kwh": 35473,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27083,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01006,
    "created_by": "u1",
    "created_at": "2026-04-04T20:00:00"
  },
  {
    "id": "gz94",
    "station_id": "giza",
    "date": "2026-04-05",
    "produced_m3": 140134,
    "turbid_m3": 154890,
    "alum_liquid": 8.349,
    "chlorine_gas": 1.433,
    "electricity_kwh": 32466,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9047,
    "kwh_per_m3": 0.23168,
    "alum_per_m3": 0.05958,
    "chlorine_per_m3": 0.01023,
    "created_by": "u1",
    "created_at": "2026-04-05T20:00:00"
  },
  {
    "id": "gz95",
    "station_id": "giza",
    "date": "2026-04-06",
    "produced_m3": 138145,
    "turbid_m3": 153340,
    "alum_liquid": 8.265,
    "chlorine_gas": 1.418,
    "electricity_kwh": 37312,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.27009,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 0.01026,
    "created_by": "u1",
    "created_at": "2026-04-06T20:00:00"
  },
  {
    "id": "gz96",
    "station_id": "giza",
    "date": "2026-04-07",
    "produced_m3": 135746,
    "turbid_m3": 147550,
    "alum_liquid": 7.953,
    "chlorine_gas": 1.365,
    "electricity_kwh": 38960,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.28701,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01006,
    "created_by": "u1",
    "created_at": "2026-04-07T20:00:00"
  },
  {
    "id": "gz97",
    "station_id": "giza",
    "date": "2026-04-08",
    "produced_m3": 144134,
    "turbid_m3": 159880,
    "alum_liquid": 8.618,
    "chlorine_gas": 1.479,
    "electricity_kwh": 37159,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9015,
    "kwh_per_m3": 0.25781,
    "alum_per_m3": 0.05979,
    "chlorine_per_m3": 0.01026,
    "created_by": "u1",
    "created_at": "2026-04-08T20:00:00"
  },
  {
    "id": "gz98",
    "station_id": "giza",
    "date": "2026-04-09",
    "produced_m3": 137578,
    "turbid_m3": 152864,
    "alum_liquid": 8.239,
    "chlorine_gas": 1.414,
    "electricity_kwh": 37909,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9,
    "kwh_per_m3": 0.27555,
    "alum_per_m3": 0.05989,
    "chlorine_per_m3": 0.01028,
    "created_by": "u1",
    "created_at": "2026-04-09T20:00:00"
  },
  {
    "id": "gz99",
    "station_id": "giza",
    "date": "2026-04-10",
    "produced_m3": 137326,
    "turbid_m3": 149267,
    "alum_liquid": 8.045,
    "chlorine_gas": 1.381,
    "electricity_kwh": 37910,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27606,
    "alum_per_m3": 0.05858,
    "chlorine_per_m3": 0.01006,
    "created_by": "u1",
    "created_at": "2026-04-10T20:00:00"
  },
  {
    "id": "gz100",
    "station_id": "giza",
    "date": "2026-04-11",
    "produced_m3": 142615,
    "turbid_m3": 158880,
    "alum_liquid": 8.564,
    "chlorine_gas": 1.47,
    "electricity_kwh": 36311,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.8976,
    "kwh_per_m3": 0.25461,
    "alum_per_m3": 0.06005,
    "chlorine_per_m3": 0.01031,
    "created_by": "u1",
    "created_at": "2026-04-11T20:00:00"
  },
  {
    "id": "gz101",
    "station_id": "giza",
    "date": "2026-04-12",
    "produced_m3": 135747,
    "turbid_m3": 150679,
    "alum_liquid": 8.122,
    "chlorine_gas": 1.394,
    "electricity_kwh": 34382,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.25328,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 0.01027,
    "created_by": "u1",
    "created_at": "2026-04-12T20:00:00"
  },
  {
    "id": "gz102",
    "station_id": "giza",
    "date": "2026-04-13",
    "produced_m3": 140274,
    "turbid_m3": 152470,
    "alum_liquid": 8.218,
    "chlorine_gas": 1.41,
    "electricity_kwh": 43692,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.31148,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-13T20:00:00"
  },
  {
    "id": "gz103",
    "station_id": "giza",
    "date": "2026-04-14",
    "produced_m3": 141100,
    "turbid_m3": 153369,
    "alum_liquid": 8.267,
    "chlorine_gas": 1.419,
    "electricity_kwh": 35826,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.25391,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01006,
    "created_by": "u1",
    "created_at": "2026-04-14T20:00:00"
  },
  {
    "id": "gz104",
    "station_id": "giza",
    "date": "2026-04-15",
    "produced_m3": 133800,
    "turbid_m3": 147032,
    "alum_liquid": 7.925,
    "chlorine_gas": 1.36,
    "electricity_kwh": 34788,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.26,
    "alum_per_m3": 0.05923,
    "chlorine_per_m3": 0.01016,
    "created_by": "u1",
    "created_at": "2026-04-15T20:00:00"
  },
  {
    "id": "gz105",
    "station_id": "giza",
    "date": "2026-04-16",
    "produced_m3": 131031,
    "turbid_m3": 142425,
    "alum_liquid": 7.677,
    "chlorine_gas": 1.317,
    "electricity_kwh": 42559,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.3248,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-16T20:00:00"
  },
  {
    "id": "gz106",
    "station_id": "giza",
    "date": "2026-04-17",
    "produced_m3": 140100,
    "turbid_m3": 152300,
    "alum_liquid": 8.209,
    "chlorine_gas": 1.409,
    "electricity_kwh": 36252,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9199,
    "kwh_per_m3": 0.25876,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01006,
    "created_by": "u1",
    "created_at": "2026-04-17T20:00:00"
  },
  {
    "id": "gz107",
    "station_id": "giza",
    "date": "2026-04-18",
    "produced_m3": 137871,
    "turbid_m3": 153037,
    "alum_liquid": 8.249,
    "chlorine_gas": 1.416,
    "electricity_kwh": 36477,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.26457,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 0.01027,
    "created_by": "u1",
    "created_at": "2026-04-18T20:00:00"
  },
  {
    "id": "gz108",
    "station_id": "giza",
    "date": "2026-04-19",
    "produced_m3": 133500,
    "turbid_m3": 145108,
    "alum_liquid": 7.821,
    "chlorine_gas": 1.342,
    "electricity_kwh": 36478,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.27324,
    "alum_per_m3": 0.05858,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-19T20:00:00"
  },
  {
    "id": "gz109",
    "station_id": "giza",
    "date": "2026-04-20",
    "produced_m3": 137234,
    "turbid_m3": 151890,
    "alum_liquid": 8.187,
    "chlorine_gas": 1.405,
    "electricity_kwh": 35166,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9035,
    "kwh_per_m3": 0.25625,
    "alum_per_m3": 0.05966,
    "chlorine_per_m3": 0.01024,
    "created_by": "u1",
    "created_at": "2026-04-20T20:00:00"
  },
  {
    "id": "gz110",
    "station_id": "giza",
    "date": "2026-04-21",
    "produced_m3": 131750,
    "turbid_m3": 146243,
    "alum_liquid": 7.882,
    "chlorine_gas": 1.353,
    "electricity_kwh": 34582,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.26248,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 0.01027,
    "created_by": "u1",
    "created_at": "2026-04-21T20:00:00"
  },
  {
    "id": "gz111",
    "station_id": "giza",
    "date": "2026-04-22",
    "produced_m3": 139290,
    "turbid_m3": 151402,
    "alum_liquid": 8.161,
    "chlorine_gas": 1.4,
    "electricity_kwh": 37539,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.2695,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-22T20:00:00"
  },
  {
    "id": "gz112",
    "station_id": "giza",
    "date": "2026-04-23",
    "produced_m3": 140169,
    "turbid_m3": 151382,
    "alum_liquid": 8.159,
    "chlorine_gas": 1.4,
    "electricity_kwh": 34138,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.24355,
    "alum_per_m3": 0.05821,
    "chlorine_per_m3": 999e-5,
    "created_by": "u1",
    "created_at": "2026-04-23T20:00:00"
  },
  {
    "id": "gz113",
    "station_id": "giza",
    "date": "2026-04-24",
    "produced_m3": 132006,
    "turbid_m3": 146527,
    "alum_liquid": 7.898,
    "chlorine_gas": 1.355,
    "electricity_kwh": 35792,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.27114,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 0.01026,
    "created_by": "u1",
    "created_at": "2026-04-24T20:00:00"
  },
  {
    "id": "gz114",
    "station_id": "giza",
    "date": "2026-04-25",
    "produced_m3": 138979,
    "turbid_m3": 151064,
    "alum_liquid": 8.142,
    "chlorine_gas": 1.397,
    "electricity_kwh": 40882,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.29416,
    "alum_per_m3": 0.05858,
    "chlorine_per_m3": 0.01005,
    "created_by": "u1",
    "created_at": "2026-04-25T20:00:00"
  },
  {
    "id": "gz115",
    "station_id": "giza",
    "date": "2026-04-26",
    "produced_m3": 138250,
    "turbid_m3": 149310,
    "alum_liquid": 8.048,
    "chlorine_gas": 1.381,
    "electricity_kwh": 33194,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9259,
    "kwh_per_m3": 0.2401,
    "alum_per_m3": 0.05821,
    "chlorine_per_m3": 999e-5,
    "created_by": "u1",
    "created_at": "2026-04-26T20:00:00"
  },
  {
    "id": "gz116",
    "station_id": "giza",
    "date": "2026-04-27",
    "produced_m3": 136047,
    "turbid_m3": 151163,
    "alum_liquid": 8.148,
    "chlorine_gas": 1.398,
    "electricity_kwh": 36234,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9,
    "kwh_per_m3": 0.26633,
    "alum_per_m3": 0.05989,
    "chlorine_per_m3": 0.01028,
    "created_by": "u1",
    "created_at": "2026-04-27T20:00:00"
  },
  {
    "id": "gz117",
    "station_id": "giza",
    "date": "2026-04-28",
    "produced_m3": 134844,
    "turbid_m3": 146979,
    "alum_liquid": 7.922,
    "chlorine_gas": 1.36,
    "electricity_kwh": 40049,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.9174,
    "kwh_per_m3": 0.297,
    "alum_per_m3": 0.05875,
    "chlorine_per_m3": 0.01009,
    "created_by": "u1",
    "created_at": "2026-04-28T20:00:00"
  },
  {
    "id": "gz118",
    "station_id": "giza",
    "date": "2026-04-29",
    "produced_m3": 135044,
    "turbid_m3": 148890,
    "alum_liquid": 8.025,
    "chlorine_gas": 1.377,
    "electricity_kwh": 33729,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.907,
    "kwh_per_m3": 0.24976,
    "alum_per_m3": 0.05943,
    "chlorine_per_m3": 0.0102,
    "created_by": "u1",
    "created_at": "2026-04-29T20:00:00"
  },
  {
    "id": "gz119",
    "station_id": "giza",
    "date": "2026-04-30",
    "produced_m3": 132165,
    "turbid_m3": 145236,
    "alum_liquid": 7.828,
    "chlorine_gas": 1.343,
    "electricity_kwh": 36997,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.91,
    "kwh_per_m3": 0.27993,
    "alum_per_m3": 0.05923,
    "chlorine_per_m3": 0.01016,
    "created_by": "u1",
    "created_at": "2026-04-30T20:00:00"
  },
  {
    "id": "gz120",
    "station_id": "giza",
    "date": "2026-05-01",
    "produced_m3": 129624,
    "turbid_m3": 140895,
    "alum_liquid": 7.594,
    "chlorine_gas": 1.189,
    "electricity_kwh": 36767,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.28364,
    "alum_per_m3": 0.05858,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-05-01T20:00:00"
  },
  {
    "id": "gz121",
    "station_id": "giza",
    "date": "2026-05-02",
    "produced_m3": 132012,
    "turbid_m3": 145812,
    "alum_liquid": 7.859,
    "chlorine_gas": 1.231,
    "electricity_kwh": 35613,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9054,
    "kwh_per_m3": 0.26977,
    "alum_per_m3": 0.05953,
    "chlorine_per_m3": 932e-5,
    "created_by": "u1",
    "created_at": "2026-05-02T20:00:00"
  },
  {
    "id": "gz122",
    "station_id": "giza",
    "date": "2026-05-03",
    "produced_m3": 131102,
    "turbid_m3": 145668,
    "alum_liquid": 7.852,
    "chlorine_gas": 1.229,
    "electricity_kwh": 34640,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9,
    "kwh_per_m3": 0.26422,
    "alum_per_m3": 0.05989,
    "chlorine_per_m3": 937e-5,
    "created_by": "u1",
    "created_at": "2026-05-03T20:00:00"
  },
  {
    "id": "gz123",
    "station_id": "giza",
    "date": "2026-05-04",
    "produced_m3": 132431,
    "turbid_m3": 143946,
    "alum_liquid": 7.759,
    "chlorine_gas": 1.215,
    "electricity_kwh": 41520,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.31352,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-05-04T20:00:00"
  },
  {
    "id": "gz124",
    "station_id": "giza",
    "date": "2026-05-05",
    "produced_m3": 134813,
    "turbid_m3": 148789,
    "alum_liquid": 8.02,
    "chlorine_gas": 1.256,
    "electricity_kwh": 29575,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9061,
    "kwh_per_m3": 0.21938,
    "alum_per_m3": 0.05949,
    "chlorine_per_m3": 932e-5,
    "created_by": "u1",
    "created_at": "2026-05-05T20:00:00"
  },
  {
    "id": "gz125",
    "station_id": "giza",
    "date": "2026-05-06",
    "produced_m3": 132628,
    "turbid_m3": 147217,
    "alum_liquid": 7.935,
    "chlorine_gas": 1.243,
    "electricity_kwh": 35332,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9009,
    "kwh_per_m3": 0.2664,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 937e-5,
    "created_by": "u1",
    "created_at": "2026-05-06T20:00:00"
  },
  {
    "id": "gz126",
    "station_id": "giza",
    "date": "2026-05-07",
    "produced_m3": 140096,
    "turbid_m3": 152278,
    "alum_liquid": 8.208,
    "chlorine_gas": 1.285,
    "electricity_kwh": 33508,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0635\u0627\u0644\u062D + \u062D\u0631\u0628\u0649 \u0627\u0644\u0633\u064A\u062F",
    "efficiency": 0.92,
    "kwh_per_m3": 0.23918,
    "alum_per_m3": 0.05859,
    "chlorine_per_m3": 917e-5,
    "created_by": "u1",
    "created_at": "2026-05-07T20:00:00"
  },
  {
    "id": "gz127",
    "station_id": "giza",
    "date": "2026-05-08",
    "produced_m3": 135678,
    "turbid_m3": 150345,
    "alum_liquid": 8.104,
    "chlorine_gas": 1.269,
    "electricity_kwh": 33508,
    "flow_meters_ok": true,
    "shift_crew": "\u062D\u0633\u0627\u0645 \u0637\u0639\u064A\u0645\u0647 + \u0645\u0633\u0639\u062F",
    "efficiency": 0.9024,
    "kwh_per_m3": 0.24697,
    "alum_per_m3": 0.05973,
    "chlorine_per_m3": 935e-5,
    "created_by": "u1",
    "created_at": "2026-05-08T20:00:00"
  },
  {
    "id": "gz128",
    "station_id": "giza",
    "date": "2026-05-09",
    "produced_m3": 137441,
    "turbid_m3": 152712,
    "alum_liquid": 8.231,
    "chlorine_gas": 1.289,
    "electricity_kwh": 35073,
    "flow_meters_ok": true,
    "shift_crew": "\u0645 \u0639\u0645\u0627\u062F \u0645\u0631\u0627\u062F + \u062D\u0645\u0627\u062F\u0647 \u0645\u0635\u0637\u0641\u0649",
    "efficiency": 0.9,
    "kwh_per_m3": 0.25519,
    "alum_per_m3": 0.05989,
    "chlorine_per_m3": 938e-5,
    "created_by": "u1",
    "created_at": "2026-05-09T20:00:00"
  },
  {
    "id": "im0",
    "station_id": "imbaba",
    "date": "2026-01-01",
    "produced_m3": 74543,
    "turbid_m3": 87457,
    "alum_liquid": 4.995,
    "chlorine_gas": 0.63,
    "electricity_kwh": 21850,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8523,
    "kwh_per_m3": 0.29312,
    "alum_per_m3": 0.06701,
    "chlorine_per_m3": 845e-5,
    "created_by": "u0",
    "created_at": "2026-01-01T20:00:00"
  },
  {
    "id": "im1",
    "station_id": "imbaba",
    "date": "2026-01-02",
    "produced_m3": 82408,
    "turbid_m3": 88594,
    "alum_liquid": 5.1,
    "chlorine_gas": 0.625,
    "electricity_kwh": 22293,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9302,
    "kwh_per_m3": 0.27052,
    "alum_per_m3": 0.06189,
    "chlorine_per_m3": 758e-5,
    "created_by": "u0",
    "created_at": "2026-01-02T20:00:00"
  },
  {
    "id": "im2",
    "station_id": "imbaba",
    "date": "2026-01-03",
    "produced_m3": 76885,
    "turbid_m3": 86641,
    "alum_liquid": 4.529,
    "chlorine_gas": 0.629,
    "electricity_kwh": 20938,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8874,
    "kwh_per_m3": 0.27233,
    "alum_per_m3": 0.05891,
    "chlorine_per_m3": 818e-5,
    "created_by": "u0",
    "created_at": "2026-01-03T20:00:00"
  },
  {
    "id": "im3",
    "station_id": "imbaba",
    "date": "2026-01-04",
    "produced_m3": 72909,
    "turbid_m3": 94843,
    "alum_liquid": 4.584,
    "chlorine_gas": 0.568,
    "electricity_kwh": 21371,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.7687,
    "kwh_per_m3": 0.29312,
    "alum_per_m3": 0.06287,
    "chlorine_per_m3": 779e-5,
    "created_by": "u0",
    "created_at": "2026-01-04T20:00:00"
  },
  {
    "id": "im4",
    "station_id": "imbaba",
    "date": "2026-01-05",
    "produced_m3": 71873,
    "turbid_m3": 84908,
    "alum_liquid": 4.623,
    "chlorine_gas": 0.584,
    "electricity_kwh": 22457,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8465,
    "kwh_per_m3": 0.31245,
    "alum_per_m3": 0.06432,
    "chlorine_per_m3": 813e-5,
    "created_by": "u0",
    "created_at": "2026-01-05T20:00:00"
  },
  {
    "id": "im5",
    "station_id": "imbaba",
    "date": "2026-01-06",
    "produced_m3": 73057,
    "turbid_m3": 93866,
    "alum_liquid": 4.982,
    "chlorine_gas": 0.565,
    "electricity_kwh": 21978,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.7783,
    "kwh_per_m3": 0.30083,
    "alum_per_m3": 0.06819,
    "chlorine_per_m3": 773e-5,
    "created_by": "u0",
    "created_at": "2026-01-06T20:00:00"
  },
  {
    "id": "im6",
    "station_id": "imbaba",
    "date": "2026-01-07",
    "produced_m3": 75182,
    "turbid_m3": 94691,
    "alum_liquid": 4.804,
    "chlorine_gas": 0.588,
    "electricity_kwh": 22042,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.794,
    "kwh_per_m3": 0.29318,
    "alum_per_m3": 0.0639,
    "chlorine_per_m3": 782e-5,
    "created_by": "u0",
    "created_at": "2026-01-07T20:00:00"
  },
  {
    "id": "im7",
    "station_id": "imbaba",
    "date": "2026-01-08",
    "produced_m3": 78903,
    "turbid_m3": 94554,
    "alum_liquid": 4.539,
    "chlorine_gas": 0.649,
    "electricity_kwh": 23335,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8345,
    "kwh_per_m3": 0.29574,
    "alum_per_m3": 0.05753,
    "chlorine_per_m3": 823e-5,
    "created_by": "u0",
    "created_at": "2026-01-08T20:00:00"
  },
  {
    "id": "im8",
    "station_id": "imbaba",
    "date": "2026-01-09",
    "produced_m3": 83738,
    "turbid_m3": 95776,
    "alum_liquid": 4.911,
    "chlorine_gas": 0.581,
    "electricity_kwh": 21141,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8743,
    "kwh_per_m3": 0.25247,
    "alum_per_m3": 0.05865,
    "chlorine_per_m3": 694e-5,
    "created_by": "u0",
    "created_at": "2026-01-09T20:00:00"
  },
  {
    "id": "im9",
    "station_id": "imbaba",
    "date": "2026-01-10",
    "produced_m3": 84219,
    "turbid_m3": 87248,
    "alum_liquid": 4.863,
    "chlorine_gas": 0.571,
    "electricity_kwh": 23001,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9653,
    "kwh_per_m3": 0.27311,
    "alum_per_m3": 0.05774,
    "chlorine_per_m3": 678e-5,
    "created_by": "u0",
    "created_at": "2026-01-10T20:00:00"
  },
  {
    "id": "im10",
    "station_id": "imbaba",
    "date": "2026-01-11",
    "produced_m3": 76481,
    "turbid_m3": 95613,
    "alum_liquid": 4.669,
    "chlorine_gas": 0.637,
    "electricity_kwh": 21311,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7999,
    "kwh_per_m3": 0.27864,
    "alum_per_m3": 0.06105,
    "chlorine_per_m3": 833e-5,
    "created_by": "u0",
    "created_at": "2026-01-11T20:00:00"
  },
  {
    "id": "im11",
    "station_id": "imbaba",
    "date": "2026-01-12",
    "produced_m3": 83790,
    "turbid_m3": 87731,
    "alum_liquid": 5.038,
    "chlorine_gas": 0.571,
    "electricity_kwh": 23624,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9551,
    "kwh_per_m3": 0.28194,
    "alum_per_m3": 0.06013,
    "chlorine_per_m3": 681e-5,
    "created_by": "u0",
    "created_at": "2026-01-12T20:00:00"
  },
  {
    "id": "im12",
    "station_id": "imbaba",
    "date": "2026-01-13",
    "produced_m3": 81691,
    "turbid_m3": 87845,
    "alum_liquid": 4.685,
    "chlorine_gas": 0.596,
    "electricity_kwh": 21499,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9299,
    "kwh_per_m3": 0.26317,
    "alum_per_m3": 0.05735,
    "chlorine_per_m3": 73e-4,
    "created_by": "u0",
    "created_at": "2026-01-13T20:00:00"
  },
  {
    "id": "im13",
    "station_id": "imbaba",
    "date": "2026-01-14",
    "produced_m3": 71838,
    "turbid_m3": 90783,
    "alum_liquid": 5.215,
    "chlorine_gas": 0.644,
    "electricity_kwh": 22550,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7913,
    "kwh_per_m3": 0.3139,
    "alum_per_m3": 0.07259,
    "chlorine_per_m3": 896e-5,
    "created_by": "u0",
    "created_at": "2026-01-14T20:00:00"
  },
  {
    "id": "im14",
    "station_id": "imbaba",
    "date": "2026-01-15",
    "produced_m3": 76734,
    "turbid_m3": 95195,
    "alum_liquid": 5.124,
    "chlorine_gas": 0.638,
    "electricity_kwh": 22142,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8061,
    "kwh_per_m3": 0.28856,
    "alum_per_m3": 0.06678,
    "chlorine_per_m3": 831e-5,
    "created_by": "u0",
    "created_at": "2026-01-15T20:00:00"
  },
  {
    "id": "im15",
    "station_id": "imbaba",
    "date": "2026-01-16",
    "produced_m3": 77262,
    "turbid_m3": 84552,
    "alum_liquid": 4.542,
    "chlorine_gas": 0.584,
    "electricity_kwh": 22840,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9138,
    "kwh_per_m3": 0.29562,
    "alum_per_m3": 0.05879,
    "chlorine_per_m3": 756e-5,
    "created_by": "u0",
    "created_at": "2026-01-16T20:00:00"
  },
  {
    "id": "im16",
    "station_id": "imbaba",
    "date": "2026-01-17",
    "produced_m3": 75149,
    "turbid_m3": 92993,
    "alum_liquid": 4.929,
    "chlorine_gas": 0.615,
    "electricity_kwh": 22328,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8081,
    "kwh_per_m3": 0.29712,
    "alum_per_m3": 0.06559,
    "chlorine_per_m3": 818e-5,
    "created_by": "u0",
    "created_at": "2026-01-17T20:00:00"
  },
  {
    "id": "im17",
    "station_id": "imbaba",
    "date": "2026-01-18",
    "produced_m3": 83931,
    "turbid_m3": 82094,
    "alum_liquid": 5.187,
    "chlorine_gas": 0.607,
    "electricity_kwh": 20837,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 1.0224,
    "kwh_per_m3": 0.24826,
    "alum_per_m3": 0.0618,
    "chlorine_per_m3": 723e-5,
    "created_by": "u0",
    "created_at": "2026-01-18T20:00:00"
  },
  {
    "id": "im18",
    "station_id": "imbaba",
    "date": "2026-01-19",
    "produced_m3": 73947,
    "turbid_m3": 82886,
    "alum_liquid": 5.194,
    "chlorine_gas": 0.609,
    "electricity_kwh": 23187,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8922,
    "kwh_per_m3": 0.31356,
    "alum_per_m3": 0.07024,
    "chlorine_per_m3": 824e-5,
    "created_by": "u0",
    "created_at": "2026-01-19T20:00:00"
  },
  {
    "id": "im19",
    "station_id": "imbaba",
    "date": "2026-01-20",
    "produced_m3": 73429,
    "turbid_m3": 95253,
    "alum_liquid": 4.747,
    "chlorine_gas": 0.645,
    "electricity_kwh": 23069,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7709,
    "kwh_per_m3": 0.31417,
    "alum_per_m3": 0.06465,
    "chlorine_per_m3": 878e-5,
    "created_by": "u0",
    "created_at": "2026-01-20T20:00:00"
  },
  {
    "id": "im20",
    "station_id": "imbaba",
    "date": "2026-01-21",
    "produced_m3": 83771,
    "turbid_m3": 89345,
    "alum_liquid": 4.587,
    "chlorine_gas": 0.562,
    "electricity_kwh": 22645,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9376,
    "kwh_per_m3": 0.27032,
    "alum_per_m3": 0.05476,
    "chlorine_per_m3": 671e-5,
    "created_by": "u0",
    "created_at": "2026-01-21T20:00:00"
  },
  {
    "id": "im21",
    "station_id": "imbaba",
    "date": "2026-01-22",
    "produced_m3": 80297,
    "turbid_m3": 84076,
    "alum_liquid": 4.689,
    "chlorine_gas": 0.641,
    "electricity_kwh": 20877,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9551,
    "kwh_per_m3": 0.26,
    "alum_per_m3": 0.0584,
    "chlorine_per_m3": 798e-5,
    "created_by": "u0",
    "created_at": "2026-01-22T20:00:00"
  },
  {
    "id": "im22",
    "station_id": "imbaba",
    "date": "2026-01-23",
    "produced_m3": 83995,
    "turbid_m3": 89806,
    "alum_liquid": 4.796,
    "chlorine_gas": 0.623,
    "electricity_kwh": 21376,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9353,
    "kwh_per_m3": 0.25449,
    "alum_per_m3": 0.0571,
    "chlorine_per_m3": 742e-5,
    "created_by": "u0",
    "created_at": "2026-01-23T20:00:00"
  },
  {
    "id": "im23",
    "station_id": "imbaba",
    "date": "2026-01-24",
    "produced_m3": 83212,
    "turbid_m3": 92938,
    "alum_liquid": 5.222,
    "chlorine_gas": 0.657,
    "electricity_kwh": 21349,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8953,
    "kwh_per_m3": 0.25656,
    "alum_per_m3": 0.06276,
    "chlorine_per_m3": 79e-4,
    "created_by": "u0",
    "created_at": "2026-01-24T20:00:00"
  },
  {
    "id": "im24",
    "station_id": "imbaba",
    "date": "2026-01-25",
    "produced_m3": 74394,
    "turbid_m3": 85356,
    "alum_liquid": 5.061,
    "chlorine_gas": 0.625,
    "electricity_kwh": 20758,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8716,
    "kwh_per_m3": 0.27903,
    "alum_per_m3": 0.06803,
    "chlorine_per_m3": 84e-4,
    "created_by": "u0",
    "created_at": "2026-01-25T20:00:00"
  },
  {
    "id": "im25",
    "station_id": "imbaba",
    "date": "2026-01-26",
    "produced_m3": 75547,
    "turbid_m3": 82795,
    "alum_liquid": 4.919,
    "chlorine_gas": 0.643,
    "electricity_kwh": 21550,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9125,
    "kwh_per_m3": 0.28525,
    "alum_per_m3": 0.06511,
    "chlorine_per_m3": 851e-5,
    "created_by": "u0",
    "created_at": "2026-01-26T20:00:00"
  },
  {
    "id": "im26",
    "station_id": "imbaba",
    "date": "2026-01-27",
    "produced_m3": 78911,
    "turbid_m3": 82003,
    "alum_liquid": 4.59,
    "chlorine_gas": 0.592,
    "electricity_kwh": 21540,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9623,
    "kwh_per_m3": 0.27297,
    "alum_per_m3": 0.05817,
    "chlorine_per_m3": 75e-4,
    "created_by": "u0",
    "created_at": "2026-01-27T20:00:00"
  },
  {
    "id": "im27",
    "station_id": "imbaba",
    "date": "2026-01-28",
    "produced_m3": 76776,
    "turbid_m3": 82092,
    "alum_liquid": 4.937,
    "chlorine_gas": 0.644,
    "electricity_kwh": 21936,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9352,
    "kwh_per_m3": 0.28571,
    "alum_per_m3": 0.0643,
    "chlorine_per_m3": 839e-5,
    "created_by": "u0",
    "created_at": "2026-01-28T20:00:00"
  },
  {
    "id": "im28",
    "station_id": "imbaba",
    "date": "2026-01-29",
    "produced_m3": 73861,
    "turbid_m3": 90979,
    "alum_liquid": 4.946,
    "chlorine_gas": 0.598,
    "electricity_kwh": 23203,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8118,
    "kwh_per_m3": 0.31414,
    "alum_per_m3": 0.06696,
    "chlorine_per_m3": 81e-4,
    "created_by": "u0",
    "created_at": "2026-01-29T20:00:00"
  },
  {
    "id": "im29",
    "station_id": "imbaba",
    "date": "2026-01-30",
    "produced_m3": 81620,
    "turbid_m3": 92644,
    "alum_liquid": 4.548,
    "chlorine_gas": 0.63,
    "electricity_kwh": 22804,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.881,
    "kwh_per_m3": 0.27939,
    "alum_per_m3": 0.05572,
    "chlorine_per_m3": 772e-5,
    "created_by": "u0",
    "created_at": "2026-01-30T20:00:00"
  },
  {
    "id": "im30",
    "station_id": "imbaba",
    "date": "2026-01-31",
    "produced_m3": 82628,
    "turbid_m3": 94776,
    "alum_liquid": 5.246,
    "chlorine_gas": 0.596,
    "electricity_kwh": 20780,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8718,
    "kwh_per_m3": 0.25149,
    "alum_per_m3": 0.06349,
    "chlorine_per_m3": 721e-5,
    "created_by": "u0",
    "created_at": "2026-01-31T20:00:00"
  },
  {
    "id": "im31",
    "station_id": "imbaba",
    "date": "2026-02-01",
    "produced_m3": 81388,
    "turbid_m3": 84470,
    "alum_liquid": 5.096,
    "chlorine_gas": 0.643,
    "electricity_kwh": 21611,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9635,
    "kwh_per_m3": 0.26553,
    "alum_per_m3": 0.06261,
    "chlorine_per_m3": 79e-4,
    "created_by": "u0",
    "created_at": "2026-02-01T20:00:00"
  },
  {
    "id": "im32",
    "station_id": "imbaba",
    "date": "2026-02-02",
    "produced_m3": 81859,
    "turbid_m3": 86821,
    "alum_liquid": 5.008,
    "chlorine_gas": 0.632,
    "electricity_kwh": 22971,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9428,
    "kwh_per_m3": 0.28062,
    "alum_per_m3": 0.06118,
    "chlorine_per_m3": 772e-5,
    "created_by": "u0",
    "created_at": "2026-02-02T20:00:00"
  },
  {
    "id": "im33",
    "station_id": "imbaba",
    "date": "2026-02-03",
    "produced_m3": 74631,
    "turbid_m3": 93420,
    "alum_liquid": 5.034,
    "chlorine_gas": 0.655,
    "electricity_kwh": 20759,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.7989,
    "kwh_per_m3": 0.27816,
    "alum_per_m3": 0.06745,
    "chlorine_per_m3": 878e-5,
    "created_by": "u0",
    "created_at": "2026-02-03T20:00:00"
  },
  {
    "id": "im34",
    "station_id": "imbaba",
    "date": "2026-02-04",
    "produced_m3": 82250,
    "turbid_m3": 81921,
    "alum_liquid": 4.909,
    "chlorine_gas": 0.648,
    "electricity_kwh": 22603,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 1.004,
    "kwh_per_m3": 0.27481,
    "alum_per_m3": 0.05968,
    "chlorine_per_m3": 788e-5,
    "created_by": "u0",
    "created_at": "2026-02-04T20:00:00"
  },
  {
    "id": "im35",
    "station_id": "imbaba",
    "date": "2026-02-05",
    "produced_m3": 80925,
    "turbid_m3": 93623,
    "alum_liquid": 4.85,
    "chlorine_gas": 0.65,
    "electricity_kwh": 22791,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8644,
    "kwh_per_m3": 0.28163,
    "alum_per_m3": 0.05993,
    "chlorine_per_m3": 803e-5,
    "created_by": "u0",
    "created_at": "2026-02-05T20:00:00"
  },
  {
    "id": "im36",
    "station_id": "imbaba",
    "date": "2026-02-06",
    "produced_m3": 83506,
    "turbid_m3": 89109,
    "alum_liquid": 5.244,
    "chlorine_gas": 0.654,
    "electricity_kwh": 22308,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9371,
    "kwh_per_m3": 0.26714,
    "alum_per_m3": 0.0628,
    "chlorine_per_m3": 783e-5,
    "created_by": "u0",
    "created_at": "2026-02-06T20:00:00"
  },
  {
    "id": "im37",
    "station_id": "imbaba",
    "date": "2026-02-07",
    "produced_m3": 81624,
    "turbid_m3": 84245,
    "alum_liquid": 4.769,
    "chlorine_gas": 0.625,
    "electricity_kwh": 21174,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9689,
    "kwh_per_m3": 0.25941,
    "alum_per_m3": 0.05843,
    "chlorine_per_m3": 766e-5,
    "created_by": "u0",
    "created_at": "2026-02-07T20:00:00"
  },
  {
    "id": "im38",
    "station_id": "imbaba",
    "date": "2026-02-08",
    "produced_m3": 79886,
    "turbid_m3": 87174,
    "alum_liquid": 5.202,
    "chlorine_gas": 0.623,
    "electricity_kwh": 22224,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9164,
    "kwh_per_m3": 0.2782,
    "alum_per_m3": 0.06512,
    "chlorine_per_m3": 78e-4,
    "created_by": "u0",
    "created_at": "2026-02-08T20:00:00"
  },
  {
    "id": "im39",
    "station_id": "imbaba",
    "date": "2026-02-09",
    "produced_m3": 80836,
    "turbid_m3": 87036,
    "alum_liquid": 4.778,
    "chlorine_gas": 0.593,
    "electricity_kwh": 20631,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9288,
    "kwh_per_m3": 0.25522,
    "alum_per_m3": 0.05911,
    "chlorine_per_m3": 734e-5,
    "created_by": "u0",
    "created_at": "2026-02-09T20:00:00"
  },
  {
    "id": "im40",
    "station_id": "imbaba",
    "date": "2026-02-10",
    "produced_m3": 78653,
    "turbid_m3": 83848,
    "alum_liquid": 4.778,
    "chlorine_gas": 0.633,
    "electricity_kwh": 23686,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.938,
    "kwh_per_m3": 0.30115,
    "alum_per_m3": 0.06075,
    "chlorine_per_m3": 805e-5,
    "created_by": "u0",
    "created_at": "2026-02-10T20:00:00"
  },
  {
    "id": "im41",
    "station_id": "imbaba",
    "date": "2026-02-11",
    "produced_m3": 79933,
    "turbid_m3": 85184,
    "alum_liquid": 5.006,
    "chlorine_gas": 0.571,
    "electricity_kwh": 22632,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9384,
    "kwh_per_m3": 0.28314,
    "alum_per_m3": 0.06263,
    "chlorine_per_m3": 714e-5,
    "created_by": "u0",
    "created_at": "2026-02-11T20:00:00"
  },
  {
    "id": "im42",
    "station_id": "imbaba",
    "date": "2026-02-12",
    "produced_m3": 75792,
    "turbid_m3": 83682,
    "alum_liquid": 4.55,
    "chlorine_gas": 0.599,
    "electricity_kwh": 22327,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9057,
    "kwh_per_m3": 0.29458,
    "alum_per_m3": 0.06003,
    "chlorine_per_m3": 79e-4,
    "created_by": "u0",
    "created_at": "2026-02-12T20:00:00"
  },
  {
    "id": "im43",
    "station_id": "imbaba",
    "date": "2026-02-13",
    "produced_m3": 74988,
    "turbid_m3": 82894,
    "alum_liquid": 5.195,
    "chlorine_gas": 0.584,
    "electricity_kwh": 20452,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9046,
    "kwh_per_m3": 0.27274,
    "alum_per_m3": 0.06928,
    "chlorine_per_m3": 779e-5,
    "created_by": "u0",
    "created_at": "2026-02-13T20:00:00"
  },
  {
    "id": "im44",
    "station_id": "imbaba",
    "date": "2026-02-14",
    "produced_m3": 83783,
    "turbid_m3": 84982,
    "alum_liquid": 4.862,
    "chlorine_gas": 0.608,
    "electricity_kwh": 22833,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9859,
    "kwh_per_m3": 0.27253,
    "alum_per_m3": 0.05803,
    "chlorine_per_m3": 726e-5,
    "created_by": "u0",
    "created_at": "2026-02-14T20:00:00"
  },
  {
    "id": "im45",
    "station_id": "imbaba",
    "date": "2026-02-15",
    "produced_m3": 72741,
    "turbid_m3": 84008,
    "alum_liquid": 4.618,
    "chlorine_gas": 0.604,
    "electricity_kwh": 20947,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8659,
    "kwh_per_m3": 0.28797,
    "alum_per_m3": 0.06349,
    "chlorine_per_m3": 83e-4,
    "created_by": "u0",
    "created_at": "2026-02-15T20:00:00"
  },
  {
    "id": "im46",
    "station_id": "imbaba",
    "date": "2026-02-16",
    "produced_m3": 81683,
    "turbid_m3": 87921,
    "alum_liquid": 5.056,
    "chlorine_gas": 0.593,
    "electricity_kwh": 21717,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.929,
    "kwh_per_m3": 0.26587,
    "alum_per_m3": 0.0619,
    "chlorine_per_m3": 726e-5,
    "created_by": "u0",
    "created_at": "2026-02-16T20:00:00"
  },
  {
    "id": "im47",
    "station_id": "imbaba",
    "date": "2026-02-17",
    "produced_m3": 80286,
    "turbid_m3": 82539,
    "alum_liquid": 5.068,
    "chlorine_gas": 0.631,
    "electricity_kwh": 21917,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9727,
    "kwh_per_m3": 0.27299,
    "alum_per_m3": 0.06312,
    "chlorine_per_m3": 786e-5,
    "created_by": "u0",
    "created_at": "2026-02-17T20:00:00"
  },
  {
    "id": "im48",
    "station_id": "imbaba",
    "date": "2026-02-18",
    "produced_m3": 75465,
    "turbid_m3": 86922,
    "alum_liquid": 4.755,
    "chlorine_gas": 0.631,
    "electricity_kwh": 20299,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8682,
    "kwh_per_m3": 0.26899,
    "alum_per_m3": 0.06301,
    "chlorine_per_m3": 836e-5,
    "created_by": "u0",
    "created_at": "2026-02-18T20:00:00"
  },
  {
    "id": "im49",
    "station_id": "imbaba",
    "date": "2026-02-19",
    "produced_m3": 81673,
    "turbid_m3": 85633,
    "alum_liquid": 4.655,
    "chlorine_gas": 0.622,
    "electricity_kwh": 22378,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9538,
    "kwh_per_m3": 0.274,
    "alum_per_m3": 0.057,
    "chlorine_per_m3": 762e-5,
    "created_by": "u0",
    "created_at": "2026-02-19T20:00:00"
  },
  {
    "id": "im50",
    "station_id": "imbaba",
    "date": "2026-02-20",
    "produced_m3": 84160,
    "turbid_m3": 86523,
    "alum_liquid": 4.974,
    "chlorine_gas": 0.583,
    "electricity_kwh": 23419,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9727,
    "kwh_per_m3": 0.27827,
    "alum_per_m3": 0.0591,
    "chlorine_per_m3": 693e-5,
    "created_by": "u0",
    "created_at": "2026-02-20T20:00:00"
  },
  {
    "id": "im51",
    "station_id": "imbaba",
    "date": "2026-02-21",
    "produced_m3": 79148,
    "turbid_m3": 83251,
    "alum_liquid": 5.027,
    "chlorine_gas": 0.613,
    "electricity_kwh": 20368,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9507,
    "kwh_per_m3": 0.25734,
    "alum_per_m3": 0.06351,
    "chlorine_per_m3": 774e-5,
    "created_by": "u0",
    "created_at": "2026-02-21T20:00:00"
  },
  {
    "id": "im52",
    "station_id": "imbaba",
    "date": "2026-02-22",
    "produced_m3": 79033,
    "turbid_m3": 85964,
    "alum_liquid": 5.144,
    "chlorine_gas": 0.603,
    "electricity_kwh": 23620,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9194,
    "kwh_per_m3": 0.29886,
    "alum_per_m3": 0.06509,
    "chlorine_per_m3": 763e-5,
    "created_by": "u0",
    "created_at": "2026-02-22T20:00:00"
  },
  {
    "id": "im53",
    "station_id": "imbaba",
    "date": "2026-02-23",
    "produced_m3": 82110,
    "turbid_m3": 90894,
    "alum_liquid": 5.071,
    "chlorine_gas": 0.642,
    "electricity_kwh": 22235,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9034,
    "kwh_per_m3": 0.2708,
    "alum_per_m3": 0.06176,
    "chlorine_per_m3": 782e-5,
    "created_by": "u0",
    "created_at": "2026-02-23T20:00:00"
  },
  {
    "id": "im54",
    "station_id": "imbaba",
    "date": "2026-02-24",
    "produced_m3": 76939,
    "turbid_m3": 86259,
    "alum_liquid": 5.151,
    "chlorine_gas": 0.633,
    "electricity_kwh": 21380,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.892,
    "kwh_per_m3": 0.27788,
    "alum_per_m3": 0.06695,
    "chlorine_per_m3": 823e-5,
    "created_by": "u0",
    "created_at": "2026-02-24T20:00:00"
  },
  {
    "id": "im55",
    "station_id": "imbaba",
    "date": "2026-02-25",
    "produced_m3": 78644,
    "turbid_m3": 86696,
    "alum_liquid": 5.069,
    "chlorine_gas": 0.612,
    "electricity_kwh": 22205,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9071,
    "kwh_per_m3": 0.28235,
    "alum_per_m3": 0.06446,
    "chlorine_per_m3": 778e-5,
    "created_by": "u0",
    "created_at": "2026-02-25T20:00:00"
  },
  {
    "id": "im56",
    "station_id": "imbaba",
    "date": "2026-02-26",
    "produced_m3": 76814,
    "turbid_m3": 95435,
    "alum_liquid": 5.219,
    "chlorine_gas": 0.577,
    "electricity_kwh": 20738,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8049,
    "kwh_per_m3": 0.26998,
    "alum_per_m3": 0.06794,
    "chlorine_per_m3": 751e-5,
    "created_by": "u0",
    "created_at": "2026-02-26T20:00:00"
  },
  {
    "id": "im57",
    "station_id": "imbaba",
    "date": "2026-02-27",
    "produced_m3": 80623,
    "turbid_m3": 85363,
    "alum_liquid": 5.285,
    "chlorine_gas": 0.653,
    "electricity_kwh": 23702,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9445,
    "kwh_per_m3": 0.29399,
    "alum_per_m3": 0.06555,
    "chlorine_per_m3": 81e-4,
    "created_by": "u0",
    "created_at": "2026-02-27T20:00:00"
  },
  {
    "id": "im58",
    "station_id": "imbaba",
    "date": "2026-02-28",
    "produced_m3": 79976,
    "turbid_m3": 83346,
    "alum_liquid": 5.239,
    "chlorine_gas": 0.621,
    "electricity_kwh": 23069,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9596,
    "kwh_per_m3": 0.28845,
    "alum_per_m3": 0.06551,
    "chlorine_per_m3": 776e-5,
    "created_by": "u0",
    "created_at": "2026-02-28T20:00:00"
  },
  {
    "id": "im59",
    "station_id": "imbaba",
    "date": "2026-03-01",
    "produced_m3": 73496,
    "turbid_m3": 82038,
    "alum_liquid": 5.201,
    "chlorine_gas": 0.561,
    "electricity_kwh": 20391,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8959,
    "kwh_per_m3": 0.27744,
    "alum_per_m3": 0.07077,
    "chlorine_per_m3": 763e-5,
    "created_by": "u0",
    "created_at": "2026-03-01T20:00:00"
  },
  {
    "id": "im60",
    "station_id": "imbaba",
    "date": "2026-03-02",
    "produced_m3": 81991,
    "turbid_m3": 90766,
    "alum_liquid": 4.528,
    "chlorine_gas": 0.598,
    "electricity_kwh": 22076,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9033,
    "kwh_per_m3": 0.26925,
    "alum_per_m3": 0.05523,
    "chlorine_per_m3": 729e-5,
    "created_by": "u0",
    "created_at": "2026-03-02T20:00:00"
  },
  {
    "id": "im61",
    "station_id": "imbaba",
    "date": "2026-03-03",
    "produced_m3": 76367,
    "turbid_m3": 86012,
    "alum_liquid": 4.964,
    "chlorine_gas": 0.644,
    "electricity_kwh": 22902,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8879,
    "kwh_per_m3": 0.29989,
    "alum_per_m3": 0.065,
    "chlorine_per_m3": 843e-5,
    "created_by": "u0",
    "created_at": "2026-03-03T20:00:00"
  },
  {
    "id": "im62",
    "station_id": "imbaba",
    "date": "2026-03-04",
    "produced_m3": 83529,
    "turbid_m3": 86016,
    "alum_liquid": 4.541,
    "chlorine_gas": 0.653,
    "electricity_kwh": 22676,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9711,
    "kwh_per_m3": 0.27147,
    "alum_per_m3": 0.05436,
    "chlorine_per_m3": 782e-5,
    "created_by": "u0",
    "created_at": "2026-03-04T20:00:00"
  },
  {
    "id": "im63",
    "station_id": "imbaba",
    "date": "2026-03-05",
    "produced_m3": 76631,
    "turbid_m3": 91765,
    "alum_liquid": 5.104,
    "chlorine_gas": 0.585,
    "electricity_kwh": 22336,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8351,
    "kwh_per_m3": 0.29147,
    "alum_per_m3": 0.0666,
    "chlorine_per_m3": 763e-5,
    "created_by": "u0",
    "created_at": "2026-03-05T20:00:00"
  },
  {
    "id": "im64",
    "station_id": "imbaba",
    "date": "2026-03-06",
    "produced_m3": 84201,
    "turbid_m3": 87569,
    "alum_liquid": 4.783,
    "chlorine_gas": 0.578,
    "electricity_kwh": 21068,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9615,
    "kwh_per_m3": 0.25021,
    "alum_per_m3": 0.0568,
    "chlorine_per_m3": 686e-5,
    "created_by": "u0",
    "created_at": "2026-03-06T20:00:00"
  },
  {
    "id": "im65",
    "station_id": "imbaba",
    "date": "2026-03-07",
    "produced_m3": 80416,
    "turbid_m3": 84549,
    "alum_liquid": 4.865,
    "chlorine_gas": 0.585,
    "electricity_kwh": 20340,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9511,
    "kwh_per_m3": 0.25293,
    "alum_per_m3": 0.0605,
    "chlorine_per_m3": 727e-5,
    "created_by": "u0",
    "created_at": "2026-03-07T20:00:00"
  },
  {
    "id": "im66",
    "station_id": "imbaba",
    "date": "2026-03-08",
    "produced_m3": 80314,
    "turbid_m3": 95281,
    "alum_liquid": 5.088,
    "chlorine_gas": 0.659,
    "electricity_kwh": 21276,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8429,
    "kwh_per_m3": 0.26491,
    "alum_per_m3": 0.06335,
    "chlorine_per_m3": 821e-5,
    "created_by": "u0",
    "created_at": "2026-03-08T20:00:00"
  },
  {
    "id": "im67",
    "station_id": "imbaba",
    "date": "2026-03-09",
    "produced_m3": 79028,
    "turbid_m3": 88866,
    "alum_liquid": 5.051,
    "chlorine_gas": 0.603,
    "electricity_kwh": 22872,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8893,
    "kwh_per_m3": 0.28942,
    "alum_per_m3": 0.06391,
    "chlorine_per_m3": 763e-5,
    "created_by": "u0",
    "created_at": "2026-03-09T20:00:00"
  },
  {
    "id": "im68",
    "station_id": "imbaba",
    "date": "2026-03-10",
    "produced_m3": 80847,
    "turbid_m3": 84934,
    "alum_liquid": 5.104,
    "chlorine_gas": 0.65,
    "electricity_kwh": 23138,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9519,
    "kwh_per_m3": 0.28619,
    "alum_per_m3": 0.06313,
    "chlorine_per_m3": 804e-5,
    "created_by": "u0",
    "created_at": "2026-03-10T20:00:00"
  },
  {
    "id": "im69",
    "station_id": "imbaba",
    "date": "2026-03-11",
    "produced_m3": 81537,
    "turbid_m3": 81956,
    "alum_liquid": 4.603,
    "chlorine_gas": 0.631,
    "electricity_kwh": 20953,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9949,
    "kwh_per_m3": 0.25698,
    "alum_per_m3": 0.05645,
    "chlorine_per_m3": 774e-5,
    "created_by": "u0",
    "created_at": "2026-03-11T20:00:00"
  },
  {
    "id": "im70",
    "station_id": "imbaba",
    "date": "2026-03-12",
    "produced_m3": 83173,
    "turbid_m3": 94289,
    "alum_liquid": 4.688,
    "chlorine_gas": 0.644,
    "electricity_kwh": 21640,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8821,
    "kwh_per_m3": 0.26018,
    "alum_per_m3": 0.05636,
    "chlorine_per_m3": 774e-5,
    "created_by": "u0",
    "created_at": "2026-03-12T20:00:00"
  },
  {
    "id": "im71",
    "station_id": "imbaba",
    "date": "2026-03-13",
    "produced_m3": 81332,
    "turbid_m3": 87272,
    "alum_liquid": 4.57,
    "chlorine_gas": 0.562,
    "electricity_kwh": 22102,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9319,
    "kwh_per_m3": 0.27175,
    "alum_per_m3": 0.05619,
    "chlorine_per_m3": 691e-5,
    "created_by": "u0",
    "created_at": "2026-03-13T20:00:00"
  },
  {
    "id": "im72",
    "station_id": "imbaba",
    "date": "2026-03-14",
    "produced_m3": 78252,
    "turbid_m3": 82431,
    "alum_liquid": 5.058,
    "chlorine_gas": 0.638,
    "electricity_kwh": 20829,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9493,
    "kwh_per_m3": 0.26618,
    "alum_per_m3": 0.06464,
    "chlorine_per_m3": 815e-5,
    "created_by": "u0",
    "created_at": "2026-03-14T20:00:00"
  },
  {
    "id": "im73",
    "station_id": "imbaba",
    "date": "2026-03-15",
    "produced_m3": 80915,
    "turbid_m3": 85837,
    "alum_liquid": 5.149,
    "chlorine_gas": 0.655,
    "electricity_kwh": 22132,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9427,
    "kwh_per_m3": 0.27352,
    "alum_per_m3": 0.06363,
    "chlorine_per_m3": 809e-5,
    "created_by": "u0",
    "created_at": "2026-03-15T20:00:00"
  },
  {
    "id": "im74",
    "station_id": "imbaba",
    "date": "2026-03-16",
    "produced_m3": 71795,
    "turbid_m3": 95414,
    "alum_liquid": 4.947,
    "chlorine_gas": 0.59,
    "electricity_kwh": 22200,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.7525,
    "kwh_per_m3": 0.30921,
    "alum_per_m3": 0.0689,
    "chlorine_per_m3": 822e-5,
    "created_by": "u0",
    "created_at": "2026-03-16T20:00:00"
  },
  {
    "id": "im75",
    "station_id": "imbaba",
    "date": "2026-03-17",
    "produced_m3": 82049,
    "turbid_m3": 83312,
    "alum_liquid": 4.909,
    "chlorine_gas": 0.649,
    "electricity_kwh": 21714,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9848,
    "kwh_per_m3": 0.26465,
    "alum_per_m3": 0.05983,
    "chlorine_per_m3": 791e-5,
    "created_by": "u0",
    "created_at": "2026-03-17T20:00:00"
  },
  {
    "id": "im76",
    "station_id": "imbaba",
    "date": "2026-03-18",
    "produced_m3": 73149,
    "turbid_m3": 93166,
    "alum_liquid": 4.601,
    "chlorine_gas": 0.6,
    "electricity_kwh": 21199,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7851,
    "kwh_per_m3": 0.28981,
    "alum_per_m3": 0.0629,
    "chlorine_per_m3": 82e-4,
    "created_by": "u0",
    "created_at": "2026-03-18T20:00:00"
  },
  {
    "id": "im77",
    "station_id": "imbaba",
    "date": "2026-03-19",
    "produced_m3": 83556,
    "turbid_m3": 83834,
    "alum_liquid": 5.154,
    "chlorine_gas": 0.571,
    "electricity_kwh": 20811,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9967,
    "kwh_per_m3": 0.24907,
    "alum_per_m3": 0.06168,
    "chlorine_per_m3": 683e-5,
    "created_by": "u0",
    "created_at": "2026-03-19T20:00:00"
  },
  {
    "id": "im78",
    "station_id": "imbaba",
    "date": "2026-03-20",
    "produced_m3": 76928,
    "turbid_m3": 82797,
    "alum_liquid": 4.629,
    "chlorine_gas": 0.592,
    "electricity_kwh": 22575,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9291,
    "kwh_per_m3": 0.29346,
    "alum_per_m3": 0.06017,
    "chlorine_per_m3": 77e-4,
    "created_by": "u0",
    "created_at": "2026-03-20T20:00:00"
  },
  {
    "id": "im79",
    "station_id": "imbaba",
    "date": "2026-03-21",
    "produced_m3": 79480,
    "turbid_m3": 83389,
    "alum_liquid": 5.267,
    "chlorine_gas": 0.563,
    "electricity_kwh": 22711,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9531,
    "kwh_per_m3": 0.28574,
    "alum_per_m3": 0.06627,
    "chlorine_per_m3": 708e-5,
    "created_by": "u0",
    "created_at": "2026-03-21T20:00:00"
  },
  {
    "id": "im80",
    "station_id": "imbaba",
    "date": "2026-03-22",
    "produced_m3": 77160,
    "turbid_m3": 96049,
    "alum_liquid": 4.963,
    "chlorine_gas": 0.646,
    "electricity_kwh": 21094,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8033,
    "kwh_per_m3": 0.27338,
    "alum_per_m3": 0.06432,
    "chlorine_per_m3": 837e-5,
    "created_by": "u0",
    "created_at": "2026-03-22T20:00:00"
  },
  {
    "id": "im81",
    "station_id": "imbaba",
    "date": "2026-03-23",
    "produced_m3": 83638,
    "turbid_m3": 88477,
    "alum_liquid": 5.22,
    "chlorine_gas": 0.604,
    "electricity_kwh": 23374,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9453,
    "kwh_per_m3": 0.27947,
    "alum_per_m3": 0.06241,
    "chlorine_per_m3": 722e-5,
    "created_by": "u0",
    "created_at": "2026-03-23T20:00:00"
  },
  {
    "id": "im82",
    "station_id": "imbaba",
    "date": "2026-03-24",
    "produced_m3": 78788,
    "turbid_m3": 94875,
    "alum_liquid": 5.255,
    "chlorine_gas": 0.573,
    "electricity_kwh": 22651,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8304,
    "kwh_per_m3": 0.28749,
    "alum_per_m3": 0.0667,
    "chlorine_per_m3": 727e-5,
    "created_by": "u0",
    "created_at": "2026-03-24T20:00:00"
  },
  {
    "id": "im83",
    "station_id": "imbaba",
    "date": "2026-03-25",
    "produced_m3": 81824,
    "turbid_m3": 87625,
    "alum_liquid": 4.736,
    "chlorine_gas": 0.603,
    "electricity_kwh": 20673,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9338,
    "kwh_per_m3": 0.25265,
    "alum_per_m3": 0.05788,
    "chlorine_per_m3": 737e-5,
    "created_by": "u0",
    "created_at": "2026-03-25T20:00:00"
  },
  {
    "id": "im84",
    "station_id": "imbaba",
    "date": "2026-03-26",
    "produced_m3": 75523,
    "turbid_m3": 89378,
    "alum_liquid": 4.814,
    "chlorine_gas": 0.646,
    "electricity_kwh": 23341,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.845,
    "kwh_per_m3": 0.30906,
    "alum_per_m3": 0.06374,
    "chlorine_per_m3": 855e-5,
    "created_by": "u0",
    "created_at": "2026-03-26T20:00:00"
  },
  {
    "id": "im85",
    "station_id": "imbaba",
    "date": "2026-03-27",
    "produced_m3": 75664,
    "turbid_m3": 82063,
    "alum_liquid": 4.94,
    "chlorine_gas": 0.575,
    "electricity_kwh": 23698,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.922,
    "kwh_per_m3": 0.3132,
    "alum_per_m3": 0.06529,
    "chlorine_per_m3": 76e-4,
    "created_by": "u0",
    "created_at": "2026-03-27T20:00:00"
  },
  {
    "id": "im86",
    "station_id": "imbaba",
    "date": "2026-03-28",
    "produced_m3": 73627,
    "turbid_m3": 86928,
    "alum_liquid": 4.896,
    "chlorine_gas": 0.637,
    "electricity_kwh": 23210,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.847,
    "kwh_per_m3": 0.31524,
    "alum_per_m3": 0.0665,
    "chlorine_per_m3": 865e-5,
    "created_by": "u0",
    "created_at": "2026-03-28T20:00:00"
  },
  {
    "id": "im87",
    "station_id": "imbaba",
    "date": "2026-03-29",
    "produced_m3": 75409,
    "turbid_m3": 95786,
    "alum_liquid": 5.136,
    "chlorine_gas": 0.654,
    "electricity_kwh": 21570,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.7873,
    "kwh_per_m3": 0.28604,
    "alum_per_m3": 0.06811,
    "chlorine_per_m3": 867e-5,
    "created_by": "u0",
    "created_at": "2026-03-29T20:00:00"
  },
  {
    "id": "im88",
    "station_id": "imbaba",
    "date": "2026-03-30",
    "produced_m3": 83350,
    "turbid_m3": 84309,
    "alum_liquid": 4.75,
    "chlorine_gas": 0.572,
    "electricity_kwh": 20844,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9886,
    "kwh_per_m3": 0.25008,
    "alum_per_m3": 0.05699,
    "chlorine_per_m3": 686e-5,
    "created_by": "u0",
    "created_at": "2026-03-30T20:00:00"
  },
  {
    "id": "im89",
    "station_id": "imbaba",
    "date": "2026-03-31",
    "produced_m3": 74824,
    "turbid_m3": 83937,
    "alum_liquid": 5.237,
    "chlorine_gas": 0.566,
    "electricity_kwh": 20466,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8914,
    "kwh_per_m3": 0.27352,
    "alum_per_m3": 0.06999,
    "chlorine_per_m3": 756e-5,
    "created_by": "u0",
    "created_at": "2026-03-31T20:00:00"
  },
  {
    "id": "im90",
    "station_id": "imbaba",
    "date": "2026-04-01",
    "produced_m3": 81434,
    "turbid_m3": 88043,
    "alum_liquid": 4.569,
    "chlorine_gas": 0.601,
    "electricity_kwh": 23350,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9249,
    "kwh_per_m3": 0.28674,
    "alum_per_m3": 0.05611,
    "chlorine_per_m3": 738e-5,
    "created_by": "u0",
    "created_at": "2026-04-01T20:00:00"
  },
  {
    "id": "im91",
    "station_id": "imbaba",
    "date": "2026-04-02",
    "produced_m3": 83836,
    "turbid_m3": 93741,
    "alum_liquid": 4.821,
    "chlorine_gas": 0.642,
    "electricity_kwh": 20635,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8943,
    "kwh_per_m3": 0.24614,
    "alum_per_m3": 0.05751,
    "chlorine_per_m3": 766e-5,
    "created_by": "u0",
    "created_at": "2026-04-02T20:00:00"
  },
  {
    "id": "im92",
    "station_id": "imbaba",
    "date": "2026-04-03",
    "produced_m3": 79854,
    "turbid_m3": 90110,
    "alum_liquid": 4.662,
    "chlorine_gas": 0.561,
    "electricity_kwh": 22648,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8862,
    "kwh_per_m3": 0.28362,
    "alum_per_m3": 0.05838,
    "chlorine_per_m3": 703e-5,
    "created_by": "u0",
    "created_at": "2026-04-03T20:00:00"
  },
  {
    "id": "im93",
    "station_id": "imbaba",
    "date": "2026-04-04",
    "produced_m3": 79213,
    "turbid_m3": 92252,
    "alum_liquid": 4.586,
    "chlorine_gas": 0.642,
    "electricity_kwh": 22630,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8587,
    "kwh_per_m3": 0.28569,
    "alum_per_m3": 0.05789,
    "chlorine_per_m3": 81e-4,
    "created_by": "u0",
    "created_at": "2026-04-04T20:00:00"
  },
  {
    "id": "im94",
    "station_id": "imbaba",
    "date": "2026-04-05",
    "produced_m3": 75956,
    "turbid_m3": 90644,
    "alum_liquid": 4.734,
    "chlorine_gas": 0.617,
    "electricity_kwh": 21841,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.838,
    "kwh_per_m3": 0.28755,
    "alum_per_m3": 0.06233,
    "chlorine_per_m3": 812e-5,
    "created_by": "u0",
    "created_at": "2026-04-05T20:00:00"
  },
  {
    "id": "im95",
    "station_id": "imbaba",
    "date": "2026-04-06",
    "produced_m3": 78941,
    "turbid_m3": 87678,
    "alum_liquid": 4.634,
    "chlorine_gas": 0.607,
    "electricity_kwh": 22921,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9004,
    "kwh_per_m3": 0.29036,
    "alum_per_m3": 0.0587,
    "chlorine_per_m3": 769e-5,
    "created_by": "u0",
    "created_at": "2026-04-06T20:00:00"
  },
  {
    "id": "im96",
    "station_id": "imbaba",
    "date": "2026-04-07",
    "produced_m3": 79478,
    "turbid_m3": 88510,
    "alum_liquid": 4.777,
    "chlorine_gas": 0.629,
    "electricity_kwh": 22623,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.898,
    "kwh_per_m3": 0.28464,
    "alum_per_m3": 0.0601,
    "chlorine_per_m3": 791e-5,
    "created_by": "u0",
    "created_at": "2026-04-07T20:00:00"
  },
  {
    "id": "im97",
    "station_id": "imbaba",
    "date": "2026-04-08",
    "produced_m3": 74398,
    "turbid_m3": 94127,
    "alum_liquid": 4.81,
    "chlorine_gas": 0.618,
    "electricity_kwh": 22069,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7904,
    "kwh_per_m3": 0.29663,
    "alum_per_m3": 0.06465,
    "chlorine_per_m3": 831e-5,
    "created_by": "u0",
    "created_at": "2026-04-08T20:00:00"
  },
  {
    "id": "im98",
    "station_id": "imbaba",
    "date": "2026-04-09",
    "produced_m3": 72693,
    "turbid_m3": 89731,
    "alum_liquid": 4.638,
    "chlorine_gas": 0.639,
    "electricity_kwh": 20326,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8101,
    "kwh_per_m3": 0.27961,
    "alum_per_m3": 0.0638,
    "chlorine_per_m3": 879e-5,
    "created_by": "u0",
    "created_at": "2026-04-09T20:00:00"
  },
  {
    "id": "im99",
    "station_id": "imbaba",
    "date": "2026-04-10",
    "produced_m3": 82371,
    "turbid_m3": 92619,
    "alum_liquid": 5.16,
    "chlorine_gas": 0.643,
    "electricity_kwh": 20711,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8894,
    "kwh_per_m3": 0.25144,
    "alum_per_m3": 0.06264,
    "chlorine_per_m3": 781e-5,
    "created_by": "u0",
    "created_at": "2026-04-10T20:00:00"
  },
  {
    "id": "im100",
    "station_id": "imbaba",
    "date": "2026-04-11",
    "produced_m3": 74440,
    "turbid_m3": 89949,
    "alum_liquid": 4.876,
    "chlorine_gas": 0.578,
    "electricity_kwh": 21997,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8276,
    "kwh_per_m3": 0.2955,
    "alum_per_m3": 0.0655,
    "chlorine_per_m3": 776e-5,
    "created_by": "u0",
    "created_at": "2026-04-11T20:00:00"
  },
  {
    "id": "im101",
    "station_id": "imbaba",
    "date": "2026-04-12",
    "produced_m3": 81438,
    "turbid_m3": 93946,
    "alum_liquid": 5.03,
    "chlorine_gas": 0.562,
    "electricity_kwh": 20681,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8669,
    "kwh_per_m3": 0.25395,
    "alum_per_m3": 0.06176,
    "chlorine_per_m3": 69e-4,
    "created_by": "u0",
    "created_at": "2026-04-12T20:00:00"
  },
  {
    "id": "im102",
    "station_id": "imbaba",
    "date": "2026-04-13",
    "produced_m3": 73645,
    "turbid_m3": 85677,
    "alum_liquid": 4.613,
    "chlorine_gas": 0.606,
    "electricity_kwh": 23273,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8596,
    "kwh_per_m3": 0.31602,
    "alum_per_m3": 0.06264,
    "chlorine_per_m3": 823e-5,
    "created_by": "u0",
    "created_at": "2026-04-13T20:00:00"
  },
  {
    "id": "im103",
    "station_id": "imbaba",
    "date": "2026-04-14",
    "produced_m3": 72586,
    "turbid_m3": 89973,
    "alum_liquid": 4.951,
    "chlorine_gas": 0.615,
    "electricity_kwh": 21209,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8068,
    "kwh_per_m3": 0.29219,
    "alum_per_m3": 0.06821,
    "chlorine_per_m3": 847e-5,
    "created_by": "u0",
    "created_at": "2026-04-14T20:00:00"
  },
  {
    "id": "im104",
    "station_id": "imbaba",
    "date": "2026-04-15",
    "produced_m3": 75844,
    "turbid_m3": 94791,
    "alum_liquid": 4.708,
    "chlorine_gas": 0.626,
    "electricity_kwh": 21210,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8001,
    "kwh_per_m3": 0.27965,
    "alum_per_m3": 0.06207,
    "chlorine_per_m3": 825e-5,
    "created_by": "u0",
    "created_at": "2026-04-15T20:00:00"
  },
  {
    "id": "im105",
    "station_id": "imbaba",
    "date": "2026-04-16",
    "produced_m3": 79576,
    "turbid_m3": 91725,
    "alum_liquid": 5.132,
    "chlorine_gas": 0.596,
    "electricity_kwh": 20626,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8675,
    "kwh_per_m3": 0.2592,
    "alum_per_m3": 0.06449,
    "chlorine_per_m3": 749e-5,
    "created_by": "u0",
    "created_at": "2026-04-16T20:00:00"
  },
  {
    "id": "im106",
    "station_id": "imbaba",
    "date": "2026-04-17",
    "produced_m3": 80889,
    "turbid_m3": 81890,
    "alum_liquid": 4.946,
    "chlorine_gas": 0.595,
    "electricity_kwh": 20249,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9878,
    "kwh_per_m3": 0.25033,
    "alum_per_m3": 0.06115,
    "chlorine_per_m3": 736e-5,
    "created_by": "u0",
    "created_at": "2026-04-17T20:00:00"
  },
  {
    "id": "im107",
    "station_id": "imbaba",
    "date": "2026-04-18",
    "produced_m3": 77167,
    "turbid_m3": 86444,
    "alum_liquid": 4.727,
    "chlorine_gas": 0.569,
    "electricity_kwh": 23547,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8927,
    "kwh_per_m3": 0.30514,
    "alum_per_m3": 0.06126,
    "chlorine_per_m3": 737e-5,
    "created_by": "u0",
    "created_at": "2026-04-18T20:00:00"
  },
  {
    "id": "im108",
    "station_id": "imbaba",
    "date": "2026-04-19",
    "produced_m3": 81492,
    "turbid_m3": 88380,
    "alum_liquid": 5.149,
    "chlorine_gas": 0.566,
    "electricity_kwh": 20337,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9221,
    "kwh_per_m3": 0.24956,
    "alum_per_m3": 0.06318,
    "chlorine_per_m3": 695e-5,
    "created_by": "u0",
    "created_at": "2026-04-19T20:00:00"
  },
  {
    "id": "im109",
    "station_id": "imbaba",
    "date": "2026-04-20",
    "produced_m3": 75228,
    "turbid_m3": 88699,
    "alum_liquid": 5.021,
    "chlorine_gas": 0.619,
    "electricity_kwh": 20306,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8481,
    "kwh_per_m3": 0.26993,
    "alum_per_m3": 0.06674,
    "chlorine_per_m3": 823e-5,
    "created_by": "u0",
    "created_at": "2026-04-20T20:00:00"
  },
  {
    "id": "im110",
    "station_id": "imbaba",
    "date": "2026-04-21",
    "produced_m3": 74408,
    "turbid_m3": 84601,
    "alum_liquid": 4.888,
    "chlorine_gas": 0.586,
    "electricity_kwh": 21274,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8795,
    "kwh_per_m3": 0.28591,
    "alum_per_m3": 0.06569,
    "chlorine_per_m3": 788e-5,
    "created_by": "u0",
    "created_at": "2026-04-21T20:00:00"
  },
  {
    "id": "im111",
    "station_id": "imbaba",
    "date": "2026-04-22",
    "produced_m3": 83121,
    "turbid_m3": 86533,
    "alum_liquid": 4.835,
    "chlorine_gas": 0.65,
    "electricity_kwh": 22902,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.9606,
    "kwh_per_m3": 0.27553,
    "alum_per_m3": 0.05817,
    "chlorine_per_m3": 782e-5,
    "created_by": "u0",
    "created_at": "2026-04-22T20:00:00"
  },
  {
    "id": "im112",
    "station_id": "imbaba",
    "date": "2026-04-23",
    "produced_m3": 79628,
    "turbid_m3": 83778,
    "alum_liquid": 4.517,
    "chlorine_gas": 0.584,
    "electricity_kwh": 21545,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9505,
    "kwh_per_m3": 0.27057,
    "alum_per_m3": 0.05673,
    "chlorine_per_m3": 733e-5,
    "created_by": "u0",
    "created_at": "2026-04-23T20:00:00"
  },
  {
    "id": "im113",
    "station_id": "imbaba",
    "date": "2026-04-24",
    "produced_m3": 75188,
    "turbid_m3": 87888,
    "alum_liquid": 5.201,
    "chlorine_gas": 0.591,
    "electricity_kwh": 21834,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8555,
    "kwh_per_m3": 0.29039,
    "alum_per_m3": 0.06917,
    "chlorine_per_m3": 786e-5,
    "created_by": "u0",
    "created_at": "2026-04-24T20:00:00"
  },
  {
    "id": "im114",
    "station_id": "imbaba",
    "date": "2026-04-25",
    "produced_m3": 81235,
    "turbid_m3": 95383,
    "alum_liquid": 4.641,
    "chlorine_gas": 0.571,
    "electricity_kwh": 22324,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8517,
    "kwh_per_m3": 0.27481,
    "alum_per_m3": 0.05713,
    "chlorine_per_m3": 703e-5,
    "created_by": "u0",
    "created_at": "2026-04-25T20:00:00"
  },
  {
    "id": "im115",
    "station_id": "imbaba",
    "date": "2026-04-26",
    "produced_m3": 72400,
    "turbid_m3": 94807,
    "alum_liquid": 5.034,
    "chlorine_gas": 0.623,
    "electricity_kwh": 22017,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.7637,
    "kwh_per_m3": 0.3041,
    "alum_per_m3": 0.06953,
    "chlorine_per_m3": 86e-4,
    "created_by": "u0",
    "created_at": "2026-04-26T20:00:00"
  },
  {
    "id": "im116",
    "station_id": "imbaba",
    "date": "2026-04-27",
    "produced_m3": 76878,
    "turbid_m3": 88834,
    "alum_liquid": 4.844,
    "chlorine_gas": 0.612,
    "electricity_kwh": 22653,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8654,
    "kwh_per_m3": 0.29466,
    "alum_per_m3": 0.06301,
    "chlorine_per_m3": 796e-5,
    "created_by": "u0",
    "created_at": "2026-04-27T20:00:00"
  },
  {
    "id": "im117",
    "station_id": "imbaba",
    "date": "2026-04-28",
    "produced_m3": 80615,
    "turbid_m3": 92249,
    "alum_liquid": 4.699,
    "chlorine_gas": 0.65,
    "electricity_kwh": 20294,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8739,
    "kwh_per_m3": 0.25174,
    "alum_per_m3": 0.05829,
    "chlorine_per_m3": 806e-5,
    "created_by": "u0",
    "created_at": "2026-04-28T20:00:00"
  },
  {
    "id": "im118",
    "station_id": "imbaba",
    "date": "2026-04-29",
    "produced_m3": 80898,
    "turbid_m3": 83987,
    "alum_liquid": 5.14,
    "chlorine_gas": 0.61,
    "electricity_kwh": 21397,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.9632,
    "kwh_per_m3": 0.26449,
    "alum_per_m3": 0.06354,
    "chlorine_per_m3": 754e-5,
    "created_by": "u0",
    "created_at": "2026-04-29T20:00:00"
  },
  {
    "id": "im119",
    "station_id": "imbaba",
    "date": "2026-04-30",
    "produced_m3": 71794,
    "turbid_m3": 90636,
    "alum_liquid": 4.701,
    "chlorine_gas": 0.651,
    "electricity_kwh": 20395,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.7921,
    "kwh_per_m3": 0.28408,
    "alum_per_m3": 0.06548,
    "chlorine_per_m3": 907e-5,
    "created_by": "u0",
    "created_at": "2026-04-30T20:00:00"
  },
  {
    "id": "im120",
    "station_id": "imbaba",
    "date": "2026-05-01",
    "produced_m3": 82097,
    "turbid_m3": 86328,
    "alum_liquid": 4.814,
    "chlorine_gas": 0.636,
    "electricity_kwh": 23491,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.951,
    "kwh_per_m3": 0.28614,
    "alum_per_m3": 0.05864,
    "chlorine_per_m3": 775e-5,
    "created_by": "u0",
    "created_at": "2026-05-01T20:00:00"
  },
  {
    "id": "im121",
    "station_id": "imbaba",
    "date": "2026-05-02",
    "produced_m3": 76641,
    "turbid_m3": 91450,
    "alum_liquid": 4.875,
    "chlorine_gas": 0.594,
    "electricity_kwh": 21295,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8381,
    "kwh_per_m3": 0.27785,
    "alum_per_m3": 0.06361,
    "chlorine_per_m3": 775e-5,
    "created_by": "u0",
    "created_at": "2026-05-02T20:00:00"
  },
  {
    "id": "im122",
    "station_id": "imbaba",
    "date": "2026-05-03",
    "produced_m3": 76576,
    "turbid_m3": 95595,
    "alum_liquid": 4.744,
    "chlorine_gas": 0.631,
    "electricity_kwh": 21417,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.801,
    "kwh_per_m3": 0.27968,
    "alum_per_m3": 0.06195,
    "chlorine_per_m3": 824e-5,
    "created_by": "u0",
    "created_at": "2026-05-03T20:00:00"
  },
  {
    "id": "im123",
    "station_id": "imbaba",
    "date": "2026-05-04",
    "produced_m3": 73173,
    "turbid_m3": 93521,
    "alum_liquid": 4.697,
    "chlorine_gas": 0.632,
    "electricity_kwh": 21178,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.7824,
    "kwh_per_m3": 0.28942,
    "alum_per_m3": 0.06419,
    "chlorine_per_m3": 864e-5,
    "created_by": "u0",
    "created_at": "2026-05-04T20:00:00"
  },
  {
    "id": "im124",
    "station_id": "imbaba",
    "date": "2026-05-05",
    "produced_m3": 81058,
    "turbid_m3": 90653,
    "alum_liquid": 5.012,
    "chlorine_gas": 0.592,
    "electricity_kwh": 21683,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8942,
    "kwh_per_m3": 0.2675,
    "alum_per_m3": 0.06183,
    "chlorine_per_m3": 73e-4,
    "created_by": "u0",
    "created_at": "2026-05-05T20:00:00"
  },
  {
    "id": "im125",
    "station_id": "imbaba",
    "date": "2026-05-06",
    "produced_m3": 77348,
    "turbid_m3": 95065,
    "alum_liquid": 4.727,
    "chlorine_gas": 0.613,
    "electricity_kwh": 22529,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.8136,
    "kwh_per_m3": 0.29127,
    "alum_per_m3": 0.06111,
    "chlorine_per_m3": 793e-5,
    "created_by": "u0",
    "created_at": "2026-05-06T20:00:00"
  },
  {
    "id": "im126",
    "station_id": "imbaba",
    "date": "2026-05-07",
    "produced_m3": 76085,
    "turbid_m3": 90835,
    "alum_liquid": 4.85,
    "chlorine_gas": 0.639,
    "electricity_kwh": 22556,
    "flow_meters_ok": true,
    "shift_crew": "\u0623\u062D\u0645\u062F \u0631\u0645\u0636\u0627\u0646 + \u0633\u0639\u064A\u062F \u0639\u0644\u064A",
    "efficiency": 0.8376,
    "kwh_per_m3": 0.29646,
    "alum_per_m3": 0.06374,
    "chlorine_per_m3": 84e-4,
    "created_by": "u0",
    "created_at": "2026-05-07T20:00:00"
  },
  {
    "id": "im127",
    "station_id": "imbaba",
    "date": "2026-05-08",
    "produced_m3": 80594,
    "turbid_m3": 95137,
    "alum_liquid": 4.763,
    "chlorine_gas": 0.633,
    "electricity_kwh": 22777,
    "flow_meters_ok": true,
    "shift_crew": "\u0643\u0631\u064A\u0645 \u0645\u062D\u0645\u0648\u062F + \u0648\u0644\u064A\u062F \u0641\u062A\u062D\u064A",
    "efficiency": 0.8471,
    "kwh_per_m3": 0.28261,
    "alum_per_m3": 0.0591,
    "chlorine_per_m3": 785e-5,
    "created_by": "u0",
    "created_at": "2026-05-08T20:00:00"
  },
  {
    "id": "im128",
    "station_id": "imbaba",
    "date": "2026-05-09",
    "produced_m3": 83539,
    "turbid_m3": 86990,
    "alum_liquid": 4.552,
    "chlorine_gas": 0.612,
    "electricity_kwh": 22358,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u062F \u0639\u0627\u0637\u0641 + \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0633\u0639\u062F",
    "efficiency": 0.9603,
    "kwh_per_m3": 0.26764,
    "alum_per_m3": 0.05449,
    "chlorine_per_m3": 733e-5,
    "created_by": "u0",
    "created_at": "2026-05-09T20:00:00"
  },
  {
    "id": "dh0",
    "station_id": "dahab",
    "date": "2026-01-01",
    "produced_m3": 53902,
    "turbid_m3": 55951,
    "alum_liquid": 2.934,
    "chlorine_gas": 0.35,
    "electricity_kwh": 16657,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9634,
    "kwh_per_m3": 0.30902,
    "alum_per_m3": 0.05443,
    "chlorine_per_m3": 649e-5,
    "created_by": "u0",
    "created_at": "2026-01-01T20:00:00"
  },
  {
    "id": "dh1",
    "station_id": "dahab",
    "date": "2026-01-02",
    "produced_m3": 52617,
    "turbid_m3": 55852,
    "alum_liquid": 2.778,
    "chlorine_gas": 0.363,
    "electricity_kwh": 17128,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9421,
    "kwh_per_m3": 0.32552,
    "alum_per_m3": 0.0528,
    "chlorine_per_m3": 69e-4,
    "created_by": "u0",
    "created_at": "2026-01-02T20:00:00"
  },
  {
    "id": "dh2",
    "station_id": "dahab",
    "date": "2026-01-03",
    "produced_m3": 53015,
    "turbid_m3": 58292,
    "alum_liquid": 3.008,
    "chlorine_gas": 0.353,
    "electricity_kwh": 16578,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9095,
    "kwh_per_m3": 0.3127,
    "alum_per_m3": 0.05674,
    "chlorine_per_m3": 666e-5,
    "created_by": "u0",
    "created_at": "2026-01-03T20:00:00"
  },
  {
    "id": "dh3",
    "station_id": "dahab",
    "date": "2026-01-04",
    "produced_m3": 54238,
    "turbid_m3": 57697,
    "alum_liquid": 2.756,
    "chlorine_gas": 0.386,
    "electricity_kwh": 16581,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.94,
    "kwh_per_m3": 0.30571,
    "alum_per_m3": 0.05081,
    "chlorine_per_m3": 712e-5,
    "created_by": "u0",
    "created_at": "2026-01-04T20:00:00"
  },
  {
    "id": "dh4",
    "station_id": "dahab",
    "date": "2026-01-05",
    "produced_m3": 53861,
    "turbid_m3": 58574,
    "alum_liquid": 2.889,
    "chlorine_gas": 0.409,
    "electricity_kwh": 17172,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9195,
    "kwh_per_m3": 0.31882,
    "alum_per_m3": 0.05364,
    "chlorine_per_m3": 759e-5,
    "created_by": "u0",
    "created_at": "2026-01-05T20:00:00"
  },
  {
    "id": "dh5",
    "station_id": "dahab",
    "date": "2026-01-06",
    "produced_m3": 49450,
    "turbid_m3": 61297,
    "alum_liquid": 2.867,
    "chlorine_gas": 0.379,
    "electricity_kwh": 17019,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8067,
    "kwh_per_m3": 0.34417,
    "alum_per_m3": 0.05798,
    "chlorine_per_m3": 766e-5,
    "created_by": "u0",
    "created_at": "2026-01-06T20:00:00"
  },
  {
    "id": "dh6",
    "station_id": "dahab",
    "date": "2026-01-07",
    "produced_m3": 53946,
    "turbid_m3": 61334,
    "alum_liquid": 2.775,
    "chlorine_gas": 0.388,
    "electricity_kwh": 15299,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8795,
    "kwh_per_m3": 0.2836,
    "alum_per_m3": 0.05144,
    "chlorine_per_m3": 719e-5,
    "created_by": "u0",
    "created_at": "2026-01-07T20:00:00"
  },
  {
    "id": "dh7",
    "station_id": "dahab",
    "date": "2026-01-08",
    "produced_m3": 54566,
    "turbid_m3": 61649,
    "alum_liquid": 2.69,
    "chlorine_gas": 0.376,
    "electricity_kwh": 16117,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8851,
    "kwh_per_m3": 0.29537,
    "alum_per_m3": 0.0493,
    "chlorine_per_m3": 689e-5,
    "created_by": "u0",
    "created_at": "2026-01-08T20:00:00"
  },
  {
    "id": "dh8",
    "station_id": "dahab",
    "date": "2026-01-09",
    "produced_m3": 57217,
    "turbid_m3": 60277,
    "alum_liquid": 2.846,
    "chlorine_gas": 0.387,
    "electricity_kwh": 16242,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9492,
    "kwh_per_m3": 0.28387,
    "alum_per_m3": 0.04974,
    "chlorine_per_m3": 676e-5,
    "created_by": "u0",
    "created_at": "2026-01-09T20:00:00"
  },
  {
    "id": "dh9",
    "station_id": "dahab",
    "date": "2026-01-10",
    "produced_m3": 48951,
    "turbid_m3": 59754,
    "alum_liquid": 2.849,
    "chlorine_gas": 0.405,
    "electricity_kwh": 16951,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8192,
    "kwh_per_m3": 0.34629,
    "alum_per_m3": 0.0582,
    "chlorine_per_m3": 827e-5,
    "created_by": "u0",
    "created_at": "2026-01-10T20:00:00"
  },
  {
    "id": "dh10",
    "station_id": "dahab",
    "date": "2026-01-11",
    "produced_m3": 54472,
    "turbid_m3": 59220,
    "alum_liquid": 2.69,
    "chlorine_gas": 0.353,
    "electricity_kwh": 16585,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9198,
    "kwh_per_m3": 0.30447,
    "alum_per_m3": 0.04938,
    "chlorine_per_m3": 648e-5,
    "created_by": "u0",
    "created_at": "2026-01-11T20:00:00"
  },
  {
    "id": "dh11",
    "station_id": "dahab",
    "date": "2026-01-12",
    "produced_m3": 54228,
    "turbid_m3": 56405,
    "alum_liquid": 2.945,
    "chlorine_gas": 0.401,
    "electricity_kwh": 16224,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9614,
    "kwh_per_m3": 0.29918,
    "alum_per_m3": 0.05431,
    "chlorine_per_m3": 739e-5,
    "created_by": "u0",
    "created_at": "2026-01-12T20:00:00"
  },
  {
    "id": "dh12",
    "station_id": "dahab",
    "date": "2026-01-13",
    "produced_m3": 49661,
    "turbid_m3": 57041,
    "alum_liquid": 2.94,
    "chlorine_gas": 0.35,
    "electricity_kwh": 15437,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8706,
    "kwh_per_m3": 0.31085,
    "alum_per_m3": 0.0592,
    "chlorine_per_m3": 705e-5,
    "created_by": "u0",
    "created_at": "2026-01-13T20:00:00"
  },
  {
    "id": "dh13",
    "station_id": "dahab",
    "date": "2026-01-14",
    "produced_m3": 50566,
    "turbid_m3": 53892,
    "alum_liquid": 2.703,
    "chlorine_gas": 0.351,
    "electricity_kwh": 16523,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9383,
    "kwh_per_m3": 0.32676,
    "alum_per_m3": 0.05345,
    "chlorine_per_m3": 694e-5,
    "created_by": "u0",
    "created_at": "2026-01-14T20:00:00"
  },
  {
    "id": "dh14",
    "station_id": "dahab",
    "date": "2026-01-15",
    "produced_m3": 52441,
    "turbid_m3": 59162,
    "alum_liquid": 2.881,
    "chlorine_gas": 0.409,
    "electricity_kwh": 16938,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8864,
    "kwh_per_m3": 0.32299,
    "alum_per_m3": 0.05494,
    "chlorine_per_m3": 78e-4,
    "created_by": "u0",
    "created_at": "2026-01-15T20:00:00"
  },
  {
    "id": "dh15",
    "station_id": "dahab",
    "date": "2026-01-16",
    "produced_m3": 49055,
    "turbid_m3": 56729,
    "alum_liquid": 2.767,
    "chlorine_gas": 0.353,
    "electricity_kwh": 16880,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8647,
    "kwh_per_m3": 0.3441,
    "alum_per_m3": 0.05641,
    "chlorine_per_m3": 72e-4,
    "created_by": "u0",
    "created_at": "2026-01-16T20:00:00"
  },
  {
    "id": "dh16",
    "station_id": "dahab",
    "date": "2026-01-17",
    "produced_m3": 55713,
    "turbid_m3": 59956,
    "alum_liquid": 2.84,
    "chlorine_gas": 0.375,
    "electricity_kwh": 15827,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9292,
    "kwh_per_m3": 0.28408,
    "alum_per_m3": 0.05098,
    "chlorine_per_m3": 673e-5,
    "created_by": "u0",
    "created_at": "2026-01-17T20:00:00"
  },
  {
    "id": "dh17",
    "station_id": "dahab",
    "date": "2026-01-18",
    "produced_m3": 56531,
    "turbid_m3": 55199,
    "alum_liquid": 2.991,
    "chlorine_gas": 0.359,
    "electricity_kwh": 17226,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 1.0241,
    "kwh_per_m3": 0.30472,
    "alum_per_m3": 0.05291,
    "chlorine_per_m3": 635e-5,
    "created_by": "u0",
    "created_at": "2026-01-18T20:00:00"
  },
  {
    "id": "dh18",
    "station_id": "dahab",
    "date": "2026-01-19",
    "produced_m3": 55794,
    "turbid_m3": 55386,
    "alum_liquid": 2.994,
    "chlorine_gas": 0.375,
    "electricity_kwh": 16162,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 1.0074,
    "kwh_per_m3": 0.28967,
    "alum_per_m3": 0.05366,
    "chlorine_per_m3": 672e-5,
    "created_by": "u0",
    "created_at": "2026-01-19T20:00:00"
  },
  {
    "id": "dh19",
    "station_id": "dahab",
    "date": "2026-01-20",
    "produced_m3": 49810,
    "turbid_m3": 61052,
    "alum_liquid": 2.686,
    "chlorine_gas": 0.36,
    "electricity_kwh": 17291,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8159,
    "kwh_per_m3": 0.34714,
    "alum_per_m3": 0.05392,
    "chlorine_per_m3": 723e-5,
    "created_by": "u0",
    "created_at": "2026-01-20T20:00:00"
  },
  {
    "id": "dh20",
    "station_id": "dahab",
    "date": "2026-01-21",
    "produced_m3": 53197,
    "turbid_m3": 55735,
    "alum_liquid": 2.714,
    "chlorine_gas": 0.363,
    "electricity_kwh": 15912,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9545,
    "kwh_per_m3": 0.29911,
    "alum_per_m3": 0.05102,
    "chlorine_per_m3": 682e-5,
    "created_by": "u0",
    "created_at": "2026-01-21T20:00:00"
  },
  {
    "id": "dh21",
    "station_id": "dahab",
    "date": "2026-01-22",
    "produced_m3": 50908,
    "turbid_m3": 59161,
    "alum_liquid": 3.115,
    "chlorine_gas": 0.395,
    "electricity_kwh": 17345,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8605,
    "kwh_per_m3": 0.34071,
    "alum_per_m3": 0.06119,
    "chlorine_per_m3": 776e-5,
    "created_by": "u0",
    "created_at": "2026-01-22T20:00:00"
  },
  {
    "id": "dh22",
    "station_id": "dahab",
    "date": "2026-01-23",
    "produced_m3": 51331,
    "turbid_m3": 62371,
    "alum_liquid": 3.127,
    "chlorine_gas": 0.383,
    "electricity_kwh": 16920,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.823,
    "kwh_per_m3": 0.32963,
    "alum_per_m3": 0.06092,
    "chlorine_per_m3": 746e-5,
    "created_by": "u0",
    "created_at": "2026-01-23T20:00:00"
  },
  {
    "id": "dh23",
    "station_id": "dahab",
    "date": "2026-01-24",
    "produced_m3": 57173,
    "turbid_m3": 60946,
    "alum_liquid": 2.982,
    "chlorine_gas": 0.406,
    "electricity_kwh": 15475,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9381,
    "kwh_per_m3": 0.27067,
    "alum_per_m3": 0.05216,
    "chlorine_per_m3": 71e-4,
    "created_by": "u0",
    "created_at": "2026-01-24T20:00:00"
  },
  {
    "id": "dh24",
    "station_id": "dahab",
    "date": "2026-01-25",
    "produced_m3": 51974,
    "turbid_m3": 57331,
    "alum_liquid": 2.96,
    "chlorine_gas": 0.409,
    "electricity_kwh": 17785,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9066,
    "kwh_per_m3": 0.34219,
    "alum_per_m3": 0.05695,
    "chlorine_per_m3": 787e-5,
    "created_by": "u0",
    "created_at": "2026-01-25T20:00:00"
  },
  {
    "id": "dh25",
    "station_id": "dahab",
    "date": "2026-01-26",
    "produced_m3": 49433,
    "turbid_m3": 58713,
    "alum_liquid": 2.855,
    "chlorine_gas": 0.356,
    "electricity_kwh": 15649,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8419,
    "kwh_per_m3": 0.31657,
    "alum_per_m3": 0.05775,
    "chlorine_per_m3": 72e-4,
    "created_by": "u0",
    "created_at": "2026-01-26T20:00:00"
  },
  {
    "id": "dh26",
    "station_id": "dahab",
    "date": "2026-01-27",
    "produced_m3": 49796,
    "turbid_m3": 60328,
    "alum_liquid": 2.917,
    "chlorine_gas": 0.352,
    "electricity_kwh": 17238,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8254,
    "kwh_per_m3": 0.34617,
    "alum_per_m3": 0.05858,
    "chlorine_per_m3": 707e-5,
    "created_by": "u0",
    "created_at": "2026-01-27T20:00:00"
  },
  {
    "id": "dh27",
    "station_id": "dahab",
    "date": "2026-01-28",
    "produced_m3": 53545,
    "turbid_m3": 56508,
    "alum_liquid": 2.88,
    "chlorine_gas": 0.4,
    "electricity_kwh": 16442,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9476,
    "kwh_per_m3": 0.30707,
    "alum_per_m3": 0.05379,
    "chlorine_per_m3": 747e-5,
    "created_by": "u0",
    "created_at": "2026-01-28T20:00:00"
  },
  {
    "id": "dh28",
    "station_id": "dahab",
    "date": "2026-01-29",
    "produced_m3": 52018,
    "turbid_m3": 56412,
    "alum_liquid": 2.758,
    "chlorine_gas": 0.363,
    "electricity_kwh": 15829,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9221,
    "kwh_per_m3": 0.3043,
    "alum_per_m3": 0.05302,
    "chlorine_per_m3": 698e-5,
    "created_by": "u0",
    "created_at": "2026-01-29T20:00:00"
  },
  {
    "id": "dh29",
    "station_id": "dahab",
    "date": "2026-01-30",
    "produced_m3": 51631,
    "turbid_m3": 56082,
    "alum_liquid": 2.731,
    "chlorine_gas": 0.374,
    "electricity_kwh": 17513,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9206,
    "kwh_per_m3": 0.3392,
    "alum_per_m3": 0.05289,
    "chlorine_per_m3": 724e-5,
    "created_by": "u0",
    "created_at": "2026-01-30T20:00:00"
  },
  {
    "id": "dh30",
    "station_id": "dahab",
    "date": "2026-01-31",
    "produced_m3": 55116,
    "turbid_m3": 57858,
    "alum_liquid": 2.679,
    "chlorine_gas": 0.386,
    "electricity_kwh": 16069,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9526,
    "kwh_per_m3": 0.29155,
    "alum_per_m3": 0.04861,
    "chlorine_per_m3": 7e-3,
    "created_by": "u0",
    "created_at": "2026-01-31T20:00:00"
  },
  {
    "id": "dh31",
    "station_id": "dahab",
    "date": "2026-02-01",
    "produced_m3": 53575,
    "turbid_m3": 62756,
    "alum_liquid": 2.953,
    "chlorine_gas": 0.391,
    "electricity_kwh": 15475,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8537,
    "kwh_per_m3": 0.28885,
    "alum_per_m3": 0.05512,
    "chlorine_per_m3": 73e-4,
    "created_by": "u0",
    "created_at": "2026-02-01T20:00:00"
  },
  {
    "id": "dh32",
    "station_id": "dahab",
    "date": "2026-02-02",
    "produced_m3": 52326,
    "turbid_m3": 58231,
    "alum_liquid": 2.87,
    "chlorine_gas": 0.353,
    "electricity_kwh": 16367,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8986,
    "kwh_per_m3": 0.31279,
    "alum_per_m3": 0.05485,
    "chlorine_per_m3": 675e-5,
    "created_by": "u0",
    "created_at": "2026-02-02T20:00:00"
  },
  {
    "id": "dh33",
    "station_id": "dahab",
    "date": "2026-02-03",
    "produced_m3": 50308,
    "turbid_m3": 57394,
    "alum_liquid": 3.012,
    "chlorine_gas": 0.383,
    "electricity_kwh": 17707,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8765,
    "kwh_per_m3": 0.35197,
    "alum_per_m3": 0.05987,
    "chlorine_per_m3": 761e-5,
    "created_by": "u0",
    "created_at": "2026-02-03T20:00:00"
  },
  {
    "id": "dh34",
    "station_id": "dahab",
    "date": "2026-02-04",
    "produced_m3": 53344,
    "turbid_m3": 60436,
    "alum_liquid": 2.876,
    "chlorine_gas": 0.381,
    "electricity_kwh": 16916,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8827,
    "kwh_per_m3": 0.31711,
    "alum_per_m3": 0.05391,
    "chlorine_per_m3": 714e-5,
    "created_by": "u0",
    "created_at": "2026-02-04T20:00:00"
  },
  {
    "id": "dh35",
    "station_id": "dahab",
    "date": "2026-02-05",
    "produced_m3": 55176,
    "turbid_m3": 61858,
    "alum_liquid": 3.054,
    "chlorine_gas": 0.353,
    "electricity_kwh": 17699,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.892,
    "kwh_per_m3": 0.32077,
    "alum_per_m3": 0.05535,
    "chlorine_per_m3": 64e-4,
    "created_by": "u0",
    "created_at": "2026-02-05T20:00:00"
  },
  {
    "id": "dh36",
    "station_id": "dahab",
    "date": "2026-02-06",
    "produced_m3": 49595,
    "turbid_m3": 54472,
    "alum_liquid": 3.035,
    "chlorine_gas": 0.387,
    "electricity_kwh": 15700,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9105,
    "kwh_per_m3": 0.31656,
    "alum_per_m3": 0.0612,
    "chlorine_per_m3": 78e-4,
    "created_by": "u0",
    "created_at": "2026-02-06T20:00:00"
  },
  {
    "id": "dh37",
    "station_id": "dahab",
    "date": "2026-02-07",
    "produced_m3": 50552,
    "turbid_m3": 61047,
    "alum_liquid": 3.125,
    "chlorine_gas": 0.402,
    "electricity_kwh": 15758,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8281,
    "kwh_per_m3": 0.31172,
    "alum_per_m3": 0.06182,
    "chlorine_per_m3": 795e-5,
    "created_by": "u0",
    "created_at": "2026-02-07T20:00:00"
  },
  {
    "id": "dh38",
    "station_id": "dahab",
    "date": "2026-02-08",
    "produced_m3": 56581,
    "turbid_m3": 63144,
    "alum_liquid": 2.727,
    "chlorine_gas": 0.383,
    "electricity_kwh": 16125,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8961,
    "kwh_per_m3": 0.28499,
    "alum_per_m3": 0.0482,
    "chlorine_per_m3": 677e-5,
    "created_by": "u0",
    "created_at": "2026-02-08T20:00:00"
  },
  {
    "id": "dh39",
    "station_id": "dahab",
    "date": "2026-02-09",
    "produced_m3": 55555,
    "turbid_m3": 56283,
    "alum_liquid": 2.859,
    "chlorine_gas": 0.366,
    "electricity_kwh": 16681,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9871,
    "kwh_per_m3": 0.30026,
    "alum_per_m3": 0.05146,
    "chlorine_per_m3": 659e-5,
    "created_by": "u0",
    "created_at": "2026-02-09T20:00:00"
  },
  {
    "id": "dh40",
    "station_id": "dahab",
    "date": "2026-02-10",
    "produced_m3": 55335,
    "turbid_m3": 57784,
    "alum_liquid": 2.784,
    "chlorine_gas": 0.366,
    "electricity_kwh": 16639,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9576,
    "kwh_per_m3": 0.3007,
    "alum_per_m3": 0.05031,
    "chlorine_per_m3": 661e-5,
    "created_by": "u0",
    "created_at": "2026-02-10T20:00:00"
  },
  {
    "id": "dh41",
    "station_id": "dahab",
    "date": "2026-02-11",
    "produced_m3": 51301,
    "turbid_m3": 59530,
    "alum_liquid": 3.024,
    "chlorine_gas": 0.409,
    "electricity_kwh": 17389,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8618,
    "kwh_per_m3": 0.33896,
    "alum_per_m3": 0.05895,
    "chlorine_per_m3": 797e-5,
    "created_by": "u0",
    "created_at": "2026-02-11T20:00:00"
  },
  {
    "id": "dh42",
    "station_id": "dahab",
    "date": "2026-02-12",
    "produced_m3": 53354,
    "turbid_m3": 55172,
    "alum_liquid": 3.085,
    "chlorine_gas": 0.37,
    "electricity_kwh": 17412,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.967,
    "kwh_per_m3": 0.32635,
    "alum_per_m3": 0.05782,
    "chlorine_per_m3": 693e-5,
    "created_by": "u0",
    "created_at": "2026-02-12T20:00:00"
  },
  {
    "id": "dh43",
    "station_id": "dahab",
    "date": "2026-02-13",
    "produced_m3": 54917,
    "turbid_m3": 62135,
    "alum_liquid": 2.674,
    "chlorine_gas": 0.378,
    "electricity_kwh": 16768,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8838,
    "kwh_per_m3": 0.30533,
    "alum_per_m3": 0.04869,
    "chlorine_per_m3": 688e-5,
    "created_by": "u0",
    "created_at": "2026-02-13T20:00:00"
  },
  {
    "id": "dh44",
    "station_id": "dahab",
    "date": "2026-02-14",
    "produced_m3": 52667,
    "turbid_m3": 60204,
    "alum_liquid": 3.102,
    "chlorine_gas": 0.364,
    "electricity_kwh": 17046,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8748,
    "kwh_per_m3": 0.32366,
    "alum_per_m3": 0.0589,
    "chlorine_per_m3": 691e-5,
    "created_by": "u0",
    "created_at": "2026-02-14T20:00:00"
  },
  {
    "id": "dh45",
    "station_id": "dahab",
    "date": "2026-02-15",
    "produced_m3": 52324,
    "turbid_m3": 61616,
    "alum_liquid": 2.781,
    "chlorine_gas": 0.394,
    "electricity_kwh": 16274,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8492,
    "kwh_per_m3": 0.31102,
    "alum_per_m3": 0.05315,
    "chlorine_per_m3": 753e-5,
    "created_by": "u0",
    "created_at": "2026-02-15T20:00:00"
  },
  {
    "id": "dh46",
    "station_id": "dahab",
    "date": "2026-02-16",
    "produced_m3": 53675,
    "turbid_m3": 62897,
    "alum_liquid": 3.114,
    "chlorine_gas": 0.37,
    "electricity_kwh": 16288,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8534,
    "kwh_per_m3": 0.30346,
    "alum_per_m3": 0.05802,
    "chlorine_per_m3": 689e-5,
    "created_by": "u0",
    "created_at": "2026-02-16T20:00:00"
  },
  {
    "id": "dh47",
    "station_id": "dahab",
    "date": "2026-02-17",
    "produced_m3": 50062,
    "turbid_m3": 56508,
    "alum_liquid": 2.726,
    "chlorine_gas": 0.371,
    "electricity_kwh": 15573,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8859,
    "kwh_per_m3": 0.31107,
    "alum_per_m3": 0.05445,
    "chlorine_per_m3": 741e-5,
    "created_by": "u0",
    "created_at": "2026-02-17T20:00:00"
  },
  {
    "id": "dh48",
    "station_id": "dahab",
    "date": "2026-02-18",
    "produced_m3": 54669,
    "turbid_m3": 62980,
    "alum_liquid": 2.76,
    "chlorine_gas": 0.396,
    "electricity_kwh": 16724,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.868,
    "kwh_per_m3": 0.30591,
    "alum_per_m3": 0.05049,
    "chlorine_per_m3": 724e-5,
    "created_by": "u0",
    "created_at": "2026-02-18T20:00:00"
  },
  {
    "id": "dh49",
    "station_id": "dahab",
    "date": "2026-02-19",
    "produced_m3": 55595,
    "turbid_m3": 59512,
    "alum_liquid": 2.762,
    "chlorine_gas": 0.35,
    "electricity_kwh": 17520,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9342,
    "kwh_per_m3": 0.31514,
    "alum_per_m3": 0.04968,
    "chlorine_per_m3": 63e-4,
    "created_by": "u0",
    "created_at": "2026-02-19T20:00:00"
  },
  {
    "id": "dh50",
    "station_id": "dahab",
    "date": "2026-02-20",
    "produced_m3": 55147,
    "turbid_m3": 56019,
    "alum_liquid": 2.675,
    "chlorine_gas": 0.377,
    "electricity_kwh": 16568,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9844,
    "kwh_per_m3": 0.30043,
    "alum_per_m3": 0.04851,
    "chlorine_per_m3": 684e-5,
    "created_by": "u0",
    "created_at": "2026-02-20T20:00:00"
  },
  {
    "id": "dh51",
    "station_id": "dahab",
    "date": "2026-02-21",
    "produced_m3": 51519,
    "turbid_m3": 57091,
    "alum_liquid": 2.707,
    "chlorine_gas": 0.366,
    "electricity_kwh": 15183,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9024,
    "kwh_per_m3": 0.29471,
    "alum_per_m3": 0.05254,
    "chlorine_per_m3": 71e-4,
    "created_by": "u0",
    "created_at": "2026-02-21T20:00:00"
  },
  {
    "id": "dh52",
    "station_id": "dahab",
    "date": "2026-02-22",
    "produced_m3": 49113,
    "turbid_m3": 61438,
    "alum_liquid": 3.105,
    "chlorine_gas": 0.383,
    "electricity_kwh": 17637,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.7994,
    "kwh_per_m3": 0.35911,
    "alum_per_m3": 0.06322,
    "chlorine_per_m3": 78e-4,
    "created_by": "u0",
    "created_at": "2026-02-22T20:00:00"
  },
  {
    "id": "dh53",
    "station_id": "dahab",
    "date": "2026-02-23",
    "produced_m3": 49568,
    "turbid_m3": 58837,
    "alum_liquid": 2.734,
    "chlorine_gas": 0.37,
    "electricity_kwh": 15519,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8425,
    "kwh_per_m3": 0.31309,
    "alum_per_m3": 0.05516,
    "chlorine_per_m3": 746e-5,
    "created_by": "u0",
    "created_at": "2026-02-23T20:00:00"
  },
  {
    "id": "dh54",
    "station_id": "dahab",
    "date": "2026-02-24",
    "produced_m3": 56824,
    "turbid_m3": 57570,
    "alum_liquid": 2.946,
    "chlorine_gas": 0.373,
    "electricity_kwh": 17359,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.987,
    "kwh_per_m3": 0.30549,
    "alum_per_m3": 0.05184,
    "chlorine_per_m3": 656e-5,
    "created_by": "u0",
    "created_at": "2026-02-24T20:00:00"
  },
  {
    "id": "dh55",
    "station_id": "dahab",
    "date": "2026-02-25",
    "produced_m3": 50301,
    "turbid_m3": 59556,
    "alum_liquid": 3.029,
    "chlorine_gas": 0.384,
    "electricity_kwh": 17413,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8446,
    "kwh_per_m3": 0.34618,
    "alum_per_m3": 0.06022,
    "chlorine_per_m3": 763e-5,
    "created_by": "u0",
    "created_at": "2026-02-25T20:00:00"
  },
  {
    "id": "dh56",
    "station_id": "dahab",
    "date": "2026-02-26",
    "produced_m3": 54778,
    "turbid_m3": 60325,
    "alum_liquid": 2.958,
    "chlorine_gas": 0.375,
    "electricity_kwh": 17175,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.908,
    "kwh_per_m3": 0.31354,
    "alum_per_m3": 0.054,
    "chlorine_per_m3": 685e-5,
    "created_by": "u0",
    "created_at": "2026-02-26T20:00:00"
  },
  {
    "id": "dh57",
    "station_id": "dahab",
    "date": "2026-02-27",
    "produced_m3": 50580,
    "turbid_m3": 58695,
    "alum_liquid": 2.827,
    "chlorine_gas": 0.382,
    "electricity_kwh": 16588,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8617,
    "kwh_per_m3": 0.32796,
    "alum_per_m3": 0.05589,
    "chlorine_per_m3": 755e-5,
    "created_by": "u0",
    "created_at": "2026-02-27T20:00:00"
  },
  {
    "id": "dh58",
    "station_id": "dahab",
    "date": "2026-02-28",
    "produced_m3": 49266,
    "turbid_m3": 56930,
    "alum_liquid": 3.132,
    "chlorine_gas": 0.384,
    "electricity_kwh": 16279,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8654,
    "kwh_per_m3": 0.33043,
    "alum_per_m3": 0.06357,
    "chlorine_per_m3": 779e-5,
    "created_by": "u0",
    "created_at": "2026-02-28T20:00:00"
  },
  {
    "id": "dh59",
    "station_id": "dahab",
    "date": "2026-03-01",
    "produced_m3": 50184,
    "turbid_m3": 61158,
    "alum_liquid": 2.921,
    "chlorine_gas": 0.406,
    "electricity_kwh": 17209,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8206,
    "kwh_per_m3": 0.34292,
    "alum_per_m3": 0.05821,
    "chlorine_per_m3": 809e-5,
    "created_by": "u0",
    "created_at": "2026-03-01T20:00:00"
  },
  {
    "id": "dh60",
    "station_id": "dahab",
    "date": "2026-03-02",
    "produced_m3": 55743,
    "turbid_m3": 55020,
    "alum_liquid": 3.095,
    "chlorine_gas": 0.384,
    "electricity_kwh": 17485,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 1.0131,
    "kwh_per_m3": 0.31367,
    "alum_per_m3": 0.05552,
    "chlorine_per_m3": 689e-5,
    "created_by": "u0",
    "created_at": "2026-03-02T20:00:00"
  },
  {
    "id": "dh61",
    "station_id": "dahab",
    "date": "2026-03-03",
    "produced_m3": 54325,
    "turbid_m3": 58688,
    "alum_liquid": 2.748,
    "chlorine_gas": 0.384,
    "electricity_kwh": 17091,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9257,
    "kwh_per_m3": 0.31461,
    "alum_per_m3": 0.05058,
    "chlorine_per_m3": 707e-5,
    "created_by": "u0",
    "created_at": "2026-03-03T20:00:00"
  },
  {
    "id": "dh62",
    "station_id": "dahab",
    "date": "2026-03-04",
    "produced_m3": 50821,
    "turbid_m3": 63176,
    "alum_liquid": 3.112,
    "chlorine_gas": 0.407,
    "electricity_kwh": 16095,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8044,
    "kwh_per_m3": 0.3167,
    "alum_per_m3": 0.06123,
    "chlorine_per_m3": 801e-5,
    "created_by": "u0",
    "created_at": "2026-03-04T20:00:00"
  },
  {
    "id": "dh63",
    "station_id": "dahab",
    "date": "2026-03-05",
    "produced_m3": 52229,
    "turbid_m3": 54468,
    "alum_liquid": 2.916,
    "chlorine_gas": 0.391,
    "electricity_kwh": 16584,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9589,
    "kwh_per_m3": 0.31752,
    "alum_per_m3": 0.05583,
    "chlorine_per_m3": 749e-5,
    "created_by": "u0",
    "created_at": "2026-03-05T20:00:00"
  },
  {
    "id": "dh64",
    "station_id": "dahab",
    "date": "2026-03-06",
    "produced_m3": 55771,
    "turbid_m3": 55355,
    "alum_liquid": 3.019,
    "chlorine_gas": 0.376,
    "electricity_kwh": 16490,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 1.0075,
    "kwh_per_m3": 0.29567,
    "alum_per_m3": 0.05413,
    "chlorine_per_m3": 674e-5,
    "created_by": "u0",
    "created_at": "2026-03-06T20:00:00"
  },
  {
    "id": "dh65",
    "station_id": "dahab",
    "date": "2026-03-07",
    "produced_m3": 51542,
    "turbid_m3": 61124,
    "alum_liquid": 3.014,
    "chlorine_gas": 0.394,
    "electricity_kwh": 17133,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8432,
    "kwh_per_m3": 0.33241,
    "alum_per_m3": 0.05848,
    "chlorine_per_m3": 764e-5,
    "created_by": "u0",
    "created_at": "2026-03-07T20:00:00"
  },
  {
    "id": "dh66",
    "station_id": "dahab",
    "date": "2026-03-08",
    "produced_m3": 52497,
    "turbid_m3": 54348,
    "alum_liquid": 2.985,
    "chlorine_gas": 0.408,
    "electricity_kwh": 17393,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9659,
    "kwh_per_m3": 0.33131,
    "alum_per_m3": 0.05686,
    "chlorine_per_m3": 777e-5,
    "created_by": "u0",
    "created_at": "2026-03-08T20:00:00"
  },
  {
    "id": "dh67",
    "station_id": "dahab",
    "date": "2026-03-09",
    "produced_m3": 54875,
    "turbid_m3": 59869,
    "alum_liquid": 2.967,
    "chlorine_gas": 0.394,
    "electricity_kwh": 17035,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9166,
    "kwh_per_m3": 0.31043,
    "alum_per_m3": 0.05407,
    "chlorine_per_m3": 718e-5,
    "created_by": "u0",
    "created_at": "2026-03-09T20:00:00"
  },
  {
    "id": "dh68",
    "station_id": "dahab",
    "date": "2026-03-10",
    "produced_m3": 56991,
    "turbid_m3": 60433,
    "alum_liquid": 2.856,
    "chlorine_gas": 0.388,
    "electricity_kwh": 17376,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.943,
    "kwh_per_m3": 0.30489,
    "alum_per_m3": 0.05011,
    "chlorine_per_m3": 681e-5,
    "created_by": "u0",
    "created_at": "2026-03-10T20:00:00"
  },
  {
    "id": "dh69",
    "station_id": "dahab",
    "date": "2026-03-11",
    "produced_m3": 50868,
    "turbid_m3": 60017,
    "alum_liquid": 3.045,
    "chlorine_gas": 0.39,
    "electricity_kwh": 16716,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8476,
    "kwh_per_m3": 0.32862,
    "alum_per_m3": 0.05986,
    "chlorine_per_m3": 767e-5,
    "created_by": "u0",
    "created_at": "2026-03-11T20:00:00"
  },
  {
    "id": "dh70",
    "station_id": "dahab",
    "date": "2026-03-12",
    "produced_m3": 50912,
    "turbid_m3": 58882,
    "alum_liquid": 2.858,
    "chlorine_gas": 0.384,
    "electricity_kwh": 16874,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8646,
    "kwh_per_m3": 0.33143,
    "alum_per_m3": 0.05614,
    "chlorine_per_m3": 754e-5,
    "created_by": "u0",
    "created_at": "2026-03-12T20:00:00"
  },
  {
    "id": "dh71",
    "station_id": "dahab",
    "date": "2026-03-13",
    "produced_m3": 54564,
    "turbid_m3": 60348,
    "alum_liquid": 2.938,
    "chlorine_gas": 0.366,
    "electricity_kwh": 16922,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9042,
    "kwh_per_m3": 0.31013,
    "alum_per_m3": 0.05385,
    "chlorine_per_m3": 671e-5,
    "created_by": "u0",
    "created_at": "2026-03-13T20:00:00"
  },
  {
    "id": "dh72",
    "station_id": "dahab",
    "date": "2026-03-14",
    "produced_m3": 53522,
    "turbid_m3": 59073,
    "alum_liquid": 2.907,
    "chlorine_gas": 0.36,
    "electricity_kwh": 16431,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.906,
    "kwh_per_m3": 0.307,
    "alum_per_m3": 0.05431,
    "chlorine_per_m3": 673e-5,
    "created_by": "u0",
    "created_at": "2026-03-14T20:00:00"
  },
  {
    "id": "dh73",
    "station_id": "dahab",
    "date": "2026-03-15",
    "produced_m3": 51516,
    "turbid_m3": 56192,
    "alum_liquid": 2.879,
    "chlorine_gas": 0.373,
    "electricity_kwh": 17213,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9168,
    "kwh_per_m3": 0.33413,
    "alum_per_m3": 0.05589,
    "chlorine_per_m3": 724e-5,
    "created_by": "u0",
    "created_at": "2026-03-15T20:00:00"
  },
  {
    "id": "dh74",
    "station_id": "dahab",
    "date": "2026-03-16",
    "produced_m3": 51297,
    "turbid_m3": 61037,
    "alum_liquid": 2.945,
    "chlorine_gas": 0.355,
    "electricity_kwh": 15987,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8404,
    "kwh_per_m3": 0.31166,
    "alum_per_m3": 0.05741,
    "chlorine_per_m3": 692e-5,
    "created_by": "u0",
    "created_at": "2026-03-16T20:00:00"
  },
  {
    "id": "dh75",
    "station_id": "dahab",
    "date": "2026-03-17",
    "produced_m3": 53081,
    "turbid_m3": 54586,
    "alum_liquid": 2.672,
    "chlorine_gas": 0.369,
    "electricity_kwh": 17484,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9724,
    "kwh_per_m3": 0.32938,
    "alum_per_m3": 0.05034,
    "chlorine_per_m3": 695e-5,
    "created_by": "u0",
    "created_at": "2026-03-17T20:00:00"
  },
  {
    "id": "dh76",
    "station_id": "dahab",
    "date": "2026-03-18",
    "produced_m3": 56410,
    "turbid_m3": 55251,
    "alum_liquid": 2.883,
    "chlorine_gas": 0.402,
    "electricity_kwh": 17087,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 1.021,
    "kwh_per_m3": 0.30291,
    "alum_per_m3": 0.05111,
    "chlorine_per_m3": 713e-5,
    "created_by": "u0",
    "created_at": "2026-03-18T20:00:00"
  },
  {
    "id": "dh77",
    "station_id": "dahab",
    "date": "2026-03-19",
    "produced_m3": 55162,
    "turbid_m3": 62682,
    "alum_liquid": 2.854,
    "chlorine_gas": 0.403,
    "electricity_kwh": 17128,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.88,
    "kwh_per_m3": 0.3105,
    "alum_per_m3": 0.05174,
    "chlorine_per_m3": 731e-5,
    "created_by": "u0",
    "created_at": "2026-03-19T20:00:00"
  },
  {
    "id": "dh78",
    "station_id": "dahab",
    "date": "2026-03-20",
    "produced_m3": 53904,
    "turbid_m3": 58070,
    "alum_liquid": 3.066,
    "chlorine_gas": 0.375,
    "electricity_kwh": 15970,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9283,
    "kwh_per_m3": 0.29627,
    "alum_per_m3": 0.05688,
    "chlorine_per_m3": 696e-5,
    "created_by": "u0",
    "created_at": "2026-03-20T20:00:00"
  },
  {
    "id": "dh79",
    "station_id": "dahab",
    "date": "2026-03-21",
    "produced_m3": 55113,
    "turbid_m3": 56389,
    "alum_liquid": 3.084,
    "chlorine_gas": 0.376,
    "electricity_kwh": 15473,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9774,
    "kwh_per_m3": 0.28075,
    "alum_per_m3": 0.05596,
    "chlorine_per_m3": 682e-5,
    "created_by": "u0",
    "created_at": "2026-03-21T20:00:00"
  },
  {
    "id": "dh80",
    "station_id": "dahab",
    "date": "2026-03-22",
    "produced_m3": 56460,
    "turbid_m3": 58494,
    "alum_liquid": 3.126,
    "chlorine_gas": 0.368,
    "electricity_kwh": 15907,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9652,
    "kwh_per_m3": 0.28174,
    "alum_per_m3": 0.05537,
    "chlorine_per_m3": 652e-5,
    "created_by": "u0",
    "created_at": "2026-03-22T20:00:00"
  },
  {
    "id": "dh81",
    "station_id": "dahab",
    "date": "2026-03-23",
    "produced_m3": 56758,
    "turbid_m3": 59203,
    "alum_liquid": 2.719,
    "chlorine_gas": 0.351,
    "electricity_kwh": 17310,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9587,
    "kwh_per_m3": 0.30498,
    "alum_per_m3": 0.04791,
    "chlorine_per_m3": 618e-5,
    "created_by": "u0",
    "created_at": "2026-03-23T20:00:00"
  },
  {
    "id": "dh82",
    "station_id": "dahab",
    "date": "2026-03-24",
    "produced_m3": 48800,
    "turbid_m3": 57967,
    "alum_liquid": 3.021,
    "chlorine_gas": 0.355,
    "electricity_kwh": 15441,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8419,
    "kwh_per_m3": 0.31641,
    "alum_per_m3": 0.06191,
    "chlorine_per_m3": 727e-5,
    "created_by": "u0",
    "created_at": "2026-03-24T20:00:00"
  },
  {
    "id": "dh83",
    "station_id": "dahab",
    "date": "2026-03-25",
    "produced_m3": 53687,
    "turbid_m3": 59249,
    "alum_liquid": 2.696,
    "chlorine_gas": 0.409,
    "electricity_kwh": 15739,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9061,
    "kwh_per_m3": 0.29316,
    "alum_per_m3": 0.05022,
    "chlorine_per_m3": 762e-5,
    "created_by": "u0",
    "created_at": "2026-03-25T20:00:00"
  },
  {
    "id": "dh84",
    "station_id": "dahab",
    "date": "2026-03-26",
    "produced_m3": 50283,
    "turbid_m3": 56526,
    "alum_liquid": 2.79,
    "chlorine_gas": 0.406,
    "electricity_kwh": 16772,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8896,
    "kwh_per_m3": 0.33355,
    "alum_per_m3": 0.05549,
    "chlorine_per_m3": 807e-5,
    "created_by": "u0",
    "created_at": "2026-03-26T20:00:00"
  },
  {
    "id": "dh85",
    "station_id": "dahab",
    "date": "2026-03-27",
    "produced_m3": 53885,
    "turbid_m3": 57604,
    "alum_liquid": 2.716,
    "chlorine_gas": 0.373,
    "electricity_kwh": 16265,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9354,
    "kwh_per_m3": 0.30185,
    "alum_per_m3": 0.0504,
    "chlorine_per_m3": 692e-5,
    "created_by": "u0",
    "created_at": "2026-03-27T20:00:00"
  },
  {
    "id": "dh86",
    "station_id": "dahab",
    "date": "2026-03-28",
    "produced_m3": 51284,
    "turbid_m3": 60923,
    "alum_liquid": 3.008,
    "chlorine_gas": 0.367,
    "electricity_kwh": 16614,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8418,
    "kwh_per_m3": 0.32396,
    "alum_per_m3": 0.05865,
    "chlorine_per_m3": 716e-5,
    "created_by": "u0",
    "created_at": "2026-03-28T20:00:00"
  },
  {
    "id": "dh87",
    "station_id": "dahab",
    "date": "2026-03-29",
    "produced_m3": 55267,
    "turbid_m3": 57473,
    "alum_liquid": 3.123,
    "chlorine_gas": 0.365,
    "electricity_kwh": 15359,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9616,
    "kwh_per_m3": 0.27791,
    "alum_per_m3": 0.05651,
    "chlorine_per_m3": 66e-4,
    "created_by": "u0",
    "created_at": "2026-03-29T20:00:00"
  },
  {
    "id": "dh88",
    "station_id": "dahab",
    "date": "2026-03-30",
    "produced_m3": 49558,
    "turbid_m3": 60942,
    "alum_liquid": 2.986,
    "chlorine_gas": 0.356,
    "electricity_kwh": 16791,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8132,
    "kwh_per_m3": 0.33882,
    "alum_per_m3": 0.06025,
    "chlorine_per_m3": 718e-5,
    "created_by": "u0",
    "created_at": "2026-03-30T20:00:00"
  },
  {
    "id": "dh89",
    "station_id": "dahab",
    "date": "2026-03-31",
    "produced_m3": 50480,
    "turbid_m3": 55745,
    "alum_liquid": 2.672,
    "chlorine_gas": 0.399,
    "electricity_kwh": 15424,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9056,
    "kwh_per_m3": 0.30555,
    "alum_per_m3": 0.05293,
    "chlorine_per_m3": 79e-4,
    "created_by": "u0",
    "created_at": "2026-03-31T20:00:00"
  },
  {
    "id": "dh90",
    "station_id": "dahab",
    "date": "2026-04-01",
    "produced_m3": 51428,
    "turbid_m3": 54546,
    "alum_liquid": 2.913,
    "chlorine_gas": 0.361,
    "electricity_kwh": 17272,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9428,
    "kwh_per_m3": 0.33585,
    "alum_per_m3": 0.05664,
    "chlorine_per_m3": 702e-5,
    "created_by": "u0",
    "created_at": "2026-04-01T20:00:00"
  },
  {
    "id": "dh91",
    "station_id": "dahab",
    "date": "2026-04-02",
    "produced_m3": 50872,
    "turbid_m3": 54151,
    "alum_liquid": 3.02,
    "chlorine_gas": 0.364,
    "electricity_kwh": 15320,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9394,
    "kwh_per_m3": 0.30115,
    "alum_per_m3": 0.05936,
    "chlorine_per_m3": 716e-5,
    "created_by": "u0",
    "created_at": "2026-04-02T20:00:00"
  },
  {
    "id": "dh92",
    "station_id": "dahab",
    "date": "2026-04-03",
    "produced_m3": 52141,
    "turbid_m3": 62011,
    "alum_liquid": 3.109,
    "chlorine_gas": 0.405,
    "electricity_kwh": 15738,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8408,
    "kwh_per_m3": 0.30184,
    "alum_per_m3": 0.05963,
    "chlorine_per_m3": 777e-5,
    "created_by": "u0",
    "created_at": "2026-04-03T20:00:00"
  },
  {
    "id": "dh93",
    "station_id": "dahab",
    "date": "2026-04-04",
    "produced_m3": 51688,
    "turbid_m3": 54795,
    "alum_liquid": 2.708,
    "chlorine_gas": 0.365,
    "electricity_kwh": 17729,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9433,
    "kwh_per_m3": 0.343,
    "alum_per_m3": 0.05239,
    "chlorine_per_m3": 706e-5,
    "created_by": "u0",
    "created_at": "2026-04-04T20:00:00"
  },
  {
    "id": "dh94",
    "station_id": "dahab",
    "date": "2026-04-05",
    "produced_m3": 55851,
    "turbid_m3": 62251,
    "alum_liquid": 2.785,
    "chlorine_gas": 0.376,
    "electricity_kwh": 17636,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8972,
    "kwh_per_m3": 0.31577,
    "alum_per_m3": 0.04986,
    "chlorine_per_m3": 673e-5,
    "created_by": "u0",
    "created_at": "2026-04-05T20:00:00"
  },
  {
    "id": "dh95",
    "station_id": "dahab",
    "date": "2026-04-06",
    "produced_m3": 49688,
    "turbid_m3": 56501,
    "alum_liquid": 2.905,
    "chlorine_gas": 0.396,
    "electricity_kwh": 16234,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8794,
    "kwh_per_m3": 0.32672,
    "alum_per_m3": 0.05846,
    "chlorine_per_m3": 797e-5,
    "created_by": "u0",
    "created_at": "2026-04-06T20:00:00"
  },
  {
    "id": "dh96",
    "station_id": "dahab",
    "date": "2026-04-07",
    "produced_m3": 50593,
    "turbid_m3": 58492,
    "alum_liquid": 2.888,
    "chlorine_gas": 0.408,
    "electricity_kwh": 15970,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.865,
    "kwh_per_m3": 0.31566,
    "alum_per_m3": 0.05708,
    "chlorine_per_m3": 806e-5,
    "created_by": "u0",
    "created_at": "2026-04-07T20:00:00"
  },
  {
    "id": "dh97",
    "station_id": "dahab",
    "date": "2026-04-08",
    "produced_m3": 51134,
    "turbid_m3": 53893,
    "alum_liquid": 2.745,
    "chlorine_gas": 0.407,
    "electricity_kwh": 15923,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9488,
    "kwh_per_m3": 0.3114,
    "alum_per_m3": 0.05368,
    "chlorine_per_m3": 796e-5,
    "created_by": "u0",
    "created_at": "2026-04-08T20:00:00"
  },
  {
    "id": "dh98",
    "station_id": "dahab",
    "date": "2026-04-09",
    "produced_m3": 53472,
    "turbid_m3": 62494,
    "alum_liquid": 3.058,
    "chlorine_gas": 0.391,
    "electricity_kwh": 16107,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8556,
    "kwh_per_m3": 0.30122,
    "alum_per_m3": 0.05719,
    "chlorine_per_m3": 731e-5,
    "created_by": "u0",
    "created_at": "2026-04-09T20:00:00"
  },
  {
    "id": "dh99",
    "station_id": "dahab",
    "date": "2026-04-10",
    "produced_m3": 49912,
    "turbid_m3": 61796,
    "alum_liquid": 2.858,
    "chlorine_gas": 0.353,
    "electricity_kwh": 17235,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8077,
    "kwh_per_m3": 0.34531,
    "alum_per_m3": 0.05726,
    "chlorine_per_m3": 707e-5,
    "created_by": "u0",
    "created_at": "2026-04-10T20:00:00"
  },
  {
    "id": "dh100",
    "station_id": "dahab",
    "date": "2026-04-11",
    "produced_m3": 54250,
    "turbid_m3": 53907,
    "alum_liquid": 2.948,
    "chlorine_gas": 0.357,
    "electricity_kwh": 16612,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 1.0064,
    "kwh_per_m3": 0.30621,
    "alum_per_m3": 0.05434,
    "chlorine_per_m3": 658e-5,
    "created_by": "u0",
    "created_at": "2026-04-11T20:00:00"
  },
  {
    "id": "dh101",
    "station_id": "dahab",
    "date": "2026-04-12",
    "produced_m3": 53744,
    "turbid_m3": 59440,
    "alum_liquid": 2.917,
    "chlorine_gas": 0.399,
    "electricity_kwh": 17595,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9042,
    "kwh_per_m3": 0.32739,
    "alum_per_m3": 0.05428,
    "chlorine_per_m3": 742e-5,
    "created_by": "u0",
    "created_at": "2026-04-12T20:00:00"
  },
  {
    "id": "dh102",
    "station_id": "dahab",
    "date": "2026-04-13",
    "produced_m3": 48760,
    "turbid_m3": 55360,
    "alum_liquid": 2.873,
    "chlorine_gas": 0.359,
    "electricity_kwh": 16218,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8808,
    "kwh_per_m3": 0.33261,
    "alum_per_m3": 0.05892,
    "chlorine_per_m3": 736e-5,
    "created_by": "u0",
    "created_at": "2026-04-13T20:00:00"
  },
  {
    "id": "dh103",
    "station_id": "dahab",
    "date": "2026-04-14",
    "produced_m3": 55377,
    "turbid_m3": 62645,
    "alum_liquid": 2.835,
    "chlorine_gas": 0.354,
    "electricity_kwh": 17226,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.884,
    "kwh_per_m3": 0.31107,
    "alum_per_m3": 0.05119,
    "chlorine_per_m3": 639e-5,
    "created_by": "u0",
    "created_at": "2026-04-14T20:00:00"
  },
  {
    "id": "dh104",
    "station_id": "dahab",
    "date": "2026-04-15",
    "produced_m3": 50353,
    "turbid_m3": 56772,
    "alum_liquid": 2.977,
    "chlorine_gas": 0.359,
    "electricity_kwh": 17019,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8869,
    "kwh_per_m3": 0.33799,
    "alum_per_m3": 0.05912,
    "chlorine_per_m3": 713e-5,
    "created_by": "u0",
    "created_at": "2026-04-15T20:00:00"
  },
  {
    "id": "dh105",
    "station_id": "dahab",
    "date": "2026-04-16",
    "produced_m3": 52668,
    "turbid_m3": 56026,
    "alum_liquid": 2.758,
    "chlorine_gas": 0.352,
    "electricity_kwh": 17574,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9401,
    "kwh_per_m3": 0.33368,
    "alum_per_m3": 0.05237,
    "chlorine_per_m3": 668e-5,
    "created_by": "u0",
    "created_at": "2026-04-16T20:00:00"
  },
  {
    "id": "dh106",
    "station_id": "dahab",
    "date": "2026-04-17",
    "produced_m3": 55386,
    "turbid_m3": 58014,
    "alum_liquid": 3.066,
    "chlorine_gas": 0.39,
    "electricity_kwh": 17804,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9547,
    "kwh_per_m3": 0.32145,
    "alum_per_m3": 0.05536,
    "chlorine_per_m3": 704e-5,
    "created_by": "u0",
    "created_at": "2026-04-17T20:00:00"
  },
  {
    "id": "dh107",
    "station_id": "dahab",
    "date": "2026-04-18",
    "produced_m3": 52143,
    "turbid_m3": 55232,
    "alum_liquid": 2.968,
    "chlorine_gas": 0.367,
    "electricity_kwh": 16726,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9441,
    "kwh_per_m3": 0.32077,
    "alum_per_m3": 0.05692,
    "chlorine_per_m3": 704e-5,
    "created_by": "u0",
    "created_at": "2026-04-18T20:00:00"
  },
  {
    "id": "dh108",
    "station_id": "dahab",
    "date": "2026-04-19",
    "produced_m3": 51582,
    "turbid_m3": 61049,
    "alum_liquid": 2.944,
    "chlorine_gas": 0.364,
    "electricity_kwh": 16249,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8449,
    "kwh_per_m3": 0.31501,
    "alum_per_m3": 0.05707,
    "chlorine_per_m3": 706e-5,
    "created_by": "u0",
    "created_at": "2026-04-19T20:00:00"
  },
  {
    "id": "dh109",
    "station_id": "dahab",
    "date": "2026-04-20",
    "produced_m3": 50667,
    "turbid_m3": 59737,
    "alum_liquid": 2.844,
    "chlorine_gas": 0.374,
    "electricity_kwh": 17269,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8482,
    "kwh_per_m3": 0.34083,
    "alum_per_m3": 0.05613,
    "chlorine_per_m3": 738e-5,
    "created_by": "u0",
    "created_at": "2026-04-20T20:00:00"
  },
  {
    "id": "dh110",
    "station_id": "dahab",
    "date": "2026-04-21",
    "produced_m3": 49326,
    "turbid_m3": 58862,
    "alum_liquid": 2.905,
    "chlorine_gas": 0.392,
    "electricity_kwh": 17193,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.838,
    "kwh_per_m3": 0.34856,
    "alum_per_m3": 0.05889,
    "chlorine_per_m3": 795e-5,
    "created_by": "u0",
    "created_at": "2026-04-21T20:00:00"
  },
  {
    "id": "dh111",
    "station_id": "dahab",
    "date": "2026-04-22",
    "produced_m3": 49451,
    "turbid_m3": 55899,
    "alum_liquid": 3.038,
    "chlorine_gas": 0.357,
    "electricity_kwh": 16959,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8846,
    "kwh_per_m3": 0.34295,
    "alum_per_m3": 0.06143,
    "chlorine_per_m3": 722e-5,
    "created_by": "u0",
    "created_at": "2026-04-22T20:00:00"
  },
  {
    "id": "dh112",
    "station_id": "dahab",
    "date": "2026-04-23",
    "produced_m3": 5e4,
    "turbid_m3": 59825,
    "alum_liquid": 2.899,
    "chlorine_gas": 0.37,
    "electricity_kwh": 15751,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8358,
    "kwh_per_m3": 0.31502,
    "alum_per_m3": 0.05798,
    "chlorine_per_m3": 74e-4,
    "created_by": "u0",
    "created_at": "2026-04-23T20:00:00"
  },
  {
    "id": "dh113",
    "station_id": "dahab",
    "date": "2026-04-24",
    "produced_m3": 56440,
    "turbid_m3": 60774,
    "alum_liquid": 2.84,
    "chlorine_gas": 0.367,
    "electricity_kwh": 16793,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9287,
    "kwh_per_m3": 0.29754,
    "alum_per_m3": 0.05032,
    "chlorine_per_m3": 65e-4,
    "created_by": "u0",
    "created_at": "2026-04-24T20:00:00"
  },
  {
    "id": "dh114",
    "station_id": "dahab",
    "date": "2026-04-25",
    "produced_m3": 57082,
    "turbid_m3": 54420,
    "alum_liquid": 2.73,
    "chlorine_gas": 0.373,
    "electricity_kwh": 15960,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 1.0489,
    "kwh_per_m3": 0.2796,
    "alum_per_m3": 0.04783,
    "chlorine_per_m3": 653e-5,
    "created_by": "u0",
    "created_at": "2026-04-25T20:00:00"
  },
  {
    "id": "dh115",
    "station_id": "dahab",
    "date": "2026-04-26",
    "produced_m3": 55105,
    "turbid_m3": 61792,
    "alum_liquid": 2.775,
    "chlorine_gas": 0.401,
    "electricity_kwh": 16113,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8918,
    "kwh_per_m3": 0.29241,
    "alum_per_m3": 0.05036,
    "chlorine_per_m3": 728e-5,
    "created_by": "u0",
    "created_at": "2026-04-26T20:00:00"
  },
  {
    "id": "dh116",
    "station_id": "dahab",
    "date": "2026-04-27",
    "produced_m3": 52827,
    "turbid_m3": 63122,
    "alum_liquid": 2.922,
    "chlorine_gas": 0.387,
    "electricity_kwh": 16336,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.8369,
    "kwh_per_m3": 0.30924,
    "alum_per_m3": 0.05531,
    "chlorine_per_m3": 733e-5,
    "created_by": "u0",
    "created_at": "2026-04-27T20:00:00"
  },
  {
    "id": "dh117",
    "station_id": "dahab",
    "date": "2026-04-28",
    "produced_m3": 53726,
    "turbid_m3": 58691,
    "alum_liquid": 2.695,
    "chlorine_gas": 0.363,
    "electricity_kwh": 16563,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9154,
    "kwh_per_m3": 0.30829,
    "alum_per_m3": 0.05016,
    "chlorine_per_m3": 676e-5,
    "created_by": "u0",
    "created_at": "2026-04-28T20:00:00"
  },
  {
    "id": "dh118",
    "station_id": "dahab",
    "date": "2026-04-29",
    "produced_m3": 56473,
    "turbid_m3": 57637,
    "alum_liquid": 2.699,
    "chlorine_gas": 0.4,
    "electricity_kwh": 15589,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9798,
    "kwh_per_m3": 0.27604,
    "alum_per_m3": 0.04779,
    "chlorine_per_m3": 708e-5,
    "created_by": "u0",
    "created_at": "2026-04-29T20:00:00"
  },
  {
    "id": "dh119",
    "station_id": "dahab",
    "date": "2026-04-30",
    "produced_m3": 56761,
    "turbid_m3": 61517,
    "alum_liquid": 2.967,
    "chlorine_gas": 0.365,
    "electricity_kwh": 17319,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9227,
    "kwh_per_m3": 0.30512,
    "alum_per_m3": 0.05227,
    "chlorine_per_m3": 643e-5,
    "created_by": "u0",
    "created_at": "2026-04-30T20:00:00"
  },
  {
    "id": "dh120",
    "station_id": "dahab",
    "date": "2026-05-01",
    "produced_m3": 53220,
    "turbid_m3": 56267,
    "alum_liquid": 3.102,
    "chlorine_gas": 0.395,
    "electricity_kwh": 17382,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.9458,
    "kwh_per_m3": 0.32661,
    "alum_per_m3": 0.05829,
    "chlorine_per_m3": 742e-5,
    "created_by": "u0",
    "created_at": "2026-05-01T20:00:00"
  },
  {
    "id": "dh121",
    "station_id": "dahab",
    "date": "2026-05-02",
    "produced_m3": 57102,
    "turbid_m3": 59721,
    "alum_liquid": 3.123,
    "chlorine_gas": 0.406,
    "electricity_kwh": 15852,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.9561,
    "kwh_per_m3": 0.27761,
    "alum_per_m3": 0.05469,
    "chlorine_per_m3": 711e-5,
    "created_by": "u0",
    "created_at": "2026-05-02T20:00:00"
  },
  {
    "id": "dh122",
    "station_id": "dahab",
    "date": "2026-05-03",
    "produced_m3": 56044,
    "turbid_m3": 55681,
    "alum_liquid": 2.901,
    "chlorine_gas": 0.37,
    "electricity_kwh": 15973,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 1.0065,
    "kwh_per_m3": 0.28501,
    "alum_per_m3": 0.05176,
    "chlorine_per_m3": 66e-4,
    "created_by": "u0",
    "created_at": "2026-05-03T20:00:00"
  },
  {
    "id": "dh123",
    "station_id": "dahab",
    "date": "2026-05-04",
    "produced_m3": 50915,
    "turbid_m3": 60986,
    "alum_liquid": 2.804,
    "chlorine_gas": 0.351,
    "electricity_kwh": 16632,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8349,
    "kwh_per_m3": 0.32666,
    "alum_per_m3": 0.05507,
    "chlorine_per_m3": 689e-5,
    "created_by": "u0",
    "created_at": "2026-05-04T20:00:00"
  },
  {
    "id": "dh124",
    "station_id": "dahab",
    "date": "2026-05-05",
    "produced_m3": 51202,
    "turbid_m3": 63081,
    "alum_liquid": 3.106,
    "chlorine_gas": 0.372,
    "electricity_kwh": 17735,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.8117,
    "kwh_per_m3": 0.34637,
    "alum_per_m3": 0.06066,
    "chlorine_per_m3": 727e-5,
    "created_by": "u0",
    "created_at": "2026-05-05T20:00:00"
  },
  {
    "id": "dh125",
    "station_id": "dahab",
    "date": "2026-05-06",
    "produced_m3": 56706,
    "turbid_m3": 57911,
    "alum_liquid": 3.047,
    "chlorine_gas": 0.371,
    "electricity_kwh": 16333,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.9792,
    "kwh_per_m3": 0.28803,
    "alum_per_m3": 0.05373,
    "chlorine_per_m3": 654e-5,
    "created_by": "u0",
    "created_at": "2026-05-06T20:00:00"
  },
  {
    "id": "dh126",
    "station_id": "dahab",
    "date": "2026-05-07",
    "produced_m3": 48778,
    "turbid_m3": 55329,
    "alum_liquid": 2.918,
    "chlorine_gas": 0.374,
    "electricity_kwh": 16166,
    "flow_meters_ok": true,
    "shift_crew": "\u0637\u0627\u0631\u0642 \u062D\u0633\u0646\u064A + \u0639\u0645\u0631\u0648 \u0633\u0627\u0645\u064A",
    "efficiency": 0.8816,
    "kwh_per_m3": 0.33142,
    "alum_per_m3": 0.05982,
    "chlorine_per_m3": 767e-5,
    "created_by": "u0",
    "created_at": "2026-05-07T20:00:00"
  },
  {
    "id": "dh127",
    "station_id": "dahab",
    "date": "2026-05-08",
    "produced_m3": 51089,
    "turbid_m3": 59617,
    "alum_liquid": 2.677,
    "chlorine_gas": 0.368,
    "electricity_kwh": 15767,
    "flow_meters_ok": true,
    "shift_crew": "\u0647\u0634\u0627\u0645 \u062C\u0645\u0627\u0644 + \u064A\u0627\u0633\u0631 \u0641\u0624\u0627\u062F",
    "efficiency": 0.857,
    "kwh_per_m3": 0.30862,
    "alum_per_m3": 0.0524,
    "chlorine_per_m3": 72e-4,
    "created_by": "u0",
    "created_at": "2026-05-08T20:00:00"
  },
  {
    "id": "dh128",
    "station_id": "dahab",
    "date": "2026-05-09",
    "produced_m3": 54514,
    "turbid_m3": 60502,
    "alum_liquid": 2.908,
    "chlorine_gas": 0.402,
    "electricity_kwh": 15625,
    "flow_meters_ok": true,
    "shift_crew": "\u0645\u062D\u0645\u0648\u062F \u0631\u0623\u0641\u062A + \u0623\u064A\u0645\u0646 \u0635\u0628\u0631\u064A",
    "efficiency": 0.901,
    "kwh_per_m3": 0.28662,
    "alum_per_m3": 0.05334,
    "chlorine_per_m3": 737e-5,
    "created_by": "u0",
    "created_at": "2026-05-09T20:00:00"
  }
];
var initialBreakdowns = [
  {
    id: "bd101",
    station_id: "giza",
    asset_type: "\u0637\u0644\u0645\u0628\u0629 \u0639\u0643\u0631\u0629",
    asset_label: "\u0637\u0644\u0645\u0628\u0629 \u0639\u0643\u0631\u0629 KSB \u0631\u0642\u0645 2",
    severity: "\u0645\u062A\u0648\u0633\u0637",
    status: "\u0645\u0643\u062A\u0645\u0644",
    description: "\u0627\u0631\u062A\u0641\u0627\u0639 \u062D\u0631\u0627\u0631\u0629 \u0627\u0644\u0645\u062D\u0627\u0645\u0644 \u0648\u062A\u0633\u0631\u064A\u0628 \u0645\u0627\u0626\u064A \u0641\u064A \u0627\u0644\u062D\u0634\u0648 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A.",
    start_date: "2026-05-02",
    start_time: "08:30",
    end_date: "2026-05-02",
    end_time: "14:15",
    duration_hours: 5.8,
    capacity_reduced_pct: 15,
    production_loss_m3: 3200,
    notes: "\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0634\u0648 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A \u0648\u0625\u0639\u0627\u062F\u0629 \u0645\u0648\u0627\u0632\u0646\u0629 \u0627\u0644\u0645\u062D\u0648\u0631.",
    created_by: "u1",
    created_at: "2026-05-02T08:30:00"
  },
  {
    id: "bd102",
    station_id: "giza",
    asset_type: "\u0645\u0631\u0648\u0642",
    asset_label: "\u0645\u0631\u0648\u0642 \u0628\u0631\u0645\u0648\u062A\u064A\u062A \u0631\u0642\u0645 1",
    severity: "\u0637\u0641\u064A\u0641",
    status: "\u0645\u0643\u062A\u0645\u0644",
    description: "\u0627\u0646\u0633\u062F\u0627\u062F \u062C\u0632\u0626\u064A \u0641\u064A \u062E\u0637\u0648\u0637 \u0633\u062D\u0628 \u0627\u0644\u0631\u0648\u0628\u0629 \u0648\u062A\u0648\u0642\u0641 \u0643\u0648\u0628\u0631\u064A \u0627\u0644\u0643\u0633\u062D.",
    start_date: "2026-05-05",
    start_time: "11:00",
    end_date: "2026-05-05",
    end_time: "15:00",
    duration_hours: 4,
    capacity_reduced_pct: 10,
    production_loss_m3: 1800,
    notes: "\u062A\u0645 \u062A\u0637\u0647\u064A\u0631 \u0627\u0644\u062E\u0637\u0648\u0637 \u0648\u0639\u0645\u0644 \u062A\u0633\u0644\u064A\u0643 \u0628\u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0636\u063A\u0648\u0637.",
    created_by: "u2",
    created_at: "2026-05-05T11:00:00"
  },
  {
    id: "bd103",
    station_id: "imbaba",
    asset_type: "\u0637\u0644\u0645\u0628\u0629 \u0634\u0628\u0629",
    asset_label: "\u0637\u0644\u0645\u0628\u0629 \u062D\u0642\u0646 \u0627\u0644\u0634\u0628\u0629 brane lubbe #3",
    severity: "\u062D\u0631\u062C",
    status: "\u062C\u0627\u0631\u064D",
    description: "\u0639\u0637\u0644 \u0641\u064A \u0627\u0644\u0645\u0648\u062A\u0648\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0627\u0646\u062E\u0641\u0627\u0636 \u0627\u0644\u0636\u063A\u0637 \u0628\u0627\u0644\u062D\u0627\u0642\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629.",
    start_date: "2026-05-08",
    start_time: "19:00",
    capacity_reduced_pct: 20,
    created_by: "u3",
    created_at: "2026-05-08T19:00:00"
  }
];
var initialLabRecords = [
  {
    id: "lab101",
    station_id: "giza",
    date: "2026-05-08",
    time: "08:30",
    shift: "\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (\u0635\u0628\u0627\u062D\u064A\u0629)",
    turbidity_raw: 35.5,
    ph_raw: 7.8,
    temp_raw: 24,
    flow_m3h: 6200,
    alum_lab_dose: 33.2,
    alum_actual_dose: 34,
    alum_diff: 0.8,
    alum_diff_pct: 2.4,
    turbidity_settled: 1.8,
    turbidity_filtered: 0.35,
    residual_chlorine: 2.2,
    tested_by: "\u0643/ \u0623\u062D\u0645\u062F \u0645\u062C\u062F\u064A",
    notes: "\u062A\u0643\u0648\u064A\u0646 \u0646\u062F\u0641 \u0633\u0631\u064A\u0639 \u0648\u062A\u0631\u0633\u064A\u0628 \u0645\u0645\u062A\u0627\u0632 \u0641\u064A \u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A",
    created_at: "2026-05-08T08:30:00"
  },
  {
    id: "lab102",
    station_id: "giza",
    date: "2026-05-07",
    time: "14:00",
    shift: "\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 (\u0645\u0633\u0627\u0626\u064A\u0629)",
    turbidity_raw: 42,
    ph_raw: 7.9,
    temp_raw: 25,
    flow_m3h: 6e3,
    alum_lab_dose: 36.5,
    alum_actual_dose: 38,
    alum_diff: 1.5,
    alum_diff_pct: 4.1,
    turbidity_settled: 2.1,
    turbidity_filtered: 0.42,
    residual_chlorine: 2,
    tested_by: "\u0643/ \u0645\u062D\u0645\u062F \u0645\u0635\u0637\u0641\u0649",
    notes: "\u0627\u0631\u062A\u0641\u0627\u0639 \u0637\u0641\u064A\u0641 \u0641\u064A \u0639\u0643\u0627\u0631\u0629 \u0627\u0644\u0645\u0623\u062E\u0630 \u0628\u0633\u0628\u0628 \u0631\u064A\u0627\u062D \u0648\u0623\u0645\u0648\u0627\u062C",
    created_at: "2026-05-07T14:00:00"
  },
  {
    id: "lab103",
    station_id: "imbaba",
    date: "2026-05-08",
    time: "09:15",
    shift: "\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (\u0635\u0628\u0627\u062D\u064A\u0629)",
    turbidity_raw: 28,
    ph_raw: 7.7,
    temp_raw: 23.5,
    flow_m3h: 8500,
    alum_lab_dose: 29.8,
    alum_actual_dose: 30.5,
    alum_diff: 0.7,
    alum_diff_pct: 2.3,
    turbidity_settled: 1.5,
    turbidity_filtered: 0.28,
    residual_chlorine: 2.4,
    tested_by: "\u0643/ \u0633\u0627\u0631\u0629 \u0645\u062D\u0645\u0648\u062F",
    notes: "\u062C\u0648\u062F\u0629 \u0645\u0645\u062A\u0627\u0632\u0629 \u0644\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0645\u0631\u0634\u062D\u0629",
    created_at: "2026-05-08T09:15:00"
  },
  {
    id: "lab104",
    station_id: "sheikh_zayed",
    date: "2026-05-08",
    time: "10:00",
    shift: "\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (\u0635\u0628\u0627\u062D\u064A\u0629)",
    turbidity_raw: 22,
    ph_raw: 7.6,
    temp_raw: 23,
    flow_m3h: 12e3,
    alum_lab_dose: 26.5,
    alum_actual_dose: 26,
    alum_diff: -0.5,
    alum_diff_pct: -1.9,
    turbidity_settled: 1.2,
    turbidity_filtered: 0.22,
    residual_chlorine: 2.5,
    tested_by: "\u0643/ \u062D\u0633\u0627\u0645 \u062D\u0633\u0646",
    notes: "\u0645\u0637\u0627\u0628\u0642\u0629 \u062A\u0627\u0645\u0629 \u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u062C\u0627\u0631 \u062A\u0633\u062A \u0645\u0639 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0641\u0639\u0644\u064A",
    created_at: "2026-05-08T10:00:00"
  }
];
var initialInventorySettings = [
  {
    id: "inv_giza_alum",
    station_id: "giza",
    item_type: "alum_liquid",
    tank_capacity_tons: 120,
    // سعة 4 خزانات × 30 طن
    opening_stock_tons: 65.5,
    opening_stock_date: "2026-05-01",
    reorder_level_tons: 25,
    safety_stock_tons: 15
  },
  {
    id: "inv_imbaba_alum",
    station_id: "imbaba",
    item_type: "alum_liquid",
    tank_capacity_tons: 150,
    opening_stock_tons: 80,
    opening_stock_date: "2026-05-01",
    reorder_level_tons: 35,
    safety_stock_tons: 20
  },
  {
    id: "inv_zayed_alum",
    station_id: "sheikh_zayed",
    item_type: "alum_liquid",
    tank_capacity_tons: 200,
    opening_stock_tons: 110,
    opening_stock_date: "2026-05-01",
    reorder_level_tons: 40,
    safety_stock_tons: 25
  },
  {
    id: "inv_dahab_alum",
    station_id: "dahab_island",
    item_type: "alum_liquid",
    tank_capacity_tons: 180,
    opening_stock_tons: 95,
    opening_stock_date: "2026-05-01",
    reorder_level_tons: 35,
    safety_stock_tons: 20
  }
];
var initialSupplyOrders = [
  {
    id: "so_101",
    station_id: "giza",
    item_type: "alum_liquid",
    item_name: "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629 (\u062A\u0631\u0643\u064A\u0632 8.2%)",
    order_number: "\u062A\u0648\u0631\u064A\u062F-2026/054",
    supplier: "\u0634\u0631\u0643\u0629 \u0623\u0628\u0648 \u0632\u0639\u0628\u0644 \u0644\u0644\u0623\u0633\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0629",
    date: "2026-05-03",
    quantity_tons: 25.4,
    unit_price: 3450,
    total_cost: 87630,
    vehicle_plate: "\u0623 \u0642 \u0631 8532 (\u0641\u0646\u0637\u0627\u0633)",
    driver_name: "\u0633\u064A\u062F \u0645\u062D\u0645\u0648\u062F \u0625\u0628\u0631\u0627\u0647\u064A\u0645",
    invoice_number: "INV-884102",
    purity_pct: 8.25,
    lab_status: "\u0645\u0642\u0628\u0648\u0644",
    received_by: "\u0623/ \u0645\u062D\u0645\u0648\u062F \u0639\u0628\u062F \u0627\u0644\u0641\u062A\u0627\u062D",
    notes: "\u062A\u0645 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u0639\u0645\u0644\u064A \u0648\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0634\u062D\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0632\u0627\u0646 \u0631\u0642\u0645 2 \u0648 3.",
    created_at: "2026-05-03T10:30:00"
  },
  {
    id: "so_102",
    station_id: "giza",
    item_type: "alum_liquid",
    item_name: "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629 (\u062A\u0631\u0643\u064A\u0632 8.3%)",
    order_number: "\u062A\u0648\u0631\u064A\u062F-2026/061",
    supplier: "\u0634\u0631\u0643\u0629 \u0645\u0635\u0631 \u0644\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A",
    date: "2026-05-07",
    quantity_tons: 26.15,
    unit_price: 3450,
    total_cost: 90217.5,
    vehicle_plate: "\u0637 \u0631 \u0641 1947 (\u0641\u0646\u0637\u0627\u0633)",
    driver_name: "\u0631\u0645\u0636\u0627\u0646 \u062D\u0633\u0646 \u0639\u0644\u064A",
    invoice_number: "INV-902341",
    purity_pct: 8.3,
    lab_status: "\u0645\u0642\u0628\u0648\u0644",
    received_by: "\u0623/ \u0645\u062D\u0645\u0648\u062F \u0639\u0628\u062F \u0627\u0644\u0641\u062A\u0627\u062D",
    notes: "\u062A\u0641\u0631\u064A\u063A \u0641\u064A \u0627\u0644\u062E\u0632\u0627\u0646 \u0631\u0642\u0645 1 \u0648 4 \u2014 \u062C\u0648\u062F\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629.",
    created_at: "2026-05-07T14:15:00"
  },
  {
    id: "so_103",
    station_id: "imbaba",
    item_type: "alum_liquid",
    item_name: "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629",
    order_number: "\u062A\u0648\u0631\u064A\u062F-2026/058",
    supplier: "\u0634\u0631\u0643\u0629 \u0623\u0628\u0648 \u0632\u0639\u0628\u0644 \u0644\u0644\u0623\u0633\u0645\u062F\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0629",
    date: "2026-05-05",
    quantity_tons: 27.8,
    unit_price: 3450,
    total_cost: 95910,
    vehicle_plate: "\u0642 \u0633 \u062C 6314 (\u0641\u0646\u0637\u0627\u0633)",
    driver_name: "\u0639\u0627\u062F\u0644 \u0633\u0645\u064A\u0631 \u0639\u062B\u0645\u0627\u0646",
    invoice_number: "INV-891104",
    purity_pct: 8.2,
    lab_status: "\u0645\u0642\u0628\u0648\u0644",
    received_by: "\u0623/ \u0623\u0633\u0627\u0645\u0629 \u062E\u0644\u064A\u0644",
    notes: "\u062A\u0645\u062A \u0627\u0644\u0645\u0639\u0627\u064A\u0631\u0629 \u0648\u0627\u0644\u0648\u0632\u0646 \u0639\u0644\u0649 \u0628\u0633\u0643\u0648\u0644 \u0627\u0644\u0645\u062D\u0637\u0629 \u0648\u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0648\u0632\u0646.",
    created_at: "2026-05-05T11:00:00"
  },
  {
    id: "so_104",
    station_id: "sheikh_zayed",
    item_type: "alum_liquid",
    item_name: "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629",
    order_number: "\u062A\u0648\u0631\u064A\u062F-2026/062",
    supplier: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0635\u0631 \u0644\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629",
    date: "2026-05-06",
    quantity_tons: 30.5,
    unit_price: 3420,
    total_cost: 104310,
    vehicle_plate: "\u064A \u062F \u0646 4421 (\u0641\u0646\u0637\u0627\u0633)",
    driver_name: "\u0625\u0633\u0645\u0627\u0639\u064A\u0644 \u0639\u0628\u062F \u0627\u0644\u0645\u0646\u0639\u0645",
    invoice_number: "NCIC-44019",
    purity_pct: 8.35,
    lab_status: "\u0645\u0642\u0628\u0648\u0644",
    received_by: "\u0623/ \u062D\u0627\u0632\u0645 \u0635\u0628\u0631\u064A",
    notes: "\u0634\u062D\u0646\u0629 \u0645\u0645\u062A\u0627\u0632\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 \u0648\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0648\u0644\u064A\u0635\u0629 \u0627\u0644\u0634\u062D\u0646.",
    created_at: "2026-05-06T09:45:00"
  }
];

// src/db/database.ts
var pool = null;
function getPool() {
  if (!pool) {
    pool = import_promise.default.createPool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "water_stations",
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4"
    });
  }
  return pool;
}
async function getRootConnection() {
  return import_promise.default.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    charset: "utf8mb4"
  });
}
async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}
async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}
async function run(sql, params = []) {
  const [result] = await getPool().execute(sql, params);
  return result;
}
async function initDb() {
  const dbName = process.env.DB_NAME || "water_stations";
  console.log("Connecting to MySQL...");
  let rootConn = null;
  try {
    rootConn = await getRootConnection();
    await rootConn.execute(
      "CREATE DATABASE IF NOT EXISTS `" + dbName + "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    console.log("Database `" + dbName + "` is ready");
    await rootConn.end();
  } catch (e) {
    if (rootConn) await rootConn.end().catch(() => {
    });
    console.error("MySQL connection failed:", e.message);
    console.error("Make sure MySQL is running and credentials in .env are correct");
    throw e;
  }
  const db = getPool();
  await db.execute("SELECT 1");
  console.log("MySQL pool connected");
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
  try {
    await db.execute("ALTER TABLE daily_records ADD COLUMN alum_lab_dose DOUBLE AFTER alum_liquid");
  } catch (err) {
  }
  await db.execute(`
    CREATE TABLE IF NOT EXISTS breakdowns (
      id                    VARCHAR(50)  PRIMARY KEY,
      station_id            VARCHAR(50)  NOT NULL,
      asset_type            VARCHAR(100) NOT NULL,
      asset_label           VARCHAR(200) NOT NULL,
      severity              VARCHAR(50)  NOT NULL,
      status                VARCHAR(50)  NOT NULL DEFAULT '\u062C\u0627\u0631\u064D',
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
      item_name          VARCHAR(150) NOT NULL DEFAULT '\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629',
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
      lab_status         VARCHAR(50)  DEFAULT '\u0645\u0642\u0628\u0648\u0644',
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
  console.log("Tables ready");
  const [rows] = await db.execute("SELECT COUNT(*) as c FROM stations");
  if (rows[0].c > 0) {
    const [labRows] = await db.execute("SELECT COUNT(*) as c FROM lab_records");
    if (labRows[0].c === 0 && (initialLabRecords || []).length > 0) {
      for (const l of initialLabRecords) {
        await db.execute(
          `
          INSERT IGNORE INTO lab_records
            (id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
             alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct, turbidity_settled,
             turbidity_filtered, residual_chlorine, tested_by, notes, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            l.id,
            l.station_id,
            l.date,
            l.time || "",
            l.shift || "",
            l.turbidity_raw,
            l.ph_raw || null,
            l.temp_raw || null,
            l.flow_m3h || null,
            l.alum_lab_dose,
            l.alum_actual_dose,
            l.alum_diff || l.alum_actual_dose - l.alum_lab_dose,
            l.alum_diff_pct || (l.alum_lab_dose > 0 ? +((l.alum_actual_dose - l.alum_lab_dose) / l.alum_lab_dose * 100).toFixed(2) : 0),
            l.turbidity_settled || null,
            l.turbidity_filtered || null,
            l.residual_chlorine || null,
            l.tested_by || "",
            l.notes || "",
            l.created_at.replace("T", " ").slice(0, 19)
          ]
        );
      }
      console.log("Seeded initial lab records");
    }
    const [soRows] = await db.execute("SELECT COUNT(*) as c FROM supply_orders");
    if (soRows[0].c === 0 && (initialSupplyOrders || []).length > 0) {
      for (const so of initialSupplyOrders) {
        await db.execute(
          `
          INSERT IGNORE INTO supply_orders
            (id, station_id, item_type, item_name, order_number, supplier, date,
             quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
             invoice_number, purity_pct, lab_status, received_by, notes, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            so.id,
            so.station_id,
            so.item_type,
            so.item_name,
            so.order_number,
            so.supplier,
            so.date,
            so.quantity_tons,
            so.unit_price || null,
            so.total_cost || null,
            so.vehicle_plate || "",
            so.driver_name || "",
            so.invoice_number || "",
            so.purity_pct || null,
            so.lab_status || "\u0645\u0642\u0628\u0648\u0644",
            so.received_by || "",
            so.notes || "",
            so.created_at.replace("T", " ").slice(0, 19)
          ]
        );
      }
      console.log("Seeded initial supply orders");
    }
    const [invRows] = await db.execute("SELECT COUNT(*) as c FROM inventory_settings");
    if (invRows[0].c === 0 && (initialInventorySettings || []).length > 0) {
      for (const inv of initialInventorySettings) {
        await db.execute(
          `
          INSERT IGNORE INTO inventory_settings
            (id, station_id, item_type, tank_capacity_tons, opening_stock_tons,
             opening_stock_date, reorder_level_tons, safety_stock_tons)
          VALUES (?,?,?,?,?,?,?,?)`,
          [
            inv.id,
            inv.station_id,
            inv.item_type,
            inv.tank_capacity_tons,
            inv.opening_stock_tons,
            inv.opening_stock_date,
            inv.reorder_level_tons,
            inv.safety_stock_tons
          ]
        );
      }
      console.log("Seeded initial inventory settings");
    }
    console.log("Database already initialized");
    return;
  }
  console.log("Seeding initial data...");
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (const st of initialStations) {
      await conn.execute(
        "INSERT IGNORE INTO stations (id, status, data) VALUES (?, ?, ?)",
        [st.id, st.status, JSON.stringify(st.static)]
      );
    }
    for (const u of initialUsers) {
      await conn.execute(
        "INSERT IGNORE INTO users (id,username,name,role,station_id,active,password) VALUES (?,?,?,?,?,?,?)",
        [u.id, u.username, u.name, u.role, u.station_id || null, u.active ? 1 : 0, "123"]
      );
    }
    for (const r of initialRecords) {
      await conn.execute(
        `
        INSERT IGNORE INTO daily_records
          (id,station_id,date,produced_m3,turbid_m3,alum_liquid,chlorine_gas,
           electricity_kwh,flow_meters_ok,shift_crew,
           efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          r.id,
          r.station_id,
          r.date,
          r.produced_m3,
          r.turbid_m3,
          r.alum_liquid,
          r.chlorine_gas || 0,
          r.electricity_kwh,
          r.flow_meters_ok ? 1 : 0,
          r.shift_crew,
          r.efficiency,
          r.kwh_per_m3,
          r.alum_per_m3,
          r.chlorine_per_m3,
          r.created_by,
          r.created_at.replace("T", " ").slice(0, 19)
        ]
      );
    }
    for (const b of initialBreakdowns || []) {
      await conn.execute(
        `
        INSERT IGNORE INTO breakdowns
          (id,station_id,asset_type,asset_label,severity,status,
           description,start_date,start_time,created_by,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          b.id,
          b.station_id,
          b.asset_type,
          b.asset_label,
          b.severity,
          b.status,
          b.description,
          b.start_date,
          b.start_time || "",
          b.created_by,
          b.created_at.replace("T", " ").slice(0, 19)
        ]
      );
    }
    for (const l of initialLabRecords || []) {
      await conn.execute(
        `
        INSERT IGNORE INTO lab_records
          (id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
           alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct, turbidity_settled,
           turbidity_filtered, residual_chlorine, tested_by, notes, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          l.id,
          l.station_id,
          l.date,
          l.time || "",
          l.shift || "",
          l.turbidity_raw,
          l.ph_raw || null,
          l.temp_raw || null,
          l.flow_m3h || null,
          l.alum_lab_dose,
          l.alum_actual_dose,
          l.alum_diff || l.alum_actual_dose - l.alum_lab_dose,
          l.alum_diff_pct || (l.alum_lab_dose > 0 ? +((l.alum_actual_dose - l.alum_lab_dose) / l.alum_lab_dose * 100).toFixed(2) : 0),
          l.turbidity_settled || null,
          l.turbidity_filtered || null,
          l.residual_chlorine || null,
          l.tested_by || "",
          l.notes || "",
          l.created_at.replace("T", " ").slice(0, 19)
        ]
      );
    }
    for (const so of initialSupplyOrders || []) {
      await conn.execute(
        `
        INSERT IGNORE INTO supply_orders
          (id, station_id, item_type, item_name, order_number, supplier, date,
           quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
           invoice_number, purity_pct, lab_status, received_by, notes, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          so.id,
          so.station_id,
          so.item_type,
          so.item_name,
          so.order_number,
          so.supplier,
          so.date,
          so.quantity_tons,
          so.unit_price || null,
          so.total_cost || null,
          so.vehicle_plate || "",
          so.driver_name || "",
          so.invoice_number || "",
          so.purity_pct || null,
          so.lab_status || "\u0645\u0642\u0628\u0648\u0644",
          so.received_by || "",
          so.notes || "",
          so.created_at.replace("T", " ").slice(0, 19)
        ]
      );
    }
    for (const inv of initialInventorySettings || []) {
      await conn.execute(
        `
        INSERT IGNORE INTO inventory_settings
          (id, station_id, item_type, tank_capacity_tons, opening_stock_tons,
           opening_stock_date, reorder_level_tons, safety_stock_tons)
        VALUES (?,?,?,?,?,?,?,?)`,
        [
          inv.id,
          inv.station_id,
          inv.item_type,
          inv.tank_capacity_tons,
          inv.opening_stock_tons,
          inv.opening_stock_date,
          inv.reorder_level_tons,
          inv.safety_stock_tons
        ]
      );
    }
    await conn.commit();
    console.log("Seeded: " + initialStations.length + " stations, " + initialUsers.length + " users, " + initialRecords.length + " records, " + initialLabRecords.length + " lab records, " + initialSupplyOrders.length + " supply orders");
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

// src/db/api.ts
var import_express = require("express");

// src/utils/logger.ts
var import_winston = __toESM(require("winston"), 1);
var import_path = __toESM(require("path"), 1);
var logDirectory = import_path.default.join(process.cwd(), "logs");
var logger = import_winston.default.createLogger({
  level: "info",
  format: import_winston.default.format.combine(
    import_winston.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    import_winston.default.format.errors({ stack: true }),
    import_winston.default.format.splat(),
    import_winston.default.format.json()
  ),
  defaultMeta: { service: "water-stations-hub" },
  transports: [
    new import_winston.default.transports.File({ filename: import_path.default.join(logDirectory, "error.log"), level: "error" }),
    new import_winston.default.transports.File({ filename: import_path.default.join(logDirectory, "combined.log") })
  ]
});
if (process.env.NODE_ENV !== "production") {
  logger.add(new import_winston.default.transports.Console({
    format: import_winston.default.format.combine(
      import_winston.default.format.colorize(),
      import_winston.default.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    )
  }));
}

// src/db/api.ts
var apiRouter = (0, import_express.Router)();
apiRouter.post("/auth/login", async (req, res) => {
  try {
    const { username, password = "123" } = req.body;
    const user = await queryOne(
      "SELECT id,username,name,role,station_id,active,password FROM users WHERE username=? AND active=1",
      [username]
    );
    if (!user) return res.status(401).json({ error: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0646\u0634\u0637" });
    if (password !== user.password) return res.status(401).json({ error: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
    const { password: _, ...safeUser } = user;
    safeUser.active = !!safeUser.active;
    res.json({ user: safeUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/stations", async (_req, res) => {
  try {
    const rows = await query("SELECT id, status, data FROM stations");
    res.json(rows.map((r) => ({ id: r.id, status: r.status, static: JSON.parse(r.data) })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/stations", async (req, res) => {
  try {
    const { id, status = "active", static: staticData } = req.body;
    await run(
      "INSERT INTO stations (id, status, data) VALUES (?, ?, ?)",
      [id, status, JSON.stringify(staticData)]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.put("/stations/:id", async (req, res) => {
  try {
    const { status, static: staticData } = req.body;
    if (status) await run("UPDATE stations SET status=? WHERE id=?", [status, req.params.id]);
    if (staticData) await run("UPDATE stations SET data=? WHERE id=?", [JSON.stringify(staticData), req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/users", async (_req, res) => {
  try {
    const users = await query("SELECT id,username,name,role,station_id,active FROM users");
    res.json(users.map((u) => ({ ...u, active: !!u.active })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/users", async (req, res) => {
  try {
    const { username, name, role, station_id, password = "123" } = req.body;
    const id = "u" + Date.now();
    await run(
      "INSERT INTO users (id,username,name,role,station_id,active,password) VALUES (?,?,?,?,?,1,?)",
      [id, username, name, role, station_id || null, password]
    );
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.put("/users/:id", async (req, res) => {
  try {
    const { active, name, role, station_id } = req.body;
    if (active !== void 0) await run("UPDATE users SET active=? WHERE id=?", [active ? 1 : 0, req.params.id]);
    if (name) await run("UPDATE users SET name=? WHERE id=?", [name, req.params.id]);
    if (role) await run("UPDATE users SET role=?,station_id=? WHERE id=?", [role, station_id || null, req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/records", async (req, res) => {
  try {
    const { station_id, month, limit = "500" } = req.query;
    let sql = "SELECT * FROM daily_records WHERE 1=1";
    const params = [];
    if (station_id) {
      sql += " AND station_id=?";
      params.push(station_id);
    }
    if (month) {
      sql += " AND date LIKE ?";
      params.push(month + "%");
    }
    sql += " ORDER BY date DESC LIMIT ?";
    params.push(parseInt(limit));
    const records = await query(sql, params);
    res.json(records.map((r) => ({
      ...r,
      date: typeof r.date === "object" ? r.date.toISOString().slice(0, 10) : r.date,
      flow_meters_ok: !!r.flow_meters_ok
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/records", async (req, res) => {
  try {
    const d = req.body;
    const dup = await queryOne(
      "SELECT id FROM daily_records WHERE station_id=? AND date=?",
      [d.station_id, d.date]
    );
    if (dup) return res.status(409).json({ error: `\u064A\u0648\u062C\u062F \u0633\u062C\u0644 \u0645\u0633\u0628\u0642 \u0628\u062A\u0627\u0631\u064A\u062E ${d.date}` });
    if (d.turbid_m3 > 0 && d.turbid_m3 < d.produced_m3)
      return res.status(400).json({ error: "\u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0639\u0643\u0631\u0629 \u064A\u062C\u0628 \u2265 \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0645\u0646\u062A\u062C\u0629" });
    const eff = d.turbid_m3 > 0 ? +(d.produced_m3 / d.turbid_m3).toFixed(4) : 0;
    const kwh_m3 = d.produced_m3 > 0 ? +(d.electricity_kwh / d.produced_m3).toFixed(5) : 0;
    const alum = d.produced_m3 > 0 ? +(d.alum_liquid / d.produced_m3 * 1e3).toFixed(5) : 0;
    const cl = d.produced_m3 > 0 ? +((d.chlorine_gas || 0) / d.produced_m3 * 1e3).toFixed(5) : 0;
    const kw = d.electricity_kwh || 0;
    const kvar = d.electricity_kvar || 0;
    const kva = kw > 0 && kvar > 0 ? +Math.sqrt(kw ** 2 + kvar ** 2).toFixed(2) : kw;
    const pf = kva > 0 ? +(kw / kva).toFixed(4) : null;
    const id = "r" + Date.now();
    await run(
      `
      INSERT INTO daily_records
        (id,station_id,date,produced_m3,turbid_m3,backwash_m3,cooling_m3,nile_level,
         tank1_high,tank1_low,tank2_high,tank2_low,well1_high,well1_low,well2_high,well2_low,
         pressure_high,pressure_low,alum_solid,alum_liquid,chlorine_gas,hypochlorite,
         flow_meters_ok,electricity_kwh,electricity_kvar,electricity_kva,power_factor,
         maintenance_periodic,maintenance_repair,shift_crew,notes,
         efficiency,kwh_per_m3,alum_per_m3,chlorine_per_m3,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        d.station_id,
        d.date,
        d.produced_m3,
        d.turbid_m3 || 0,
        d.backwash_m3 || null,
        d.cooling_m3 || null,
        d.nile_level || null,
        d.tank1_high || null,
        d.tank1_low || null,
        d.tank2_high || null,
        d.tank2_low || null,
        d.well1_high || null,
        d.well1_low || null,
        d.well2_high || null,
        d.well2_low || null,
        d.pressure_high || null,
        d.pressure_low || null,
        d.alum_solid || null,
        d.alum_liquid || 0,
        d.chlorine_gas || null,
        d.hypochlorite || null,
        d.flow_meters_ok ? 1 : 0,
        kw,
        kvar || null,
        kva || null,
        pf,
        d.maintenance_periodic || null,
        d.maintenance_repair || null,
        d.shift_crew || "",
        d.notes || null,
        eff,
        kwh_m3,
        alum,
        cl,
        d.created_by || "",
        (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19)
      ]
    );
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.put("/records/:id", async (req, res) => {
  try {
    const d = req.body;
    const existing = await queryOne("SELECT * FROM daily_records WHERE id=?", [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: "\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u0639\u062F\u064A\u0644\u0647 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    const produced_m3 = d.produced_m3 !== void 0 && d.produced_m3 !== null ? Number(d.produced_m3) : existing.produced_m3;
    const turbid_m3 = d.turbid_m3 !== void 0 && d.turbid_m3 !== null ? Number(d.turbid_m3) : existing.turbid_m3;
    const alum_liquid = d.alum_liquid !== void 0 && d.alum_liquid !== null ? Number(d.alum_liquid) : existing.alum_liquid;
    const chlorine_gas = d.chlorine_gas !== void 0 && d.chlorine_gas !== null ? Number(d.chlorine_gas) : existing.chlorine_gas || 0;
    const electricity_kwh = d.electricity_kwh !== void 0 && d.electricity_kwh !== null ? Number(d.electricity_kwh) : existing.electricity_kwh;
    const shift_crew = d.shift_crew !== void 0 ? String(d.shift_crew || "") : existing.shift_crew || "";
    const notes = d.notes !== void 0 ? d.notes || null : existing.notes;
    const eff = turbid_m3 > 0 ? +(produced_m3 / turbid_m3).toFixed(4) : 0;
    const kwh_m3 = produced_m3 > 0 ? +(electricity_kwh / produced_m3).toFixed(5) : 0;
    const alum = produced_m3 > 0 ? +(alum_liquid / produced_m3 * 1e3).toFixed(5) : 0;
    const cl = produced_m3 > 0 ? +(chlorine_gas / produced_m3 * 1e3).toFixed(5) : 0;
    await run(
      `
      UPDATE daily_records SET
        produced_m3=?, turbid_m3=?, alum_liquid=?, chlorine_gas=?,
        electricity_kwh=?, shift_crew=?, notes=?,
        efficiency=?, kwh_per_m3=?, alum_per_m3=?, chlorine_per_m3=?
      WHERE id=?`,
      [
        produced_m3,
        turbid_m3,
        alum_liquid,
        chlorine_gas,
        electricity_kwh,
        shift_crew,
        notes,
        eff,
        kwh_m3,
        alum,
        cl,
        req.params.id
      ]
    );
    res.json({ ok: true });
  } catch (e) {
    logger.error(`Error updating record: ${e.message}`);
    res.status(500).json({ error: e.message });
  }
});
apiRouter.delete("/records/:id", async (req, res) => {
  try {
    await run("DELETE FROM daily_records WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/stats/:stationId", async (req, res) => {
  try {
    const { month } = req.query;
    let sql = "SELECT * FROM daily_records WHERE station_id=?";
    const params = [req.params.stationId];
    if (month) {
      sql += " AND date LIKE ?";
      params.push(month + "%");
    }
    const records = await query(sql, params);
    if (!records.length) return res.json({ count: 0, total_prod: 0, total_turbid: 0, total_alum: 0, total_chlorine: 0, total_kwh: 0, avg_eff: 0, avg_kwh_m3: 0, avg_production: 0, avg_power_factor: 0, sludge_m3: 0 });
    const p = records.reduce((s, r) => s + r.produced_m3, 0);
    const t = records.reduce((s, r) => s + r.turbid_m3, 0);
    const al = records.reduce((s, r) => s + r.alum_liquid, 0);
    const cl = records.reduce((s, r) => s + (r.chlorine_gas || 0), 0);
    const kw = records.reduce((s, r) => s + r.electricity_kwh, 0);
    const pfR = records.filter((r) => r.power_factor > 0);
    const avg_pf = pfR.length > 0 ? +(pfR.reduce((s, r) => s + r.power_factor, 0) / pfR.length).toFixed(4) : 0;
    res.json({
      count: records.length,
      total_prod: Math.round(p),
      total_turbid: Math.round(t),
      total_alum: +al.toFixed(2),
      total_chlorine: +cl.toFixed(3),
      total_kwh: Math.round(kw),
      avg_eff: t > 0 ? +(p / t).toFixed(4) : 0,
      avg_kwh_m3: p > 0 ? +(kw / p).toFixed(4) : 0,
      avg_production: records.length > 0 ? Math.round(p / records.length) : 0,
      avg_power_factor: avg_pf,
      sludge_m3: +(al * 500).toFixed(0)
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/breakdowns", async (req, res) => {
  try {
    const { station_id } = req.query;
    let sql = "SELECT * FROM breakdowns";
    const params = [];
    if (station_id) {
      sql += " WHERE station_id=?";
      params.push(station_id);
    }
    sql += " ORDER BY start_date DESC";
    const rows = await query(sql, params);
    res.json(rows.map((r) => ({
      ...r,
      start_date: typeof r.start_date === "object" ? r.start_date.toISOString().slice(0, 10) : r.start_date,
      end_date: r.end_date && typeof r.end_date === "object" ? r.end_date.toISOString().slice(0, 10) : r.end_date
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/breakdowns", async (req, res) => {
  try {
    const d = req.body;
    const id = "bd" + Date.now();
    await run(
      `
      INSERT INTO breakdowns
        (id,station_id,asset_type,asset_label,severity,status,description,
         start_date,start_time,capacity_reduced_pct,created_by,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        d.station_id,
        d.asset_type,
        d.asset_label,
        d.severity,
        d.status || "\u062C\u0627\u0631\u064D",
        d.description,
        d.start_date,
        d.start_time || "",
        d.capacity_reduced_pct || null,
        d.created_by || "",
        (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19)
      ]
    );
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.put("/breakdowns/:id/resolve", async (req, res) => {
  try {
    const { end_date, end_time, production_loss_m3, capacity_reduced_pct, notes } = req.body;
    await run(
      `
      UPDATE breakdowns SET
        status='\u0645\u0643\u062A\u0645\u0644', end_date=?, end_time=?,
        production_loss_m3=?, capacity_reduced_pct=?, notes=?
      WHERE id=?`,
      [end_date, end_time, production_loss_m3 || null, capacity_reduced_pct || null, notes || null, req.params.id]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.delete("/breakdowns/:id", async (req, res) => {
  try {
    await run("DELETE FROM breakdowns WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/lab-records", async (req, res) => {
  try {
    const { station_id, month, limit = "200" } = req.query;
    let sql = "SELECT * FROM lab_records WHERE 1=1";
    const params = [];
    if (station_id) {
      sql += " AND station_id=?";
      params.push(station_id);
    }
    if (month) {
      sql += " AND date LIKE ?";
      params.push(month + "%");
    }
    sql += " ORDER BY date DESC, time DESC, created_at DESC LIMIT ?";
    params.push(parseInt(limit));
    const records = await query(sql, params);
    res.json(records.map((r) => ({
      ...r,
      date: typeof r.date === "object" ? r.date.toISOString().slice(0, 10) : r.date
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/lab-records", async (req, res) => {
  try {
    const d = req.body;
    if (!d.station_id || !d.date || d.alum_lab_dose === void 0 || d.alum_actual_dose === void 0) {
      return res.status(400).json({ error: "\u0627\u0644\u0645\u062D\u0637\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0648\u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629" });
    }
    const id = d.id || "lab_" + Date.now();
    const labDose = Number(d.alum_lab_dose) || 0;
    const actualDose = Number(d.alum_actual_dose) || 0;
    const diff = +(actualDose - labDose).toFixed(2);
    const diffPct = labDose > 0 ? +(diff / labDose * 100).toFixed(2) : 0;
    await run(
      `
      INSERT INTO lab_records (
        id, station_id, date, time, shift, turbidity_raw, ph_raw, temp_raw, flow_m3h,
        alum_lab_dose, alum_actual_dose, alum_diff, alum_diff_pct,
        turbidity_settled, turbidity_filtered, residual_chlorine,
        tested_by, notes, created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        d.station_id,
        d.date,
        d.time || "",
        d.shift || "",
        Number(d.turbidity_raw) || 0,
        d.ph_raw !== void 0 ? Number(d.ph_raw) : null,
        d.temp_raw !== void 0 ? Number(d.temp_raw) : null,
        d.flow_m3h !== void 0 ? Number(d.flow_m3h) : null,
        labDose,
        actualDose,
        diff,
        diffPct,
        d.turbidity_settled !== void 0 && d.turbidity_settled !== null ? Number(d.turbidity_settled) : null,
        d.turbidity_filtered !== void 0 && d.turbidity_filtered !== null ? Number(d.turbidity_filtered) : null,
        d.residual_chlorine !== void 0 && d.residual_chlorine !== null ? Number(d.residual_chlorine) : null,
        d.tested_by || "",
        d.notes || "",
        (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ")
      ]
    );
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.delete("/lab-records/:id", async (req, res) => {
  try {
    await run("DELETE FROM lab_records WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/supply-orders", async (req, res) => {
  try {
    const { station_id, item_type, month, limit = "200" } = req.query;
    let sql = "SELECT * FROM supply_orders WHERE 1=1";
    const params = [];
    if (station_id) {
      sql += " AND station_id=?";
      params.push(station_id);
    }
    if (item_type) {
      sql += " AND item_type=?";
      params.push(item_type);
    }
    if (month) {
      sql += " AND date LIKE ?";
      params.push(month + "%");
    }
    sql += " ORDER BY date DESC, created_at DESC LIMIT ?";
    params.push(parseInt(limit));
    const orders = await query(sql, params);
    res.json(orders.map((o) => ({
      ...o,
      date: typeof o.date === "object" ? o.date.toISOString().slice(0, 10) : o.date
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/supply-orders", async (req, res) => {
  try {
    const d = req.body;
    if (!d.station_id || !d.date || !d.quantity_tons || !d.supplier || !d.order_number) {
      return res.status(400).json({ error: "\u0627\u0644\u0645\u062D\u0637\u0629 \u0648\u0631\u0642\u0645 \u0627\u0644\u0625\u0630\u0646 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0645\u0648\u0631\u062F \u0648\u0627\u0644\u0643\u0645\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629" });
    }
    const id = d.id || "so_" + Date.now();
    const qty = Number(d.quantity_tons) || 0;
    const unitPrice = d.unit_price ? Number(d.unit_price) : null;
    const totalCost = d.total_cost ? Number(d.total_cost) : unitPrice ? +(qty * unitPrice).toFixed(2) : null;
    await run(
      `
      INSERT INTO supply_orders (
        id, station_id, item_type, item_name, order_number, supplier, date,
        quantity_tons, unit_price, total_cost, vehicle_plate, driver_name,
        invoice_number, purity_pct, lab_status, received_by, notes, created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        d.station_id,
        d.item_type || "alum_liquid",
        d.item_name || "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629",
        d.order_number,
        d.supplier,
        d.date,
        qty,
        unitPrice,
        totalCost,
        d.vehicle_plate || "",
        d.driver_name || "",
        d.invoice_number || "",
        d.purity_pct ? Number(d.purity_pct) : null,
        d.lab_status || "\u0645\u0642\u0628\u0648\u0644",
        d.received_by || "",
        d.notes || "",
        (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ")
      ]
    );
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.delete("/supply-orders/:id", async (req, res) => {
  try {
    await run("DELETE FROM supply_orders WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/inventory/settings", async (req, res) => {
  try {
    const { station_id } = req.query;
    let sql = "SELECT * FROM inventory_settings";
    const params = [];
    if (station_id) {
      sql += " WHERE station_id=?";
      params.push(station_id);
    }
    const settings = await query(sql, params);
    res.json(settings.map((s) => ({
      ...s,
      opening_stock_date: typeof s.opening_stock_date === "object" ? s.opening_stock_date.toISOString().slice(0, 10) : s.opening_stock_date
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.post("/inventory/settings", async (req, res) => {
  try {
    const { station_id, item_type = "alum_liquid", tank_capacity_tons, opening_stock_tons, opening_stock_date, reorder_level_tons, safety_stock_tons } = req.body;
    if (!station_id) return res.status(400).json({ error: "\u0627\u0644\u0645\u062D\u0637\u0629 \u0645\u0637\u0644\u0648\u0628\u0629" });
    const id = `inv_${station_id}_${item_type}`;
    const cap = Number(tank_capacity_tons) || 100;
    const op = Number(opening_stock_tons) || 0;
    const opDate = opening_stock_date || "2026-05-01";
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/inventory/summary", async (req, res) => {
  try {
    const { station_id, item_type = "alum_liquid" } = req.query;
    let stationsSql = "SELECT id, data FROM stations";
    const stParams = [];
    if (station_id && station_id !== "all") {
      stationsSql += " WHERE id=?";
      stParams.push(station_id);
    }
    const stationRows = await query(stationsSql, stParams);
    const [settings, orders, records] = await Promise.all([
      query("SELECT * FROM inventory_settings WHERE item_type=?", [item_type]),
      query('SELECT station_id, quantity_tons, date FROM supply_orders WHERE item_type=? AND lab_status!="\u0645\u0631\u0641\u0648\u0636"', [item_type]),
      query("SELECT station_id, alum_liquid, alum_solid, date FROM daily_records")
    ]);
    const summaries = stationRows.map((stRow) => {
      const stId = stRow.id;
      const stData = JSON.parse(stRow.data || "{}");
      const stName = stData?.general?.name || stId;
      const stSetting = settings.find((s) => s.station_id === stId);
      const cap = stSetting?.tank_capacity_tons || 100;
      const opStock = stSetting?.opening_stock_tons || 50;
      const reorderLevel = stSetting?.reorder_level_tons || 25;
      const safetyStock = stSetting?.safety_stock_tons || 15;
      const stOrders = orders.filter((o) => o.station_id === stId);
      const totalReceived = +stOrders.reduce((sum, o) => sum + (Number(o.quantity_tons) || 0), 0).toFixed(2);
      const stRecords = records.filter((r) => r.station_id === stId);
      const totalConsumed = +stRecords.reduce((sum, r) => {
        const val = item_type === "alum_solid" ? Number(r.alum_solid) || 0 : Number(r.alum_liquid) || 0;
        return sum + val;
      }, 0).toFixed(2);
      const currentStock = +(opStock + totalReceived - totalConsumed).toFixed(2);
      const stockPercentage = cap > 0 ? +(currentStock / cap * 100).toFixed(1) : 0;
      const recentRecs = stRecords.slice(0, 30);
      const avgDaily = recentRecs.length > 0 ? +(recentRecs.reduce((sum, r) => sum + (item_type === "alum_solid" ? Number(r.alum_solid) || 0 : Number(r.alum_liquid) || 0), 0) / recentRecs.length).toFixed(2) : 5;
      const daysOfCover = avgDaily > 0 ? +(currentStock / avgDaily).toFixed(1) : 99;
      let status = "optimal";
      if (currentStock <= safetyStock) status = "critical";
      else if (currentStock <= reorderLevel) status = "low";
      else if (currentStock > cap * 0.95) status = "excess";
      return {
        station_id: stId,
        station_name: stName,
        item_type,
        item_name: item_type === "alum_liquid" ? "\u0634\u0628\u0629 \u0633\u0627\u0626\u0644\u0629" : item_type === "alum_solid" ? "\u0634\u0628\u0629 \u0635\u0644\u0628\u0629" : "\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A",
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
        status
      };
    });
    res.json(summaries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/inventory/ledger", async (req, res) => {
  try {
    const { station_id, item_type = "alum_liquid" } = req.query;
    if (!station_id) return res.status(400).json({ error: "\u0627\u0644\u0645\u062D\u0637\u0629 \u0645\u0637\u0644\u0648\u0628\u0629" });
    const [stSetting, orders, records] = await Promise.all([
      queryOne("SELECT * FROM inventory_settings WHERE station_id=? AND item_type=?", [station_id, item_type]),
      query("SELECT id, order_number, supplier, date, quantity_tons, vehicle_plate, received_by, lab_status FROM supply_orders WHERE station_id=? AND item_type=? ORDER BY date ASC", [station_id, item_type]),
      query("SELECT id, date, alum_liquid, alum_solid, shift_crew FROM daily_records WHERE station_id=? ORDER BY date ASC", [station_id])
    ]);
    const openingStock = stSetting?.opening_stock_tons || 50;
    const opDate = stSetting?.opening_stock_date ? typeof stSetting.opening_stock_date === "object" ? stSetting.opening_stock_date.toISOString().slice(0, 10) : stSetting.opening_stock_date : "2026-05-01";
    const events = [
      {
        date: opDate,
        type: "opening",
        ref: "\u0631\u0635\u064A\u062F \u0627\u0641\u062A\u062A\u0627\u062D\u064A",
        desc: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0644\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629",
        qty: openingStock,
        actor: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646"
      }
    ];
    for (const o of orders) {
      const orderDate = typeof o.date === "object" ? o.date.toISOString().slice(0, 10) : o.date;
      events.push({
        date: orderDate,
        type: "in",
        ref: o.order_number,
        desc: `\u062A\u0648\u0631\u064A\u062F \u0634\u062D\u0646\u0629 \u0645\u0646 ${o.supplier} ${o.vehicle_plate ? `(\u0633\u064A\u0627\u0631\u0629: ${o.vehicle_plate})` : ""}`,
        qty: Number(o.quantity_tons) || 0,
        actor: o.received_by || "\u0623\u0645\u064A\u0646 \u0627\u0644\u0645\u062E\u0632\u0646"
      });
    }
    for (const r of records) {
      const recDate = typeof r.date === "object" ? r.date.toISOString().slice(0, 10) : r.date;
      const consumed = item_type === "alum_solid" ? Number(r.alum_solid) || 0 : Number(r.alum_liquid) || 0;
      if (consumed > 0) {
        events.push({
          date: recDate,
          type: "out",
          ref: `\u064A\u0648\u0645\u064A\u0629 ${recDate}`,
          desc: `\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A \u0628\u0627\u0644\u0645\u062D\u0637\u0629`,
          qty: consumed,
          actor: r.shift_crew || "\u0637\u0627\u0642\u0645 \u0627\u0644\u0648\u0631\u062F\u064A\u0629"
        });
      }
    }
    events.sort((a, b) => a.date.localeCompare(b.date));
    let runningBalance = 0;
    const ledger = events.map((ev, idx) => {
      if (ev.type === "opening") {
        runningBalance = ev.qty;
      } else if (ev.type === "in") {
        runningBalance += ev.qty;
      } else if (ev.type === "out") {
        runningBalance -= ev.qty;
      }
      return {
        id: `led_${idx}_${ev.date}`,
        date: ev.date,
        type: ev.type,
        type_label: ev.type === "opening" ? "\u0631\u0635\u064A\u062F \u0627\u0641\u062A\u062A\u0627\u062D\u064A" : ev.type === "in" ? "\u0625\u0630\u0646 \u0625\u0636\u0627\u0641\u0629 (\u0648\u0627\u0631\u062F)" : "\u0625\u0630\u0646 \u0635\u0631\u0641 (\u0627\u0633\u062A\u0647\u0644\u0627\u0643)",
        reference_no: ev.ref,
        description: ev.desc,
        in_qty: ev.type === "in" ? ev.qty : ev.type === "opening" ? ev.qty : 0,
        out_qty: ev.type === "out" ? ev.qty : 0,
        balance_after: +runningBalance.toFixed(2),
        actor: ev.actor
      };
    });
    res.json(ledger.reverse());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
apiRouter.get("/health", (_req, res) => res.json({ status: "ok", db: "mysql", timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
apiRouter.post("/ai/jartest-advisor", async (req, res) => {
  const { turbidityNTU, pH, temperatureC, rawFlowM3h, stationName, alumLabDose, alumActualDose } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const labDose = alumLabDose || +(15 + Math.pow(turbidityNTU || 35, 0.65) * 1.8).toFixed(1);
  const actualDose = alumActualDose || labDose;
  const variance = +(actualDose - labDose).toFixed(2);
  const variancePct = labDose > 0 ? +(variance / labDose * 100).toFixed(1) : 0;
  if (!apiKey || apiKey === '""' || apiKey === "") {
    let advice = `### \u{1F9EA} \u062A\u0642\u0631\u064A\u0631 \u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0644\u062C\u0631\u0639\u0627\u062A \u0627\u0644\u0634\u0628\u0629 \u0648\u0627\u0644\u062A\u0634\u063A\u064A\u0644 - ${stationName || "\u0645\u062D\u0637\u0629 \u0645\u064A\u0627\u0647"}

**1. \u062A\u062D\u0644\u064A\u0644 \u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u062E\u0627\u0645:**
* \u0627\u0644\u0639\u0643\u0627\u0631\u0629: **${turbidityNTU || 35} NTU** | \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0647\u064A\u062F\u0631\u0648\u062C\u064A\u0646\u064A: **${pH || 7.8}** | \u0627\u0644\u062D\u0631\u0627\u0631\u0629: **${temperatureC || 24} \xB0\u0645**
* \u0627\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: **${(rawFlowM3h || 6e3).toLocaleString()} \u0645\xB3/\u0633\u0627\u0639\u0629**

**2. \u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u062C\u0631\u0639\u0627\u062A (\u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 vs \u0627\u0644\u0641\u0639\u0644\u064A\u0629):**
* \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629 (Jar Test): **${labDose} PPM (\u062C\u0645/\u0645\xB3)**
* \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u0645\u0637\u0628\u0642\u0629 \u0628\u0627\u0644\u0645\u062D\u0637\u0629: **${actualDose} PPM (\u062C\u0645/\u0645\xB3)**
* \u0627\u0644\u0641\u0627\u0631\u0642 \u0648\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641: **${variance >= 0 ? "+" : ""}${variance} \u062C\u0645/\u0645\xB3 (${variancePct >= 0 ? "+" : ""}${variancePct}%)**

**3. \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0647\u0646\u062F\u0633\u064A \u0648\u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A:**
`;
    if (Math.abs(variancePct) <= 3) {
      advice += `* \u2705 **\u062A\u0637\u0627\u0628\u0642 \u0645\u0645\u062A\u0627\u0632**: \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u062C\u0627\u0631 \u062A\u0633\u062A \u0628\u0646\u0633\u0628\u0629 \u0639\u0627\u0644\u064A\u0629\u060C \u0645\u0645\u0627 \u064A\u0636\u0645\u0646 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u062A\u0631\u0648\u064A\u0628 \u0627\u0644\u0645\u062B\u0644\u0649 \u0648\u062A\u0631\u0633\u064A\u0628 \u0645\u062A\u0648\u0627\u0632\u0646 \u0628\u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A \u062F\u0648\u0646 \u0647\u062F\u0631 \u0641\u064A \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A.
`;
    } else if (variance > 0) {
      advice += `* \u26A0\uFE0F **\u0641\u0627\u0626\u0636 \u0641\u064A \u062C\u0631\u0639\u0629 \u0627\u0644\u0634\u0628\u0629**: \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0623\u0639\u0644\u0649 \u0645\u0646 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0628\u0645\u0642\u062F\u0627\u0631 ${variance} \u062C\u0645/\u0645\xB3 (${variancePct}%). \u064A\u0648\u0635\u0649 \u0628\u062E\u0641\u0636 \u0634\u0648\u0637 \u0637\u0644\u0645\u0628\u0627\u062A \u0627\u0644\u062D\u0642\u0646 (Stroke) \u0628\u0646\u0633\u0628\u0629 ${Math.min(15, Math.abs(variancePct))}% \u0644\u062A\u0648\u0641\u064A\u0631 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0648\u062A\u062C\u0646\u0628 \u062A\u0633\u0631\u0628 \u0628\u0642\u0627\u064A\u0627 \u0627\u0644\u0623\u0644\u0648\u0645\u0646\u064A\u0648\u0645 \u0644\u0644\u0645\u0631\u0634\u062D\u0627\u062A.
`;
    } else {
      advice += `* \u26A0\uFE0F **\u0639\u062C\u0632 \u0641\u064A \u062C\u0631\u0639\u0629 \u0627\u0644\u0634\u0628\u0629**: \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0628\u0645\u0642\u062F\u0627\u0631 ${Math.abs(variance)} \u062C\u0645/\u0645\xB3. \u0642\u062F \u064A\u0624\u062F\u064A \u0630\u0644\u0643 \u0625\u0644\u0649 \u062A\u0623\u062E\u0631 \u062A\u0643\u0648\u064A\u0646 \u0627\u0644\u0646\u062F\u0641 (Pin-point flocs) \u0648\u0632\u064A\u0627\u062F\u0629 \u062D\u0645\u0644 \u0627\u0644\u0639\u0643\u0627\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A \u0627\u0644\u0631\u0645\u0644\u064A\u0629. \u064A\u0648\u0635\u0649 \u0628\u0632\u064A\u0627\u062F\u0629 \u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0642\u0646 \u062A\u062F\u0631\u064A\u062C\u064A\u0627\u064B.
`;
    }
    advice += `
**4. \u0645\u0639\u062F\u0644\u0627\u062A \u0636\u062E \u0645\u062D\u0644\u0648\u0644 \u0627\u0644\u0634\u0628\u0629 (\u062A\u0631\u0643\u064A\u0632 10%):**
* \u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0642\u0646 \u0644\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629: **${+(rawFlowM3h * labDose / 1e3 / 1.33 * 10).toFixed(1)} \u0644\u062A\u0631/\u0633\u0627\u0639\u0629**
* \u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0642\u0646 \u0644\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629: **${+(rawFlowM3h * actualDose / 1e3 / 1.33 * 10).toFixed(1)} \u0644\u062A\u0631/\u0633\u0627\u0639\u0629**

**5. \u062A\u0648\u0635\u064A\u0627\u062A \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A:**
* \u0641\u062D\u0635 \u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0631\u0648\u064A\u0628 \u0641\u064A \u062D\u0648\u0636 \u0627\u0644\u062E\u0644\u0637 \u0627\u0644\u0633\u0631\u064A\u0639 (1-2 \u062F\u0642\u064A\u0642\u0629).
* \u0645\u0631\u0627\u0642\u0628\u0629 \u0637\u0628\u0642\u0629 \u0627\u0644\u0631\u0648\u0628\u0629 \u0641\u064A \u0642\u0627\u0639 \u0627\u0644\u0645\u0631\u0648\u0642 \u0648\u062A\u0641\u0631\u064A\u063A\u0647\u0627 \u0628\u0627\u0646\u062A\u0638\u0627\u0645 \u0644\u062A\u062C\u0646\u0628 \u0627\u0644\u0637\u0641\u0648.`;
    return res.json({ success: true, text: advice });
  }
  try {
    const prompt = `
\u0623\u0646\u062A \u0631\u0626\u064A\u0633 \u0642\u0637\u0627\u0639 \u0627\u0644\u0645\u0639\u0627\u0645\u0644 \u0648\u0627\u0644\u0628\u062D\u0648\u062B \u0648\u062E\u0628\u064A\u0631 \u062C\u0648\u062F\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628.
\u0642\u0645 \u0628\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0627\u0631 \u062A\u0633\u062A \u0648\u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0644\u0644\u0634\u0628\u0629 \u0644\u0644\u0645\u062D\u0637\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0648\u0642\u062F\u0645 \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0641\u0646\u064A\u0627\u064B \u062F\u0642\u064A\u0642\u0627\u064B \u0648\u0645\u0628\u0627\u0634\u0631\u0627\u064B \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629:

\u0627\u0644\u0645\u062D\u0637\u0629: ${stationName || "\u0645\u062D\u0637\u0629 \u0645\u064A\u0627\u0647"}
- \u0639\u0643\u0627\u0631\u0629 \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u062E\u0627\u0645: ${turbidityNTU} NTU
- \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0647\u064A\u062F\u0631\u0648\u062C\u064A\u0646\u064A pH: ${pH}
- \u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629: ${temperatureC} \xB0\u0645
- \u062A\u0635\u0631\u0641 \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u062E\u0627\u0645: ${rawFlowM3h} \u0645\xB3/\u0633\u0627\u0639\u0629
- \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0644\u0644\u0634\u0628\u0629 (Jar Test): ${labDose} \u062C\u0645/\u0645\xB3
- \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u0645\u0637\u0628\u0642\u0629: ${actualDose} \u062C\u0645/\u0645\xB3
- \u0646\u0633\u0628\u0629 \u0627\u0644\u0641\u0627\u0631\u0642/\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641: ${variancePct}%

\u0642\u062F\u0645:
1. \u062A\u0642\u064A\u064A\u0645 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u062A\u0631\u0648\u064A\u0628 \u0648\u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0634\u0628\u0629
2. \u062A\u062D\u0644\u064A\u0644 \u062F\u0642\u064A\u0642 \u0644\u0644\u0641\u0627\u0631\u0642 \u0628\u064A\u0646 \u0627\u0644\u062C\u0631\u0639\u0629 \u0627\u0644\u0645\u0639\u0645\u0644\u064A\u0629 \u0648\u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0648\u0623\u062B\u0631\u0647 \u0627\u0644\u0641\u0646\u064A \u0648\u0627\u0644\u0645\u0627\u0644\u064A
3. \u062A\u0648\u0635\u064A\u0627\u062A \u0641\u0648\u0631\u064A\u0629 \u0644\u0636\u0628\u0637 \u0637\u0644\u0645\u0628\u0627\u062A \u0627\u0644\u062D\u0642\u0646 \u0648\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u0641 \u0627\u0644\u062D\u062C\u0645\u064A
4. \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0644\u0645\u0634\u063A\u0644\u064A \u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A
`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1500 }
        })
      }
    );
    const data = await response.json();
    if (data.error) return res.json({ success: false, error: data.error.message });
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ success: true, text: text || "\u062A\u0645 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D" });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});
apiRouter.post("/ai/diagnose-breakdown", async (req, res) => {
  const { assetType, assetLabel, severity, description, stationName } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === '""' || apiKey === "") {
    const advice = `### \u{1F6E0}\uFE0F \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0639\u0637\u0644 \u0627\u0644\u0647\u0646\u062F\u0633\u064A - ${stationName || "\u0627\u0644\u0645\u062D\u0637\u0629"}

* **\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629:** ${assetLabel || assetType} (${assetType})
* **\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629:** ${severity}
* **\u0627\u0644\u062A\u0648\u0635\u064A\u0641:** ${description}

**\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0641\u0646\u064A\u0629 \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627:**
1. \u0639\u0632\u0644 \u0627\u0644\u0645\u0639\u062F\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0627\u064B \u0648\u0647\u064A\u062F\u0631\u0648\u0644\u064A\u0643\u064A\u0627\u064B \u0648\u062A\u0637\u0628\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (LOTO).
2. \u0641\u062D\u0635 \u0627\u0644\u0645\u062D\u0627\u0630\u0627\u0629 \u0648\u0627\u0644\u0633\u064A\u0648\u0631 \u0648\u0627\u0644\u0631\u0645\u0627\u0646 \u0628\u0644\u064A \u0648\u0627\u0644\u062A\u0633\u0631\u064A\u0628 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A.
3. \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0641\u0648\u0631\u0627\u064B \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629 \u0636\u062E \u0648\u062A\u0635\u0631\u0641 \u0627\u0644\u0645\u062D\u0637\u0629.
4. \u0637\u0644\u0628 \u0642\u0637\u0639 \u0627\u0644\u063A\u064A\u0627\u0631 \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0648\u0625\u0635\u062F\u0627\u0631 \u0623\u0645\u0631 \u0634\u063A\u0644 \u0635\u064A\u0627\u0646\u0629 \u0639\u0627\u062C\u0644.`;
    return res.json({ success: true, text: advice });
  }
  try {
    const prompt = `
\u0623\u0646\u062A \u0643\u0628\u064A\u0631 \u0645\u0647\u0646\u062F\u0633\u064A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0648\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0641\u064A \u0634\u0631\u0643\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628.
\u0642\u062F\u0645 \u062A\u0634\u062E\u064A\u0635\u0627\u064B \u0647\u0646\u062F\u0633\u064A\u0627\u064B \u0639\u0627\u062C\u0644\u0627\u064B \u0648\u062E\u0637\u0629 \u0635\u064A\u0627\u0646\u0629 \u0644\u0644\u0639\u0637\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629:
- \u0627\u0644\u0645\u062D\u0637\u0629: ${stationName}
- \u0646\u0648\u0639 \u0627\u0644\u0623\u0635\u0644: ${assetType}
- \u0628\u064A\u0627\u0646 \u0627\u0644\u0645\u0639\u062F\u0629: ${assetLabel}
- \u062F\u0631\u062C\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${severity}
- \u0648\u0635\u0641 \u0627\u0644\u0639\u0637\u0644: ${description}

\u0627\u0644\u0645\u0637\u0644\u0648\u0628:
1. \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0623\u0631\u062C\u062D \u0644\u0633\u0628\u0628 \u0627\u0644\u0639\u0637\u0644
2. \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0641\u0646\u064A\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0644\u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0639\u0637\u0644
3. \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0632\u064A\u0629 \u0644\u062A\u062C\u0646\u0628 \u0646\u0642\u0635 \u0627\u0644\u0625\u0646\u062A\u0627\u062C
4. \u0642\u0637\u0639 \u0627\u0644\u063A\u064A\u0627\u0631 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629
`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1200 }
        })
      }
    );
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ success: true, text: text || "\u062A\u0645 \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0639\u0637\u0644" });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});
apiRouter.post("/ai/analyze-station", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === '""' || apiKey === "") {
    return res.json({
      success: false,
      error: "GEMINI_API_KEY \u063A\u064A\u0631 \u0645\u0636\u0628\u0648\u0637 \u0641\u064A \u0645\u0644\u0641 .env \u2014 \u0623\u0636\u0641 \u0645\u0641\u062A\u0627\u062D Gemini API \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0630\u0643\u064A"
    });
  }
  try {
    const { stationName, date, stats, targets, recentBreakdowns } = req.body;
    const prompt = `
\u0623\u0646\u062A \u0645\u0647\u0646\u062F\u0633 \u0645\u062A\u062E\u0635\u0635 \u0641\u064A \u0645\u062D\u0637\u0627\u062A \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u064A\u0627\u0647 \u0627\u0644\u0634\u0631\u0628. \u062D\u0644\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0637\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0648\u0642\u062F\u0645 \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0647\u0646\u062F\u0633\u064A\u0627\u064B \u0645\u062E\u062A\u0635\u0631\u0627\u064B \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629.

\u0627\u0644\u0645\u062D\u0637\u0629: ${stationName}
\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${date}

\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:
- \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0627\u0644\u0643\u0644\u064A: ${stats?.total_prod?.toLocaleString() || 0} \u0645\xB3
- \u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0627\u0644\u064A\u0648\u0645\u064A: ${stats?.avg_production?.toLocaleString() || 0} \u0645\xB3/\u064A\u0648\u0645
- \u0627\u0644\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629: ${stats?.avg_eff ? (stats.avg_eff * 100).toFixed(2) : 0}%
- \u0627\u0644\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629: ${targets?.efficiency_target ? (targets.efficiency_target * 100).toFixed(0) : 90}%
- \u0643\u0647\u0631\u0628\u0627\u0621/\u0645\xB3: ${stats?.avg_kwh_m3?.toFixed(4) || 0}
- \u0646\u0637\u0627\u0642 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0627\u0644\u0645\u0642\u0628\u0648\u0644: ${targets?.kwh_per_m3_min || 0.18} - ${targets?.kwh_per_m3_max || 0.28}
- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0628\u0629: ${stats?.total_alum?.toFixed(2) || 0} \u0637\u0646
- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0644\u0648\u0631: ${stats?.total_chlorine?.toFixed(3) || 0} \u0637\u0646
- \u0631\u0648\u0628\u0629 \u0627\u0644\u0645\u0631\u0648\u0642\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0631\u0629: ${stats?.sludge_m3?.toLocaleString() || 0} \u0645\xB3

\u0627\u0644\u0623\u0639\u0637\u0627\u0644 \u0627\u0644\u0623\u062E\u064A\u0631\u0629: ${recentBreakdowns?.length || 0} \u0639\u0637\u0644 \u0645\u0633\u062C\u0644

\u0642\u062F\u0645:
1. \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629
2. \u062A\u062D\u0644\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621
3. \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0643\u064A\u0645\u0627\u0648\u064A\u0627\u062A
4. \u062A\u0648\u0635\u064A\u0627\u062A \u0644\u0644\u062A\u062D\u0633\u064A\u0646
5. \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0625\u0646 \u0648\u062C\u062F\u062A
`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1500 }
        })
      }
    );
    const data = await response.json();
    if (data.error) {
      return res.json({ success: false, error: data.error.message });
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.json({ success: false, error: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0631\u062F \u0645\u0646 Gemini" });
    res.json({ success: true, text });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});
apiRouter.post("/logs/client-error", (req, res) => {
  try {
    const { message, stack, context } = req.body;
    logger.error(`[Client Error] ${message} | Context: ${JSON.stringify(context || {})} | Stack: ${stack || "N/A"}`);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// server.ts
var import_morgan = __toESM(require("morgan"), 1);
import_dotenv.default.config();
var dirName = typeof __dirname !== "undefined" ? __dirname : import_path2.default.dirname(process.argv[1] || process.cwd());
var isBundle = process.argv[1]?.endsWith("server.cjs") ?? false;
var STATIC = isBundle ? dirName : import_path2.default.join(dirName, "dist");
var isDev = process.env.NODE_ENV !== "production" && !isBundle;
async function startServer() {
  await initDb();
  const app = (0, import_express2.default)();
  const PORT = parseInt(process.env.PORT || "3000");
  app.use(import_express2.default.json({ limit: "10mb" }));
  app.use((0, import_morgan.default)("combined", {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
  app.use("/api", apiRouter);
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(import_express2.default.static(STATIC));
    app.get("*", (_req, res) => {
      res.sendFile(import_path2.default.join(STATIC, "index.html"));
    });
  }
  app.listen(PORT, () => {
    logger.info(`
\u{1F4A7} Water Stations Hub`);
    logger.info(`\u{1F680} URL:      http://localhost:${PORT}`);
    logger.info(`\u{1F4E1} API:      http://localhost:${PORT}/api/health`);
    logger.info(`\u{1F5C4}\uFE0F  Mode:     ${isDev ? "development" : "production"}`);
    logger.info(`\u{1F4C1} Static:   ${STATIC}`);
    logger.info(`\u{1F4BE} Database: MySQL \u2192 ${process.env.DB_NAME || "water_stations"}@${process.env.DB_HOST || "localhost"}
`);
  });
}
startServer().catch((err) => {
  logger.error("\u274C Server failed to start:", err.message);
  process.exit(1);
});
//# sourceMappingURL=server.cjs.map
