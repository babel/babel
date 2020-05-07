#!/bin/sh
set -ex

ROLLUP_CMD="../../node_modules/.bin/rollup"
UGLIFY_CMD="../../node_modules/.bin/uglifyjs"

mkdir -p dist

node $ROLLUP_CMD lib/index.js \
  --format iife \
  --plugin rollup-plugin-commonjs \
  --plugin rollup-plugin-node-resolve \
  --file dist/polyfill.js
node $UGLIFY_CMD dist/polyfill.js \
  --compress keep_fnames,keep_fargs \
  --mangle keep_fnames \
  >dist/polyfill.min.js
