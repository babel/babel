module.exports = {
  parser: "babel-eslint",
  extends: "eslint:recommended",
  plugins: ["flowtype"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  rules: {
    camelcase: "off",
    "consistent-return": "off",
    curly: "off",
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", 110, 2],
    "new-cap": "off",
    "no-case-declarations": "off",
    "no-cond-assign": "off",
    "no-confusing-arrow": "error",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-empty": "off",
    "no-fallthrough": "off",
    "no-inner-declarations": "off",
    "no-labels": "off",
    "no-loop-func": "off",
    "no-process-exit": "off",
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
  globals: {
    // Flow
    Iterator: true,
    $Keys: true
  },
  env: {
    node: true,
    es6: true,
    browser: true
  }
};
