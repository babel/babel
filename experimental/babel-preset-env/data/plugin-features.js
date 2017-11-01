const es2015 = {
  "check-constants": {
    features: [
      "const",
    ],
  },
  "transform-arrow-functions": {
    features: [
      "arrow functions",
    ],
  },
  "transform-block-scoped-functions": {
    features: [
      "block-level function declaration"
    ],
  },
  "transform-block-scoping": {
    features: [
      "const",
      "let",
    ],
  },
  "transform-classes": {
    features: [
      "class",
      "super",
    ],
  },
  "transform-computed-properties": {
    features: [
      "object literal extensions / computed properties",
    ],
  },
  "transform-destructuring": {
    features: [
      "destructuring, assignment",
      "destructuring, declarations",
      "destructuring, parameters",
    ],
  },
  "transform-duplicate-keys": {
    features: [
      "miscellaneous / duplicate property names in strict mode",
    ],
  },
  "transform-for-of": {
    features: [
      "for..of loops",
    ],
  },
  "transform-function-name": {
    features: [
      "function \"name\" property",
    ]
  },
  "transform-literals": {
    features: [
      "Unicode code point escapes",
    ],
  },
  "transform-object-super": {
    features: [
      "super",
    ],
  },
  "transform-parameters": {
    features: [
      "default function parameters",
      "rest parameters",
    ],
  },
  "transform-shorthand-properties": {
    features: [
      "object literal extensions / shorthand properties",
    ],
  },
  "transform-spread": {
    features: [
      "spread (...) operator",
    ],
  },
  "transform-sticky-regex": {
    features: [
      "RegExp \"y\" and \"u\" flags / \"y\" flag, lastIndex",
      "RegExp \"y\" and \"u\" flags / \"y\" flag",
    ],
  },
  "transform-template-literals": {
    features: [
      "template literals",
    ],
  },
  "transform-typeof-symbol": {
    features: [
      "Symbol / typeof support"
    ],
  },
  "transform-unicode-regex": {
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
};

const proposals = require("./shipped-proposals").features;

module.exports = Object.assign({}, es2015, es2016, es2017, proposals);
