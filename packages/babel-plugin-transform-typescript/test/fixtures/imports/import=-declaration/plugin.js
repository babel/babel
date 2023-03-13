module.exports = function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "foo" && !path.scope.getBinding(path.node.name))
            throw new Error("No binding for 'foo'");
      }
    }
  };
};
