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

  }
});
(Object.freeze || Object)(exports);
let _default = {
  default: class {
    noShadow(exports) {
      this.shadow(exports);
    }

    shadow() {
      _exports;
    }
  }
}.default;

let _exports;