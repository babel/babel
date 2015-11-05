#!/bin/sh
set -e

node node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha -- `scripts/_get-test-directories.sh` --opts test/mocha.opts
test -n "`which open`" && open coverage/lcov-report/index.html
