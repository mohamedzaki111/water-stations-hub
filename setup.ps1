# Water Stations Hub — PowerShell Setup Script
# Run: Right-click -> Run with PowerShell

$ErrorActionPreference = "Stop"
$Host.UI.RawUI.WindowTitle = "Water Stations Hub"

Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host "    مركز بيانات محطات المياه" -ForegroundColor Yellow
Write-Host "    Water Stations Hub" -ForegroundColor Yellow
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVer = node -v 2>&1
    Write-Host "  [OK] Node.js $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Node.js not found!" -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org" -ForegroundColor Yellow
    Start-Process "https://nodejs.org/en/download"
    Read-Host "Press Enter to exit"
    exit 1
}

# Create .env
$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "  [..] Creating .env..." -ForegroundColor Yellow
    @"
# Server
PORT=3000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=water_stations
"@ | Set-Content $envFile -Encoding UTF8
    Write-Host "  [OK] .env created" -ForegroundColor Green
}

# Install packages
$nodeModules = Join-Path $PSScriptRoot "node_modules"
if (-not (Test-Path $nodeModules)) {
    Write-Host "  [..] Installing packages..." -ForegroundColor Yellow
    Set-Location $PSScriptRoot
    npm install --ignore-scripts
    if ($LASTEXITCODE -ne 0) { Write-Host "  [ERROR] Install failed" -ForegroundColor Red; exit 1 }
    Write-Host "  [OK] Packages installed" -ForegroundColor Green
} else {
    Write-Host "  [OK] Packages already installed" -ForegroundColor Green
}

# Ask to edit .env
Write-Host ""
Write-Host "  Database settings in .env:" -ForegroundColor Cyan
Get-Content $envFile | Where-Object { $_ -match "^DB_|^PORT" } | ForEach-Object { Write-Host "    $_" }
Write-Host ""
$edit = Read-Host "  Edit .env before starting? (y/n)"
if ($edit -eq "y") {
    notepad $envFile
    Read-Host "Press Enter after saving .env"
}

# Open browser
Write-Host ""
Write-Host "  Starting server at http://localhost:3000" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

Start-Job -ScriptBlock { Start-Sleep 4; Start-Process "http://localhost:3000" } | Out-Null

Set-Location $PSScriptRoot
npm run dev
