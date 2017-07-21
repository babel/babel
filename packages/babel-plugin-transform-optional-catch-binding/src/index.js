import syntaxOptionalCatchBinding from "babel-plugin-syntax-optional-catch-binding";

export default function() {
  return {
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause({ scope, node }) {
        if (node.param.name) {
          return;
        } else {
          const uid = scope.generateUidIdentifier(node.param.name);
          node.param.name = uid.name;
        }
      },
    },
  };
}
