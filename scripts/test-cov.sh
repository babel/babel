#!/bin/bash
set -e

testDirs=`TEST_TYPE=cov scripts/_get-test-directories.sh`
node_modules/.bin/nyc node_modules/mocha/bin/_mocha --opts test/mocha.opts $testDirs
node_modules/.bin/nyc report --reporter=json
