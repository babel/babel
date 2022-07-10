module.exports = function() {
  return {
    visitor: {
      Program(path) {
        path.scope.rename("a", "z");
      }
    }
  };
};
