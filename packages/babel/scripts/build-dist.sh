#!/bin/sh
set -e

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"
BROWSERIFY_IGNORE="-i esprima-fb -i through"

set -x

mkdir -p dist

node scripts/cache-templates

node $BROWSERIFY_CMD lib/polyfill.js \
  --insert-global-vars 'global' \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  >dist/polyfill.js
node $UGLIFY_CMD dist/polyfill.js \
  --compress warnings=false \
  --mangle \
  >dist/polyfill.min.js

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

node $BROWSERIFY_CMD lib/api/node.js \
  --standalone babel \
  --node \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  $BROWSERIFY_IGNORE \
  >dist/node.js
node $UGLIFY_CMD dist/node.js \
  --compress warnings=false \
  --mangle \
  >dist/node.min.js

node ../babel-cli/lib/babel-external-helpers >dist/external-helpers.js
node $UGLIFY_CMD dist/external-helpers.js \
  --compress warnings=false \
  --mangle \
  >dist/external-helpers.min.js

rm -rf templates.json
