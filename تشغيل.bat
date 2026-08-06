@echo off
chcp 65001 >nul
title مركز بيانات محطات المياه — Water Stations Hub

echo.
echo  ====================================================
echo    مركز بيانات محطات المياه
echo    Water Stations Hub
echo  ====================================================
echo.

:: ── Check Node.js ─────────────────────────────────────────────
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js غير مثبت على جهازك
    echo.
    echo     حمّل وثبّت Node.js من:
    echo     https://nodejs.org/en/download
    echo     اختر: Windows Installer ^(.msi^) LTS
    echo.
    pause
    start https://nodejs.org/en/download
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER% موجود

:: ── Check npm ─────────────────────────────────────────────────
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] npm غير موجود — أعد تثبيت Node.js
    pause
    exit /b 1
)

:: ── Create .env if not exists ──────────────────────────────────
if not exist ".env" (
    echo [..] إنشاء ملف الإعدادات .env
    (
        echo # Server
        echo PORT=3000
        echo NODE_ENV=development
        echo.
        echo # MySQL Database
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_USER=root
        echo DB_PASSWORD=
        echo DB_NAME=water_stations
    ) > .env
    echo [OK] تم إنشاء .env — عدّل كلمة مرور MySQL إذا لزم
    echo.
)

:: ── Install dependencies ───────────────────────────────────────
if not exist "node_modules" (
    echo [..] تثبيت المكتبات ^(قد يأخذ دقيقتين^)...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [!] فشل تثبيت المكتبات
        pause
        exit /b 1
    )
    echo [OK] تم تثبيت المكتبات
    echo.
) else (
    echo [OK] المكتبات مثبتة مسبقاً
)

:: ── Check MySQL ────────────────────────────────────────────────
echo.
echo [..] التحقق من MySQL...
where mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ====================================================
    echo   تحذير: MySQL غير موجود في PATH
    echo  ====================================================
    echo.
    echo   خيار 1: ثبّت MySQL من:
    echo   https://dev.mysql.com/downloads/mysql/
    echo.
    echo   خيار 2: ثبّت XAMPP ^(أسهل^):
    echo   https://www.apachefriends.org/download.html
    echo   ثم شغّل MySQL من XAMPP Control Panel
    echo.
    echo   خيار 3: استخدم MySQL الموجود على الاستضافة
    echo   وعدّل ملف .env بمعلومات الاتصال
    echo.
    echo  ====================================================
    echo.
    set /p CONTINUE="هل تريد المتابعة بدون MySQL محلي؟ (y/n): "
    if /i not "%CONTINUE%"=="y" (
        pause
        exit /b 1
    )
) else (
    echo [OK] MySQL موجود
)

:: ── Show current .env settings ────────────────────────────────
echo.
echo  ====================================================
echo   إعدادات قاعدة البيانات الحالية:
echo  ====================================================
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DB_HOST"     echo   Host:     %%b
    if "%%a"=="DB_PORT"     echo   Port:     %%b
    if "%%a"=="DB_USER"     echo   User:     %%b
    if "%%a"=="DB_NAME"     echo   Database: %%b
    if "%%a"=="PORT"        echo   App Port: %%b
)
echo  ====================================================
echo.
set /p EDIT_ENV="هل تريد تعديل الإعدادات أولاً؟ (y/n): "
if /i "%EDIT_ENV%"=="y" (
    notepad .env
    echo.
    echo [..] انتظر حتى تغلق Notepad ثم اضغط أي مفتاح...
    pause >nul
)

:: ── Start application ──────────────────────────────────────────
echo.
echo  ====================================================
echo   تشغيل التطبيق...
echo  ====================================================
echo.
echo   الرابط: http://localhost:3000
echo.
echo   حسابات الدخول:
echo     admin      / 123  ^(إدارة مركزية^)
echo     giza_mgr   / 123  ^(مدير محطة الجيزة^)
echo     sally      / 123  ^(مسؤول محطة الجيزة^)
echo     imbaba_mgr / 123  ^(مدير محطة إمبابة^)
echo     dahab_mgr  / 123  ^(مدير محطة الدهب^)
echo     cost_acct  / 123  ^(محاسب التكاليف^)
echo.
echo   اضغط Ctrl+C لإيقاف التطبيق
echo  ====================================================
echo.

:: Open browser after 3 seconds
start /b cmd /c "timeout /t 3 >nul && start http://localhost:3000"

:: Run dev server
call npm run dev

echo.
echo [..] تم إيقاف التطبيق
pause
