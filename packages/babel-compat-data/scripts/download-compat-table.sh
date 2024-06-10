#!/usr/bin/env bash
set -e

# TODO point back at official version once PR merged
COMPAT_TABLE_COMMIT=a40a7a2f93a4a07788a87a66115ac3e5138b9151
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
# TODO point back at official version once PR merged
git clone --shallow-since=2020-04-01 https://github.com/davidtaylorhq/compat-table.git -b instance-class-fields-resolving-identifier-in-parent-scope build/compat-table
cd build/compat-table && git checkout -q $COMPAT_TABLE_COMMIT
