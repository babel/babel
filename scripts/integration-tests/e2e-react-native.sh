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

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
npm --version
yarn --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml


# Create a React Native project
cd /tmp
YARN_ENABLE_IMMUTABLE_INSTALLS=false npx @react-native-community/cli init rnbabel
cd rnbabel

if [ "$BABEL_8_BREAKING" = true ] ; then
  # metro-react-native-babel-preset unconditionally enables the Flow plugin, even on TS files.
  # https://github.com/facebook/metro/blob/2c16fa67/packages/metro-react-native-babel-preset/src/configs/main.js#L25
  npx replace '(?=\[require\("@babel/plugin-syntax-flow")' '//' node_modules/metro-react-native-babel-preset/src/configs/main.js
  # https://github.com/facebook/metro/blob/2c16fa67/packages/metro-react-native-babel-preset/src/configs/main.js#L169
  npx replace '(?=plugins:.*?flow-strip-types)' 'exclude: [isTypeScriptSource, isTSXSource],' node_modules/metro-react-native-babel-preset/src/configs/main.js
fi

node "$root"/utils/bump-babel-dependencies.js resolutions

# Build the project
npm install
npx react-native bundle --entry-file index.js --bundle-output output.js

cleanup
