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
touch yarn.lock
yarn set version stable
YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn
# Remove this when https://github.com/fb55/css-select/issues/1591 is fixed
yarn add css-select@5.1.0
yarn run build
yarn run ng test --watch=false --browsers ChromeHeadless

cleanup
