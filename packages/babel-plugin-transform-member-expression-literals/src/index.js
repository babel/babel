export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression: {
        exit({ node }) {
          let prop = node.property;
          if (node.computed && t.isLiteral(prop) && t.isValidIdentifier(prop.value)) {
            // foo["bar"] => foo.bar
            node.property = t.identifier(prop.value);
            node.computed = false;
          }
        }
      }
    }
  };
};
