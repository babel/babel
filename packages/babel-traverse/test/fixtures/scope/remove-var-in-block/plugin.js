module.exports = function () {
  return {
    visitor: {
      VariableDeclarator(path) {
        path.remove();
        expect(path.scope.getBinding("a")).toBeUndefined();
      },
    },
  };
};
