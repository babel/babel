module.exports = function () {
  return {
    visitor: {
      Scope(path) {
        path.scope.rename("original", "renamed");
      },
    },
  };
};
