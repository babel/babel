#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")"

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Clone create-react-app
git clone https://github.com/facebook/create-react-app.git tmp/create-react-app
cd tmp/create-react-app

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$(dirname "$0")"/../../scripts/integration-tests/verdaccio-config.yml
yarn install
# "yarn upgrade --scope @babel --latest" doesn't seem to work.
# a means "all", while \n is the enter needed to confirm the selection.
echo "a\n" | yarn upgrade-interactive --scope @babel --latest

# Test
CI=true yarn test

cleanup
