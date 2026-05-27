@echo off
TITLE RFID v3 Development Suite
SetLocal EnableDelayedExpansion

echo ========================================================
echo   RFID v3 Attendance System - Development Launcher
echo ========================================================
echo.

:: Check for node_modules in root
if not exist "node_modules" (
    echo [ERROR] node_modules not found in root. Running npm install...
    call npm install
)

:: Starting Backend (Express Gateway + gRPC Server)
echo [1/3] Starting Backend (Gateway + gRPC)...
start "Backend (Node.js)" run_backend.bat

:: Starting Frontend
echo [2/3] Starting Frontend (Vite)...
start "Frontend (React)" run_frontend.bat

:: Starting Python Face Service
echo [3/3] Starting Python Face Service (FastAPI)...
start "Python (FastAPI)" run_ai.bat

echo.
echo ========================================================
echo   All services have been triggered in separate windows.
echo   - Backend: run_backend.bat
echo   - Frontend: run_frontend.bat
echo   - AI Service: run_ai.bat
echo ========================================================
echo.
pause
