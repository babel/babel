var t = require("../../types");

exports.UnaryExpression = function (node, parent, file, scope) {
  if (node.operator === "typeof") {
    return t.callExpression(file.addHelper("typeof"), [node.argument]);
  }
};
