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

  get() {
    return named;
  }

});
function named() {
  named = function () {};
}
(Object.freeze || Object)(exports);