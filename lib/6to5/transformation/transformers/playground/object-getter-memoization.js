"use strict";

var t = require("../../../types");

exports.playground = true;

var visitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isFunction(node)) return;

    if (t.isReturnStatement(node) && node.argument) {
      node.argument = t.memberExpression(t.callExpression(state.file.addHelper("define-property"), [
        t.thisExpression(),
        state.key,
        node.argument
      ]), state.key, true);
    }
  }
};

exports.Property =
exports.MethodDefinition = function (node, parent, scope, context, file) {
  if (node.kind !== "memo") return;
  node.kind = "get";
  file.checkNode(node, scope);

  var value = node.value;
  t.ensureBlock(value);

  var key = node.key;

  if (t.isIdentifier(key) && !node.computed) {
    key = t.literal(key.name);
  }

  var state = {
    key:  key,
    file: file
  };

  scope.traverse(value, visitor, state);
};
