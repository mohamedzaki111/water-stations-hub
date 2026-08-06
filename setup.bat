@echo off
chcp 65001 > nul 2>&1
title Water Stations Hub

echo.
echo ====================================================
echo   Water Stations Hub - Local Setup
echo ====================================================
echo.

:: Check Node.js
node -v > nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is NOT installed.
    echo.
    echo Please install from: https://nodejs.org
    echo Choose: Windows Installer LTS
    echo.
    start https://nodejs.org/en/download
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo [OK] Node.js %NODE_VER% detected
echo.

:: Check npm
npm -v > nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found. Reinstall Node.js.
    pause
    exit /b 1
)
echo [OK] npm detected
echo.

:: Create .env if missing
if not exist ".env" (
    echo [..] Creating .env file...
    echo # Server > .env
    echo PORT=3000 >> .env
    echo NODE_ENV=development >> .env
    echo. >> .env
    echo # MySQL Database >> .env
    echo DB_HOST=localhost >> .env
    echo DB_PORT=3306 >> .env
    echo DB_USER=root >> .env
    echo DB_PASSWORD= >> .env
    echo DB_NAME=water_stations >> .env
    echo [OK] .env created
    echo.
)

:: Install node_modules if missing
if not exist "node_modules\" (
    echo [..] Installing packages - please wait...
    echo.
    call npm install --ignore-scripts
    if errorlevel 1 (
        echo.
        echo [ERROR] npm install failed.
        echo Make sure you have internet connection.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Packages installed successfully
    echo.
) else (
    echo [OK] node_modules already exists
    echo.
)

:: Show current .env
echo ====================================================
echo   Current database settings:
echo ====================================================
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DB_HOST"     echo   Host:     %%b
    if "%%a"=="DB_PORT"     echo   Port:     %%b
    if "%%a"=="DB_USER"     echo   User:     %%b
    if "%%a"=="DB_NAME"     echo   Database: %%b
    if "%%a"=="PORT"        echo   App Port: %%b
)
echo ====================================================
echo.
echo Make sure MySQL is running and the database exists.
echo To create it, run this SQL command in MySQL:
echo.
echo   CREATE DATABASE water_stations CHARACTER SET utf8mb4;
echo.
echo Edit .env to change database password? (y/n)
set /p EDIT_CHOICE="> "
if /i "%EDIT_CHOICE%"=="y" (
    notepad .env
    echo Waiting for Notepad to close...
    echo Press any key to continue after saving .env
    pause > nul
)

:: Open browser after delay
echo.
echo ====================================================
echo   Starting server...
echo   URL: http://localhost:3000
echo ====================================================
echo.
echo   Login accounts:
echo     admin      ^| 123  - Central Admin
echo     giza_mgr   ^| 123  - Giza Station Manager
echo     sally      ^| 123  - Giza Station Staff
echo     imbaba_mgr ^| 123  - Imbaba Station Manager
echo     dahab_mgr  ^| 123  - Dahab Station Manager
echo     cost_acct  ^| 123  - Cost Accountant
echo.
echo   Press Ctrl+C to stop the server
echo ====================================================
echo.

:: Open browser after 5 seconds
start /b "" cmd /c "ping 127.0.0.1 -n 6 > nul && start http://localhost:3000"

:: Run dev server
call npm run dev

echo.
echo Server stopped.
pause
