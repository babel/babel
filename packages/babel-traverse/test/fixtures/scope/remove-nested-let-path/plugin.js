module.exports = function () {
  return {
    visitor: {
      VariableDeclarator(path) {
        switch (path + "") {
          case "a = 33":
            path.remove();

          case "a = 42":
            expect(path.scope.getBinding("a")).toBeDefined();
        }
      },
    },
  };
};
