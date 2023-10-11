import {
  LOGICAL_OPERATORS,
  assignmentExpression,
  binaryExpression,
  cloneNode,
  identifier,
  logicalExpression,
  numericLiteral,
  sequenceExpression,
  unaryExpression,
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

if (!process.env.BABEL_8_BREAKING) {
  simpleAssignmentVisitor.UpdateExpression = {
    exit(path) {
      // @ts-expect-error This is Babel7-only
      if (!this.includeUpdateExpression) return;

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
        path.parentPath.isExpressionStatement() &&
        !path.isCompletionRecord()
      ) {
        // ++i => (i += 1);
        const operator = path.node.operator == "++" ? "+=" : "-=";
        path.replaceWith(
          assignmentExpression(operator, arg.node, numericLiteral(1)),
        );
      } else if (path.node.prefix) {
        // ++i => (i = (+i) + 1);
        path.replaceWith(
          assignmentExpression(
            "=",
            identifier(localName),
            binaryExpression(
              path.node.operator[0] as "+" | "-",
              unaryExpression("+", arg.node),
              numericLiteral(1),
            ),
          ),
        );
      } else {
        const old = path.scope.generateUidIdentifierBasedOnNode(
          arg.node,
          "old",
        );
        const varName = old.name;
        path.scope.push({ id: old });

        const binary = binaryExpression(
          path.node.operator[0] as "+" | "-",
          identifier(varName),
          // todo: support bigint
          numericLiteral(1),
        );

        // i++ => (_old = (+i), i = _old + 1, _old)
        path.replaceWith(
          sequenceExpression([
            assignmentExpression(
              "=",
              identifier(varName),
              unaryExpression("+", arg.node),
            ),
            assignmentExpression("=", cloneNode(arg.node), binary),
            identifier(varName),
          ]),
        );
      }
    },
  };
}

export default function simplifyAccess(
  path: NodePath,
  bindingNames: Set<string>,
) {
  if (process.env.BABEL_8_BREAKING) {
    path.traverse(simpleAssignmentVisitor, {
      scope: path.scope,
      bindingNames,
      seen: new WeakSet(),
    });
  } else {
    path.traverse(simpleAssignmentVisitor, {
      scope: path.scope,
      bindingNames,
      seen: new WeakSet(),
      // @ts-expect-error This is Babel7-only
      includeUpdateExpression: arguments[2] ?? true,
    });
  }
}
