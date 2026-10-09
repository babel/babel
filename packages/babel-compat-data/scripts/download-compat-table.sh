#!/usr/bin/env bash
set -e

COMPAT_TABLE_COMMIT=1bcd416b9f4399c71d3234c06bd0441074195743
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
git clone --depth 1 --revision=$COMPAT_TABLE_COMMIT https://github.com/compat-table/compat-table.git build/compat-table
