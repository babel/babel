'use strict';

const _specNamespaceGet2 = _specRequireInterop(require('babel-runtime/helpers/specNamespaceGet'));

_specImportCheck(_specNamespaceGet2, ['default']);

const _specNamespaceSpread2 = _specRequireInterop(require('babel-runtime/helpers/specNamespaceSpread'));

_specImportCheck(_specNamespaceSpread2, ['default']);

const _create = _specRequireInterop(require('babel-runtime/core-js/object/create'));

_specImportCheck(_create, ['default']);

const _symbol = _specRequireInterop(require('babel-runtime/core-js/symbol'));

_specImportCheck(_symbol, ['default']);

const _toStringTag = _specRequireInterop(require('babel-runtime/core-js/symbol/to-string-tag'));

_specImportCheck(_toStringTag, ['default']);

const _defineProperty = _specRequireInterop(require('babel-runtime/core-js/object/define-property'));

_specImportCheck(_defineProperty, ['default']);

const _defineProperties = _specRequireInterop(require('babel-runtime/core-js/object/define-properties'));

_specImportCheck(_defineProperties, ['default']);

const _keys = _specRequireInterop(require('babel-runtime/core-js/object/keys'));

_specImportCheck(_keys, ['default']);

const _freeze = _specRequireInterop(require('babel-runtime/core-js/object/freeze'));

_specImportCheck(_freeze, ['default']);

const exports = module.exports = _create.default ? (0, _create.default)(null, {
  __esModule: {
    value: true
  }
}) : {
  __esModule: true
};

if (typeof _symbol.default === "function" && _toStringTag.default) {
  (0, _defineProperty.default)(exports, _toStringTag.default, {
    value: "Module"
  });
}

const _ownExports = (0, _keys.default)(exports);

const _baz = _specRequireInterop(require('baz'));

(0, _specNamespaceSpread2.default)(exports, _ownExports, _baz);
(_freeze.default || Object)(exports);

const _foo = _specRequireInterop(require('foo'));

_specImportCheck(_foo, ['foo']);

const _bar = _specRequireInterop(require('bar'));

function _specImportCheck(module, imports) { if (!module.__esModule) throw new Error("Only ES modules can be checked"); var invalid = imports.filter(function (i) { return !Object.prototype.propertyIsEnumerable.call(module, i); }); if (invalid.length > 0) { var error = new Error("Unknown export" + (invalid.length > 1 ? "s " : " ") + JSON.stringify(invalid) + " imported"); error.module = module; throw error; } }

function _specRequireInterop(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = Object.create ? Object.create(null, { default: { value: obj, writable: true, enumerable: true }, __esModule: { value: true } }) : { default: obj, __esModule: true }; if (typeof Symbol === "function" && Symbol.toStringTag) { Object.defineProperty(newObj, Symbol.toStringTag, { value: "Module" }); } return (Object.freeze || Object)(newObj); } }

(0, _specNamespaceGet2.default)(_bar, true && 'bar');