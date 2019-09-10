import syntaxOptionalCatchBinding from "@babel/plugin-syntax-optional-catch-binding";

export default function({ types: t }) {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        const nodeParam = path.node.param;
        if (nodeParam === null || !t.isIdentifier(nodeParam)) {
          return;
        }
        const binding = path.scope.getOwnBinding(nodeParam.name);
        if (binding.constantViolations.length > 0) {
          return;
        }
        if (!binding.referenced) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
