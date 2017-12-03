"use strict";

exports.__esModule = true;

var _babelPluginTransformExponentiationOperator = require("babel-plugin-transform-exponentiation-operator");

var _babelPluginTransformExponentiationOperator2 = _interopRequireDefault(_babelPluginTransformExponentiationOperator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [_babelPluginTransformExponentiationOperator2.default]
};
module.exports = exports["default"];