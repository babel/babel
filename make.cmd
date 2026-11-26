@cd /d "%~dp0"
@chcp 65001 >nul
@yarn node ./Makefile.js %*
