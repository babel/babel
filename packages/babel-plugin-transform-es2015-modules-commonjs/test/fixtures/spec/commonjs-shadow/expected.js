'use strict';

module.exports = exports = Object.create ? Object.create(null, {
  __esModule: {
    value: true
  }
}) : {
  __esModule: true
};

if (typeof Symbol === "function" && Symbol.toStringTag) {
  Object.defineProperty(exports, Symbol.toStringTag, {
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
_module.exports = {};
(Object.freeze || Object)(exports);

let _exports, _module;