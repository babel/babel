"use strict";

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

Object.defineProperty(exports, "default", {
  enumerable: true,
  writable: true,
  value: {
    default: function _default() {}
  }.default
});
Object.defineProperty(exports, "b", {
  enumerable: true,
  get: function get() {
    return b;
  }
});
function b() {}
(Object.freeze || Object)(exports);