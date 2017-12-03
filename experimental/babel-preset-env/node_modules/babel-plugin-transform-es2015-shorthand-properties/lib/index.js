"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    visitor: {
      ObjectMethod: function ObjectMethod(path) {
        var node = path.node;

        if (node.kind === "method") {
          var func = t.functionExpression(null, node.params, node.body, node.generator, node.async);
          func.returnType = node.returnType;

          path.replaceWith(t.objectProperty(node.key, func, node.computed));
        }
      },
      ObjectProperty: function ObjectProperty(_ref) {
        var node = _ref.node;

        if (node.shorthand) {
          node.shorthand = false;
        }
      }
    }
  };
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports["default"];