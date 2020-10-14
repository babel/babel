module.exports = function () {
  return {
    visitor: {
      CatchClause(path) {
        path.scope.rename("a", "z");
      },
    },
  };
};
