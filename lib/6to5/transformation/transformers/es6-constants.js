"use strict";

var traverse = require("../../traverse");
var t        = require("../../types");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node, parent, scope, context, file) {
  var hasConstants = false;
  var constants = {};

  /**
   * Check the results of `util.getIds` as `names` generated from a
   * node against it's parent.
   */

  var check = function (parent, names, scope) {
    for (var name in names) {
      var nameNode = names[name];
      if (!_.has(constants, name)) continue;
      if (parent && t.isBlockStatement(parent) && parent !== constants[name]) continue;

      if (scope) {
        var defined = scope.get(name);
        if (defined && defined === nameNode) continue;
      }

      throw file.errorWithNode(nameNode, name + " is read-only");
    }
  };

  var getIds = function (node) {
    return t.getIds(node, true, ["MemberExpression"]);
  };

  /**
   * Collect all constants in this scope.
   */

  _.each(node.body, function (child, parent) {
    if (t.isExportDeclaration(child)) {
      child = child.declaration;
    }

    if (t.isVariableDeclaration(child, { kind: "const" })) {
      for (var i = 0; i < child.declarations.length; i++) {
        var declar = child.declarations[i];

        var ids = getIds(declar);
        for (var name in ids) {
          var nameNode = ids[name];

          var names = {};
          names[name] = nameNode;
          check(parent, names);

          constants[name] = parent;
          hasConstants = true;
        }

        declar._ignoreConstant = true;
      }

      child._ignoreConstant = true;
      child.kind = "let";
    }
  });

  if (!hasConstants) return;

  var state = {
    check: check,
    getIds: getIds
  };

  traverse(node, {
    enter: function (child, parent, scope, context, state) {
      if (child._ignoreConstant) return;
      if (t.isVariableDeclaration(child)) return;

      if (t.isVariableDeclarator(child) || t.isDeclaration(child) || t.isAssignmentExpression(child)) {
        state.check(parent, state.getIds(child), scope);
      }
    }
  }, null, state);
};
