"use strict";

module.exports = global._BABEL_ESM_REGISTER
  ? require("./hook-esm")
  : require("./hook-cjs");
