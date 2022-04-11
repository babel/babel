module.exports = function() {
  return {
    visitor: {
      Scope(path) {
        path.scope.rename("a", "_a");
      }
    }
  };
}
