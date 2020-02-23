#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml
yarn
node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js
yarn lerna exec -- node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js

# Test
yarn
make test-ci

cleanup
