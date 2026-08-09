#!/bin/bash
# Keep-alive script for Water Stations Hub
# Add to cPanel Cron Jobs: */5 * * * * /home/dxtedwce/repositories/water-stations-hub/keep_alive.sh

APP_DIR="/home/dxtedwce/repositories/water-stations-hub"
NODE="/home/dxtedwce/nodevenv/repositories/water-stations-hub/20/bin/node"
LOG="$APP_DIR/logs/app.log"

mkdir -p "$APP_DIR/logs"

# Check if app is running on port 3000
if ! curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "$(date): App is down, restarting..." >> "$LOG"
    cd "$APP_DIR"
    nohup "$NODE" dist/server.cjs >> "$LOG" 2>&1 &
    echo "$(date): App restarted with PID $!" >> "$LOG"
else
    echo "$(date): App is running OK" >> "$LOG"
fi
