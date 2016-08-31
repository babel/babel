import { default as syntaxDoExpressions } from "babel-plugin-syntax-do-expressions";

export default function () {
  return {
    inherits: syntaxDoExpressions,

    visitor: {
      DoExpression(path) {
        let body = path.node.body.body;
        if (body.length) {
          path.replaceWithMultiple(body);
        } else {
          path.replaceWith(path.scope.buildUndefinedNode());
        }
      }
    }
  };
}
