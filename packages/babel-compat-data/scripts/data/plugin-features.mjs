// WARNING: Plugin ordering is important. Don't reorder this file
// without checking that it doesn't break anything.

const es5 = {
  "transform-member-expression-literals":
    "Object/array literal extensions / Reserved words as property names",
  "transform-property-literals":
    "Object/array literal extensions / Reserved words as property names",
  "transform-reserved-words": "Miscellaneous / Unreserved words",
};

// https://github.com/babel/babel/issues/11278
// transform-parameters should run before object-rest-spread
const es2015Parameter = {
  "transform-parameters": {
    features: [
      [
        "default function parameters",
        {
          exclude: [
            // The transform-parameters does not support transpiling parameters in new Function()
            "new Function() support",
          ],
        },
      ],
      "rest parameters",
      "destructuring, parameters / aliased defaults, arrow function",
      "destructuring, parameters / shorthand defaults, arrow function",
      "destructuring, parameters / duplicate identifier",
    ],
  },
};

const es2015 = {
  "transform-template-literals": {
    features: [
      [
        "template literals",
        {
          // Todo: decide if we should apply the transform conditionally
          exclude: "arbitrary escape sequences in tagged template literals",
        },
      ],
    ],
  },
  "transform-literals": {
    features: ["Unicode code point escapes"],
  },
  "transform-function-name": {
    features: ['function "name" property'],
  },
  "transform-arrow-functions": {
    features: [
      [
        "arrow functions",
        {
          exclude: [
            // handled by the transform-classes
            'lexical "super" binding in constructors',
            'lexical "super" binding in methods',
            // handled by the transform-new-target
            'lexical "new.target" binding',
          ],
        },
      ],
    ],
  },
  "transform-block-scoped-functions": {
    features: ["block-level function declaration"],
  },
  "transform-classes": {
    features: [
      "class",
      "super",
      'arrow functions / lexical "super" binding in constructors',
      'arrow functions / lexical "super" binding in methods',
    ],
  },
  "transform-object-super": {
    features: ["super"],
  },
  "transform-shorthand-properties": {
    features: ["object literal extensions / shorthand properties"],
  },
  "transform-duplicate-keys": {
    features: ["miscellaneous / duplicate property names in strict mode"],
  },
  "transform-computed-properties": {
    features: ["object literal extensions / computed properties"],
  },
  "transform-for-of": {
    features: ["for..of loops"],
  },
  "transform-sticky-regex": {
    features: [
      'RegExp "y" and "u" flags / "y" flag, lastIndex',
      'RegExp "y" and "u" flags / "y" flag',
    ],
  },
  "transform-unicode-escapes": "Unicode code point escapes",
  "transform-unicode-regex": {
    features: [
      'RegExp "y" and "u" flags / "u" flag, case folding',
      'RegExp "y" and "u" flags / "u" flag, Unicode code point escapes',
      'RegExp "y" and "u" flags / "u" flag, non-BMP Unicode characters',
      'RegExp "y" and "u" flags / "u" flag',
    ],
  },
  "transform-spread": {
    features: [
      "spread syntax for iterable objects",
      // We need to compile classes when spread is not supported, because
      // we cannot compile super(...args) without also rewriting the
      // "super" handling. There is a bugfix that makes it better.
      "class",
      "super",
    ],
  },
  "transform-destructuring": {
    features: ["destructuring, assignment", "destructuring, declarations"],
  },
  "transform-block-scoping": {
    features: [
      "const",
      "let",
      // regenerator-transform doesn't support let/const,
      // so we must compile them when compiling generators.
      "generators",
    ],
  },
  "transform-typeof-symbol": {
    features: [
      "Symbol / typeof support",
      "Symbol / can convert with String()",
      "Symbol / Object(symbol)",
    ],
  },
  "transform-new-target": {
    features: ["new.target", 'arrow functions / lexical "new.target" binding'],
  },
  "transform-regenerator": {
    features: ["generators"],
  },
};

const es2016 = {
  "transform-exponentiation-operator": {
    features: ["exponentiation (**) operator"],
  },
};

const es2017 = {
  "transform-async-to-generator": {
    features: ["async functions"],
  },
};

const es2018 = {
  "transform-async-generator-functions": "Asynchronous Iterators",
  "transform-object-rest-spread": "object rest/spread properties",

  "transform-dotall-regex": "s (dotAll) flag for regular expressions",
  "transform-unicode-property-regex": "RegExp Unicode Property Escapes / basic",
  "transform-named-capturing-groups-regex": "RegExp named capture groups",
};

const es2019 = {
  "transform-json-strings": "JSON superset",
  "transform-optional-catch-binding": "optional catch binding",
};

const es2020 = {
  "transform-nullish-coalescing-operator": "nullish coalescing operator (??)",
  "transform-optional-chaining": "optional chaining operator (?.)",
};

const es2021 = {
  "transform-numeric-separator": "numeric separators",
  "transform-logical-assignment-operators": "Logical Assignment",
};

const es2022 = {
  "bugfix/transform-v8-static-class-fields-redefine-readonly": {
    features: ["static class fields / static class fields use [[Define]]"],
    replaces: "transform-class-properties",
  },
  "bugfix/transform-firefox-class-in-computed-class-key": {
    replaces: "transform-class-properties",
    overwrite: {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1887677
      firefox: "126",
    },
  },
  "bugfix/transform-safari-class-field-initializer-scope": {
    features: ["instance class fields / resolving identifier in parent scope"],
    replaces: "transform-class-properties",
  },
  "transform-class-static-block": "Class static initialization blocks",
  "transform-private-property-in-object":
    "Ergonomic brand checks for private fields",
  "transform-class-properties": {
    features: [
      "static class fields",
      "instance class fields / public instance class fields",
      "instance class fields / private instance class fields basic support",
      "instance class fields / computed instance class fields",
      "instance class fields / resolving identifier in parent scope",
    ],
  },
  "transform-private-methods": "private class methods",
};

const es2024 = {
  "transform-unicode-sets-regex": {
    features: [
      "RegExp `v` flag / set notations",
      "RegExp `v` flag / properties of Strings",
      "RegExp `v` flag / constructor supports it",
      "RegExp `v` flag / shows up in flags",
    ],
  },
};

const es2025 = {
  "transform-duplicate-named-capturing-groups-regex":
    "Duplicate named capturing groups",
  "transform-regexp-modifiers": "RegExp Pattern Modifiers",
};

const es2026 = {
  "transform-explicit-resource-management": "Explicit Resource Management",
};

const shippedProposal = {};

// Run plugins for modern features first
export default Object.assign(
  {},
  shippedProposal,
  es2026,
  es2025,
  es2024,
  es2022,
  es2021,
  es2020,
  es2019,
  es2015Parameter,
  es2018,
  es2017,
  es2016,
  es2015,
  es5
);
