export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression: {
        exit({ node }) {
          let prop = node.property;
          if (!node.computed && t.isIdentifier(prop) && !t.isSpecIdentifier(prop.name)) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        }
      }
    }
  };
}
