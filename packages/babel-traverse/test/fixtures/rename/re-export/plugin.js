module.exports = function() {
  return {
    visitor: {
      Function(path) {
        path.scope.rename("x", "a");
      }
    }
  };
}
