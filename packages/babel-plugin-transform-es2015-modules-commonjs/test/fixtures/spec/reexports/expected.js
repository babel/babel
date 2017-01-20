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
  renamed: {
    enumerable: true,

    get() {
      return _elsewhere.stuff;
    }

  },
  namespace: {
    enumerable: true,

    get() {
      return _somewhere;
    }

  },
  default: {
    enumerable: true,

    get() {
      return _somewhereElse.stuff;
    }

  },
  why: {
    enumerable: true,

    get() {
      return _because.default;
    }

  }
});

const _ownExports = Object.keys(exports);

const _iDontKnow = babelHelpers.specRequireInterop(require('./i-dont-know'));

babelHelpers.specNamespaceSpread(exports, _ownExports, _iDontKnow);
(Object.freeze || Object)(exports);

const _somewhere = babelHelpers.specRequireInterop(require('./somewhere'));

const _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

babelHelpers.specImportCheck(_elsewhere, ['stuff']);

const _somewhereElse = babelHelpers.specRequireInterop(require('./somewhereElse'));

babelHelpers.specImportCheck(_somewhereElse, ['stuff']);

const _because = babelHelpers.specRequireInterop(require('./because'));

babelHelpers.specImportCheck(_because, ['default']);