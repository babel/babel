module.exports = function () {
  return {
    visitor: {
      Scope(path) {
        const bindingNames = Object.keys(path.scope.bindings);

        for (const name of bindingNames) {
          path.scope.rename(name, `${name}$$$`);
        }
      },
    },
  };
};
