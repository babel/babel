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
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-undef": "off",
        "no-redeclare": "off",
      },
    },
    {
      files: [
        "packages/*/src/**/*.{js,ts}",
        "codemods/*/src/**/*.{js,ts}",
        "eslint/*/src/**/*.{js,ts}",
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
        "packages/babel-helper-transform-fixture-test-runner/src/helpers.{ts,js}",
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
      files: ["packages/babel-plugin-*/src/index.{js,ts}"],
      excludedFiles: ["packages/babel-plugin-transform-regenerator/**/*.js"],
      rules: {
        "@babel/development/plugin-name": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
      },
    },
    {
      files: ["packages/babel-parser/src/**/*.{js,ts}"],
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
