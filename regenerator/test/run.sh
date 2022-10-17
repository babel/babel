#!/usr/bin/env bash

set -e
set -u

cd $(dirname $0)/..
ROOT_DIR=$(pwd)

npm install

install() {
    npm install ./packages/$1
    pushd node_modules/regenerator-$1
    npm install
    # Force the child packages to look in $ROOT_DIR/node_modules to find
    # one another.
    rm -rf node_modules
    popd
}

PKG=$(<package.json)
PKG_LOCK=$(<package-lock.json)

# Link local packages into node_modules.
install runtime
install transform
install preset

echo "$PKG" > package.json
echo "$PKG_LOCK" > package-lock.json

# We need to use the symlink paths rather than the real paths, so that the
# regenerator-* packages appear to reside in node_modules.
node test/run.js
