@echo off
rem Сборка EcoҚуат.exe для Windows (нужен Python 3.9+)
cd /d "%~dp0"
if not exist .venv (
  py -m venv .venv
  .venv\Scripts\python -m pip install --upgrade pip
  .venv\Scripts\python -m pip install pywebview pyinstaller pillow
)
.venv\Scripts\pyinstaller --noconfirm --clean --onefile --windowed ^
  --name EcoQuat --icon desktop_icon.ico ^
  --add-data "app;app" ^
  desktop\ecoquat_desktop.py
echo.
echo Готово: dist\EcoQuat.exe
pause
