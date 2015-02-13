"use strict";

var messages = require("../../../messages");
var t        = require("../../../types");

exports.check = function (node) {
  return t.isVariableDeclaration(node, { kind: "const" });
};

var visitor = {
  enter: function (node, parent, scope, state) {
    if (t.isAssignmentExpression(node) || t.isUpdateExpression(node)) {
      var ids = t.getBindingIdentifiers(node);

      for (var name in ids) {
        var id = ids[name];

        var constant = state.constants[name];

        // no constant exists
        if (!constant) continue;

        var constantIdentifier = constant.identifier;

        // check if the assignment id matches the constant declaration id
        // if it does then it was the id used to initially declare the
        // constant so we can just ignore it
        if (id === constantIdentifier) continue;

        // check if there's been a local binding that shadows this constant
        if (!scope.bindingIdentifierEquals(name, constantIdentifier)) continue;

        throw state.file.errorWithNode(id, messages.get("readOnly", name));
      }
    } else if (t.isScope(node, parent)) {
      this.skip();
    }
  }
};

exports.Scopable = function (node, parent, scope, file) {
  scope.traverse(node, visitor, {
    constants: scope.getAllBindingsOfKind("const"),
    file:      file
  });
};

exports.VariableDeclaration = function (node) {
  if (node.kind === "const") node.kind = "let";
};
