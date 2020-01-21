#!/bin/bash
set -e

COMPAT_TABLE_COMMIT=43ac2a8da591285472a4fe16d61c95da1f28032c
rm -rf build/compat-table
mkdir -p build
git clone --branch=gh-pages --single-branch --shallow-since=2019-11-14 https://github.com/kangax/compat-table.git build/compat-table
cd build/compat-table && git checkout -qf $COMPAT_TABLE_COMMIT
