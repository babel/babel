export default function () {
  return {
    inherits: require("babel-plugin-syntax-do-expressions"),

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
