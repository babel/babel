/* eslint sort-keys: "error" */

module.exports = {
  "bugfix-async-arrows-in-class": {
    features: ["async functions / async arrow functions in methods, classes"],
    replaces: "transform-async-to-generator",
  },
  "bugfix-edge-default-parameters": {
    features: [
      "destructuring, parameters / shorthand defaults, arrow function",
    ],
    replaces: "transform-parameters",
  },
  "bugfix-edge-function-name": {
    features: ['function "name" property / variables (function)'],
    replaces: "transform-function-name",
  },
  "bugfix-safari-block-shadowing": {
    features: [
      "const / scope shadow resolution",
      "const / scope shadow resolution (strict mode)",
      "let / scope shadow resolution",
      "let / scope shadow resolution (strict mode)",
    ],
    replaces: "transform-block-scoping",
  },
  "bugfix-safari-for-shadowing": {
    features: [
      "let / for-in loop binding shadowing parameter",
      "let / for-in loop binding shadowing parameter (strict mode)",
    ],
    replaces: "transform-block-scoping",
  },
  "bugfix-safari-id-destructuring-collision-in-function-expression": {
    features: ["destructuring, parameters / duplicate identifier"],
    replaces: "transform-parameters",
  },
  "bugfix-tagged-template-caching": {
    features: ["template literals / TemplateStrings permanent caching"],
    replaces: "transform-template-literals",
  },
  "bugfix-v8-spread-parameters-in-optional-chaining": {
    features: [
      "optional chaining operator (?.) / spread parameters after optional chaining",
    ],
    replaces: "transform-optional-chaining",
  },
};
