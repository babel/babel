export default function ({ types: t }) {
  return {
    metadata: {
      group: "builtin-basic"
    },

    visitor: {
      ReferencedIdentifier(node) {
        if (node.name === "undefined") {
          return t.unaryExpression("void", t.numberLiteral(0), true);
        }
      }
    }
  };
}
