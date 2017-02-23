#!/bin/sh
set -e

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

node="node"
runParallel=""

if [ "$TEST_DEBUG" ]; then
   node="node --inspect --debug-brk"
fi

if [ "$CI" ]; then
  runParallel="--i"
fi

$node node_modules/.bin/jest "$TEST_GREP" $runParallel
