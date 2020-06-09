"use strict";

const path = require("path");

module.exports = {
  root: true,
  plugins: [
    "import",
    "jest",
    "prettier",
    "@babel/development",
    "@babel/development-internal",
  ],
  extends: "@babel/internal",
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
      extends: "plugin:jest/recommended",
      rules: {
        "jest/expect-expect": "off",
        "jest/no-identical-title": "off",
        "jest/no-standalone-expect": "off",
        "jest/no-test-callback": "off",
        "jest/valid-describe": "off",
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
    {
      files: ["packages/babel-parser/src/**/*.js"],
      rules: {
        "@babel/development-internal/dry-error-messages": [
          "error",
          {
            errorModule: path.resolve(
              __dirname,
              "packages/babel-parser/src/parser/error.js"
            ),
          },
        ],
      },
    },
  ],
};
