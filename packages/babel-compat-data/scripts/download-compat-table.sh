#!/usr/bin/env bash
set -e

COMPAT_TABLE_COMMIT=0ad4479cc670fd98937044dc9273282d9ae94cfb
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
