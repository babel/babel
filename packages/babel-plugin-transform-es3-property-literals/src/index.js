export default function ({ types: t }) {
  return {
    visitor: {
      ObjectProperty: {
        exit({node}) {
          let key = node.key;
          if (!node.computed && t.isIdentifier(key) && !t.isSpecIdentifier(key.name)) {
            // default: "bar" -> "default": "bar"
            node.key = t.stringLiteral(key.name);
          }
        }
      }
    }
  };
}
