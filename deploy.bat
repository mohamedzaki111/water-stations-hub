@echo off
title Build and Deploy

echo Killing process on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing PID %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo Building...
call npm run build
if errorlevel 1 (
    echo BUILD FAILED
    pause
    exit /b 1
)
echo Build OK

echo Pushing to GitHub...
git add dist/
git commit -m "build: update dist"
git push origin main

echo Done - now run on server:
echo git fetch origin ^&^& git reset --hard origin/main
pause
