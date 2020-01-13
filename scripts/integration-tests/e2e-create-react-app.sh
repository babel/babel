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

# Clone create-react-app
git clone --depth=1 https://github.com/facebook/create-react-app.git tmp/create-react-app
cd tmp/create-react-app || exit

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/../../verdaccio-config.yml
yarn install
# "yarn upgrade --scope @babel --latest" doesn't seem to work.
# a means "all", while \n is the enter needed to confirm the selection.
printf "a\n" | yarn upgrade-interactive --scope @babel --latest

# Test
CI=true yarn test

cleanup
