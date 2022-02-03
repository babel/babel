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

# Don't use Yarn 2
export YARN_IGNORE_PATH=1

startLocalRegistry "$PWD"/../../"$VERDACCIO_CONFIG".yml
yarn install --ignore-engines # Remove --ignore-engines when vue-cli upgrades their lockfile to eslint-import-resolver-webpack@0.13.2
node "$PWD"/../../utils/bump-babel-dependencies.js
yarn lerna exec -- node "$PWD"/../../utils/bump-babel-dependencies.js
yarn install --ignore-engines # Remove --ignore-engines when vue-cli upgrades their lockfile to eslint-import-resolver-webpack@0.13.2

if [[ "$(node --version)" == v17.* ]]; then
  # Remove this when https://github.com/webpack/webpack/issues/14532 is fixed
  export NODE_OPTIONS=--openssl-legacy-provider
fi

# Test
CI=true yarn test -p babel,babel-preset-app

unset YARN_IGNORE_PATH
cleanup
