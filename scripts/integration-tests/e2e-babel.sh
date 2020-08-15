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
# We only bump dependencies in the top-level package.json, because workspaces
# already use the workspace: protocol so will get the version in the monorepo
# and not from npm.
yarn up '@babel/*'

# Test
yarn install --inline-builds
make test-ci

cleanup
