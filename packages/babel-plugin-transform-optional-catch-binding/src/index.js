import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function() {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (path.node.param.name) {
          return;
        } else {
          const uid = path.scope.generateUidIdentifier("unused");
          const paramPath = path.get("param");
          paramPath.replaceWith(uid);
        }
      },
    },
  };
}
