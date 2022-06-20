module.exports = function () {
  return {
    plugins: [
      [
        __dirname + "/../../../../../babel-plugin-syntax-decorators",
        { legacy: true },
      ],
    ],
  };
};
