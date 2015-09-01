export default function ({ types: t }) {
  return {
    metadata: {
      group: "builtin-trailing"
    },

    visitor: {

      Property: {
        exit(node) {
          var key = node.key;
          if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
            // default: "bar" -> "default": "bar"
            node.key = t.stringLiteral(key.name);
          }
        }
      }
    }
  };
}
