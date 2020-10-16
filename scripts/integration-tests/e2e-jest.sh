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

# Clone jest
git clone --depth=1 https://github.com/facebook/jest /tmp/jest
cd /tmp/jest || exit

# Update @babel/* dependencies
bump_deps="$root/utils/bump-babel-dependencies.js"
node "$bump_deps"
for d in ./packages/*/
do
  (cd "$d"; node "$bump_deps")
done

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
yarn --version
python --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml
yarn install
yarn dedupe
yarn build:js
# "yarn build" is "yarn build:js && yarn build:ts", but we can still run
# "yarn test" if "yarn build:ts" fails
yarn build:ts || echo ""

# Test
CI=true yarn test

cleanup
