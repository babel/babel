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
  var hasArguments = false;
  var id;

  // traverse the function and find all arrow functions
  traverse(node, function (node) {
    if (node.type !== "ArrowFunctionExpression") return;

    // traverse all child nodes of this arrow function and find a sole arguments
    // identifier
    traverse(node, function (node, parent) {
      if (node.type === "Identifier" && node.name === "arguments" &&
          parent.type !== "MemberExpression") {
        hasArguments = true;
        id = id || b.identifier(generateUid("arguments"));
        return id;
      }
    }, traverse.FUNCTION_TYPES);

    return false;
  }, ["FunctionDeclaration", "FunctionExpression"]);

  if (hasArguments) {
    util.ensureBlock(node);
    node.body.body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(id, b.identifier("arguments"))
    ]));
  }
};
