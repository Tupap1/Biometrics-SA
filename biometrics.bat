@echo off
SETLOCAL EnableDelayedExpansion


set "VENV_PATH=C:/Andres/Proyectos/Biometrics-SA/biometricssa"
set "FRONTEND_PATH=C:/Andres/Proyectos/Biometrics-SA/Front"
set "BACKEND_PATH=C:/Andres/Proyectos/Biometrics-SA/"

echo Starting Biometrics SA Application...


echo Starting Frontend...
cd /d "%FRONTEND_PATH%"


start cmd /k "npm run dev"


timeout /t 1 /nobreak


echo Starting Electron...
start cmd /k "npm run electronn: package script"

echo All processes started!
echo Press any key to close this window...
pause > nul