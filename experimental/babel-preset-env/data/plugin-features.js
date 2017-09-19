const es2015 = {
  "check-es2015-constants": {
    features: [
      "const",
    ],
  },
  "transform-es2015-arrow-functions": {
    features: [
      "arrow functions",
    ],
  },
  "transform-es2015-block-scoped-functions": {
    features: [
      "block-level function declaration"
    ],
  },
  "transform-es2015-block-scoping": {
    features: [
      "const",
      "let",
    ],
  },
  "transform-es2015-classes": {
    features: [
      "class",
      "super",
    ],
  },
  "transform-es2015-computed-properties": {
    features: [
      "object literal extensions / computed properties",
    ],
  },
  "transform-es2015-destructuring": {
    features: [
      "destructuring, assignment",
      "destructuring, declarations",
      "destructuring, parameters",
    ],
  },
  "transform-es2015-duplicate-keys": {
    features: [
      "miscellaneous / duplicate property names in strict mode",
    ],
  },
  "transform-es2015-for-of": {
    features: [
      "for..of loops",
    ],
  },
  "transform-es2015-function-name": {
    features: [
      "function \"name\" property",
    ]
  },
  "transform-es2015-literals": {
    features: [
      "Unicode code point escapes",
    ],
  },
  "transform-es2015-object-super": {
    features: [
      "super",
    ],
  },
  "transform-es2015-parameters": {
    features: [
      "default function parameters",
      "rest parameters",
    ],
  },
  "transform-es2015-shorthand-properties": {
    features: [
      "object literal extensions / shorthand properties",
    ],
  },
  "transform-es2015-spread": {
    features: [
      "spread (...) operator",
    ],
  },
  "transform-es2015-sticky-regex": {
    features: [
      "RegExp \"y\" and \"u\" flags / \"y\" flag, lastIndex",
      "RegExp \"y\" and \"u\" flags / \"y\" flag",
    ],
  },
  "transform-es2015-template-literals": {
    features: [
      "template literals",
    ],
  },
  "transform-es2015-typeof-symbol": {
    features: [
      "Symbol / typeof support"
    ],
  },
  "transform-es2015-unicode-regex": {
    features: [
      "RegExp \"y\" and \"u\" flags / \"u\" flag, case folding",
      "RegExp \"y\" and \"u\" flags / \"u\" flag, Unicode code point escapes",
      "RegExp \"y\" and \"u\" flags / \"u\" flag",
    ],
  },
  "transform-new-target": {
    features: [
      "new.target",
    ],
  },
  "transform-regenerator": {
    features: [
      "generators",
    ],
  }
};

const es2016 = {
  "transform-exponentiation-operator": {
    features: [
      "exponentiation (**) operator",
    ],
  }
};

const es2017 = {
  "transform-async-to-generator": {
    features: [
      "async functions",
    ],
  },
  "syntax-trailing-function-commas": {
    features: [
      "trailing commas in function syntax",
    ],
  }
};

const stage3 = require("./stage3").plugins;

module.exports = Object.assign({}, es2015, es2016, es2017, stage3);
