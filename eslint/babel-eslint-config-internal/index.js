"use strict";

const globals = require("globals");
const recommendedConfig = require("@eslint/js").configs.recommended;
const babelParser = require("@babel/eslint-parser/experimental-worker");

module.exports = [
  recommendedConfig,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          // Todo: Remove the parserOpts here after the proposal gets stage 4.
          parserOpts: {
            plugins: ["importAssertions"],
          },
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      curly: ["error", "multi-line"],
      "linebreak-style": ["error", "unix"],
      "no-case-declarations": "error",
      "no-confusing-arrow": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-process-exit": "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
