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

# Clone vue-cli
git clone --depth=1 https://github.com/vuejs/vue-cli tmp/vue-cli
cd tmp/vue-cli || exit

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/../../verdaccio-config.yml
yarn install
# Workaround https://github.com/yarnpkg/yarn/issues/7797
yarn add --dev -W @babel/core
# "yarn upgrade --scope @babel --latest" doesn't seem to work.
# a means "all", while \n is the enter needed to confirm the selection.
printf "a\n" | yarn upgrade-interactive --scope @babel --latest

# Test
CI=true yarn test -p babel,babel-preset-app

cleanup
