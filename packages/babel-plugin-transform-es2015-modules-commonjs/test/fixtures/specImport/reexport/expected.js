'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baz = exports.foo = exports.pick = exports.def = exports.ns = undefined;

const _module = babelHelpers.specRequireInterop(require('module4'));

Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _module[key];
    }
  });
});

const _module2 = babelHelpers.specRequireInterop(require('module1'));

const _module3 = babelHelpers.specRequireInterop(require('module2'));

babelHelpers.specImportCheck(_module3, ['default']);

const _module4 = babelHelpers.specRequireInterop(require('module3'));

babelHelpers.specImportCheck(_module4, ['pick']);

const _module5 = babelHelpers.specRequireInterop(require('module5'));

babelHelpers.specImportCheck(_module5, ['foo', 'bar']);
Object.defineProperty(exports, 'foo', {
  enumerable: true,
  get: function () {
    return _module5.foo;
  }
});
Object.defineProperty(exports, 'baz', {
  enumerable: true,
  get: function () {
    return _module5.bar;
  }
});

require('module6');

exports.default = _module2;
exports.ns = _module2;
exports.def = _module3.default;
exports.pick = _module4.pick;