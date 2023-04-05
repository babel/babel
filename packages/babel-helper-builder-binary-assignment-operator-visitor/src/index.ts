import { assignmentExpression, sequenceExpression } from "@babel/types";
import type { Visitor } from "@babel/traverse";
import type * as t from "@babel/types";

import explode from "./explode-assignable-expression";

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
      const exploded = explode(node.left, nodes, scope);
      nodes.push(
        assignmentExpression(
          "=",
          exploded.ref,
          build(exploded.uid, node.right),
        ),
      );
      path.replaceWith(sequenceExpression(nodes));
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
