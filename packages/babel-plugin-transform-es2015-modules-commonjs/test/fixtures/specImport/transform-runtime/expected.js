'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = undefined;

const _specNamespaceGet2 = _specRequireInterop(require('babel-runtime/helpers/specNamespaceGet'));

_specImportCheck(_specNamespaceGet2, ['default']);

const _foo = _specRequireInterop(require('foo'));

_specImportCheck(_foo, ['foo']);

Object.defineProperty(exports, 'foo', {
  enumerable: true,
  get: function () {
    return _foo.foo;
  }
});

const _bar = _specRequireInterop(require('bar'));

function _specImportCheck(module, imports) { if (!module.__esModule) throw new Error("Only ES modules can be checked"); var invalid = imports.filter(function (i) { return !Object.prototype.propertyIsEnumerable.call(module, i); }); if (invalid.length > 0) { var error = new Error("Unknown export" + (invalid.length > 1 ? "s " : " ") + JSON.stringify(invalid) + " imported"); error.module = module; throw error; } }

function _specRequireInterop(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = Object.create ? Object.create(null, { default: { value: obj, writable: true, enumerable: true }, __esModule: { value: true } }) : { default: obj, __esModule: true }; if (typeof Symbol === "function" && Symbol.toStringTag) { Object.defineProperty(newObj, Symbol.toStringTag, { value: "Module" }); } return (Object.freeze || Object)(newObj); } }

(0, _specNamespaceGet2.default)(_bar, true && 'bar');