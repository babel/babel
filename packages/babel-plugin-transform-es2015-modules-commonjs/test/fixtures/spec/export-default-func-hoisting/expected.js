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

const _ownExports = Object.keys(exports);

const _bar = babelHelpers.specRequireInterop(require('bar'));

babelHelpers.specNamespaceSpread(exports, _ownExports, _bar);
(Object.freeze || Object)(exports);
let _default = {
  default: function () {
    return _foo;
  }
}.default;

const _foo = babelHelpers.specRequireInterop(require('foo'));