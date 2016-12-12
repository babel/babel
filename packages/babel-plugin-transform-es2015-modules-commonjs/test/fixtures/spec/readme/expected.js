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
  pick: {
    enumerable: true,

    get() {
      return _d.pick;
    }

  },
  default: {
    enumerable: true,

    get() {
      return _default;
    }

  }
});
let _default = {
  default: function () {}
}.default;
(Object.freeze || Object)(exports);

require('a');

const _b = babelHelpers.specRequireInterop(require('b'));

babelHelpers.specImportCheck(_b, ['default']);

const _c = babelHelpers.specRequireInterop(require('c'));

babelHelpers.specImportCheck(_c, ['foo']);

const _d = babelHelpers.specRequireInterop(require('d'));

babelHelpers.specImportCheck(_d, ['pick']);


(0, _b.default)(_c.foo, _d.pick);