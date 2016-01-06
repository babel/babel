#!/bin/sh
set -e

MOCHA_WATCH=""

if [ -z "$TEST_GREP" ]; then
   TEST_GREP=""
fi

if [ "$TEST_WATCH" ]; then
   MOCHA_WATCH="--watch"
fi

node node_modules/mocha/bin/_mocha `scripts/_get-test-directories.sh` --opts test/mocha.opts --grep "$TEST_GREP" $MOCHA_WATCH
