@echo off
SETLOCAL EnableDelayedExpansion


set "VENV_PATH=C:\Users\Andres\Desktop\Biometricssa1.0\Biometrics-SA\biometricssa"
set "FRONTEND_PATH=C:\Users\Andres\Desktop\Biometricssa1.0\Biometrics-SA\Front"
set "BACKEND_PATH=C:\Users\Andres\Desktop\Biometricssa1.0\Biometrics-SA"

echo Starting Biometrics SA Application...


echo Starting Backend...
cd /d "%VENV_PATH%\Scripts"
call activate.bat
if errorlevel 1 (
    echo Failed to activate virtual environment
    pause
    exit /b 1
)

:: Iniciar el backend en una nueva ventana
start cmd /k "cd /d "%BACKEND_PATH%" && python app.py"

:: Esperar un momento para que el backend inicie
timeout /t 5 /nobreak

:: Cambiar al directorio del frontend e iniciar la aplicación
echo Starting Frontend...
cd /d "%FRONTEND_PATH%"

:: Iniciar el frontend (Vite)
start cmd /k "npm run dev"

:: Esperar un momento para que el frontend inicie
timeout /t 5 /nobreak

:: Iniciar Electron
echo Starting Electron...
start cmd /k "npm run electronn: package script"

echo All processes started!
echo Press any key to close this window...
pause > nul