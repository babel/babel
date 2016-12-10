'use strict';

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

var _bar = babelHelpers.specRequireInterop(require('bar'));

let _default = {
  default: class {}
}.default;
;

// neither of these should be able to use or affect the real exports
new _exports.default();
_module.exports = {};
(Object.freeze || Object)(exports);

let _exports, _module;