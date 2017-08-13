import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function() {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (path.node.param === null) {
          return;
        }
        const binding = path.scope.getOwnBinding(path.node.param.name);
        if (
          binding.constantViolations.filter(el => {
            return el.node.left.name === path.node.param.name;
          }).length > 0
        ) {
          return;
        }
        if (path.node.param && !binding.referenced) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
