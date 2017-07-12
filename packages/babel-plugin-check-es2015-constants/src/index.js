export default function({ messages, types: t }) {
  return {
    visitor: {
      Scope({ scope }) {
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (const violation of (binding.constantViolations: Array)) {
            const throwNode = t.throwStatement(
              t.newExpression(t.identifier("Error"), [
                t.stringLiteral(messages.get("readOnly", name)),
              ]),
            );

            if (violation.isAssignmentExpression()) {
              violation
                .get("right")
                .replaceWith(
                  t.sequenceExpression([
                    t.callExpression(
                      t.functionExpression(
                        null,
                        [],
                        t.blockStatement([throwNode]),
                      ),
                      [],
                    ),
                    violation.get("right").node,
                  ]),
                );
            } else if (violation.parentPath.isUpdateExpression()) {
              violation.parentPath.replaceWith(
                t.sequenceExpression([
                  t.callExpression(
                    t.functionExpression(
                      null,
                      [],
                      t.blockStatement([throwNode]),
                    ),
                    [],
                  ),
                  violation.parent,
                ]),
              );
            } else if (violation.parentPath.isForXStatement()) {
              // Transform single statement body into BlockStatement
              if (!violation.parentPath.get("body").isBlockStatement()) {
                violation.parentPath
                  .get("body")
                  .replaceWith(
                    t.blockStatement([violation.parentPath.get("body").node]),
                  );
              }
              violation.parentPath.node.body.body.unshift(throwNode);
            }
          }
        }
      },
    },
  };
}
