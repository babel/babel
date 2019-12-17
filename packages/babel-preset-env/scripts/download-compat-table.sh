#!/bin/bash
set -e

COMPAT_TABLE_COMMIT=4195aca631ad904cb0efeb62a9c2d8c8511706f8
rm -rf build/compat-table
mkdir -p build
git clone --branch=gh-pages --single-branch --shallow-since=2019-11-14 https://github.com/kangax/compat-table.git build/compat-table
cd build/compat-table && git checkout -qf $COMPAT_TABLE_COMMIT
