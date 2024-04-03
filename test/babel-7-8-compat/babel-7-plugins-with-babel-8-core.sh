#!/usr/bin/env bash

# Usage: BABEL_CORE_DEV_DEP_VERSION=next ./test/babel-7-8-compat/babel-7-plugins-with-babel-8-core.sh
# NOTE: This will change files in your monorepo, make sure to commit/stage
# everything before running it.

set -e

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

[ -n "$BABEL_CORE_DEV_DEP_VERSION" ] || {
  echo "Please specify BABEL_CORE_DEV_DEP_VERSION=x.y.z env var" >&2;
  exit 1;
}

# Start in test/babel-7-8-compat even if run from root directory
cd "$(dirname "$0")" || exit

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

export YARN_ENABLE_IMMUTABLE_INSTALLS=false

# Build
BABEL_CORE_DEV_DEP_VERSION= make -j use-cjs


make clean-node-modules
yarn constraints --fix
yarn

# Test
TEST_babel7plugins_babel8core=true yarn jest $(node -p 'require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"].join(" ")' || exit)

# Reset package.json changes
BABEL_CORE_DEV_DEP_VERSION= yarn constraints --fix
BABEL_CORE_DEV_DEP_VERSION= yarn
