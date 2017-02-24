#!/bin/sh
set -e

runSequentially=""

if [ "$CI" ]; then
  runSequentially="--runInBand"
fi

node_modules/.bin/jest --coverage $runSequentially