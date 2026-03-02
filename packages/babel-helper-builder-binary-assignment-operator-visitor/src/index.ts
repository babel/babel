import explode from "@babel/helper-explode-assignable-expression";
import { assignmentExpression, sequenceExpression } from "@babel/types";
import type { Visitor } from "@babel/traverse";

export default function (opts: { build: Function; operator: string }) {
  const { build, operator } = opts;

  const visitor: Visitor = {
    AssignmentExpression(path) {
      const { node, scope } = path;
      if (node.operator !== operator + "=") return;

      const nodes = [];
      // @ts-expect-error todo(flow->ts)
      const exploded = explode(node.left, nodes, this, scope);
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
