#!/bin/sh
set -ex

mkdir -p dist

yarn browserify lib/index.js \
  --insert-global-vars 'global' \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  >dist/polyfill.js
yarn uglifyjs dist/polyfill.js \
  --compress keep_fnames,keep_fargs \
  --mangle keep_fnames \
  >dist/polyfill.min.js
