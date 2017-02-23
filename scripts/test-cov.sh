#!/bin/sh
set -e

runSequentially=""

if [ "$CI" ]; then
  runSequentially="--i"
fi

node_modules/.bin/jest --coverage $runSequentially