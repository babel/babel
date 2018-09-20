module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === "a") {
          // the import we add here should not be elided
          path.scope
            .getProgramParent()
            .path.unshiftContainer(
              "body",
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier("local"))],
                t.stringLiteral("source")
              )
            );

          path.node.callee = t.identifier("local");
        }
      },
    },
  };
};
