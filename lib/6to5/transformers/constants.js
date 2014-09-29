var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node) {
  var constants = [];

  var check = function (node, name) {
    if (constants.indexOf(name) >= 0) {
      throw util.errorWithNode(node, name + " is read-only");
    }
  };

  _.each(node.body, function (child) {
    if (child.type === "VariableDeclaration" && child.kind === "const") {
      _.each(child.declarations, function (declar) {
        var name = declar.id.name;
        check(declar, name);

        declar._ignoreConstant = true;
        constants.push(name);
      });
      child.kind = "let";
    }
  });

  if (!constants.length) return;

  traverse(node, function (child) {
    if (child._ignoreConstant) return;

    if (child.type === "VariableDeclarator") {
      check(child, child.id.name);
    } else if (child.type === "AssignmentExpression") {
      check(child, child.left.name);
    }
  });
};
