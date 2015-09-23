export default function ({ types: t }) {
  return {
    visitor: {
      FunctionExpression: {
        exit(node) {
          if (!node.id) return;
          node._ignoreUserWhitespace = true;

          return t.callExpression(
            t.functionExpression(null, [], t.blockStatement([
              t.toStatement(node),
              t.returnStatement(node.id)
            ])),
            []
          );
        }
      }
    }
  };
}
