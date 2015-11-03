export default function ({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        if (path.node.name === "undefined") {
          path.replaceWith(t.unaryExpression("void", t.numericLiteral(0), true));
        }
      }
    }
  };
}
