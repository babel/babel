"use strict";

exports.__esModule = true;

var _babelPresetStage = require("babel-preset-stage-1");

var _babelPresetStage2 = _interopRequireDefault(_babelPresetStage);

var _babelPluginTransformDoExpressions = require("babel-plugin-transform-do-expressions");

var _babelPluginTransformDoExpressions2 = _interopRequireDefault(_babelPluginTransformDoExpressions);

var _babelPluginTransformFunctionBind = require("babel-plugin-transform-function-bind");

var _babelPluginTransformFunctionBind2 = _interopRequireDefault(_babelPluginTransformFunctionBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  presets: [_babelPresetStage2.default],
  plugins: [_babelPluginTransformDoExpressions2.default, _babelPluginTransformFunctionBind2.default]
};
module.exports = exports["default"];