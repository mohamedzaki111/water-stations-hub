@echo off
title Water Stations Hub

echo.
echo Water Stations Hub
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
    echo Creating .env file...
    (
        echo PORT=3000
        echo NODE_ENV=development
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_USER=root
        echo DB_PASSWORD=
        echo DB_NAME=water_stations
    ) > ".env"
    echo .env created - edit DB_PASSWORD if needed
    notepad .env
    pause > nul
)

if not exist "node_modules\" (
    echo Installing packages...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
    echo OK
)

echo.
echo Starting at http://localhost:3000
echo admin / 123
echo giza_mgr / 123
echo sally / 123
echo cost_acct / 123
echo.
echo Press Ctrl+C to stop
echo.

start /b "" cmd /c "ping -n 6 127.0.0.1 > nul && start http://localhost:3000"
call npm run dev

pause
