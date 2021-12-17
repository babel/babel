#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit
root="$PWD"

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Clone prettier
git clone --depth=1 https://github.com/prettier/prettier tmp/prettier
cd tmp/prettier || exit

# Update @babel/* dependencies
bump_deps="$root/utils/bump-babel-dependencies.js"
node "$bump_deps"

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
yarn --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml
yarn install

# Only run js,jsx,misc format tests
yarn test "tests/format/(jsx?|misc)" --update-snapshot

cleanup
