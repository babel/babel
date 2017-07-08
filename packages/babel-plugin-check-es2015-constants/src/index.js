export default function({ messages, types: t }) {
  return {
    visitor: {
      Scope(path) {
        for (const name in path.scope.bindings) {
          const binding = path.scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (const violation of (binding.constantViolations: Array)) {
            const throwNode = t.throwStatement(
              t.newExpression(t.identifier("Error"), [
                t.stringLiteral(messages.get("readOnly", name)),
              ]),
            );
            if (
              t.isUpdateExpression(violation.parent) ||
              t.isForStatement(violation.parent) ||
              t.isForInStatement(violation.parent)
            ) {
              violation.parentPath.insertBefore(throwNode);
            } else {
              violation.insertBefore(throwNode);
            }
          }
        }
      },
    },
  };
}
