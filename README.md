# 💧 مركز بيانات محطات المياه

نظام إدارة بيانات محطات معالجة المياه — الشركة القابضة لمياه الشرب والصرف الصحي

## التقنيات
- **Frontend:** React 19 + TypeScript + Recharts
- **Backend:** Node.js + Express
- **Database:** SQLite (better-sqlite3)

## التشغيل المحلي

```bash
npm install
npm run dev
```

ثم افتح: `http://localhost:3000`

## الإنتاج (Production)

```bash
npm run build
npm start
```

## حسابات تجريبية
| اسم المستخدم | الدور | كلمة المرور |
|---|---|---|
| `admin` | إدارة مركزية | 123 |
| `giza_mgr` | مدير محطة الجيزة | 123 |
| `sally` | مسؤول محطة الجيزة | 123 |
| `imbaba_mgr` | مدير محطة إمبابة | 123 |
| `dahab_mgr` | مدير محطة الدهب | 123 |
| `cost_acct` | محاسب التكاليف | 123 |

## هيكل المشروع
```
├── server.ts          # Express server + DB init
├── src/
│   ├── db/
│   │   ├── database.ts  # SQLite schema + seeding
│   │   └── api.ts       # REST API endpoints
│   ├── store/
│   │   ├── appStore.ts  # React state + API calls
│   │   └── apiClient.ts # HTTP client
│   ├── components/      # React components
│   ├── data/
│   │   └── initialData.ts # Seed data (129 records)
│   └── types.ts
├── data/              # SQLite database files (auto-created)
└── dist/              # Production build output
```

## API Endpoints
```
POST   /api/auth/login
GET    /api/stations
PUT    /api/stations/:id
GET    /api/records?station_id=&month=
POST   /api/records
PUT    /api/records/:id
DELETE /api/records/:id
GET    /api/stats/:stationId?month=
GET    /api/breakdowns?station_id=
POST   /api/breakdowns
PUT    /api/breakdowns/:id/resolve
DELETE /api/breakdowns/:id
```
