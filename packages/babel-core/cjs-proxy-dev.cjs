/* eslint-disable */
module.exports = require("$repo-utils").USE_ESM
  ? require("./cjs-proxy.cjs")
  : require("./lib/index.js");
