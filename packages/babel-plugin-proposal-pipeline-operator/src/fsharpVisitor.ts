import { types as t, type PluginObject, type NodePath } from "@babel/core";
import buildOptimizedSequenceExpression from "./buildOptimizedSequenceExpression.ts";

const fsharpVisitor: PluginObject["visitor"] = {
  BinaryExpression(path) {
    const { scope, node } = path;
    const { operator, left, right } = node;
    if (operator !== "|>") return;

    const placeholder = scope.generateUidIdentifierBasedOnNode(left);

    const call =
      right.type === "AwaitExpression"
        ? t.awaitExpression(t.cloneNode(placeholder))
        : t.callExpression(right, [t.cloneNode(placeholder)]);
    const sequence = buildOptimizedSequenceExpression({
      placeholder,
      call,
      path: path as NodePath<t.BinaryExpression & { operator: "|>" }>,
    });
    path.replaceWith(sequence);
  },
};

export default fsharpVisitor;
