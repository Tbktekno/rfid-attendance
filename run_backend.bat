@echo off
TITLE AttendTrack Backend
echo ========================================================
echo   AttendTrack - Backend Service (Gateway + gRPC)
echo ========================================================
echo.

:: Check for node_modules
if not exist "node_modules" (
    echo [ERROR] node_modules not found. Running npm install...
    call npm install
)

echo [INFO] Starting Backend Services...
npm run dev
pause
