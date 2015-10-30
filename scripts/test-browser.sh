#!/bin/sh
set -e

mkdir -p dist

node packages/babel/scripts/cache-templates

for f in packages/*; do
  node node_modules/mocha-fixtures/bin/mocha-fixture-dump.js $f
done

node node_modules/karma/bin/karma start karma.conf.js
