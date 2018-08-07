#!/usr/bin/env bash

set -e
set -u

cd $(dirname $0)/..
ROOT_DIR=$(pwd)

# Fresh install from package-lock.json.
npm ci

install() {
    npm install ./packages/$1
    pushd node_modules/$1
    npm install
    # Force the child packages to look in $ROOT_DIR/node_modules to find
    # one another.
    rm -rf node_modules
    popd
}

# Link local packages into node_modules.
install regenerator-runtime
install regenerator-transform
install regenerator-preset

# We need to use the symlink paths rather than the real paths, so that the
# regenerator-* packages appear to reside in node_modules.
node test/run.js
