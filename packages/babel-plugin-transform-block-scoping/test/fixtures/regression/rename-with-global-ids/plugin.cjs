module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      Program(path) {
        path.scope.addGlobal(t.identifier("index"));
      },
    },
  };
};
