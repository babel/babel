#!/bin/bash

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
yarn constraints --fix
make -j use-cjs

# Make sure that packages we want to test share all the same hoisted @babel/core,
# rather than having their own copies. This allows pre-loading it (for the CJS proxy),
# and matches usage outside of the monorepo (where @babel/core is provided by the user).
export TOP_LEVEL_CORE_VERSION=$(node -e '
  const pkg = require("./package.json");
  process.stdout.write(pkg.devDependencies["@babel/core"]);
  pkg.devDependencies["@babel/core"] = process.env.BABEL_CORE_DEV_DEP_VERSION;
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
')
make clean-node-modules
yarn

# Test
TEST_babel7plugins_babel8core=true yarn jest $(node -p 'require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"].join(" ")' || exit)

# Reset package.json changes
BABEL_CORE_DEV_DEP_VERSION= yarn constraints --fix
node -e '
  const pkg = require("./package.json");
  pkg.devDependencies["@babel/core"] = process.env.TOP_LEVEL_CORE_VERSION;
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
'
BABEL_CORE_DEV_DEP_VERSION= yarn
