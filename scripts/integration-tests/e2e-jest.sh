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

# Clone jest
git clone --depth=1 https://github.com/jestjs/jest /tmp/jest
cd /tmp/jest || exit

# Update @babel/* dependencies
bump_deps="$root/utils/bump-babel-dependencies.js"
node "$bump_deps" resolutions
for d in ./packages/*/
do
  (cd "$d"; node "$bump_deps" resolutions)
done

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
yarn --version
python --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml
# yarn.lock will be modified by @babel/* bumps
yarn install --no-immutable
yarn dedupe '@babel/*'

if [ "$BABEL_8_BREAKING" = true ] ; then
  # This option is removed in Babel 8
  sed -i 's/allowDeclareFields: true,\?/\/* allowDeclareFields: true *\//g' babel.config.js

  # Jest depends on @types/babel__traverse for Babel 7, and they contain the removed Noop node
  sed -i 's/t.Noop/any/g' node_modules/@types/babel__traverse/index.d.ts

  # Replace isTSX with the JSX plugin
  sed -i "s/isTSX: sourceFilePath.endsWith('x')//g" packages/jest-snapshot/src/InlineSnapshots.ts
  sed -i "s%'TypeScript syntax plugin added by Jest snapshot',%'TypeScript syntax plugin added by Jest snapshot'],[require.resolve('@babel/plugin-syntax-jsx')%g" packages/jest-snapshot/src/InlineSnapshots.ts

  # Delete once https://github.com/jestjs/jest/pull/14109 is merged
  sed -i "s/blacklist/denylist/g" packages/babel-plugin-jest-hoist/src/index.ts

  node -e "
    var pkg = require('./package.json');
    pkg.resolutions || (pkg.resolutions = {});
    pkg.resolutions['@types/babel__traverse/@babel/types'] = 'latest';
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  "
fi

sed -i 's/"skipLibCheck": false,/"skipLibCheck": true,/g' tsconfig.json # Speedup

yarn build

# Re-enable it once Jest updates their snapshots to the latest Babel version.
rm -f e2e/__tests__/transform.test.ts
rm -f e2e/__tests__/__snapshots__/transform.test.ts.snap

# Suppress REQUIRE_ESM warning from Node.js 22.12
export NODE_OPTIONS="--disable-warning=ExperimentalWarning"
# The full test suite takes about 20mins on CircleCI. We run only a few of them
# to speed it up.
# The goals of this e2e test are:
#   1) Check that the typescript compilation isn't completely broken
#   2) Make sure that we don't accidentally break jest's usage of the Babel API
CI=true yarn jest --color --maxWorkers=2 --config jest.config.mjs packages
CI=true yarn jest --color --maxWorkers=2 --config jest.config.mjs e2e/__tests__/babel
CI=true yarn jest --color --maxWorkers=2 --config jest.config.mjs e2e/__tests__/transform
unset NODE_OPTIONS

cleanup
