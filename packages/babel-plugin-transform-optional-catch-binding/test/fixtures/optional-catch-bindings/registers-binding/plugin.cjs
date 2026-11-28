module.exports = function () {
  return {
    visitor: {
      CatchClause: {
        exit(path) {
          const { name } = path.node.param;
          const binding = path.scope.getOwnBinding(name);
          if (!binding || binding.path !== path) {
            throw new Error(`${name} is not registered`);
          }
          path.scope.rename(name, "renamed");
        },
      },
    },
  };
};
