#!/bin/bash
set -e

jestArgs="--coverage"

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --maxWorkers=4 --ci"
fi

node_modules/.bin/jest $jestArgs
