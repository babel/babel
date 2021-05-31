module.exports = function() {
  return {
    visitor: {
      FunctionDeclaration(path) {
        path.scope.rename("a", "z");
      }
    }
  };
};
