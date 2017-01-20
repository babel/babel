'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.module3 = exports.module2 = undefined;

require('module1');

const _module = babelHelpers.specRequireInterop(require('module2'));

babelHelpers.specImportCheck(_module, ['default']);

const _module2 = babelHelpers.specRequireInterop(require('module3'));

babelHelpers.specImportCheck(_module2, ['default']);

const _module3 = babelHelpers.specRequireInterop(require('module4'));

babelHelpers.specImportCheck(_module3, ['default']);


_module.default(_module2.default, _module3.default);

exports.module2 = _module;
exports.module3 = _module2.default;