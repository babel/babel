@echo off

set dst=%~dp0.\dist
if exist "%dst%" rmdir /Q /S "%dst%"
mkdir "%dst%"

rem :: change to root directory of project
cd /D "%~dp0..\.."

call npm install

cd "packages\babel-standalone"
call npm install
cd ..\..
call node_modules\.bin\gulp.cmd build-babel-standalone
move "packages\babel-standalone\babel.js"                           "%dst%"
move "packages\babel-standalone\babel.min.js"                       "%dst%"

cd "packages\babel-preset-env-standalone"
call npm install
cd ..\..
call node_modules\.bin\gulp.cmd build-babel-preset-env-standalone
move "packages\babel-preset-env-standalone\babel-preset-env.js"     "%dst%"
move "packages\babel-preset-env-standalone\babel-preset-env.min.js" "%dst%"

echo.
pause
