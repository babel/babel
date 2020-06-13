module.exports = {
  babelrc: false,
  plugins: [require("@foo/babel-plugin-1")],
  overrides: [
    {
      test: "./src/index",
      plugins: ["@foo/babel-plugin-2", { noDocumentAll: true }],
    },
  ],
};
