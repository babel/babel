var util = require("../util");

exports.ArrowFunctionExpression = function (node) {
  util.ensureBlock(node);

  node._aliasFunction = "arrows";
  node.expression = false;
  node.type = "FunctionExpression";

  return node;
};
