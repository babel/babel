"use strict";

var t = require("../../../types");

var visitor = {
  enter: function (node, parent, scope, state) {
    if (!t.isReferencedIdentifier(node, parent)) return;

    var declared = state.letRefs[node.name];
    if (!declared) return;

    // declared node is different in this scope
    if (scope.getBindingIdentifier(node.name) !== declared) return;

    var assert = t.callExpression(
      state.file.addHelper("temporal-assert-defined"),
      [node, t.literal(node.name), state.file.addHelper("temporal-undefined")]
    );

    this.skip();

    if (t.isAssignmentExpression(parent) || t.isUpdateExpression(parent)) {
      if (parent._ignoreBlockScopingTDZ) return;
      this.parentPath.replaceNode(t.sequenceExpression([assert, parent]));
    } else {
      return t.logicalExpression("&&", assert, node);
    }
  }
};

exports.optional = true;

exports.Loop =
exports.Program =
exports.BlockStatement = function (node, parent, scope, file) {
  var letRefs = node._letReferences;
  if (!letRefs) return;

  var state = {
    letRefs: letRefs,
    file:    file
  };

  scope.traverse(node, visitor, state);
};
