import { declare } from "@babel/helper-plugin-utils";
import syntaxPartialApplication from "@babel/plugin-syntax-partial-application";
import { types as t } from "@babel/core";
import type { Scope } from "@babel/traverse";

export default declare(api => {
  api.assertVersion(7);

  /**
   * a function to figure out if a call expression has
   * ArgumentPlaceholder as one of its arguments
   * @param node a callExpression node
   * @returns boolean
   */
  function hasArgumentPlaceholder(node: t.CallExpression) {
    return node.arguments.some(arg => t.isArgumentPlaceholder(arg));
  }

  function unwrapArguments(
    { arguments: args }: t.CallExpression,
    scope: Scope,
  ) {
    const init: t.AssignmentExpression[] = [];
    for (let i = 0; i < args.length; i++) {
      const node = args[i];
      if (!t.isArgumentPlaceholder(node) && !t.isImmutable(node)) {
        const id = scope.generateUidIdentifierBasedOnNode(node, "param");
        scope.push({ id });
        if (t.isSpreadElement(node)) {
          init.push(
            t.assignmentExpression(
              "=",
              t.cloneNode(id),
              t.arrayExpression([t.spreadElement(node.argument)]),
            ),
          );
          node.argument = t.cloneNode(id);
        } else {
          init.push(
            t.assignmentExpression(
              "=",
              t.cloneNode(id),
              // @ts-expect-error Fixme: may need to handle JSXNamespacedName here
              node,
            ),
          );
          args[i] = t.cloneNode(id);
        }
      }
    }
    return init;
  }

  type CallArgsWithoutPlaceholder = Exclude<
    t.CallExpression["arguments"][number],
    t.ArgumentPlaceholder
  >[];

  function replacePlaceholders(
    node: t.CallExpression,
    scope: Scope,
  ): [t.Identifier[], CallArgsWithoutPlaceholder] {
    const placeholders: t.Identifier[] = [];
    const newArgs: CallArgsWithoutPlaceholder = [];

    node.arguments.forEach(arg => {
      if (t.isArgumentPlaceholder(arg)) {
        const id = scope.generateUid("_argPlaceholder");
        placeholders.push(t.identifier(id));
        newArgs.push(t.identifier(id));
      } else {
        newArgs.push(arg);
      }
    });
    return [placeholders, newArgs];
  }

  return {
    name: "proposal-partial-application",
    inherits: syntaxPartialApplication,

    visitor: {
      CallExpression(path) {
        if (!hasArgumentPlaceholder(path.node)) {
          return;
        }
        const { node, scope } = path;
        const functionLVal = path.scope.generateUidIdentifierBasedOnNode(
          node.callee,
        );
        const sequenceParts = [];
        const argsInitializers = unwrapArguments(node, scope);
        const [placeholdersParams, args] = replacePlaceholders(node, scope);

        scope.push({ id: functionLVal });

        if (node.callee.type === "MemberExpression") {
          const { object: receiver, property } = node.callee;
          const receiverLVal =
            path.scope.generateUidIdentifierBasedOnNode(receiver);
          scope.push({ id: receiverLVal });

          sequenceParts.push(
            t.assignmentExpression(
              "=",
              t.cloneNode(receiverLVal),
              // @ts-ignore(Babel 7 vs Babel 8) Fixme: support `super.foo(?)`
              receiver,
            ),
            t.assignmentExpression(
              "=",
              t.cloneNode(functionLVal),
              t.memberExpression(t.cloneNode(receiverLVal), property),
            ),
            ...argsInitializers,
            t.functionExpression(
              t.isIdentifier(property)
                ? t.cloneNode(property)
                : path.scope.generateUidIdentifierBasedOnNode(property),
              placeholdersParams,
              t.blockStatement(
                [
                  t.returnStatement(
                    t.callExpression(
                      t.memberExpression(
                        t.cloneNode(functionLVal),
                        t.identifier("call"),
                      ),
                      [t.cloneNode(receiverLVal), ...args],
                    ),
                  ),
                ],
                [],
              ),
              false,
              false,
            ),
          );
        } else {
          sequenceParts.push(
            t.assignmentExpression(
              "=",
              t.cloneNode(functionLVal),
              // @ts-expect-error V8 intrinsics will not support partial application
              node.callee,
            ),
            ...argsInitializers,
            t.functionExpression(
              t.isIdentifier(node.callee)
                ? t.cloneNode(node.callee)
                : path.scope.generateUidIdentifierBasedOnNode(node.callee),
              placeholdersParams,
              t.blockStatement(
                [
                  t.returnStatement(
                    t.callExpression(t.cloneNode(functionLVal), args),
                  ),
                ],
                [],
              ),
              false,
              false,
            ),
          );
        }
        path.replaceWith(t.sequenceExpression(sequenceParts));
      },
    },
  };
});
