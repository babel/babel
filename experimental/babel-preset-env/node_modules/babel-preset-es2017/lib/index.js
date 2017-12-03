"use strict";

exports.__esModule = true;

var _babelPluginSyntaxTrailingFunctionCommas = require("babel-plugin-syntax-trailing-function-commas");

var _babelPluginSyntaxTrailingFunctionCommas2 = _interopRequireDefault(_babelPluginSyntaxTrailingFunctionCommas);

var _babelPluginTransformAsyncToGenerator = require("babel-plugin-transform-async-to-generator");

var _babelPluginTransformAsyncToGenerator2 = _interopRequireDefault(_babelPluginTransformAsyncToGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [_babelPluginSyntaxTrailingFunctionCommas2.default, _babelPluginTransformAsyncToGenerator2.default]
};
module.exports = exports["default"];