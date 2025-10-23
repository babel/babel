#!/usr/bin/env bash

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


if [ "$BABEL_8_BREAKING" = true ] ; then
  sed -i "s/ts-expect-error//g" ./src/language-json/parser-json.js

  # Removed in Babel 8
  sed -i 's/"TupleExpression",//g' src/language-js/traverse/visitor-keys.evaluate.js
  sed -i 's/"RecordExpression",//g' src/language-js/traverse/visitor-keys.evaluate.js
fi

# Test typings for @babel/parser
yarn lint:typecheck

# https://github.com/babel/babel/pull/14892#issuecomment-1233180626
echo "export default () => () => {}" > src/main/create-print-pre-check-function.js

# https://github.com/babel/babel/pull/15400#issuecomment-1414539133
# Temporarily ignore tests, use `rm -f path/to/format.test.js`
# rm -f path/to/format.test.js

yarn test "tests/format/(jsx?|misc|typescript|flow|flow-repo)/" --update-snapshot

cleanup
