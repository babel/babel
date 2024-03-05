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
sed -i 's/nodeGte12NoESM(/nodeGte12NoESM.skip(/g' eslint/babel-eslint-tests/test/integration/config-files.js


# @babel/plugin-proposal-json-modules says that it needs @babel/core@^7.22.0, but
# it actually only needs @babel/parser@^7.22.0. We are running this test with an
# old @babel/core version and a new @babel/parser version, so we can just suppress
# the version assertion.
echo 'diff --git a/lib/index.js b/lib/index.js
index e42148103bec33c8b6d8f1bd4d07ebce2049c3b6..396cdf46c0e4d430be5e27ee6911fb4872e9b160 100644
--- a/lib/index.js
+++ b/lib/index.js
@@ -1,1 +1,1 @@ var index = declare(api => {
-  api.assertVersion("^7.22.0");
+  //api.assertVersion("^7.22.0");' > .yarn/patches/babel__plugin-proposal-json-modules.patch
node -e "
  var pkg = require('./package.json');
  pkg.devDependencies['@babel/plugin-proposal-json-modules'] =
    'patch:@babel/plugin-proposal-json-modules@npm:' +
    pkg.devDependencies['@babel/plugin-proposal-json-modules'] +
    '#~/.yarn/patches/babel__plugin-proposal-json-modules.patch';
  pkg.resolutions['@babel/plugin-proposal-json-modules/@babel/plugin-syntax-import-attributes'] =
    'patch:@babel/plugin-syntax-import-attributes@npm:^7.23.3' +
    '#~/.yarn/patches/babel__plugin-proposal-json-modules.patch';
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Update deps, build and test
rm yarn.lock
YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j test-ci

cleanup
