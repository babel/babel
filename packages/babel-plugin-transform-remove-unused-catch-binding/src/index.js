import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function({ types: t }) {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (
          path.node.param &&
          !t.isReferenced(path.node.param, path.node.body)
        ) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
