import cloneDeep from "lodash/cloneDeep";
import rule from "../../src/rules/no-invalid-this";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester";

/**
 * A constant value for non strict mode environment.
 * @returns {void}
 */
function NORMAL(pattern) {
  pattern.parserOptions.sourceType = "script";
}

/**
 * A constant value for strict mode environment.
 * This modifies pattern object to make strict mode.
 * @param {Object} pattern - A pattern object to modify.
 * @returns {void}
 */
function USE_STRICT(pattern) {
  pattern.code = '"use strict"; ' + pattern.code;
}

/**
 * A constant value for implied strict mode.
 * This modifies pattern object to impose strict mode.
 * @param {Object} pattern - A pattern object to modify.
 * @returns {void}
 */
function IMPLIED_STRICT(pattern) {
  pattern.code = "/* implied strict mode */ " + pattern.code;
  pattern.parserOptions.ecmaFeatures = pattern.parserOptions.ecmaFeatures || {};
  pattern.parserOptions.ecmaFeatures.impliedStrict = true;
}

/**
 * A constant value for modules environment.
 * This modifies pattern object to make modules.
 * @param {Object} pattern - A pattern object to modify.
 * @returns {void}
 */
function MODULES(pattern) {
  pattern.code = "/* modules */ " + pattern.code;
}

/**
 * Extracts patterns each condition for a specified type. The type is `valid` or `invalid`.
 * @param {Object[]} patterns - Original patterns.
 * @param {string} type - One of `"valid"` or `"invalid"`.
 * @returns {Object[]} Test patterns.
 */
function extractPatterns(patterns, type) {
  // Clone and apply the pattern environment.
  const patternsList = patterns.map(function (pattern) {
    return pattern[type].map(function (applyCondition) {
      const thisPattern = cloneDeep(pattern);

      applyCondition(thisPattern);

      if (type === "valid") {
        thisPattern.errors = [];
      } else {
        thisPattern.code += " /* should error */";
      }

      delete thisPattern.invalid;
      delete thisPattern.valid;

      return thisPattern;
    });
  });

  // Flatten.
  return Array.prototype.concat.apply([], patternsList);
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const patterns = [
  // Class private fields
  {
    code: "class A {a = this.b;};",
    parserOptions: { ecmaVersion: 6 },
    valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    invalid: [],
  },

  {
    code: "class A {a = () => {return this.b;};};",
    parserOptions: { ecmaVersion: 6 },
    valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    invalid: [],
  },

  {
    code: "class A {a = () => { function b() { return this.b;} };};",
    parserOptions: { ecmaVersion: 6 },
    valid: [],
    invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    errors: [
      {
        message: "Unexpected 'this'.",
      },
    ],
  },

  {
    code: "class A {a = () => { (function b() { return this.b;}); };};",
    parserOptions: { ecmaVersion: 6 },
    valid: [],
    invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    errors: [
      {
        message: "Unexpected 'this'.",
      },
    ],
  },

  // Class Private methods
  {
    code: "class A {#a = this.b;};",
    parserOptions: { ecmaVersion: 6 },
    valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    invalid: [],
  },

  {
    code: "class A {#a = () => {return this.b;};};",
    parserOptions: { ecmaVersion: 6 },
    valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    invalid: [],
  },

  {
    code: "class A {#a = () => { function b() { return this.b;} };};",
    parserOptions: { ecmaVersion: 6 },
    valid: [],
    invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    errors: [
      {
        message: "Unexpected 'this'.",
      },
    ],
  },

  {
    code: "class A {#a = () => { (function b() { return this.b;}); };};",
    parserOptions: { ecmaVersion: 6 },
    valid: [],
    invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    errors: [
      {
        message: "Unexpected 'this'.",
      },
    ],
  },

  {
    code: "class A {#a() {return this.b;};};",
    parserOptions: { ecmaVersion: 6 },
    valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
    invalid: [],
  },
];

const ruleTester = new RuleTester();
ruleTester.run("@babel/no-invalid-this", rule, {
  valid: extractPatterns(patterns, "valid"),
  invalid: extractPatterns(patterns, "invalid"),
});
