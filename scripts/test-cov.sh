#!/bin/bash
set -e

node="yarn node"
jestArgs="--coverage"

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --maxWorkers=4 --ci"
fi

$node "$(yarn bin jest)" $jestArgs
