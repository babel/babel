module.exports = {
  sourceMaps: false,
  presets: ["@foo/babel-preset-1"],
  overrides: [
    {
      test: "src/index.js",
      presets: [["@foo/babel-preset-2", { noDocumentAll: true }]],
      env: {
        test: {
          presets: [
            "@foo/babel-preset-1",
            [
              {
                plugins: [
                  {
                    name: "@foo/inline-babel-plugin-1",
                    visitor: { Program() {} },
                  },
                ],
              },
              { noDocumentAll: true },
            ],
          ],
        },
      },
    },
    {
      exclude: "src/index.js",
      presets: ["@foo/babel-preset-4"],
    },
  ],
  env: {
    test: {
      presets: [
        [
          "@foo/babel-preset-3",
          { noDocumentAll: true },
          "@foo/babel-preset-three",
        ],
      ],
    },
    development: {
      presets: ["@foo/babel-preset-4"],
    },
  },
};
