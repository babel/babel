#!/bin/bash
set -e

node="yarn --silent node"
jestArgs="--coverage"

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --maxWorkers=4 --ci"
fi

$node node_modules/.bin/jest $jestArgs
