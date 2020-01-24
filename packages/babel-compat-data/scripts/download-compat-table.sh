#!/bin/bash
set -e

COMPAT_TABLE_COMMIT=4e9369a699b0e15ba5c21586ce3bdd34299db9c1
rm -rf build/compat-table
mkdir -p build
git clone --branch=gh-pages --single-branch --shallow-since=2019-11-14 https://github.com/kangax/compat-table.git build/compat-table
cd build/compat-table && git checkout -qf $COMPAT_TABLE_COMMIT
