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
git clone --depth=1 https://github.com/prettier/prettier /tmp/prettier
cd /tmp/prettier || exit

# Update @babel/* dependencies
node "$root/utils/bump-babel-dependencies.js"

if [ "$BABEL_8_BREAKING" = true ] ; then
  # Based on https://github.com/prettier/prettier/pull/15157
  sed -i 's/const getChalk = () => chalk/default (code) => code/' scripts/build/shims/babel-highlight.js
  sed -i 's/const generate = babelGenerator.default/const generate = babelGenerator/' scripts/build/transform/index.js
  sed -i 's/,"updateContext":null//g' tests/integration/__tests__/__snapshots__/debug-print-ast.js.snap
  rm tests/unit/__snapshots__/visitor-keys.js.snap
fi

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
yarn --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml
yarn install --no-immutable
yarn info

# Test typings for @babel/parser
yarn lint:typecheck

# https://github.com/babel/babel/pull/14892#issuecomment-1233180626
echo "export default () => () => {}" > src/main/create-print-pre-check-function.js

# https://github.com/babel/babel/pull/15400#issuecomment-1414539133
# Temporarily ignore tests, use `rm -f path/to/jsfmt.spec.js`
# rm -f path/to/jsfmt.spec.js

yarn test "tests/format/(jsx?|misc|typescript|flow|flow-repo)/" --update-snapshot --runInBand

cleanup
