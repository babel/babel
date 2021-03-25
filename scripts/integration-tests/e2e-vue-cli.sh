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

startLocalRegistry "$PWD"/../../verdaccio-config.yml
yarn install
node "$PWD"/../../utils/bump-babel-dependencies.js
yarn lerna exec -- node "$PWD"/../../utils/bump-babel-dependencies.js
yarn install

if [ "$BABEL_8_BREAKING" = true ] ; then
  # Babel 8 defaults to "default, not ie 11", but this breaks vue-cli's tests
  # which expect different ES features to be compiled.
  sed -i 's/presets: \[preset\],/presets: [[preset, { targets: { ie: 9 } }]],/g' packages/@vue/babel-preset-app/__tests__/babel-preset.spec.js
  sed -i 's/absoluteRuntime: false,/absoluteRuntime: false, targets: { ie: 9 },/g' packages/@vue/babel-preset-app/__tests__/babel-preset.spec.js
fi

# Test
CI=true yarn test -p babel,babel-preset-app

unset YARN_IGNORE_PATH
cleanup
