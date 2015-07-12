#!/bin/sh
set -e

BROWSERIFY_CMD="../../node_modules/browserify/bin/cmd.js"
UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"
BROWSERIFY_IGNORE="-i esprima-fb"

mkdir -p dist

node scripts/cache-templates

node $BROWSERIFY_CMD -e lib/polyfill.js >dist/polyfill.js
node $UGLIFY_CMD dist/polyfill.js >dist/polyfill.min.js

node $BROWSERIFY_CMD lib/api/browser.js -s babel $BROWSERIFY_IGNORE >dist/browser.js
node $UGLIFY_CMD dist/browser.js >dist/browser.min.js

node $BROWSERIFY_CMD lib/api/node.js --node $BROWSERIFY_IGNORE >dist/node.js

node ../babel-cli/lib/babel-external-helpers >dist/external-helpers.js
node $UGLIFY_CMD dist/external-helpers.js >dist/external-helpers.min.js

rm -rf templates.json
