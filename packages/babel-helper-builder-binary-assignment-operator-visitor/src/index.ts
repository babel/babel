import explode from "@babel/helper-explode-assignable-expression";
import { assignmentExpression, sequenceExpression } from "@babel/types";

export default function (opts: { build: Function, operator: string }): Object {
  const { build, operator } = opts;

  return {
    AssignmentExpression(path) {
      const { node, scope } = path;
      if (node.operator !== operator + "=") return;

      const nodes = [];
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
}
