#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")"

source utils/local-registry.sh
source utils/git.sh
source utils/cleanup.sh

function publishESLintPkg {
  cd eslint/$1
  npm version --patch --no-git-tag-version
  cd ../..
  make -j publish-eslint PKG=$1
}

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

I_AM_USING_VERDACCIO=I_AM_SURE make publish-test

publishESLintPkg babel-eslint-config-internal
publishESLintPkg babel-eslint-parser
publishESLintPkg babel-eslint-plugin
publishESLintPkg babel-eslint-plugin-development

cleanup
