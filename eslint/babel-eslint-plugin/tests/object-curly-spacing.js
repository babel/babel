/* eslint-disable */

/**
 * @fileoverview Disallows or enforces spaces inside of object literals.
 * @author Jamund Ferguson
 * @copyright 2014 Vignesh Anand. All rights reserved.
 * @copyright 2015 Jamund Ferguson. All rights reserved.
 * @copyright 2015 Mathieu M-Gosselin. All rights reserved.
 */

var linter = require('eslint').linter
  , ESLintTester = require('eslint-tester')
  , eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest("rules/object-curly-spacing", {

    valid: [

        // always - object literals
        { code: "var obj = { foo: bar, baz: qux };", options: ["always"] },
        { code: "var obj = { foo: { bar: quxx }, baz: qux };", options: ["always"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux\n};", options: ["always"] },

        // always - destructuring
        { code: "var { x } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var { x, y } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var { x,y } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var {\nx,y } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var {\nx,y\n} = z", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var { x = 10, y } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var { x: { z }, y } = y", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var {\ny,\n} = x", options: ["always"], ecmaFeatures: { destructuring: true } },
        { code: "var { y, } = x", options: ["always"], ecmaFeatures: { destructuring: true } },

        // always - import / export
        { code: "import { door } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import {\ndoor } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export { door } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import { house, mouse } from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export { door }", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import 'room'", options: ["always"], ecmaFeatures: { modules: true } },

        // always - empty object
        { code: "var foo = {};", options: ["always"] },

        // always - objectsInObjects
        { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};", options: ["always", {"objectsInObjects": false}] },

        // always - arraysInObjects
        { code: "var obj = { 'foo': [ 1, 2 ]};", options: ["always", {"arraysInObjects": false}] },

        // always - arraysInObjects, objectsInObjects
        { code: "var obj = { 'qux': [ 1, 2 ], 'foo': { 'bar': 1, 'baz': 2 }};", options: ["always", {"arraysInObjects": false, "objectsInObjects": false}] },

        // always - arraysInObjects, objectsInObjects (reverse)
        { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }, 'qux': [ 1, 2 ]};", options: ["always", {"arraysInObjects": false, "objectsInObjects": false}] },

        // never
        { code: "var obj = {foo: bar,\nbaz: qux\n};", options: ["never"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux};", options: ["never"] },

        // never - object literals
        { code: "var obj = {foo: bar, baz: qux};", options: ["never"] },
        { code: "var obj = {foo: {bar: quxx}, baz: qux};", options: ["never"] },
        { code: "var obj = {foo: {\nbar: quxx}, baz: qux\n};", options: ["never"] },
        { code: "var obj = {foo: {\nbar: quxx\n}, baz: qux};", options: ["never"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux\n};", options: ["never"] },

        // never - destructuring
        { code: "var {x} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {x, y} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {x,y} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {\nx,y\n} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {x = 10} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {x = 10, y} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {x: {z}, y} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {\nx: {z\n}, y} = y", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {\ny,\n} = x", options: ["never"], ecmaFeatures: { destructuring: true } },
        { code: "var {y,} = x", options: ["never"], ecmaFeatures: { destructuring: true } },

        // never - import / export
        { code: "import {door} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {door} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {\ndoor} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor\n} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {house,mouse} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {house, mouse} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {door}", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import 'room'", options: ["never"], ecmaFeatures: { modules: true } },

        // never - empty object
        { code: "var foo = {};", options: ["never"] },

        // never - objectsInObjects
        { code: "var obj = {'foo': {'bar': 1, 'baz': 2} };", options: ["never", {"objectsInObjects": true}]},

        // Babel test cases.
        { code: "export * as x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },
        { code: "export x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },
    ],

    invalid: [
        {
            code: "import {bar} from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 7
                },
                {
                    message: "A space is required before '}'",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "export {bar};",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ExportNamedDeclaration",
                    line: 1,
                    column: 7
                },
                {
                    message: "A space is required before '}'",
                    type: "ExportNamedDeclaration",
                    line: 1,
                    column: 11
                }
            ]
        },

        // always - arraysInObjects
        {
            code: "var obj = { 'foo': [ 1, 2 ] };",
            options: ["always", {"arraysInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ] };",
            options: ["always", {"arraysInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },

        // always-objectsInObjects
        {
            code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 42
                }
            ]
        },
        {
            code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 60
                }
            ]
        },

        // always-destructuring trailing comma
        {
            code: "var { a,} = x;",
            options: ["always"],
            ecmaFeatures: { destructuring: true },
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "var {a, } = x;",
            options: ["never"],
            ecmaFeatures: { destructuring: true },
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 8
                }
            ]
        },

        // never-objectsInObjects
        {
            code: "var obj = {'foo': {'bar': 1, 'baz': 2}};",
            options: ["never", {"objectsInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 38
                }
            ]
        },
        {
            code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
            options: ["never", {"objectsInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 54
                }
            ]
        },

        // always & never
        {
            code: "var obj = {foo: bar, baz: qux};",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                },
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 29
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 30
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                },
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 31
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 30
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var obj = { foo: { bar: quxx}, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                },
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "var obj = {foo: {bar: quxx }, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 27
                },
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 39
                }
            ]
        },
        {
            code: "export const thing = {value: 1 };",
            ecmaFeatures: {
                modules: true,
                blockBindings: true
            },
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectExpression",
                    line: 1,
                    column: 21
                }
            ]
        },

        // destructuring
        {
            code: "var {x, y} = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 4
                },
                {
                    message: "A space is required before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            code: "var { x, y} = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var { x, y } = y",
            ecmaFeatures: {destructuring: true},
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 4
                },
                {
                    message: "There should be no space before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var {x, y } = y",
            ecmaFeatures: {destructuring: true},
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var { x=10} = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var {x=10 } = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectPattern",
                    line: 1,
                    column: 4
                }
            ]
        },

        // never - arraysInObjects
        {
            code: "var obj = {'foo': [1, 2]};",
            options: ["never", {"arraysInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux']};",
            options: ["never", {"arraysInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression"
                }
            ]
        }
    ]
});
