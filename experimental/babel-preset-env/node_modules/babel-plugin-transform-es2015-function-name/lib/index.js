"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    visitor: {
      FunctionExpression: {
        exit: function exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            var replacement = (0, _babelHelperFunctionName2.default)(path);
            if (replacement) path.replaceWith(replacement);
          }
        }
      },

      ObjectProperty: function ObjectProperty(path) {
        var value = path.get("value");
        if (value.isFunction()) {
          var newNode = (0, _babelHelperFunctionName2.default)(value);
          if (newNode) value.replaceWith(newNode);
        }
      }
    }
  };
};

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];