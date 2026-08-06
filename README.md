# 💧 مركز بيانات محطات المياه

نظام إدارة بيانات محطات معالجة المياه — الشركة القابضة لمياه الشرب والصرف الصحي

## التقنيات
- **Frontend:** React 19 + TypeScript + Recharts
- **Backend:** Node.js + Express
- **Database:** MySQL (mysql2)

---

## إعداد قاعدة البيانات (MySQL)

### 1. إنشاء قاعدة البيانات
```sql
CREATE DATABASE water_stations CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wsh_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON water_stations.* TO 'wsh_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. إعداد ملف .env
```bash
cp .env.example .env
```
ثم عدّل القيم:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=wsh_user
DB_PASSWORD=strong_password
DB_NAME=water_stations
PORT=3000
```

### 3. الجداول
تُنشأ تلقائياً عند أول تشغيل:
- `stations` — بيانات المحطات الثابتة
- `users` — المستخدمون والصلاحيات
- `daily_records` — السجلات اليومية
- `breakdowns` — سجل الأعطال

---

## التشغيل

### تطوير (Development)
```bash
npm install
npm run dev
# ثم: http://localhost:3000
```

### إنتاج (Production)
```bash
npm install
npm run build
npm start
```

---

## النشر على cPanel / Shared Hosting

```bash
# 1. رفع الملفات
# 2. إنشاء قاعدة بيانات MySQL من cPanel
# 3. تعديل .env بمعلومات الاتصال
npm install --production
npm run build
npm start
```

---

## حسابات تجريبية
| اسم المستخدم | الدور | كلمة المرور |
|---|---|---|
| `admin` | إدارة مركزية | 123 |
| `giza_mgr` | مدير محطة الجيزة | 123 |
| `sally` | مسؤول محطة الجيزة | 123 |
| `imbaba_mgr` | مدير محطة إمبابة | 123 |
| `dahab_mgr` | مدير محطة الدهب | 123 |
| `cost_acct` | محاسب التكاليف | 123 |

---

## API Endpoints
```
POST   /api/auth/login
GET    /api/stations
POST   /api/stations
PUT    /api/stations/:id
GET    /api/users
POST   /api/users
PUT    /api/users/:id
GET    /api/records?station_id=&month=&limit=
POST   /api/records
PUT    /api/records/:id
DELETE /api/records/:id
GET    /api/stats/:stationId?month=
GET    /api/breakdowns?station_id=
POST   /api/breakdowns
PUT    /api/breakdowns/:id/resolve
DELETE /api/breakdowns/:id
GET    /api/health
```
