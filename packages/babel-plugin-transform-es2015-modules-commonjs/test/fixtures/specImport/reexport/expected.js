'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = exports.def = exports.ns = undefined;

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

const _module4 = babelHelpers.specRequireInterop(require('module3'));

exports.default = _module2;
exports.ns = _module2;
exports.def = _module3.default;
exports.pick = _module4.pick;