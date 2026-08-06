@echo off
chcp 65001 >nul
title Water Stations Hub

echo.
echo  ====================================================
echo    Water Stations Hub - Local Setup
echo  ====================================================
echo.

:: ── Check Node.js ─────────────────────────────────────────────
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo  Please install Node.js from:
    echo  https://nodejs.org/en/download
    echo  Choose: Windows Installer LTS
    echo.
    pause
    start https://nodejs.org/en/download
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER% found

:: ── Create .env if not exists ──────────────────────────────────
if not exist ".env" (
    echo [..] Creating .env config file...
    (
        echo # Server
        echo PORT=3000
        echo NODE_ENV=development
        echo.
        echo # MySQL - Edit these with your database credentials
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_USER=root
        echo DB_PASSWORD=
        echo DB_NAME=water_stations
    ) > .env
    echo [OK] .env created - edit DB_PASSWORD if needed
    echo.
)

:: ── Install dependencies ───────────────────────────────────────
if not exist "node_modules" (
    echo [..] Installing packages (may take 2 minutes^)...
    call npm install --ignore-scripts
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed
        pause
        exit /b 1
    )
    echo [OK] Packages installed
) else (
    echo [OK] node_modules already exists
)

:: ── Show DB settings ───────────────────────────────────────────
echo.
echo  Current database settings ^(.env^):
echo  ----------------------------------------
for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    if "%%a"=="DB_HOST"     echo   Host:     %%b
    if "%%a"=="DB_USER"     echo   User:     %%b
    if "%%a"=="DB_NAME"     echo   Database: %%b
    if "%%a"=="PORT"        echo   App Port: %%b
)
echo  ----------------------------------------
echo.
echo  Make sure MySQL is running and database exists:
echo  CREATE DATABASE water_stations CHARACTER SET utf8mb4;
echo.

set /p EDIT="Edit .env settings first? (y/n): "
if /i "%EDIT%"=="y" (
    notepad .env
    pause
)

:: ── Launch ────────────────────────────────────────────────────
echo.
echo  Starting server...
echo  Open: http://localhost:3000
echo.
echo  Login accounts:
echo    admin      / 123
echo    giza_mgr   / 123
echo    sally      / 123
echo    cost_acct  / 123
echo.
echo  Press Ctrl+C to stop
echo  ====================================================
echo.

start /b cmd /c "timeout /t 4 >nul && start http://localhost:3000"
call npm run dev

pause
