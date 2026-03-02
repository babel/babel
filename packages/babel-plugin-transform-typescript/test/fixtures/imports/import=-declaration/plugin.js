module.exports = function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "foo") {
          expect(path.scope.hasBinding(path.node.name)).toBe(true);
        }
      },
      Program: {
        exit() {
          expect.hasAssertions();
        }
      }
    }
  };
};
