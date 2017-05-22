import syntaxDoExpressions from "babel-plugin-syntax-do-expressions";

export default function () {
  return {
    capabilities: ["doExpressions"],
    inherits: syntaxDoExpressions,

    visitor: {
      DoExpression(path) {
        const body = path.node.body.body;
        if (body.length) {
          path.replaceWithMultiple(body);
        } else {
          path.replaceWith(path.scope.buildUndefinedNode());
        }
      },
    },
  };
}
