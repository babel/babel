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

const _undefined = {
  enumerable: true,
  writable: true,
  configurable: true,
  value: undefined
};
Object.defineProperties(exports, {
  namespace: _undefined,
  default: _undefined,
  why: _undefined
});

var _iDontKnow = babelHelpers.specRequireInterop(require('./i-dont-know'));

Object.keys(_iDontKnow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,

    get() {
      return _iDontKnow[key];
    }

  });
});

var _because = babelHelpers.specRequireInterop(require('./because'));

Object.defineProperty(exports, 'why', {
  enumerable: true,

  get() {
    return _because.default;
  }

});

var _somewhere = babelHelpers.specRequireInterop(require('./somewhere'));

var _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

Object.defineProperty(exports, 'namespace', {
  enumerable: true,
  writable: true,
  value: _somewhere
});
Object.defineProperty(exports, 'default', {
  enumerable: true,

  get() {
    return _elsewhere.stuff;
  }

});
(Object.freeze || Object)(exports);