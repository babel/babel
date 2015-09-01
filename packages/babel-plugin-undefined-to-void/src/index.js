export default function ({ Plugin, types: t }) {
  return new Plugin("undefined-to-void", {
    metadata: {
      group: "builtin-basic"
    },

    visitor: {
      ReferencedIdentifier(node, parent) {
        if (node.name === "undefined") {
          return t.unaryExpression("void", t.literal(0), true);
        }
      }
    }
  });
}
