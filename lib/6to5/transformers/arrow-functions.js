var util = require("../util");

exports.ArrowFunctionExpression = function (node) {
  util.ensureBlock(node);

  node._aliasFunction = true;
  node._aliasFunctionStopNonArrowFunctions = true;
  node.expression = false;
  node.type = "FunctionExpression";

  return node;
};
