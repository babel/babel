/* eslint-disable */

/**
 * @fileoverview Disallows or enforces spaces inside of brackets.
 * @author Ian Christian Myers
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */

var linter = require('eslint').linter
  , ESLintTester = require('eslint-tester')
  , eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest("rules/space-in-brackets", {

    valid: [
        { code: "var foo = obj[ 1 ]", options: ["always"] },
        { code: "var foo = obj[ 'foo' ];", options: ["always"] },
        { code: "var foo = obj[ [ 1, 1 ] ];", options: ["always"] },

        // always - singleValue
        { code: "var foo = ['foo']", options: ["always", {singleValue: false}] },
        { code: "var foo = [2]", options: ["always", {singleValue: false}] },
        { code: "var foo = [[ 1, 1 ]]", options: ["always", {singleValue: false}] },
        { code: "var foo = [{ 'foo': 'bar' }]", options: ["always", {singleValue: false}] },
        { code: "var foo = [bar]", options: ["always", {singleValue: false}] },

        // always - objectsInArrays
        { code: "var foo = [{ 'bar': 'baz' }, 1,  5 ];", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [ 1, 5, { 'bar': 'baz' }];", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [{\n'bar': 'baz', \n'qux': [{ 'bar': 'baz' }], \n'quxx': 1 \n}]", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [{ 'bar': 'baz' }]", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [{ 'bar': 'baz' }, 1, { 'bar': 'baz' }];", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [ 1, { 'bar': 'baz' }, 5 ];", options: ["always", {objectsInArrays: false}] },
        { code: "var foo = [ 1, { 'bar': 'baz' }, [{ 'bar': 'baz' }] ];", options: ["always", {objectsInArrays: false}] },

        // always - arraysInArrays
        { code: "var arr = [[ 1, 2 ], 2, 3, 4 ];", options: ["always", {"arraysInArrays": false}] },
        { code: "var arr = [[ 1, 2 ], [[[ 1 ]]], 3, 4 ];", options: ["always", {"arraysInArrays": false}] },

        // always - arraysInArrays, objectsInArrays
        { code: "var arr = [[ 1, 2 ], 2, 3, { 'foo': 'bar' }];", options: ["always", {"arraysInArrays": false, objectsInArrays: false}] },

        // always - arraysInArrays, objectsInArrays, singleValue
        { code: "var arr = [[ 1, 2 ], [2], 3, { 'foo': 'bar' }];", options: ["always", {"arraysInArrays": false, objectsInArrays: false, singleValue: false}] },

        // always - arraysInObjects
        { code: "var obj = { 'foo': [ 1, 2 ]};", options: ["always", {"arraysInObjects": false}] },

        // always - objectsInObjects
        { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};", options: ["always", {"objectsInObjects": false}] },

        // always - arraysInObjects, objectsInObjects
        { code: "var obj = { 'qux': [ 1, 2 ], 'foo': { 'bar': 1, 'baz': 2 }};", options: ["always", {"arraysInObjects": false, "objectsInObjects": false}] },

        // always - arraysInObjects, objectsInObjects (reverse)
        { code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }, 'qux': [ 1, 2 ]};", options: ["always", {"arraysInObjects": false, "objectsInObjects": false}] },

        // always
        { code: "obj[ foo ]", options: ["always"] },
        { code: "obj[\nfoo\n]", options: ["always"] },
        { code: "obj[ 'foo' ]", options: ["always"] },
        { code: "obj[ 'foo' + 'bar' ]", options: ["always"] },
        { code: "obj[ obj2[ foo ] ]", options: ["always"] },
        { code: "obj.map(function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["always"] },
        { code: "obj[ 'map' ](function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["always"] },
        { code: "obj[ 'for' + 'Each' ](function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["always"] },

        { code: "var arr = [ 1, 2, 3, 4 ];", options: ["always"] },
        { code: "var arr = [ [ 1, 2 ], 2, 3, 4 ];", options: ["always"] },
        { code: "var arr = [\n1, 2, 3, 4\n];", options: ["always"] },

        { code: "var obj = { foo: bar, baz: qux };", options: ["always"] },
        { code: "var obj = { foo: { bar: quxx }, baz: qux };", options: ["always"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux\n};", options: ["always"] },

        { code: "var foo = {};", options: ["always"] },
        { code: "var foo = [];", options: ["always"] },

        { code: "this.db.mappings.insert([\n { alias: 'a', url: 'http://www.amazon.de' },\n { alias: 'g', url: 'http://www.google.de' }\n], function () {});", options: ["always", {singleValue: false, objectsInArrays: true, arraysInArrays: true}] },

        // never
        { code: "obj[foo]", options: ["never"] },
        { code: "obj['foo']", options: ["never"] },
        { code: "obj['foo' + 'bar']", options: ["never"] },
        { code: "obj['foo'+'bar']", options: ["never"] },
        { code: "obj[obj2[foo]]", options: ["never"] },
        { code: "obj.map(function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["never"] },
        { code: "obj['map'](function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["never"] },
        { code: "obj['for' + 'Each'](function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["never"] },
        { code: "obj[ obj2[ foo ] ]", options: ["never", {"propertyName": true}] },
        { code: "obj['for' + 'Each'](function (item) { return [\n1,\n2,\n3,\n4\n]; })", options: ["never"] },


        { code: "obj[\nfoo]", options: ["never"] },
        { code: "obj[foo\n]", options: ["never"] },
        { code: "var obj = {foo: bar,\nbaz: qux\n};", options: ["never"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux};", options: ["never"] },
        { code: "var arr = [1,\n2,\n3,\n4\n];", options: ["never"] },
        { code: "var arr = [\n1,\n2,\n3,\n4];", options: ["never"] },

        // never - singleValue
        { code: "var foo = [ 'foo' ]", options: ["never", {singleValue: true}] },
        { code: "var foo = [ 2 ]", options: ["never", {singleValue: true}] },
        { code: "var foo = [ [1, 1] ]", options: ["never", {singleValue: true}] },
        { code: "var foo = [ {'foo': 'bar'} ]", options: ["never", {singleValue: true}] },
        { code: "var foo = [ bar ]", options: ["never", {singleValue: true}] },

        // never - objectsInArrays
        { code: "var foo = [ {'bar': 'baz'}, 1, 5];", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [1, 5, {'bar': 'baz'} ];", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [ {\n'bar': 'baz', \n'qux': [ {'bar': 'baz'} ], \n'quxx': 1 \n} ]", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [ {'bar': 'baz'} ]", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [ {'bar': 'baz'}, 1, {'bar': 'baz'} ];", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [1, {'bar': 'baz'} , 5];", options: ["never", {objectsInArrays: true}] },
        { code: "var foo = [1, {'bar': 'baz'}, [ {'bar': 'baz'} ]];", options: ["never", {objectsInArrays: true}] },

        // never - arraysInArrays
        { code: "var arr = [ [1, 2], 2, 3, 4];", options: ["never", {"arraysInArrays": true}] },

        // never - arraysInArrays, singleValue
        { code: "var arr = [ [1, 2], [ [ [ 1 ] ] ], 3, 4];", options: ["never", {"arraysInArrays": true, singleValue: true}] },

        // never - arraysInArrays, objectsInArrays
        { code: "var arr = [ [1, 2], 2, 3, {'foo': 'bar'} ];", options: ["never", {"arraysInArrays": true, objectsInArrays: true}] },

        { code: "var arr = [1, 2, 3, 4];", options: ["never"] },
        { code: "var arr = [[1, 2], 2, 3, 4];", options: ["never"] },
        { code: "var arr = [\n1, 2, 3, 4\n];", options: ["never"] },

        { code: "var obj = {foo: bar, baz: qux};", options: ["never"] },
        { code: "var obj = {foo: {bar: quxx}, baz: qux};", options: ["never"] },
        { code: "var obj = {\nfoo: bar,\nbaz: qux\n};", options: ["never"] },

        { code: "var foo = {};", options: ["never"] },
        { code: "var foo = [];", options: ["never"] },

        { code: "var foo = [{'bar':'baz'}, 1, {'bar': 'baz'}];", options: ["never"] },
        { code: "var foo = [{'bar': 'baz'}];", options: ["never"] },
        { code: "var foo = [{\n'bar': 'baz', \n'qux': [{'bar': 'baz'}], \n'quxx': 1 \n}]", options: ["never"] },
        { code: "var foo = [1, {'bar': 'baz'}, 5];", options: ["never"] },
        { code: "var foo = [{'bar': 'baz'}, 1,  5];", options: ["never"] },
        { code: "var foo = [1, 5, {'bar': 'baz'}];", options: ["never"] },
        { code: "var obj = {'foo': [1, 2]}", options: ["never"] },

        // propertyName: false
        { code: "var foo = obj[1]", options: ["always", {propertyName: false}] },
        { code: "var foo = obj['foo'];", options: ["always", {propertyName: false}] },
        { code: "var foo = obj[[ 1, 1 ]];", options: ["always", {propertyName: false}] },

        { code: "var foo = obj[ 1 ]", options: ["never", {propertyName: true}] },
        { code: "var foo = obj[ 'foo' ];", options: ["never", {propertyName: true}] },
        { code: "var foo = obj[ [1, 1] ];", options: ["never", {propertyName: true}] },
        { code: "import 'test.js';", ecmaFeatures: { modules: true } },
        { code: "export const thing = {\n value: 1 \n};", ecmaFeatures: { modules: true, blockBindings: true } },
        { code: "export const thing = {};", ecmaFeatures: { modules: true, blockBindings: true } },
        { code: "export let thing = {};", ecmaFeatures: { modules: true, blockBindings: true } },
        { code: "export var thing = {};", ecmaFeatures: { modules: true } },

        // Babel test cases.
        { code: "export * as x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },
        { code: "export x from \"mod\";", parser: "babel-eslint", ecmaFeatures: { modules: true } },
    ],

    invalid: [
        // objectsInArrays
        {
            code: "var foo = [ { 'bar': 'baz' }, 1,  5];",
            options: ["always", {objectsInArrays: false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "A space is required before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "import {bar} from 'foo.js';",
            options: ["always"],
            ecmaFeatures: {
                modules: true
            },
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ImportDeclaration"
                },
                {
                    message: "A space is required before '}'",
                    type: "ImportDeclaration"
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
                    type: "ExportNamedDeclaration"
                },
                {
                    message: "A space is required before '}'",
                    type: "ExportNamedDeclaration"
                }
            ]
        },
        {
            code: "var foo = [1, 5, { 'bar': 'baz' } ];",
            options: ["always", {objectsInArrays: false}],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var foo = [ { 'bar':'baz' }, 1, { 'bar': 'baz' } ];",
            options: ["always", {objectsInArrays: false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },

        // singleValue
        {
            code: "var obj = [ 'foo' ];",
            options: ["always", {singleValue: false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var obj = ['foo' ];",
            options: ["always", {singleValue: false}],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        // singleValue
        {
            code: "var obj = ['foo'];",
            options: ["never", {singleValue: true}],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "A space is required before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var foo = obj[ 1];",
            options: ["always"],
            errors: [
                {
                    message: "A space is required before ']'",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "var foo = obj[1 ];",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "MemberExpression"
                }
            ]
        },
        // propertyName
        {
            code: "var foo = obj[ 1];",
            options: ["always", {propertyName: false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "var foo = obj[1 ];",
            options: ["always", {propertyName: false}],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "var foo = obj[ 1];",
            options: ["never", {propertyName: true}],
            errors: [
                {
                    message: "A space is required before ']'",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "var foo = obj[1 ];",
            options: ["never", {propertyName: true}],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "MemberExpression"
                }
            ]
        },

        // always - arraysInArrays
        {
            code: "var arr = [ [ 1, 2 ], 2, 3, 4 ];",
            options: ["always", {"arraysInArrays": false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ 1, 2, 2, [ 3, 4 ] ];",
            options: ["always", {"arraysInArrays": false}],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [[ 1, 2 ], 2, [ 3, 4 ] ];",
            options: ["always", {"arraysInArrays": false}],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ [ 1, 2 ], 2, [ 3, 4 ]];",
            options: ["always", {"arraysInArrays": false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];",
            options: ["always", {"arraysInArrays": false}],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },

        // never -  arraysInArrays
        {
            code: "var arr = [[1, 2], 2, [3, 4]];",
            options: ["never", {"arraysInArrays": true}],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "A space is required before ']'",
                    type: "ArrayExpression"
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
        },

         // always-objectsInObjects
        {
            code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
            options: ["always", {"objectsInObjects": false}],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
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
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
            options: ["never", {"objectsInObjects": true}],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression"
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
                    type: "ObjectExpression"
                },
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '{'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            options: ["always"],
            errors: [
                {
                    message: "A space is required before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression"
                },
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {foo: bar, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { foo: bar, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = { foo: { bar: quxx}, baz: qux};",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression"
                },
                {
                    message: "There should be no space after '{'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var obj = {foo: {bar: quxx }, baz: qux };",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                },
                {
                    message: "There should be no space before '}'",
                    type: "ObjectExpression"
                }
            ]
        },
        {
            code: "var arr = [1, 2, 3, 4];",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "A space is required before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [1, 2, 3, 4 ];",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ 1, 2, 3, 4];",
            options: ["always"],
            errors: [
                {
                    message: "A space is required before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ 1, 2, 3, 4 ];",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [1, 2, 3, 4 ];",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ 1, 2, 3, 4];",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [ [ 1], 2, 3, 4];",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space after '['",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "var arr = [[1 ], 2, 3, 4 ];",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "ArrayExpression"
                }
            ]
        },
        {
            code: "obj[ foo ]",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "MemberExpression"
                },
                {
                    message: "There should be no space before ']'",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "obj[foo ]",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space before ']'",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "obj[ foo]",
            options: ["never"],
            errors: [
                {
                    message: "There should be no space after '['",
                    type: "MemberExpression"
                }
            ]
        },
        {
            code: "var foo = obj[1]",
            options: ["always"],
            errors: [
                {
                    message: "A space is required after '['",
                    type: "MemberExpression"
                },
                {
                    message: "A space is required before ']'",
                    type: "MemberExpression"
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
                    type: "ObjectExpression"
                }
            ]
        }
    ]
});
