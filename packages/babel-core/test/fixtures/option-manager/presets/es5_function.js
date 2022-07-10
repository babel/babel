module.exports = function () {
  return {
    plugins: [
      [
        __dirname +
          "/../../../../../babel-plugin-syntax-decorators/lib/index.js",
        { version: "legacy" },
      ],
    ],
  };
};
