import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      Scope({ scope }, state) {
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const") continue;

          for (const violation of (binding.constantViolations: Array)) {
            const readOnlyError = state.addHelper("readOnlyError");
            const throwNode = t.callExpression(readOnlyError, [
              t.stringLiteral(name),
            ]);

            if (violation.isAssignmentExpression()) {
              violation
                .get("right")
                .replaceWith(
                  t.sequenceExpression([
                    throwNode,
                    violation.get("right").node,
                  ]),
                );
            } else if (violation.isUpdateExpression()) {
              violation.replaceWith(
                t.sequenceExpression([throwNode, violation.node]),
              );
            } else if (violation.isForXStatement()) {
              violation.ensureBlock();
              violation.node.body.body.unshift(
                t.expressionStatement(throwNode),
              );
            }
          }
        }
      },
    },
  };
}
