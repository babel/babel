const path = require("path");

module.exports = {
  root: true,
  plugins: ["prettier", "@babel/development", "import"],
  // replace it by `@babel/internal` when `@babel/eslint-config-internal` is published
  extends: path.resolve(__dirname, "eslint/babel-eslint-config-internal"),
  rules: {
    "prettier/prettier": "error",
    // TODO: remove after babel-eslint-config-internal is fully integrated into this repository.
    "max-len": "off",
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: [
        "packages/*/src/**/*.js",
        "codemods/*/src/**/*.js",
        "eslint/*/src/**/*.js",
      ],
      rules: {
        "@babel/development/no-undefined-identifier": "error",
        "@babel/development/no-deprecated-clone": "error",
        "import/no-extraneous-dependencies": "error",
        "guard-for-in": "error",
      },
    },
    {
      files: [
        "packages/*/test/**/*.js",
        "codemods/*/test/**/*.js",
        "eslint/*/test/**/*.js",
        "packages/babel-helper-transform-fixture-test-runner/src/helpers.js",
        "test/**/*.js",
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ["packages/babel-plugin-*/src/index.js"],
      excludedFiles: ["packages/babel-plugin-transform-regenerator/**/*.js"],
      rules: {
        "@babel/development/plugin-name": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
      },
    },
  ],
};
