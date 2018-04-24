#!/bin/bash
set -e

node="node"
jestArgs=()

if [ "$TEST_DEBUG" ]; then
  node="node --inspect-brk"
  jestArgs+=("--runInBand")
fi

if [ -n "$CI" ]; then
  jestArgs+=("--maxWorkers=4")
  jestArgs+=("--ci")
fi

if [ -n "$TEST_GREP" ]; then
  jestArgs+=("-t")
  jestArgs+=("$TEST_GREP")
fi

if [ -n "$TEST_ONLY" ]; then
  jestArgs+=("(packages|codemods)/.*$TEST_ONLY.*/test")
fi

$node node_modules/.bin/jest "${jestArgs[@]}"
