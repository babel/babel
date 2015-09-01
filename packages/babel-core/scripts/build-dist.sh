#!/bin/sh
set -e

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"
BROWSERIFY_IGNORE="-i esprima-fb"

mkdir -p dist

node scripts/cache-templates

# Add a Unicode BOM so browsers will interpret the file as UTF-8
node -p '"\uFEFF"' > dist/browser.js
node $BROWSERIFY_CMD lib/api/browser.js -s babel $BROWSERIFY_IGNORE >>dist/browser.js
node -p '"\uFEFF"' > dist/browser.min.js
node $UGLIFY_CMD dist/browser.js >>dist/browser.min.js

node $BROWSERIFY_CMD lib/api/node.js --node $BROWSERIFY_IGNORE >dist/node.js

node ../babel-cli/lib/babel-external-helpers >dist/external-helpers.js
node $UGLIFY_CMD dist/external-helpers.js >dist/external-helpers.min.js

rm -rf templates.json
