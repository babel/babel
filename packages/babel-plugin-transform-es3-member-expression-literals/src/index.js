export default function ({ types: t }) {
  return {
    name: "babel-plugin-transform-es3-member-expression-literals",

    visitor: {
      MemberExpression: {
        exit({ node }) {
          const prop = node.property;
          if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        },
      },
    }
  };
}
