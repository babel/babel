module.exports = ({ types: { identifier } }) => ({
  visitor: {
    FunctionExpression(path) {
      const { node } = path;
      if (!node.id) {
        node.id = identifier("a");
        path.requeue();
      }
    },
  },
});
