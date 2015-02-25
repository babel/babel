var t = require("../../../types");

exports.optional = true;

exports.ExpressionStatement = function (node) {
  if (t.isIdentifier(node.expression, { name: "debugger" })) {
    this.remove();
  }
};
