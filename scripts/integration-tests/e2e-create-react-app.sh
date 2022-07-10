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

# Clone create-react-app
git clone --depth=1 https://github.com/facebook/create-react-app.git tmp/create-react-app
cd tmp/create-react-app || exit

# CircleCI already has npm 7
if [ "$BABEL_8_BREAKING" != true ] ; then
  npm i -g npm@7
fi

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

# !!! WARNING !!!
# create-react-app uses the useBuiltIns: true option of @babel/preset-react,
# removed in Babel 8.0.0. And it does not specify runtime option. The test will break on
# runtime: "automatic", default of Babel 8.
# This change replaces useBuiltIns: true with runtime: "classic"
sed -i 's/useBuiltIns: true/runtime: "classic"/' packages/babel-preset-react-app/create.js

bump_deps="$PWD/../../utils/bump-babel-dependencies.js"
node "$bump_deps"
for d in ./packages/*/
do
  (cd "$d"; node "$bump_deps")
done

if [[ "$(node --version)" == v17.* ]]; then
  # Remove this when https://github.com/webpack/webpack/issues/14532 is fixed
  export NODE_OPTIONS=--openssl-legacy-provider
fi

startLocalRegistry "$PWD"/../../verdaccio-config.yml

# Remove this when CRA updates jest-worker in their lockfile
node -e "
  var pkg = require('./package.json');

  pkg.resolutions = {
    'jest-worker': '27.4.5'
  };

  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"
npm install --ignore-scripts
npx npm-force-resolutions

npm install

# Test
CI=true npm run test

cleanup
