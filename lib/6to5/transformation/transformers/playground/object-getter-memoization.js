"use strict";

var t = require("../../../types");

exports.playground = true;

var visitor = {
  enter: function (node, parent, scope, state) {
    if (t.isFunction(node)) return this.skip();

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
exports.MethodDefinition = function (node, parent, scope, file) {
  if (node.kind !== "memo") return;
  node.kind = "get";

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

  return node;
};
