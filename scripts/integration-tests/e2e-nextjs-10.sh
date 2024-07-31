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
npx create-next-app@^10 --example with-custom-babel-config /tmp/nextjs-10
cp -r fixtures/nextjs-10/. /tmp/nextjs-10
cd /tmp/nextjs-10

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$root"/verdaccio-config.yml

npm install --ignore-scripts

# Let Next.js print full build errors
sed -i "s/result=nextBuildSpan.traceChild('format-webpack-messages')/if(result.errors.length>0){console.error(result.errors[0].message)};result=nextBuildSpan.traceChild('format-webpack-messages')/g" ./node_modules/next/dist/build/index.js

# Test

# Next.js 10 uses webpack 4.44, which is affected by https://github.com/webpack/webpack/issues/14532
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

export -n NODE_OPTIONS

cleanup
