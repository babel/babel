"use strict";

const { exec, mkdir } = require("shelljs");

const BROWSERIFY_CMD = "../../node_modules/browserify/bin/cmd.js";
const UGLIFY_CMD = "../../node_modules/uglify-js/bin/uglifyjs";

mkdir("-p", "dist");

exec(`node ${BROWSERIFY_CMD} lib/index.js \
  --insert-global-vars 'global' \
  --plugin bundle-collapser/plugin \
  --plugin derequire/plugin \
  >dist/polyfill.js`);
exec(`node ${UGLIFY_CMD} dist/polyfill.js \
  --compress keep_fnames,keep_fargs \
  --mangle keep_fnames \
  >dist/polyfill.min.js`);
