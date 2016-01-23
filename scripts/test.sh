#!/bin/sh
set -e

NODE_DEBUG=""

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

if [ "$TEST_DEBUG" ]; then
   NODE_DEBUG="debug"
fi

node $NODE_DEBUG node_modules/mocha/bin/_mocha `scripts/_get-test-directories.sh` --opts test/mocha.opts --grep "$TEST_GREP"
