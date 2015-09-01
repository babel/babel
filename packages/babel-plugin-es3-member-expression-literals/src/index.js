export default function ({ types: t }) {
  return {
    metadata: {
      group: "builtin-trailing"
    },

    visitor: {
      MemberExpression: {
        exit(node) {
          var prop = node.property;
          if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        }
      }
    }
  };
}
