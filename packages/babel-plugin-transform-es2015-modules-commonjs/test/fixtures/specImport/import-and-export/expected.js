'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.module3 = exports.module2 = undefined;

require('module1');

var _module = babelHelpers.specRequireInterop(require('module2'));

var _module2 = babelHelpers.specRequireInterop(require('module3'));

var _module3 = babelHelpers.specRequireInterop(require('module4'));

_module.default(_module2.default, _module3.default);

exports.module2 = _module;
exports.module3 = _module2.default;