var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;

exports.ArrowFunctionExpression = function (node) {
  var body = node.body;

  // expression body
  if (body.type !== "BlockStatement") {
    body = b.blockStatement([
      b.returnStatement(body)
    ]);
  }

  node.expression = false;
  node.body = body;
  node.type = "FunctionExpression";

  if (traverse.hasType(node, "ThisExpression")) {
    return util.template("function-bind-this", {
      FUNCTION: node
    });
  } else {
    return node;
  }
};
