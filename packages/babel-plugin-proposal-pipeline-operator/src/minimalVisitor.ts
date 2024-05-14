import { types as t } from "@babel/core";
import type { PluginPass, NodePath, Visitor } from "@babel/core";
import buildOptimizedSequenceExpression from "./buildOptimizedSequenceExpression.ts";

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
