module.exports = {
  sourceType: "script",
  plugins: [require("@foo/babel-plugin-1")],
  extends: "./my-extended.js",
  overrides: [
    {
      test: "src/index.js",
      plugins: [["@foo/babel-plugin-2", { noDocumentAll: true }]],
      env: {
        test: {
          plugins: [
            "@foo/babel-plugin-1",
            [
              { name: "@foo/inline-babel-plugin-1", visitor: { Program() {} } },
              { noDocumentAll: true },
            ],
          ],
        },
      },
    },
    {
      exclude: "src/index.js",
      plugins: ["@foo/babel-plugin-4"],
    },
  ],
  env: {
    test: {
      plugins: [
        [
          "@foo/babel-plugin-3",
          { noDocumentAll: true },
          "@foo/babel-plugin-three",
        ],
      ],
    },
    development: {
      plugins: ["@foo/babel-plugin-4"],
    },
  },
};
