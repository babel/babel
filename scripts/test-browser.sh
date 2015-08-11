#!/bin/sh
set -e

mkdir -p dist

node packages/babel-core/scripts/cache-templates

for f in packages/*; do
  node node_modules/mocha-fixtures/bin/mocha-fixture-dump.js $f
done

node node_modules/browserify/bin/cmd.js -e test/browser.js >dist/browser-test.js

test -n "`which open`" && open test/browser.html
