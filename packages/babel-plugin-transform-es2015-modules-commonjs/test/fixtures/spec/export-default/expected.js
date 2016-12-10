"use strict";

const exports = module.exports = Object.create ? Object.create(null, {
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
  unrelated: {
    enumerable: true,

    get() {
      return unrelated;
    }

  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  writable: true,
  value: {
    default: function () {}
  }.default
});
var unrelated;
unrelated = "changed";
(Object.freeze || Object)(exports);