#!/bin/sh
set -e

cp dist/browser.js browser.js
cp dist/browser.min.js browser.min.js
cp dist/polyfill.js browser-polyfill.js
cp dist/polyfill.min.js browser-polyfill.min.js
cp dist/external-helpers.js external-helpers.js
cp dist/external-helpers.min.js external-helpers.min.js
node tools/cache-templates
test -f templates.json
