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

            // Returns a comma expression of IIFE wrapped throwNode followed by given expression.
            const throwBefore = expression =>
              t.sequenceExpression([
                t.callExpression(
                  t.functionExpression(null, [], t.blockStatement([throwNode])),
                  [],
                ),
                expression,
              ]);

            if (violation.isAssignmentExpression()) {
              violation
                .get("right")
                .replaceWith(throwBefore(violation.get("right").node));
            } else if (violation.parentPath.isUpdateExpression()) {
              violation.parentPath.replaceWith(throwBefore(violation.parent));
            } else if (violation.parentPath.isForXStatement()) {
              violation.parentPath.ensureBlock();
              violation.parentPath.node.body.body.unshift(throwNode);
            }
          }
        }
      },
    },
  };
}
