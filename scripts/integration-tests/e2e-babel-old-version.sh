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
  // Install every published plugin and preset under an alias, for the checks
  // after the build. Under their own names they would replace the workspace
  // packages, which the tests and the fixtures load.
  for (var dir of fs.readdirSync('packages')) {
    var file = './packages/' + dir + '/package.json';
    if (!/^babel-(plugin|preset)-/.test(dir) || !fs.existsSync(file)) continue;
    var { name, private: isPrivate } = require(file);
    if (isPrivate) continue;
    pkg.devDependencies['e2e-' + name.replace('@babel/', 'babel-')] = 'npm:' + name + '@latest';
  }
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

# babel.config.ts runs preset-env with `modules: false`, so neither the build
# nor the tests load @babel/helper-module-transforms. Also compile the sources
# to CommonJS, to check the module transforms with @babel/core 8.0.0.
cjs_out_dir=$(mktemp -d)
BABEL_ENV=production yarn babel packages/*/src \
  --extensions .ts,.js,.cjs,.mjs \
  --plugins @babel/plugin-transform-export-namespace-from,@babel/plugin-transform-modules-commonjs \
  --out-dir "$cjs_out_dir"
rm -rf "$cjs_out_dir"

# Load every published plugin and preset with @babel/core 8.0.0, including the
# ones that neither the build nor the tests use.
node "$PWD"/scripts/integration-tests/utils/load-published-plugins.js

# The sources don't use Flow. Check that @babel/plugin-transform-flow-strip-types
# works with @babel/core 8.0.0 too.
node --input-type=module -e '
  import assert from "node:assert";
  import { transformSync } from "@babel/core";
  const { code } = transformSync(
    "class A<T> implements B { declare x: T; y: number = 1; m(a: T): void {} }",
    {
      configFile: false,
      babelrc: false,
      plugins: ["module:e2e-babel-plugin-transform-flow-strip-types"],
    },
  );
  assert.equal(code, "class A {\n  y = 1;\n  m(a) {}\n}");
'

cleanup
