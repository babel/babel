"use strict";

module.exports = {
  parser: "@babel/eslint-parser/experimental-worker",
  extends: "eslint:recommended",
  plugins: ["flowtype"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    // Flow
    Iterator: true,
    $Keys: true,
  },
  env: {
    node: true,
    es2020: true,
    browser: true,
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
    "flowtype/define-flow-type": "warn",
    "flowtype/use-flow-type": "warn",
  },
};
