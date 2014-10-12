var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;

exports.ArrowFunctionExpression = function (node, parent, file) {
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
exports.FunctionExpression = function (node, parent, file) {
  var argumentsId;

  var isArgumentIdentifier = function (node) {
    return node.type === "Identifier" && node.name === "arguments";
  };

  var getId = function () {
    return argumentsId = argumentsId || b.identifier(file.generateUid("arguments"));
  };

  // traverse the function and find all arrow functions so we can alias
  // arguments if neccesary
  traverse(node, function (node) {
    if (node.type !== "ArrowFunctionExpression") return;

    // traverse all child nodes of this arrow function and find a sole arguments
    // identifier
    traverse(node, function (node, parent) {
      if (isArgumentIdentifier(node) && parent.type !== "MemberExpression") {
        return getId();
      } else if (node.type === "MemberExpression" && isArgumentIdentifier(node.object)) {
        node.object = getId();
      } else {
        return;
      }
    }, traverse.FUNCTION_TYPES);

    return false;
  }, ["FunctionDeclaration", "FunctionExpression"]);

  if (argumentsId) {
    util.ensureBlock(node);
    node.body.body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(argumentsId, b.identifier("arguments"))
    ]));
  }
};
