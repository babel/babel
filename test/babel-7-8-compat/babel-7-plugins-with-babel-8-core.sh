#!/bin/bash

# Usage: BABEL_8_VERSION=next ./test/babel-7-8-compat/babel-7-plugins-with-babel-8-core.sh
# NOTE: This will change files in your monorepo, make sure to commit/stage
# everything before running it.

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in test/babel-7-8-compat even if run from root directory
cd "$(dirname "$0")" || exit

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

node -e '
  if (!process.env.BABEL_8_VERSION) throw new Error("Please specify BABEL_8_VERSION=x.y.z env var");

  const pluginsList = require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"];

  for (const plugin of pluginsList) {
    const pkgJsonPath = path.join("./packages", plugin, "package.json");
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));
    pkgJson.devDependencies["@babel/core"] = process.env.BABEL_8_VERSION;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
  }
' || exit

export YARN_ENABLE_IMMUTABLE_INSTALLS=false
export SKIP_YARN_CORE_DEP_CHECK=true

# Build and test
make -j use-cjs
yarn jest $(node -p 'require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"].join(" ")' || exit)
