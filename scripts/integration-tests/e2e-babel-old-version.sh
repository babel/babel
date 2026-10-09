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

node "$PWD"/scripts/integration-tests/utils/bump-babel-dependencies.js

node -e "
  var pkg = require('./package.json');
  pkg.devDependencies['@babel/core'] = '7.0.0';
  Object.assign(pkg.resolutions, {
    '@babel/core@npm:*': '7.0.0',
    '@babel/core@npm:7.0.0/@babel/traverse': '7.0.0',
    '@babel/core@npm:7.0.0/@babel/helpers': '7.1.0',
    '@babel/helpers@npm:7.1.0/@babel/traverse': '7.0.0',
  });
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Older @babel/core versions don't support "browserslistConfigFile", "targets".
# and "assumptions". Let's just remove them when running this e2e test.
node -e "
  var config = fs.readFileSync('./babel.config.js', 'utf8')
    .replace(/browserslistConfigFile:[^,]*,/g, '')
    .replace(/targets,/g, '')
    .replace(/assumptions,/g, '')
    .replace(/assumptions:[^,]*,/g, '')
    .replace(/(?<=envOpts\s+=\s+\{)/, 'targets: { node: \'6.9\' },');
  fs.writeFileSync('./babel.config.js', config);
"

# https://github.com/babel/babel/pull/12331 - This test is fixed in @babel/traverse 7.12.7,
# so it will fail with older versions. We can disable it.
(cd packages/babel-plugin-transform-modules-systemjs/test/fixtures/regression/; mv issue-12329 .issue-12329)

# https://github.com/babel/babel/pull/14124 - This test is fixed in Babel 7.17;
# Todo(Babel 8): enable this test
rm packages/babel-standalone/test/built-into-es5.js

# Our 'WorkerClient' implementation uses static private getters, that are only supported
# when using '@babel/helpers@^7.6.0'
# NOTE: When running this command on MacOS, use gsed from 'brew install gnu-sed'
sed -i 's/describeGte("12.0.0")("worker"/describeGte("12.0.0").skip("worker"/g' packages/babel-register/test/index.js
sed -i 's/nodeGte12(/nodeGte12.skip(/g' eslint/babel-eslint-tests/test/integration/parser-override.js
sed -i 's/describe(/describe.skip(/g' eslint/babel-eslint-tests/test/integration/config-files.js

# We only support transforming import attributes in new @babel/core versions
sed -i 's#\["@babel/plugin-transform-json-modules", { uncheckedRequire: true }\]#null#g' babel.config.js
sed -i 's#with { type: "json" }##g' packages/babel-preset-env/src/normalize-options.ts

# Update deps, build and test
rm yarn.lock
IS_BABEL_OLD_E2E=1 YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j test-ci

cleanup
