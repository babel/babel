#!/usr/bin/env bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml

# We only bump dependencies in the top-level package.json, because workspaces
# already use the workspace: protocol so will get the version in the monorepo
# and not from npm.
node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js

# Build the monorepo with the oldest Babel 8 release. The plugins and presets
# used by babel.config.ts are the ones we just published, so this checks that
# they still work with @babel/core 8.0.0. Every @babel/* package that
# @babel/core 8.0.0 depends on, directly or transitively, is pinned to 8.0.0
# too, as if it had been installed when 8.0.0 was released.
node -e "
  var pkg = require('./package.json');
  pkg.devDependencies['@babel/core'] = '8.0.0';
  // The @babel/* dependencies of each package in @babel/core@8.0.0's tree
  var deps = {
    'core': ['code-frame', 'generator', 'helper-compilation-targets', 'helpers', 'parser', 'template', 'traverse', 'types'],
    'code-frame': ['helper-validator-identifier'],
    'generator': ['parser', 'types'],
    'helper-compilation-targets': ['compat-data', 'helper-validator-option'],
    'helpers': ['template', 'types'],
    'parser': ['types'],
    'template': ['code-frame', 'parser', 'types'],
    'traverse': ['code-frame', 'generator', 'helper-globals', 'parser', 'template', 'types'],
    'types': ['helper-string-parser', 'helper-validator-identifier'],
  };
  for (var parent in deps) {
    for (var dep of deps[parent]) {
      pkg.resolutions['@babel/' + parent + '@npm:8.0.0/@babel/' + dep] = '8.0.0';
    }
  }
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# build and test
YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j test-ci

cleanup
