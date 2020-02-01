/* eslint sort-keys: "error" */

module.exports = {
  "bugfix/transform-async-arrows-in-class": {
    features: ["async functions / async arrow functions in methods, classes"],
    replaces: "transform-async-to-generator",
  },
  "bugfix/transform-edge-default-parameters": {
    features: [
      "destructuring, parameters / shorthand defaults, arrow function",
    ],
    replaces: "transform-parameters",
  },
  "bugfix/transform-edge-function-name": {
    features: ['function "name" property / variables (function)'],
    replaces: "transform-function-name",
  },
  "bugfix/transform-safari-for-shadowing": {
    features: [
      "let / for-in loop binding shadowing parameter",
      "let / for-in loop binding shadowing parameter (strict mode)",
    ],
    replaces: "transform-block-scoping",
  },
  "bugfix/transform-tagged-template-caching": {
    features: ["template literals / TemplateStrings permanent caching"],
    replaces: "transform-template-literals",
  },
};
