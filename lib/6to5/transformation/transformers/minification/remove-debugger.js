var t = require("../../../types");

exports.optional = true;

exports.ExpressionStatement = function (node, parent, scope, context) {
  if (t.isIdentifier(node.expression, { name: "debugger" })) {
    context.remove();
  }
};
