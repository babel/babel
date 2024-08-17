module.exports = function ({ types }) {
  return {
    visitor: {
      VariableDeclarator(path) {
        const { value } = path.node.init;

        if (value === 33) path.remove();

        types.addComment(
          path.scope.getProgramParent().path.node,
          "trailing",
          `// a is defined when visiting a=${value}? ${path.scope.hasBinding("a")}`
        );
      },
    },
  };
};
