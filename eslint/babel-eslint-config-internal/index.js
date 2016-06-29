module.exports = {
  parser: "babel-eslint",
  extends: "eslint:recommended",
  plugins: ["flow-vars", "babel"],
  rules: {
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1,
    quotes: [2, "double"],
    "no-var": 2,
    "keyword-spacing": 2,
    strict: 0,
    "no-underscore-dangle": 0,
    curly: 0,
    "no-multi-spaces": 0,
    "key-spacing": 0,
    "no-return-assign": 0,
    "consistent-return": 0,
    "no-shadow": 0,
    "comma-dangle": 0,
    "no-use-before-define": 0,
    "no-empty": 0,
    "new-parens": 0,
    "no-cond-assign": 0,
    "no-fallthrough": 0,
    "new-cap": 0,
    "no-loop-func": 0,
    "no-unreachable": 0,
    "no-labels": 0,
    "no-process-exit": 0,
    camelcase: 0,
    "no-console": 0,
    "no-constant-condition": 0,
    "no-inner-declarations": 0,
    "no-case-declarations": 0,
    semi: [2, "always"],

    // soft indent of 2 characters
    "indent": [2, 2],

    // maximum length of 110 characters
    "max-len": [2, 110, 2],

    // Enforce parens around arrow function arguments
    "babel/arrow-parens": [2, "always"],
    // Require a space on each side of arrow operator
    "arrow-spacing": [2, { before: true, after: true }],
    // Prevent using => in a condition where <= is intended
    "no-confusing-arrow": 2,
    // prevent no space in `if (){`
    "space-before-blocks": "always"
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
