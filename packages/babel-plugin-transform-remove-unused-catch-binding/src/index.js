import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function() {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (
          path.node.param &&
          !path.scope.getOwnBinding(path.node.param.name).referenced &&
          !path.scope.getOwnBinding(path.node.param.name).constantViolation &&
          path.scope.hasBinding(path.node.param.name)
        ) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
