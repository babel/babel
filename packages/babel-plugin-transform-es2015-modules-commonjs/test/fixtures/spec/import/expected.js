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

const _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

const _outside = babelHelpers.specRequireInterop(require('./outside'));

babelHelpers.specImportCheck(_outside, ['default', 'obj']);

const _anywhere = babelHelpers.specRequireInterop(require('./anywhere'));

babelHelpers.specImportCheck(_anywhere, ['default']);

require('./empty');

require('./imperative');

const _iDontKnow = babelHelpers.specRequireInterop(require('./i-dont-know'));

babelHelpers.specImportCheck(_iDontKnow, ['default', 'what', 'who']);

const _naturally = babelHelpers.specRequireInterop(require('./naturally'));

babelHelpers.specImportCheck(_naturally, ['default', 'naturally']);


(0, _outside.default)(_outside.obj.key);

(0, _anywhere.default)(_elsewhere);

_iDontKnow.default[_iDontKnow.what](_naturally.default, _naturally.naturally);

(0, _iDontKnow.who)(_naturally);