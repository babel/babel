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
  default: {
    enumerable: true,
    get: function get() {
      return _default;
    }
  },
  b: {
    enumerable: true,
    get: function get() {
      return b;
    }
  }
});
var _default = {
  default: function _default() {}
}.default;
function b() {}
(Object.freeze || Object)(exports);