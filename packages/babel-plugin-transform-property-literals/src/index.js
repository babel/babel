export default function ({ types: t }) {
  return {
    visitor: {
      ObjectProperty: {
        exit({ node }) {
          let key = node.key;
          if (t.isLiteral(key) && t.isSpecIdentifier(key.value)) {
            // "foo": "bar" -> foo: "bar"
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        }
      }
    }
  };
}
