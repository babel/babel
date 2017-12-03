"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    inherits: require("babel-plugin-syntax-async-functions"),

    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        (0, _babelHelperRemapAsyncToGenerator2.default)(path, state.file, {
          wrapAsync: state.addHelper("asyncToGenerator")
        });
      }
    }
  };
};

var _babelHelperRemapAsyncToGenerator = require("babel-helper-remap-async-to-generator");

var _babelHelperRemapAsyncToGenerator2 = _interopRequireDefault(_babelHelperRemapAsyncToGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];