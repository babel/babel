#!/bin/sh
set -e

runParallel=""

if [ "$CI" ]; then
  runParallel="--i"
fi

node_modules/.bin/jest --coverage $runParallel