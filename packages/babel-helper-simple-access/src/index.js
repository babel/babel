import * as t from "@babel/types";

export default function simplifyAccess(path: NodePath, bindingNames) {
  path.traverse(simpleAssignmentVisitor, {
    scope: path.scope,
    bindingNames,
    seen: new WeakSet(),
  });
}

const simpleAssignmentVisitor = {
  UpdateExpression: {
    exit(path) {
      const { scope, bindingNames } = this;

      const arg = path.get("argument");
      if (!arg.isIdentifier()) return;
      const localName = arg.node.name;

      if (!bindingNames.has(localName)) return;

      // redeclared in this scope
      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      if (
        path.node.prefix ||
        (path.parentPath.isExpressionStatement() && !path.isCompletionRecord())
      ) {
        // ++i => (i += 1);
        path.replaceWith(
          t.assignmentExpression("+=", arg.node, t.numericLiteral(1)),
        );
      } else {
        const varName = path.scope.generateDeclaredUidIdentifier("old").name;

        const binary = t.binaryExpression(
          path.node.operator.slice(0, 1),
          t.identifier(varName),
          t.numericLiteral(1),
        );

        // i++ => (_tmp = i, i = _tmp + 1, _tmp)
        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", t.identifier(varName), arg.node),
            t.assignmentExpression("=", t.cloneNode(arg.node), binary),
            t.identifier(varName),
          ]),
        );
      }
    },
  },

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

      path.node.right = t.binaryExpression(
        path.node.operator.slice(0, -1),
        t.cloneNode(path.node.left),
        path.node.right,
      );
      path.node.operator = "=";
    },
  },
};
