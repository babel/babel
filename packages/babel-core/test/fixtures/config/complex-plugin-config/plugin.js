module.exports = function(name, capabilities, before, after) {
  return function(babel) {
    return {
      name: name,
      capabilities: capabilities,
      before: before,
      after: after,
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
