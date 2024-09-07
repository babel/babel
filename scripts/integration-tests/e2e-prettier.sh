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

if [ "$BABEL_8_BREAKING" = true ] ; then
  # Based on https://github.com/prettier/prettier/pull/15157
  sed -i 's/const getChalk = () => chalk/default (code) => code/' scripts/build/shims/babel-highlight.js
  sed -i 's/const generate = babelGenerator.default/const generate = babelGenerator/' scripts/build/transform/index.js
  rm tests/unit/__snapshots__/visitor-keys.js.snap
  # Update recordAndTuple usage
  sed -i 's/\["recordAndTuple", { syntaxType: "hash" }\]/"recordAndTuple"/' src/language-js/parse/babel.js
  # https://github.com/babel/babel/pull/16733
  rm -r tests/format/flow/mapped-types
  rm tests/format/typescript/conditional-types/conditonal-types.ts
  rm tests/format/typescript/conditional-types/new-ternary-spec.ts
  rm -r tests/format/typescript/key-remapping-in-mapped-types
  rm -r tests/format/typescript/conformance/types/mappedType
  rm -r tests/format/typescript/mapped-type
  rm tests/format/typescript/custom/typeParameters/variables.ts
  rm -r tests/format/typescript/custom/modifiers
  rm tests/format/typescript/compiler/mappedTypeWithCombinedTypeMappers.ts
  rm tests/format/typescript/prettier-ignore/format.test.js
  rm tests/format/typescript/keyword-types/conditional-types.ts
  rm tests/format/typescript/comments/mapped_types.ts
  # https://github.com/babel/babel/pull/16741
  sed -i 's/"decimal",//' src/language-js/parse/babel.js
  rm tests/format/js/babel-plugins/decimal.js
  # https://github.com/babel/babel/pull/16808
  sed -i 's/"importReflection",//' src/language-js/parse/babel.js
  rm tests/format/js/babel-plugins/import-reflection.js
  rm -r tests/format/js/import-reflection/
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
