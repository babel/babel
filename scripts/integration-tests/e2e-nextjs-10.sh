#!/usr/bin/env bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Create example app
npx create-next-app@^10 --example with-custom-babel-config /tmp/nextjs-10
cd /tmp/nextjs-10
cp -r fixtures/nextjs-10/ .

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/../../verdaccio-config.yml

npm install --ignore-scripts

# Test

# Next.js 10 uses webpack 4.44, which is affected by https://github.com/webpack/webpack/issues/14532
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

export -n NODE_OPTIONS

cleanup
