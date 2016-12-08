'use strict';

module.exports = exports = Object.create(null, {
  __esModule: {
    value: true
  }
});

if (Symbol && Symbol.toStringTag) {
  Object.defineProperty(module.exports, Symbol.toStringTag, {
    value: "Module"
  });
}

var _bar = babelHelpers.specRequireInterop(require('bar'));

Object.defineProperty(exports, "default", {
  enumerable: true,
  writable: true,
  value: {
    default: class {}
  }.default
});
;

// neither of these should be able to use or affect the real exports
new _exports.default();
_moduleExports = {};
Object.freeze(exports);