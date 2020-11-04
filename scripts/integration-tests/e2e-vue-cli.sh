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
#                         BREAKING CHANGES ADAPTATION                          #
#==============================================================================#

# https://github.com/vuejs/vue-cli/blob/0b86e70f86aebea2286617625dac1daa77247883/packages/%40vue/babel-preset-app/__tests__/babel-preset.spec.js#L208
# In Babel 8, runtime paths don't contain "esm" anymore (#12295)
sed -i 's!@babel/runtime/helpers/esm!@babel/runtime/helpers!' packages/@vue/babel-preset-app/__tests__/babel-preset.spec.js

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

# Don't use Yarn 2
export YARN_IGNORE_PATH=1

startLocalRegistry "$PWD"/../../verdaccio-config.yml
yarn install
node "$PWD"/../../utils/bump-babel-dependencies.js
yarn lerna exec -- node "$PWD"/../../utils/bump-babel-dependencies.js
yarn install

# Test
CI=true yarn test -p babel,babel-preset-app

unset YARN_IGNORE_PATH
cleanup
