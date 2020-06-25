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

# !!! WARNING !!!
# create-react-app uses the useBuiltIns: true option of @babel/preset-react,
# removed in Babel 8.0.0. Comment it out until they upgrade their Babel version.
sed -i 's/useBuiltIns: true/\/\/ useBuiltIns: true/' packages/babel-preset-react-app/create.js

bump_deps="$PWD/../../utils/bump-babel-dependencies.js"
node "$bump_deps"
for d in ./packages/*/
do
  (cd "$d"; node "$bump_deps")
done

# Don't use Yarn 2
export YARN_IGNORE_PATH=1

startLocalRegistry "$PWD"/../../verdaccio-config.yml
yarn install

# Test
CI=true yarn test

unset YARN_IGNORE_PATH
cleanup
