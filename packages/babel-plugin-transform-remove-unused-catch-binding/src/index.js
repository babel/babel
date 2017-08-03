import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function() {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (
          path.node.param &&
          !path.scope.getOwnBinding(path.node.param.name).referenced
        ) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
