@echo off
SETLOCAL EnableDelayedExpansion


set "VENV_PATH=C:/Andres/Proyectos/Biometrics-SA/biometricssa"
set "FRONTEND_PATH=C:/Andres/Proyectos/Biometrics-SA/Front"
set "BACKEND_PATH=C:/Andres/Proyectos/Biometrics-SA/"

echo Starting Biometrics SA Application...


echo Starting Backend...
cd /d "%VENV_PATH%\Scripts"
call activate.bat
if errorlevel 1 (
    echo Failed to activate virtual environment
    pause
    exit /b 1
)


start cmd /k "cd /d "%BACKEND_PATH%" && python app.py"


timeout /t 5 /nobreak


echo Starting Frontend...
cd /d "%FRONTEND_PATH%"


start cmd /k "npm run dev"


timeout /t 5 /nobreak


echo Starting Electron...
start cmd /k "npm run electronn: package script"

echo All processes started!
echo Press any key to close this window...
pause > nul