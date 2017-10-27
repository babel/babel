export default function({ types: t }) {
  /**
   * Helper function to run a statement before an expression by replacing it with a comma expression
   * and wrapping the statement in an IIFE as the first operand.
   */
  function statementBeforeExpression(statement, expression) {
    return t.sequenceExpression([
      t.callExpression(
        t.functionExpression(null, [], t.blockStatement([statement])),
        [],
      ),
      expression,
    ]);
  }

  return {
    visitor: {
      Scope({ scope }) {
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const") continue;

          for (const violation of (binding.constantViolations: Array)) {
            const throwNode = t.throwStatement(
              t.newExpression(t.identifier("Error"), [
                t.stringLiteral(`"${name}" is read-only`),
              ]),
            );

            if (violation.isAssignmentExpression()) {
              violation
                .get("right")
                .replaceWith(
                  statementBeforeExpression(
                    throwNode,
                    violation.get("right").node,
                  ),
                );
            } else if (violation.isUpdateExpression()) {
              violation.replaceWith(
                statementBeforeExpression(throwNode, violation.node),
              );
            } else if (violation.isForXStatement()) {
              violation.ensureBlock();
              violation.node.body.body.unshift(throwNode);
            }
          }
        }
      },
    },
  };
}
