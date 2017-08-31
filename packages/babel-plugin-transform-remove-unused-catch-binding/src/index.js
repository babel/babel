import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function(babel) {
  const { types: t } = babel;
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (path.node.param === null) {
          return;
        }
        if (t.isObjectPattern(path.node.param)) {
          const binding = path.scope.getOwnBinding(
            path.node.param.properties[0].value.name,
          );
          if (binding.references <= 1) {
            const paramPath = path.get("param");
            paramPath.remove();
            return;
          }
        } else {
          const binding = path.scope.getOwnBinding(path.node.param.name);
          if (binding.constantViolations.length > 0) {
            return;
          }
          if (!binding.referenced) {
            const paramPath = path.get("param");
            paramPath.remove();
          }
        }
      },
    },
  };
}
