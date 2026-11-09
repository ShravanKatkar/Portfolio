@echo off
title Shravan Katkar - Portfolio 2.0 Dev Server
cd /d "%~dp0"

echo ===================================================
echo   SHRAVAN KATKAR // PORTFOLIO 2.0
echo   Starting Local Development Environment...
echo ===================================================
echo.

:: Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [!] Dependencies missing. Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo [X] Failed to install dependencies.
        pause
        exit /b %errorlevel%
    )
    echo [OK] Dependencies installed successfully.
    echo.
)

echo [*] Launching Vite development server and opening browser...
echo [*] Press Ctrl+C in this terminal window to stop the server anytime.
echo.

call npm run dev -- --open

if %errorlevel% neq 0 (
    echo [!] Server exited with an error.
    pause
)

