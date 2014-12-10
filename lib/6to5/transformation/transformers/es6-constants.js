var traverse = require("../../traverse");
var t        = require("../../types");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node, parent, file) {
  var constants = {};

  /**
   * Check the results of `util.getIds` as `names` generated from a
   * node against it's parent.
   */

  var check = function (parent, names, scope) {
    _.each(names, function (nameNode, name) {
      if (!_.has(constants, name)) return;
      if (parent && t.isBlockStatement(parent) && parent !== constants[name]) return;

      if (scope) {
        var defined = scope.get(name);
        if (defined && defined === nameNode) return;
      }

      throw file.errorWithNode(nameNode, name + " is read-only");
    });
  };

  var getIds = function (node) {
    return t.getIds(node, true, ["MemberExpression"]);
  };

  /**
   * Collect all constants in this scope.
   */

  _.each(node.body, function (child, parent) {
    if (child && t.isVariableDeclaration(child, { kind: "const" })) {
      _.each(child.declarations, function (declar) {
        _.each(getIds(declar), function (nameNode, name) {
          var names = {};
          names[name] = nameNode;
          check(parent, names);

          constants[name] = parent;
        });

        declar._ignoreConstant = true;
      });

      child._ignoreConstant = true;
      child.kind = "let";
    }
  });

  if (_.isEmpty(constants)) return;

  traverse(node, function (child, parent, scope) {
    if (child._ignoreConstant) return;
    if (t.isVariableDeclaration(child)) return;

    if (t.isVariableDeclarator(child) || t.isDeclaration(child) || t.isAssignmentExpression(child)) {
      check(parent, getIds(child), scope);
    }
  });
};
