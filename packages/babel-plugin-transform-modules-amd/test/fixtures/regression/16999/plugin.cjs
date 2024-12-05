module.exports = function plugin({ types: t }) {
  let bool = false;
  return {
    visitor: {
      Identifier(path) {
        if (!bool) {
          bool = true;
          path.parentPath.parentPath.pushContainer("body", t.functionDeclaration(t.identifier("fn"), [t.identifier("x")], t.blockStatement([])));
        }
      },
      FunctionDeclaration(path) {
        expect(path.container[path.key]).not.toBeFalsy();
      }
    },
  };
};
