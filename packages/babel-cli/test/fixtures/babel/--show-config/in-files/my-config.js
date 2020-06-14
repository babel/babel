module.exports = {
  babelrc: false,
  plugins: [require("@foo/babel-plugin-1")],
  overrides: [
    {
      test: "src/index.js",
      plugins: ["@foo/babel-plugin-2", { noDocumentAll: true }],
    },
  ],
  env: {
    test: {
      plugins: [["@foo/babel-plugin-3", { noDocumentAll: true }]],
    },
    development: {
      plugins: ["@foo/babel-plugin-4"],
    },
  },
};
