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

# Install dependencies in individual packages so that we can link them at the top level.
# todo: remove `-- -- --ignore-engines` in Babel 8
for package in eslint/*/; do yarn --ignore-engines --cwd $package; done

yarn upgrade --scope @babel

# Test
make test-ci

cleanup
