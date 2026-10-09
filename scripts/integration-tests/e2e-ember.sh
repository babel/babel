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

startLocalRegistry "$root"/verdaccio-config.yml

# Create example app
# ember-cli will run npm install in the ember-quickstart folder
cd /tmp
npx ember-cli new ember-quickstart --lang en
cd /tmp/ember-quickstart

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

# Test

npm run build

cleanup
