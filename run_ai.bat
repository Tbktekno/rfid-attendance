@echo off
TITLE AttendTrack AI Service
echo ========================================================
echo   AttendTrack - AI Face Recognition Service
echo ========================================================
echo.

cd python-face-service
if exist ".venv\Scripts\python.exe" (
    echo [INFO] Virtual environment found. Starting with venv...
    .venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
) else (
    where uvicorn >nul 2>nul
    if %ERRORLEVEL% neq 0 (
        echo [WARNING] uvicorn not found. Attempting to install requirements...
        pip install -r requirements.txt
    )
    uvicorn main:app --reload --port 8000
)
pause
