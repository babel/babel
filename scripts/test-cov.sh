#!/bin/bash
set -e

jestArgs="--coverage"

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --runInBand"
fi

node_modules/.bin/jest $jestArgs
