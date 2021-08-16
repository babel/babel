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
npx react-native init rnbabel
cd rnbabel

# Build the project
npx react-native bundle --entry-file index.js --bundle-output output.js

cleanup
