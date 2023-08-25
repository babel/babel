/**
 * This file wraps the compiled ES6 module implementation of register so
 * that it can be used both from a standard CommonJS environment, and also
 * from a compiled Babel import.
 */

if (USE_ESM) {
  module.exports = require("./experimental-worker.js");
} else if (process.env.BABEL_8_BREAKING) {
  module.exports = require("./experimental-worker.js");
} else {
  exports = module.exports = function (...args) {
    return register(...args);
  };
  exports.__esModule = true;

  const node = require("./nodeWrapper.js");
  const register = node.default;

  Object.assign(exports, node);
}
