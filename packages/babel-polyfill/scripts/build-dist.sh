#!/bin/sh
set -e

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"

mkdir -p dist

node $BROWSERIFY_CMD -e lib/index.js >dist/polyfill.js
node $UGLIFY_CMD dist/index.js >dist/polyfill.min.js
