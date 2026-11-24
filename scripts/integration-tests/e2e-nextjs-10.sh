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
# Don't use `create-next-app --example with-custom-babel-config`: it queries the
# GitHub API, which fails with "Could not locate an example" when rate limited.
# Instead, sparse-clone the example from the latest Next.js 10 tag.
rm -rf /tmp/nextjs-10 /tmp/nextjs-10-repo
git clone --depth 1 --branch v10.2.3 --filter=blob:none --sparse https://github.com/vercel/next.js.git /tmp/nextjs-10-repo
git -C /tmp/nextjs-10-repo sparse-checkout set --no-cone /examples/with-custom-babel-config/
cp -r /tmp/nextjs-10-repo/examples/with-custom-babel-config /tmp/nextjs-10
rm -rf /tmp/nextjs-10-repo
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
