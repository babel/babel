"use strict";

var traverse = require("../../traverse");
var t        = require("../../types");

exports.Property =
exports.MethodDefinition = function (node, parent, scope, context, file) {
  if (node.kind !== "memo") return;
  node.kind = "get";

  var value = node.value;
  t.ensureBlock(value);

  var key = node.key;

  if (t.isIdentifier(key) && !node.computed) {
    key = t.literal(key.name);
  }

  traverse(value, {
    enter: function (node) {
      if (t.isFunction(node)) return;

      if (t.isReturnStatement(node) && node.argument) {
        node.argument = t.memberExpression(t.callExpression(file.addHelper("define-property"), [
          t.thisExpression(),
          key,
          node.argument
        ]), key, true);
      }
    }
  });
};
