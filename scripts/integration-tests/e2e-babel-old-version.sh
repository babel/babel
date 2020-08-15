#!/bin/bash

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

node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js
(
  yarn why @babel/core | grep -o "@babel/core@npm:.* (via npm:.*)";
  yarn why @babel/helpers | grep -o "@babel/helpers@npm:.* (via npm:.*)";
  yarn why @babel/traverse | grep -o "@babel/traverse@npm:.* (via npm:.*)"
) | uniq | node -e "
  var pkg = require('./package.json');
  var packages = fs.readFileSync(0, 'utf8').trim().split('\n');

  pkg.devDependencies['@babel/core'] = '7.0.0';

  packages.forEach(desc => {
    const { name, specifier } = desc
      .match(/(?<name>@babel\/[a-z]+).*\(via (?<specifier>npm:[^)]+)\)/)
      .groups;
    pkg.resolutions[name + '@' + specifier] = '7.0.0';
  });

  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

rm yarn.lock
make bootstrap

# Test
make test-ci

cleanup
