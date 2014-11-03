var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node, parent, file) {
  var constants = [];

  var check = function (node, name) {
    if (constants.indexOf(name) >= 0) {
      throw file.errorWithNode(node, name + " is read-only");
    }
  };

  _.each(node.body, function (child) {
    if (child && child.type === "VariableDeclaration" && child.kind === "const") {
      _.each(child.declarations, function (declar) {
        _.each(util.getIds(declar.id), function (name) {
          check(declar, name);
          constants.push(name);
        });

        declar._ignoreConstant = true;
      });
      child.kind = "let";
    }
  });

  if (!constants.length) return;

  traverse(node, function (child) {
    if (child._ignoreConstant) return;

    if (child.type === "VariableDeclarator" ||
        child.type === "FunctionDeclaration" ||
        child.type === "ClassDeclaration") {
      check(child, child.id.name);
    } else if (child.type === "AssignmentExpression") {
      check(child, child.left.name);
    }
  });
};
