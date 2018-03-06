#!/bin/bash
set -e

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

node="node"
jestArgs=""

if [ "$TEST_DEBUG" ]; then
  node="node --inspect-brk"
  jestArgs="${jestArgs} --runInBand"
fi

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --maxWorkers=4 --ci"
fi

$node node_modules/.bin/jest $jestArgs "$TEST_GREP"
