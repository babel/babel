/* eslint sort-keys: "error" */

module.exports = {
  "proposal-async-generator-functions": "Asynchronous Iterators",
  "proposal-json-strings": "JSON superset",
  "proposal-nullish-coalescing-operator": "nullish coalescing operator (??)",
  "proposal-object-rest-spread": "object rest/spread properties",
  "proposal-optional-catch-binding": "optional catch binding",
  "proposal-optional-chaining": "optional chaining operator (?.)",
  "proposal-unicode-property-regex": "RegExp Unicode Property Escapes",

  "transform-arrow-functions": {
    features: ["arrow functions"],
  },

  "transform-async-to-generator": {
    features: ["async functions"],
  },

  "transform-block-scoped-functions": {
    features: ["block-level function declaration"],
  },
  "transform-block-scoping": {
    features: ["const", "let"],
  },
  "transform-classes": {
    features: ["class", "super"],
  },
  "transform-computed-properties": {
    features: ["object literal extensions / computed properties"],
  },
  "transform-destructuring": {
    features: ["destructuring, assignment", "destructuring, declarations"],
  },

  // We want to apply this prior to unicode regex so that "." and "u"
  // are properly handled.
  //
  // Ref: https://github.com/babel/babel/pull/7065#issuecomment-395959112
  "transform-dotall-regex": "s (dotAll) flag for regular expressions",

  "transform-duplicate-keys": {
    features: ["miscellaneous / duplicate property names in strict mode"],
  },
  "transform-exponentiation-operator": {
    features: ["exponentiation (**) operator"],
  },
  "transform-for-of": {
    features: ["for..of loops"],
  },
  "transform-function-name": {
    features: ['function "name" property'],
  },
  "transform-literals": {
    features: ["Unicode code point escapes"],
  },
  "transform-member-expression-literals":
    "Object/array literal extensions / Reserved words as property names",
  "transform-named-capturing-groups-regex": "RegExp named capture groups",
  "transform-new-target": {
    features: ["new.target"],
  },
  "transform-object-super": {
    features: ["super"],
  },
  "transform-parameters": {
    features: [
      "default function parameters",
      "rest parameters",
      "destructuring, parameters / defaults, arrow function",
    ],
  },
  "transform-property-literals":
    "Object/array literal extensions / Reserved words as property names",
  "transform-regenerator": {
    features: ["generators"],
  },
  "transform-reserved-words": "Miscellaneous / Unreserved words",
  "transform-shorthand-properties": {
    features: ["object literal extensions / shorthand properties"],
  },
  "transform-spread": {
    features: "spread syntax for iterable objects",
  },
  "transform-sticky-regex": {
    features: [
      'RegExp "y" and "u" flags / "y" flag, lastIndex',
      'RegExp "y" and "u" flags / "y" flag',
    ],
  },
  "transform-template-literals": {
    features: ["template literals"],
  },
  "transform-typeof-symbol": {
    features: ["Symbol / typeof support"],
  },
  "transform-unicode-regex": {
    features: [
      'RegExp "y" and "u" flags / "u" flag, case folding',
      'RegExp "y" and "u" flags / "u" flag, Unicode code point escapes',
      'RegExp "y" and "u" flags / "u" flag, non-BMP Unicode characters',
      'RegExp "y" and "u" flags / "u" flag',
    ],
  },
};
