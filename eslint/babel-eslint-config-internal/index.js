"use strict";

module.exports = {
  parser: "babel-eslint",
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
    camelcase: "off",
    "consistent-return": "off",
    curly: ["error", "multi-line"],
    "linebreak-style": ["error", "unix"],
    "new-cap": "off",
    "no-case-declarations": "error",
    "no-cond-assign": "off",
    "no-confusing-arrow": "error",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-empty": "off",
    "no-inner-declarations": "off",
    "no-labels": "off",
    "no-loop-func": "off",
    "no-process-exit": "error",
    "no-return-assign": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unreachable": "off",
    "no-use-before-define": "off",
    "no-var": "error",
    "prefer-const": "error",
    strict: "off",
    "flowtype/define-flow-type": "warn",
    "flowtype/use-flow-type": "warn",
  },
};
