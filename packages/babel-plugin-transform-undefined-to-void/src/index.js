export default function ({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        if (path.node.name === "undefined") {
          path.replaceWith(t.unaryExpression("void", t.numberLiteral(0), true));
        }
      }
    }
  };
}
