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

# Create example app
cd /tmp
npx ember-cli new ember-quickstart --lang en
cd /tmp/ember-quickstart

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml

npm install --ignore-scripts

npm ls --all

# Test

npm run build

cleanup
