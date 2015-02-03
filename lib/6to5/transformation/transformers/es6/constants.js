"use strict";

var traverse = require("../../../traverse");
var t        = require("../../../types");

var visitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isDeclaration(node) || t.isAssignmentExpression(node)) {
      var ids = t.getBindingIdentifiers(node);

      for (var key in ids) {
        var id = ids[key];

        var constant = state.constants[key];

        // no constant exists
        if (!constant) continue;

        // check if the assignment id matches the constant declaration id
        // if it does then it was the id used to initially declare the
        // constant so we can just ignore it
        if (id === constant) continue;

        var localBinding = scope.get(key, true);
        if (localBinding !== constant) continue;

        throw state.file.errorWithNode(id, key + " is read-only");
      }
    } else if (t.isScope(node)) {
      context.skip();
    }
  }
};

exports.Scope = function (node, parent, scope, context, file) {
  traverse(node, visitor, scope, {
    constants: scope.getAllDeclarationsOfKind("const"),
    file:      file
  });
};

exports.VariableDeclaration = function (node) {
  if (node.kind === "const") node.kind = "let";
};
