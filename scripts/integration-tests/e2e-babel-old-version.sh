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

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml
yarn upgrade --scope @babel

# We use @babel/core 7.5.5 instead of 7.0.0 because without babel/babel#10208
# our @babel/standalone build fails.

node -e "\
  var pkg = require('./package.json');\
  pkg.devDependencies['@babel/core'] = '7.5.5';\
  Object.assign(pkg.resolutions, {\
    '@babel/core': '7.5.5',\
    '@babel/helpers': '7.5.5',\
    '@babel/traverse': '7.0.0'\
  });\
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));\
"

rm yarn.lock
make bootstrap

# Test
make test-ci

cleanup
