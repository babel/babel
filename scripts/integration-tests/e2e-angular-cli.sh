#!/usr/bin/env bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

dir="$PWD"

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/verdaccio-config.yml

# Create and build a new angular project
mkdir tmp && cd tmp
npx -p @angular/cli ng new --defaults ngx --package-manager yarn --skip-git --skip-install
cd ngx
node "$dir"/utils/bump-babel-dependencies.js resolutions
# Disable yarn minimal age gate because npx will fetch the latest version of Angular CLI
echo "npmMinimalAgeGate: 0" >> .yarnrc.yml
touch yarn.lock
yarn set version stable
export YARN_ENABLE_IMMUTABLE_INSTALLS=false
yarn install
# Install browser-playwright for ChromiumHeadless testing
# Pinned to 4.x: @angular/build's vitest peer dep is still ^4.0.8, while
# @vitest/browser-playwright@5 requires vitest@5.0.0 exactly, which breaks
# @angular/build's "ng test" (missing BrowserConnectionError export etc).
yarn add playwright @vitest/browser-playwright@4.1.11 --dev
yarn playwright install --with-deps
yarn run build
yarn run ng test --watch=false --browsers ChromiumHeadless

cleanup
