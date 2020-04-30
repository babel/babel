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

node -e "\
  var pkg = require('./package.json');\
  pkg.devDependencies['@babel/core'] = '7.0.0';\
  Object.assign(pkg.resolutions, {\
    '@babel/core': '7.0.0',\
    '@babel/helpers': '7.0.0',\
    '@babel/traverse': '7.0.0'\
  });\
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));\
"

rm yarn.lock
make bootstrap

# Test
make test-ci

cleanup
