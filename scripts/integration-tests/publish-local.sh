#!/usr/bin/env bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")"

source utils/local-registry.sh
source utils/git.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

initializeE2Egit

#==============================================================================#
#                                 PUBLISH                                      #
#==============================================================================#

yarn

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml
loginLocalRegistry

# This script gets the last root package.json version,
# and then increases by one the patch number
VERSION=$(
  node -p "require('./package.json').version.replace(/(?<=\\d+\\.\\d+\\.)\\d+/, x => ++x)"
)

I_AM_USING_VERDACCIO=I_AM_SURE VERSION="$VERSION" make publish-test

cleanup
