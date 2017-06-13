export default function ({ types: t }) {
  return {
    name: "babel-plugin-transform-es3-property-literals",

    visitor: {
      ObjectProperty: {
        exit({ node }) {
          const key = node.key;
          if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
            // default: "bar" -> "default": "bar"
            node.key = t.stringLiteral(key.name);
          }
        },
      },
    }
  };
}
