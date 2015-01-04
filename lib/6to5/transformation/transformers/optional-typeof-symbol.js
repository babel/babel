var t = require("../../types");

exports.optional = true;

exports.UnaryExpression = function (node, parent, file) {
  if (node.operator === "typeof") {
    return t.callExpression(file.addHelper("typeof"), [node.argument]);
  }
};
