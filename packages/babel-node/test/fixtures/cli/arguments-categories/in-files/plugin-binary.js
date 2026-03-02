module.exports = function () {
  return {
    visitor: {
      BinaryExpression(path) {
        path.node.operator = "instanceof";
      },
    },
  };
};
