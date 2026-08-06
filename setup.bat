@echo off
title Water Stations Hub

echo.
echo ====================================================
echo   Water Stations Hub - Local Setup
echo ====================================================
echo.

node -v > nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Download from: https://nodejs.org
    start https://nodejs.org/en/download
    pause
    exit /b 1
)
for /f %%i in ('node -v') do set NV=%%i
echo OK: Node.js %NV%

if not exist ".env" (
    echo OK: Creating .env
    (
        echo PORT=3000
        echo NODE_ENV=development
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_USER=root
        echo DB_PASSWORD=
        echo DB_NAME=water_stations
    ) > ".env"
)

if not exist "node_modules\" (
    echo OK: Installing packages, please wait...
    call npm install --ignore-scripts
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

echo.
echo Current .env settings:
type .env
echo.
echo Edit .env now? Press Y or N
choice /c YN /n /m "Choice: "
if errorlevel 2 goto START
notepad .env
echo Press any key after saving...
pause > nul

:START
echo.
echo Starting at http://localhost:3000
echo.
echo Login: admin / 123
echo Login: giza_mgr / 123
echo Login: sally / 123
echo Login: cost_acct / 123
echo.
echo Press Ctrl+C to stop
echo.

start /b "" cmd /c "ping -n 5 127.0.0.1 > nul && start http://localhost:3000"
call npm run dev

pause
