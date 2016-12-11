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
      return _module3.pick;
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

require('module1');

const _module = babelHelpers.specRequireInterop(require('module2'));

babelHelpers.specImportCheck(_module, ['default']);

const _module2 = babelHelpers.specRequireInterop(require('module3'));

const _module3 = babelHelpers.specRequireInterop(require('module4'));

babelHelpers.specImportCheck(_module3, ['pick']);
babelHelpers.specImportCheck(_module2, ['foo']);


(0, _module.default)(_module2.foo, _module3.pick);