#!/bin/sh
set -e

runSequentially=""

if [ -n "$CI" ]; then
  runSequentially="--runInBand"
fi

node_modules/.bin/jest --coverage $runSequentially