#!/bin/sh
set -ex

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"
BROWSERIFY_IGNORE="-i esprima-fb -i through"

mkdir -p dist

# Add a Unicode BOM so browsers will interpret the file as UTF-8
node -p '"\uFEFF"' > dist/browser.js
node $BROWSERIFY_CMD lib/api/browser.js \
  --standalone babel \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  $BROWSERIFY_IGNORE \
  >>dist/browser.js
node -p '"\uFEFF"' > dist/browser.min.js
node $UGLIFY_CMD dist/browser.js \
  --compress warnings=false \
  --mangle \
  >>dist/browser.min.js
