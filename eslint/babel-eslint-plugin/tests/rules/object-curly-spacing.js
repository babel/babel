/* eslint-disable */

/**
 * @fileoverview Disallows or enforces spaces inside of object literals.
 * @author Jamund Ferguson
 * @copyright 2014 Vignesh Anand. All rights reserved.
 * @copyright 2015 Jamund Ferguson. All rights reserved.
 * @copyright 2015 Mathieu M-Gosselin. All rights reserved.
 */

var rule = require('../../rules/object-curly-spacing'),
    RuleTester = require('../RuleTester');

var ruleTester = new RuleTester();
ruleTester.run('babel/object-curly-spacing', rule, {

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
        { code: "var { y: x } = x", options: ["always"], ecmaFeatures: { destructuring: true } },

        // always - import / export
        { code: "import door from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import * as door from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import { door } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import {\ndoor } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export { door } from 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import { house, mouse } from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import {\nhouse,\nmouse\n} from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import {\nhouse,\nmouse,\n} from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import house, { mouse } from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import door, { house, mouse } from 'caravan'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export { door }", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor,\nhouse\n}", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor,\nhouse,\n}", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import 'room'", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import { bar as x } from 'foo';", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import { x, } from 'foo';", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "import {\nx,\n} from 'foo';", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export { x, } from 'foo';", options: ["always"], ecmaFeatures: { modules: true } },
        { code: "export {\nx,\n} from 'foo';", options: ["always"], ecmaFeatures: { modules: true } },

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
        { code: "var {y:x} = x", options: ["never"], ecmaFeatures: { destructuring: true } },

        // never - import / export
        { code: "import door from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import * as door from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {door} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {door} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {\ndoor} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor\n} from 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {house,mouse} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {house, mouse} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {\nhouse,\nmouse} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {\nhouse,\nmouse,\n} from 'caravan'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {door}", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor,\nmouse\n}", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {\ndoor,\nmouse,\n}", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import 'room'", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import x, {bar} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import x, {bar, baz} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {bar as y} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {x,} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "import {\nx,\n} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {x,} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },
        { code: "export {\nx,\n} from 'foo';", options: ["never"], ecmaFeatures: { modules: true } },


        // never - empty object
        { code: "var foo = {};", options: ["never"] },

        // never - objectsInObjects
        { code: "var obj = {'foo': {'bar': 1, 'baz': 2} };", options: ["never", {"objectsInObjects": true}]},

        // https://github.com/eslint/eslint/issues/3658
        // Empty cases.
        { code: "var {} = foo;", ecmaFeatures: { destructuring: true }},
        { code: "var [] = foo;", ecmaFeatures: { destructuring: true }},
        { code: "var {a: {}} = foo;", ecmaFeatures: { destructuring: true }},
        { code: "var {a: []} = foo;", ecmaFeatures: { destructuring: true }},
        { code: "import {} from 'foo';", ecmaFeatures: { modules: true }},
        { code: "export {} from 'foo';", ecmaFeatures: { modules: true }},
        { code: "export {};", ecmaFeatures: { modules: true }},
        { code: "var {} = foo;", options: ["never"], ecmaFeatures: { destructuring: true }},
        { code: "var [] = foo;", options: ["never"], ecmaFeatures: { destructuring: true }},
        { code: "var {a: {}} = foo;", options: ["never"], ecmaFeatures: { destructuring: true }},
        { code: "var {a: []} = foo;", options: ["never"], ecmaFeatures: { destructuring: true }},
        { code: "import {} from 'foo';", options: ["never"], ecmaFeatures: { modules: true }},
        { code: "export {} from 'foo';", options: ["never"], ecmaFeatures: { modules: true }},
        { code: "export {};", options: ["never"], ecmaFeatures: { modules: true }},

        // Babel test cases.
        { code: "export * as x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },
        { code: "export x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },

        // always - destructuring typed object param
        { code: "function fn({ a,b }:Object){}", options: ["always"], parser: "babel-eslint", ecmaFeatures: { destructuring: true } },

        // never - destructuring typed object param
        { code: "function fn({a,b}: Object){}", options: ["never"], parser: "babel-eslint", ecmaFeatures: { destructuring: true } },
    ],

    invalid: [
        {
            code: "import {bar} from 'foo.js';",
            output: "import { bar } from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 8
                },
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 12
                }
            ]
        },
        {
            code: "import { bar as y} from 'foo.js';",
            output: "import { bar as y } from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 18
                }
            ]
        },
        {
            code: "import {bar as y} from 'foo.js';",
            output: "import { bar as y } from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 8
                },
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "import { bar} from 'foo.js';",
            output: "import { bar } from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "import x, { bar} from 'foo';",
            output: "import x, { bar } from 'foo';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 16
                }

            ]
        },
        {
            code: "import x, { bar, baz} from 'foo';",
            output: "import x, { bar, baz } from 'foo';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 21
                }

            ]
        },
        {
            code: "import x, {bar} from 'foo';",
            output: "import x, { bar } from 'foo';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 11
                },
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 15
                }

            ]
        },
        {
            code: "import x, {bar, baz} from 'foo';",
            output: "import x, { bar, baz } from 'foo';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 11
                },
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 20
                }
            ]
        },
        {
            code: "import {bar,} from 'foo';",
            output: "import { bar, } from 'foo';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 8
                },
                {
                    message: "A space is required before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 13
                }

            ]
        },
        {
            code: "import { bar, } from 'foo';",
            output: "import {bar,} from 'foo';",
            options: ["never"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 8
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 15
                }
            ]
        },
        {
            code: "export {bar};",
            output: "export { bar };",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ExportNamedDeclaration",
                    line: 1,
                    column: 8
                },
                {
                    message: "A space is required before '}'.",
                    type: "ExportNamedDeclaration",
                    line: 1,
                    column: 12
                }
            ]
        },

        // always - arraysInObjects
        {
            code: "var obj = { 'foo': [ 1, 2 ] };",
            output: "var obj = { 'foo': [ 1, 2 ]};",
            options: ["always", {"arraysInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ] };",
            output: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ]};",
            options: ["always", {"arraysInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression"
                }
            ]
        },

        // always-objectsInObjects
        {
            code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
            output: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 43
                }
            ]
        },
        {
            code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
            output: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 }};",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 61
                }
            ]
        },

        // always-destructuring trailing comma
        {
            code: "var { a,} = x;",
            output: "var { a, } = x;",
            options: ["always"],
            ecmaFeatures: { destructuring: true },
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            code: "var {a, } = x;",
            output: "var {a,} = x;",
            options: ["never"],
            ecmaFeatures: { destructuring: true },
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            code: "var {a:b } = x;",
            output: "var {a:b} = x;",
            options: ["never"],
            ecmaFeatures: { destructuring: true },
            errors: [
               {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var { a:b } = x;",
            output: "var {a:b} = x;",
            options: ["never"],
            ecmaFeatures: { destructuring: true },
            errors: [
               {
                    message: "There should be no space after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 11
                }
            ]
        },

        // never-objectsInObjects
        {
            code: "var obj = {'foo': {'bar': 1, 'baz': 2}};",
            output: "var obj = {'foo': {'bar': 1, 'baz': 2} };",
            options: ["never", {"objectsInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 39
                }
            ]
        },
        {
            code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
            output: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2} };",
            options: ["never", {"objectsInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 55
                }
            ]
        },

        // always & never
        {
            code: "var obj = {foo: bar, baz: qux};",
            output: "var obj = { foo: bar, baz: qux };",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 30
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            output: "var obj = { foo: bar, baz: qux };",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            output: "var obj = { foo: bar, baz: qux };",
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 31
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux };",
            output: "var obj = {foo: bar, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 32
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            output: "var obj = {foo: bar, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 31
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            output: "var obj = {foo: bar, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var obj = { foo: { bar: quxx}, baz: qux};",
            output: "var obj = {foo: {bar: quxx}, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 18
                }
            ]
        },
        {
            code: "var obj = {foo: {bar: quxx }, baz: qux };",
            output: "var obj = {foo: {bar: quxx}, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 28
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 40
                }
            ]
        },
        {
            code: "export const thing = {value: 1 };",
            output: "export const thing = { value: 1 };",
            ecmaFeatures: {
                modules: true,
                blockBindings: true
            },
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 22
                }
            ]
        },

        // destructuring
        {
            code: "var {x, y} = y",
            output: "var { x, y } = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: "A space is required before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var { x, y} = y",
            output: "var { x, y } = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var { x, y } = y",
            output: "var {x, y} = y",
            ecmaFeatures: {destructuring: true},
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 12
                }
            ]
        },
        {
            code: "var {x, y } = y",
            output: "var {x, y} = y",
            ecmaFeatures: {destructuring: true},
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var { x=10} = y",
            output: "var { x=10 } = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var {x=10 } = y",
            output: "var { x=10 } = y",
            ecmaFeatures: {destructuring: true},
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 5
                }
            ]
        },

        // never - arraysInObjects
        {
            code: "var obj = {'foo': [1, 2]};",
            output: "var obj = {'foo': [1, 2] };",
            options: ["never", {"arraysInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux']};",
            output: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux'] };",
            options: ["never", {"arraysInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'.",
                    type: "ObjectExpression"
                }
            ]
        },

        // Babel test cases.

        // always - destructuring typed object param
        {
            code: "function fn({a,b}: Object){}",
            output: "function fn({ a,b }: Object){}",
            options: ["always"],
            parser: "babel-eslint",
            ecmaFeatures: {
                destructuring: true
            },
            errors: [
                {
                    message: "A space is required after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 13
                },
                {
                    message: "A space is required before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 17
                }
            ]
        },

        // never - destructuring typed object param
        {
            code: "function fn({ a,b }: Object){}",
            output: "function fn({a,b}: Object){}",
            options: ["never"],
            parser: "babel-eslint",
            ecmaFeatures: {
                destructuring: true
            },
            errors: [
                {
                    message: "There should be no space after '{'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 13
                },
                {
                    message: "There should be no space before '}'.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 19
                }
            ]
        }
    ]
});
