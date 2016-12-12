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
  renamed: {
    enumerable: true,

    get() {
      return _elsewhere.stuff;
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

Object.keys(_iDontKnow).forEach(function (key) {
  if (key === "__esModule" || key === "default" || _ownExports.indexOf(key) >= 0) return;
  if (key in exports && babelHelpers.sameValue(exports[key], _iDontKnow[key])) return;
  Object.defineProperty(exports, key, {
    enumerable: true,

    get() {
      return _iDontKnow[key];
    }

  });
});
(Object.freeze || Object)(exports);

const _somewhere = babelHelpers.specRequireInterop(require('./somewhere'));

const _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

babelHelpers.specImportCheck(_elsewhere, ['stuff']);

const _somewhereElse = babelHelpers.specRequireInterop(require('./somewhereElse'));

babelHelpers.specImportCheck(_somewhereElse, ['stuff']);

const _because = babelHelpers.specRequireInterop(require('./because'));

babelHelpers.specImportCheck(_because, ['default']);