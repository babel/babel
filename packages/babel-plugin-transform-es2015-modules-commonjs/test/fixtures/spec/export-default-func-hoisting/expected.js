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
let _default = {
  default: function () {
    return _foo;
  }
}.default;

const _ownExports = Object.keys(exports);

const _bar = babelHelpers.specRequireInterop(require('bar'));

Object.keys(_bar).forEach(function (key) {
  if (key === "__esModule" || key === "default" || _ownExports.indexOf(key) >= 0) return;
  if (key in exports && (exports[key] === _bar[key] || typeof exports[key] === 'number' && isNaN(exports[key]))) return;
  Object.defineProperty(exports, key, {
    enumerable: true,

    get() {
      return _bar[key];
    }

  });
});
(Object.freeze || Object)(exports);

const _foo = babelHelpers.specRequireInterop(require('foo'));