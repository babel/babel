/**
 * @fileoverview Tests for no-invalid-this rule.
 * @author Toru Nagashima
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const cloneDeep = require("lodash.clonedeep");
const rule = require("../../rules/no-invalid-this");
const RuleTester = require("../RuleTester");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

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
    pattern.code = "\"use strict\"; " + pattern.code;
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
    const patternsList = patterns.map(function(pattern) {
        return pattern[type].map(function(applyCondition) {
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

const errors = [
    {message: "Unexpected 'this'.", type: "ThisExpression"},
    {message: "Unexpected 'this'.", type: "ThisExpression"}
];

const patterns = [

    // Global.
    {
        code: "console.log(this); z(x => console.log(x, this));",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "console.log(this); z(x => console.log(x, this));",
        parserOptions: {
            ecmaVersion: 6,
            ecmaFeatures: {globalReturn: true}
        },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // IIFE.
    {
        code: "(function() { console.log(this); z(x => console.log(x, this)); })();",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // Just functions.
    {
        code: "function foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "function foo() { \"use strict\"; console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [],
        invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "return function() { console.log(this); z(x => console.log(x, this)); };",
        parserOptions: {
            ecmaVersion: 6,
            ecmaFeatures: {globalReturn: true}
        },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT] // modules cannot return on global.
    },
    {
        code: "var foo = (function() { console.log(this); z(x => console.log(x, this)); }).bar(obj);",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // Functions in methods.
    {
        code: "var obj = {foo: function() { function foo() { console.log(this); z(x => console.log(x, this)); } foo(); }};",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "var obj = {foo() { function foo() { console.log(this); z(x => console.log(x, this)); } foo(); }};",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "var obj = {foo: function() { return function() { console.log(this); z(x => console.log(x, this)); }; }};",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "var obj = {foo: function() { \"use strict\"; return function() { console.log(this); z(x => console.log(x, this)); }; }};",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [],
        invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "obj.foo = function() { return function() { console.log(this); z(x => console.log(x, this)); }; };",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "obj.foo = function() { \"use strict\"; return function() { console.log(this); z(x => console.log(x, this)); }; };",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [],
        invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "class A { foo() { return function() { console.log(this); z(x => console.log(x, this)); }; } }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [],
        invalid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // Class Static methods.
    {
        code: "class A {static foo() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // Constructors.
    {
        code: "function Foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var Foo = function Foo() { console.log(this); z(x => console.log(x, this)); };",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "class A {constructor() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // On a property.
    {
        code: "var obj = {foo: function() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var obj = {foo() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var obj = {foo: foo || function() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var obj = {foo: hasNative ? foo : function() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var obj = {foo: (function() { return function() { console.log(this); z(x => console.log(x, this)); }; })()};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "Object.defineProperty(obj, \"foo\", {value: function() { console.log(this); z(x => console.log(x, this)); }})",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "Object.defineProperties(obj, {foo: {value: function() { console.log(this); z(x => console.log(x, this)); }}})",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // Assigns to a property.
    {
        code: "obj.foo = function() { console.log(this); z(x => console.log(x, this)); };",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "obj.foo = foo || function() { console.log(this); z(x => console.log(x, this)); };",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "obj.foo = foo ? bar : function() { console.log(this); z(x => console.log(x, this)); };",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "obj.foo = (function() { return function() { console.log(this); z(x => console.log(x, this)); }; })();",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // Class Instance Methods.
    {
        code: "class A {foo() { console.log(this); z(x => console.log(x, this)); }};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // Bind/Call/Apply
    {
        code: "var foo = function() { console.log(this); z(x => console.log(x, this)); }.bind(obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var foo = function() { console.log(this); z(x => console.log(x, this)); }.bind(null);",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "(function() { console.log(this); z(x => console.log(x, this)); }).call(obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "(function() { console.log(this); z(x => console.log(x, this)); }).call(undefined);",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "(function() { console.log(this); z(x => console.log(x, this)); }).apply(obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "(function() { console.log(this); z(x => console.log(x, this)); }).apply(void 0);",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "Reflect.apply(function() { console.log(this); z(x => console.log(x, this)); }, obj, []);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // Array methods.
    {
        code: "Array.from([], function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.every(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.filter(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.find(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.findIndex(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.forEach(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.map(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo.some(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "Array.from([], function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.every(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.filter(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.find(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.findIndex(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.forEach(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.map(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.some(function() { console.log(this); z(x => console.log(x, this)); }, obj);",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "foo.forEach(function() { console.log(this); z(x => console.log(x, this)); }, null);",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // @this tag.
    {
        code: "/** @this Obj */ function foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "/**\n * @returns {void}\n * @this Obj\n */\nfunction foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "/** @returns {void} */ function foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "/** @this Obj */ foo(function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "foo(/* @this Obj */ function() { console.log(this); z(x => console.log(x, this)); });",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // https://github.com/eslint/eslint/issues/3254
    {
        code: "function foo() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // https://github.com/eslint/eslint/issues/3287
    {
        code: "function foo() { /** @this Obj*/ return function bar() { console.log(this); z(x => console.log(x, this)); }; }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    // https://github.com/eslint/eslint/issues/6824
    {
        code: "var Ctor = function() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "var func = function() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "Ctor = function() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "func = function() { console.log(this); z(x => console.log(x, this)); }",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "function foo(Ctor = function() { console.log(this); z(x => console.log(x, this)); }) {}",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "function foo(func = function() { console.log(this); z(x => console.log(x, this)); }) {}",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },
    {
        code: "[obj.method = function() { console.log(this); z(x => console.log(x, this)); }] = a",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
    {
        code: "[func = function() { console.log(this); z(x => console.log(x, this)); }] = a",
        parserOptions: { ecmaVersion: 6 },
        errors,
        valid: [NORMAL],
        invalid: [USE_STRICT, IMPLIED_STRICT, MODULES]
    },

    // babel/no-invalid-this

    // Class Instance Properties.
    {
        code: "class A {a = this.b;};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },

    {
        code: "class A {a = () => {return this.b;};};",
        parserOptions: { ecmaVersion: 6 },
        valid: [NORMAL, USE_STRICT, IMPLIED_STRICT, MODULES],
        invalid: []
    },
];

const ruleTester = new RuleTester();

ruleTester.run("no-invalid-this", rule, {
    valid: extractPatterns(patterns, "valid"),
    invalid: extractPatterns(patterns, "invalid")
});
