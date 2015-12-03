"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  const t = _ref.types;

  return {
    visitor: {
      CallExpression: function CallExpression (path) {
        if (path.node.callee.name !== "__babel_native__") {
          return;
        }
        switch (path.node.arguments[0].value) {
          case "typeof":
            const unary = t.unaryExpression("typeof", path.node.arguments[1]);
            unary._fromBabelNative = true;
            path.replaceWith(unary);
            break;
          default:
            throw new Error("Invalid native: " + path.node.arguments[0].value)
        }
      }
    }
  };
};

module.exports = exports["default"];
