@cd /d "%~dp0"
: https://github.com/nodejs/node/commit/9095c914ed8467cf16f077a3fac20b1f1e89bbe4
@yarn node --security-revert=CVE-2024-27980 ./Makefile.js %*
