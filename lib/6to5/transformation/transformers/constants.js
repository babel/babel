var traverse = require("../../traverse");
var t        = require("../../types");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node, parent, file) {
  var constants = [];

  var check = function (node, names) {
    _.each(names, function (name) {
      if (constants.indexOf(name) >= 0) {
        throw file.errorWithNode(node, name + " is read-only");
      }
    });
  };

  _.each(node.body, function (child) {
    if (child && t.isVariableDeclaration(child) && child.kind === "const") {
      _.each(child.declarations, function (declar) {
        _.each(t.getIds(declar), function (name) {
          check(declar, [name]);
          constants.push(name);
        });

        declar._ignoreConstant = true;
      });

      child._ignoreConstant = true;
      child.kind = "let";
    }
  });

  if (!constants.length) return;

  traverse(node, function (child) {
    if (child._ignoreConstant) return;

    if (t.isVariableDeclarator(child) || t.isDeclaration(child) || t.isAssignmentExpression(child)) {
      check(child, t.getIds(child));
    }
  });
};
