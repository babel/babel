"use strict";

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

Object.defineProperty(exports, "default", {
  enumerable: true,
  writable: true,
  value: {
    default: function () {}
  }.default
});
var unrelated = undefined;
Object.defineProperty(exports, "unrelated", {
  enumerable: true,
  writable: true,

  get() {
    return unrelated;
  }

});
unrelated = "changed";
Object.freeze(exports);