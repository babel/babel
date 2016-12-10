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
  default: {
    enumerable: true,

    get() {
      return _default;
    }

  },
  unrelated: {
    enumerable: true,

    get() {
      return unrelated;
    }

  }
});
let _default = {
  default: function () {}
}.default;
var unrelated;
unrelated = "changed";
(Object.freeze || Object)(exports);