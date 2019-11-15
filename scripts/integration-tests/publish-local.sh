#!/bin/bash

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

make bootstrap-only

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml
loginLocalRegistry

I_AM_USING_VERDACCIO=I_AM_SURE make publish-test

make publish-eslint PKG=babel-eslint-config-internal
make publish-eslint PKG=babel-eslint-parser
make publish-eslint PKG=babel-eslint-plugin
make publish-eslint PKG=babel-eslint-plugin-development

cleanup
