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

packagesToTest=$(node -e '
  const data = require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"];
  const packagesToTest = data.map((pkg) =>
    Array.isArray(pkg) ? pkg[0] : pkg
  );
  process.stdout.write(packagesToTest.join(" "));
' || exit 1)

foldersToRemove=$(node -e '
  const data = require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"];
  const foldersToRemove = data.flatMap((pkg) => {
    if (!Array.isArray(pkg)) return [];
    return pkg[1].excludeFixtures.map((fixture) => `./packages/${pkg[0]}/test/fixtures/${fixture}`);
  });
  process.stdout.write(foldersToRemove.join(" "));
' || exit 1)

bash -c "rm -r $foldersToRemove" # Call `bash` to perform glob expansion

# Test
TEST_babel7plugins_babel8core=true yarn jest $packagesToTest

# Reset package.json changes
BABEL_CORE_DEV_DEP_VERSION= yarn constraints --fix
BABEL_CORE_DEV_DEP_VERSION= yarn
