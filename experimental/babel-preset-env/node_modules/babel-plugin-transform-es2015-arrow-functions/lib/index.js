"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
          var node = path.node;

          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          var boundThis = t.thisExpression();
          boundThis._forceShadow = path;

          path.ensureBlock();
          path.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [t.thisExpression(), boundThis])));

          path.replaceWith(t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]));
        } else {
          path.arrowFunctionToShadowed();
        }
      }
    }
  };
};

module.exports = exports["default"];