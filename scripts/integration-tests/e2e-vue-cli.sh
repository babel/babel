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
yarn install --ignore-engines # Remove --ignore-engines when vue-cli upgrades their lockfile to eslint-import-resolver-webpack@0.13.2
node "$PWD"/../../utils/bump-babel-dependencies.js
yarn lerna exec -- node "$PWD"/../../utils/bump-babel-dependencies.js
yarn install --ignore-engines # Remove --ignore-engines when vue-cli upgrades their lockfile to eslint-import-resolver-webpack@0.13.2

if [[ "$(node --version)" == v17.* ]]; then
  # Remove this when https://github.com/webpack/webpack/issues/14532 is fixed
  export NODE_OPTIONS=--openssl-legacy-provider
fi

# vue-cli's tests expect us to import regenerator-runtime from "regenerator-runtime/runtime",
# but we import it from @babel/runtime.
sed -i 's%toMatch(`regenerator-runtime/runtime`)%toMatch(`@babel/runtime/helpers/regeneratorRuntime`)%' packages/@vue/babel-preset-app/__tests__/babel-preset.spec.js

if [ "$BABEL_8_BREAKING" = true ] ; then
  # This option is renamed in Babel 8
  sed -i 's/legacy: decoratorsLegacy !== false/version: decoratorsLegacy === false ? "legacy": "2021-12"/g' packages/@vue/babel-preset-app/index.js

  # Delete once https://github.com/jestjs/jest/pull/14109 is released
  sed -i "s/blacklist/denylist/g" node_modules/babel-plugin-jest-hoist/build/index.js
fi

# Test
CI=true yarn test -p babel,babel-preset-app

unset YARN_IGNORE_PATH
cleanup
