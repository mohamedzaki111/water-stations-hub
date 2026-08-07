@echo off
title Water Stations Hub

echo.
echo Water Stations Hub - Local Setup
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
    echo .env created
    echo Edit DB_PASSWORD if your MySQL has a password
    echo.
    echo Opening .env in Notepad...
    notepad .env
    echo Press any key after saving .env
    pause > nul
)

if not exist "node_modules\" (
    echo Installing packages, please wait...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
    echo Packages installed OK
)

echo.
echo Starting server at http://localhost:3000
echo.
echo  Accounts:
echo  admin      - 123
echo  giza_mgr   - 123
echo  sally      - 123
echo  cost_acct  - 123
echo.
echo Press Ctrl+C to stop
echo.

start /b "" cmd /c "ping -n 6 127.0.0.1 > nul && start http://localhost:3000"
call npm run dev

pause
