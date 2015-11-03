#!/bin/sh
set -ex

UGLIFY_CMD="../../node_modules/uglify-js/bin/uglifyjs"

mkdir -p dist

# Add a Unicode BOM so browsers will interpret the file as UTF-8
node -p '"\uFEFF"' > dist/external-helpers.js
node lib/babel-external-helpers.js \
  >>dist/external-helpers.js
node -p '"\uFEFF"' > dist/external-helpers.min.js
node $UGLIFY_CMD dist/external-helpers.js \
  --compress warnings=false \
  --mangle \
  >>dist/external-helpers.min.js
