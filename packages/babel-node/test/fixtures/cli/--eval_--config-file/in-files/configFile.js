module.exports = function (api) {
  api.cache.forever();

  return {
    plugins: [
      () => ({
        visitor: {
          BinaryExpression(path) {
            path.node.operator = "+";
          },
        },
      }),
    ],
  };
};
