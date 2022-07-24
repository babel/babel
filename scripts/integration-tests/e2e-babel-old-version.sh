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

node -e "\
  var pkg = require('./package.json');\
  pkg.devDependencies['@babel/core'] = '7.0.0';\
  Object.assign(pkg.resolutions, {\
    '@babel/core': '7.0.0',\
    '@babel/helpers': '7.0.0',\
    '@babel/traverse': '7.0.0'\
  });\
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));\
"

# Older @babel/core versions don't support "targets" and "assumptions"
# Let's just remove them when running this e2e test.
node -e "
  var config = fs.readFileSync('./babel.config.js', 'utf8')
    .replace(/assumptions,/, '')
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

# Update deps, build and test
YARN_ENABLE_IMMUTABLE_INSTALLS=false make -j test-ci

cleanup
