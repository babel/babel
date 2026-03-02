import {
  LOGICAL_OPERATORS,
  assignmentExpression,
  binaryExpression,
  cloneNode,
  logicalExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import type { NodePath, Scope, Visitor } from "@babel/traverse";

type State = {
  scope: Scope;
  bindingNames: Set<string>;
  seen: WeakSet<t.Node>;
};

const simpleAssignmentVisitor: Visitor<State> = {
  AssignmentExpression: {
    exit(path) {
      const { scope, seen, bindingNames } = this;

      if (path.node.operator === "=") return;

      if (seen.has(path.node)) return;
      seen.add(path.node);

      const left = path.get("left");
      if (!left.isIdentifier()) return;

      // Simple update-assign foo += 1;
      // =>   exports.foo =  (foo += 1);
      const localName = left.node.name;

      if (!bindingNames.has(localName)) return;

      // redeclared in this scope
      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      const operator = path.node.operator.slice(0, -1);
      if (LOGICAL_OPERATORS.includes(operator)) {
        // &&, ||, ??
        // (foo &&= bar) => (foo && foo = bar)
        path.replaceWith(
          logicalExpression(
            // @ts-expect-error Guarded by LOGICAL_OPERATORS.includes
            operator,
            path.node.left,
            assignmentExpression(
              "=",
              cloneNode(path.node.left),
              path.node.right,
            ),
          ),
        );
      } else {
        // (foo += bar) => (foo = foo + bar)
        path.node.right = binaryExpression(
          // @ts-expect-error An assignment expression operator removing "=" must
          // be a valid binary operator
          operator,
          cloneNode(path.node.left),
          path.node.right,
        );
        path.node.operator = "=";
      }
    },
  },
};

export default function simplifyAccess(
  path: NodePath,
  bindingNames: Set<string>,
) {
  path.traverse(simpleAssignmentVisitor, {
    scope: path.scope,
    bindingNames,
    seen: new WeakSet(),
  });
}
