module.exports = function (api) {
  api.cache.forever();

  return {
    plugins: [
      () => ({
        visitor: {
          BinaryExpression(path) {
            console.log("Plugin applied");
            path.node.operator = "+";
          },
        },
      }),
    ],
  };
};
