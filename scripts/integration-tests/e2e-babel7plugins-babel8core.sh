#!/usr/bin/env bash

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

# The local monorepo should be built as Babel 7
export BABEL_8_BREAKING=
# We use 'latest' for the published one because e2e CI
# publishes Babel 8 marking it as Babel 7 stable
export BABEL_CORE_DEV_DEP_VERSION=latest

./test/babel-7-8-compat/babel-7-plugins-with-babel-8-core.sh

cleanup
