module.exports = {
  parser: "babel-eslint",
  extends: "eslint:recommended",
  plugins: ["flow-vars", "babel"],
  rules: {
    "flowtype/define-flow-type": "warn",
    "flowtype/use-flow-type": "warn",
    quotes: ["error", "double"],
    "no-var": "error",
    "keyword-spacing": "error",
    strict: "off",
    "no-underscore-dangle": "off",
    curly: "off",
    "no-multi-spaces": "off",
    "key-spacing": "off",
    "no-return-assign": "off",
    "consistent-return": "off",
    "no-shadow": "off",
    "comma-dangle": "off",
    "no-use-before-define": "off",
    "no-empty": "off",
    "new-parens": "off",
    "no-cond-assign": "off",
    "no-fallthrough": "off",
    "new-cap": "off",
    "no-loop-func": "off",
    "no-unreachable": "off",
    "no-labels": "off",
    "no-process-exit": "off",
    camelcase: "off",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-inner-declarations": "off",
    "no-case-declarations": "off",
    semi: ["error", "always"],

    // soft indent of 2 characters
    "indent": ["error", 2],

    // maximum length of 110 characters
    "max-len": ["error", 110, 2],

    // Enforce parens around arrow function arguments
    "babel/arrow-parens": ["error", "always"],
    // Require a space on each side of arrow operator
    "arrow-spacing": ["error", { before: true, after: true }],
    // Require a space on each side of all infix operators
    "space-infix-ops": "error",
    // Prevent using => in a condition where <= is intended
    "no-confusing-arrow": "error",
    // prevent no space in `if (){`
    "space-before-blocks": ["error", "always"]
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
