module.exports = function(name, capabilities, dependencies) {
  return function(babel) {
    return {
      name: name,
      capabilities: capabilities,
      dependencies: dependencies,
      visitor: {
        Program: function(path) {
          path.pushContainer("body", [
            babel.types.expressionStatement(babel.types.identifier(name)),
          ]);
        },
      },
    };
  };
};
