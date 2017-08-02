#!/bin/sh
set -e

cp packages/babel-types/README.md babel-types_README
make babel-types-docs

cmp --silent packages/babel-types/README.md babel-types_README
rm babel-types_README
