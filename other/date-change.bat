@echo off
setlocal

:program

date 09-09-2024
time 03:00:00

set /a second=25
:tomorrow
cls
echo Tomorrow %second%
timeout /t 1 /nobreak >nul
set /a second -= 1
if %second% GTR 0 goto :tomorrow

date 08-09-2024
time 03:00:00

set /a second=25
:today
cls
echo Today %second%
timeout /t 1 /nobreak >nul
set /a second -= 1
if %second% GTR 0 goto :today

goto :program