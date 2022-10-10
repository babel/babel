import { types as t } from "@babel/core";
import explode from "@babel/helper-explode-assignable-expression";
import type { Visitor } from "@babel/traverse";

export default function (opts: {
  build: (
    left: t.Expression | t.PrivateName | t.Super,
    right: t.Expression,
  ) => t.Expression;
  operator: t.BinaryExpression["operator"];
}) {
  const { build, operator } = opts;

  const visitor: Visitor = {
    AssignmentExpression(path) {
      const { node, scope } = path;
      if (node.operator !== operator + "=") return;

      const nodes: t.AssignmentExpression[] = [];
      // @ts-expect-error Fixme: node.left can be a TSAsExpression
      const exploded = explode(node.left, nodes, this, scope);
      nodes.push(
        t.assignmentExpression(
          "=",
          exploded.ref,
          build(exploded.uid, node.right),
        ),
      );
      path.replaceWith(t.sequenceExpression(nodes));
    },

    BinaryExpression(path) {
      const { node } = path;
      if (node.operator === operator) {
        path.replaceWith(build(node.left, node.right));
      }
    },
  };
  return visitor;
}
