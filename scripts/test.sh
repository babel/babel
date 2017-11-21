#!/bin/bash
set -e

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

node="node"
jestArgs=""

if [ "$TEST_DEBUG" ]; then
   node="node --inspect-brk"
fi

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --runInBand --ci"
fi

$node node_modules/.bin/jest $jestArgs "$TEST_GREP"
