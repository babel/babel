import { types as t, type PluginPass } from "@babel/core";
import type { NodePath, Visitor } from "@babel/traverse";
import buildOptimizedSequenceExpression from "./buildOptimizedSequenceExpression";

const minimalVisitor: Visitor<PluginPass> = {
  BinaryExpression(path) {
    const { scope, node } = path;
    const { operator, left, right } = node;
    if (operator !== "|>") return;

    const placeholder = scope.generateUidIdentifierBasedOnNode(left);

    const call = t.callExpression(right, [t.cloneNode(placeholder)]);
    path.replaceWith(
      buildOptimizedSequenceExpression({
        placeholder,
        call,
        path: path as NodePath<t.BinaryExpression & { operator: "|>" }>,
      }),
    );
  },
};

export default minimalVisitor;
