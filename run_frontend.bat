@echo off
TITLE AttendTrack Frontend
echo ========================================================
echo   AttendTrack - Frontend (React + Vite)
echo ========================================================
echo.

cd frontend
if not exist "node_modules" (
    echo [INFO] node_modules not found in frontend. Running npm install...
    call npm install
)

npm run dev
pause
