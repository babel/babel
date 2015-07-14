#!/bin/sh
set -e

BROWSERIFY_CMD="node_modules/browserify/bin/cmd.js"

mkdir -p dist

node packages/babel/scripts/cache-templates
node packages/babel/scripts/build-tests
node $BROWSERIFY_CMD -e test/browser.js >dist/browser-test.js
rm -rf packages/babel/templates.json packages/babel/tests.json

test -n "`which open`" && open test/browser.html
