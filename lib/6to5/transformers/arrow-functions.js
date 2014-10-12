var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;

exports.ArrowFunctionExpression = function (node) {
  util.ensureBlock(node);

  node.expression = false;
  node.type = "FunctionExpression";

  if (traverse.hasType(node, "ThisExpression")) {
    return util.template("function-bind-this", {
      FUNCTION: node
    });
  } else {
    return node;
  }
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, opts, generateUid) {
  var argumentsId;

  // traverse the function and find all arrow functions
  traverse(node, function (node) {
    if (node.type !== "ArrowFunctionExpression") return;

    // traverse all child nodes of this arrow function and find a sole arguments
    // identifier
    argumentsId = util.aliasArguments(generateUid, node, argumentsId);

    return false;
  }, ["FunctionDeclaration", "FunctionExpression"]);

  if (argumentsId) {
    util.ensureBlock(node);
    node.body.body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(argumentsId, b.identifier("arguments"))
    ]));
  }
};
