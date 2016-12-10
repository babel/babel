"use strict";

var exports = module.exports = Object.create ? Object.create(null, {
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

Object.defineProperties(exports, {
  b: {
    enumerable: true,
    get: function get() {
      return b;
    }
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  writable: true,
  value: {
    default: function _default() {}
  }.default
});
function b() {}
(Object.freeze || Object)(exports);