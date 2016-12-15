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

(Object.freeze || Object)(exports);

require('a');

require('b');

const _c = babelHelpers.specRequireInterop(require('c'));

babelHelpers.specImportCheck(_c, ['name']);

const _d = babelHelpers.specRequireInterop(require('d'));

babelHelpers.specImportCheck(_d, ['default']);

const _e = babelHelpers.specRequireInterop(require('e'));

babelHelpers.specImportCheck(_e, ['name']);


_c.name;
_d.default;
_e.name;