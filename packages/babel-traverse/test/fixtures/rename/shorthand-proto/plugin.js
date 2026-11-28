module.exports = function () {
  return {
    visitor: {
      Program(path) {
        path.scope.rename("__proto__", "z");
      },
    },
  };
};
