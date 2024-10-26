#!/usr/bin/env bash
set -e

COMPAT_TABLE_COMMIT=33466591e889d5c6622c8e89df94bb105667d5c8
GIT_HEAD=build/compat-table/.git/HEAD

if [ -d "build/compat-table" ]; then
  cd build/compat-table
  commit="$(git rev-parse HEAD)"
  cd ../..

  if [ $commit == $COMPAT_TABLE_COMMIT ]; then
    exit 0
  fi
fi

rm -rf build/compat-table
mkdir -p build
git clone --single-branch --shallow-since=2024-04-01 https://github.com/compat-table/compat-table.git build/compat-table
cd build/compat-table && git checkout -q $COMPAT_TABLE_COMMIT
