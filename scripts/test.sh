#!/bin/bash
set -e

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

node="node"
runSequentially=""

if [ "$TEST_DEBUG" ]; then
   node="node --inspect --debug-brk"
fi

if [ -n "$CI" ]; then
  runSequentially="--runInBand"
fi

$node node_modules/.bin/jest "$TEST_GREP"
