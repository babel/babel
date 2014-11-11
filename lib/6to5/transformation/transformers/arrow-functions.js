var t = require("../../types");

exports.ArrowFunctionExpression = function (node) {
  t.ensureBlock(node);

  node._aliasFunction = true;
  node.expression = false;
  node.type = "FunctionExpression";

  return node;
};
