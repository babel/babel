#!/bin/sh
set -e

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

node="node"

if [ "$TEST_DEBUG" ]; then
   node="node_modules/.bin/inspect --debug-brk"
fi

$node node_modules/mocha/bin/_mocha `scripts/_get-test-directories.sh` --opts test/mocha.opts --grep "$TEST_GREP"
