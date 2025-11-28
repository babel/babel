"use strict";

/**
 * This file wraps the compiled ES6 module implementation of register so
 * that it can be used both from a standard CommonJS environment, and also
 * from a compiled Babel import.
 */

if (USE_ESM) {
  module.exports = require("./experimental-worker.cjs");
} else {
  module.exports = require("./experimental-worker.cjs");
}
