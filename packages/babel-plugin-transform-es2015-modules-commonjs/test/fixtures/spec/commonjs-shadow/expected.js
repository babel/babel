'use strict';

module.exports = exports = Object.create(null, {
  __esModule: {
    value: true
  }
});

var _bar = babelHelpers.specRequireInterop(require('bar'));

Object.defineProperty(exports, "default", {
  enumerable: true,
  value: {
    default: class {}
  }.default
});
;

// neither of these should be able to use or affect the real exports
new _exports.default();
_moduleExports = {};
Object.freeze(exports);