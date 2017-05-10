/* eslnit-disable */
/**
 * @fileoverview Tests for semi rule.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../rules/semi"),
    RuleTester = require("../RuleTester");

const ruleTester = new RuleTester();

ruleTester.run("semi", rule, {
    valid: [
        "var x = 5;",
        "var x =5, y;",
        "foo();",
        "x = foo();",
        "setTimeout(function() {foo = \"bar\"; });",
        "setTimeout(function() {foo = \"bar\";});",
        "for (var a in b){}",
        "for (var i;;){}",
        "if (true) {}\n;[global, extended].forEach(function(){});",
        "throw new Error('foo');",
        { code: "throw new Error('foo')", options: ["never"] },
        { code: "var x = 5", options: ["never"] },
        { code: "var x =5, y", options: ["never"] },
        { code: "foo()", options: ["never"] },
        { code: "debugger", options: ["never"] },
        { code: "for (var a in b){}", options: ["never"] },
        { code: "for (var i;;){}", options: ["never"] },
        { code: "x = foo()", options: ["never"] },
        { code: "if (true) {}\n;[global, extended].forEach(function(){})", options: ["never"] },
        { code: "(function bar() {})\n;(function foo(){})", options: ["never"] },
        { code: ";/foo/.test('bar')", options: ["never"] },
        { code: ";+5", options: ["never"] },
        { code: ";-foo()", options: ["never"] },
        { code: "a++\nb++", options: ["never"] },
        { code: "a++; b++", options: ["never"] },
        { code: "for (let thing of {}) {\n  console.log(thing);\n}", parserOptions: { ecmaVersion: 6 } },
        { code: "do{}while(true)", options: ["never"] },
        { code: "do{}while(true);", options: ["always"] },

        { code: "if (foo) { bar() }", options: ["always", { omitLastInOneLineBlock: true }] },
        { code: "if (foo) { bar(); baz() }", options: ["always", { omitLastInOneLineBlock: true }] },


        // method definitions don't have a semicolon.
        { code: "class A { a() {} b() {} }", parserOptions: { ecmaVersion: 6 } },
        { code: "var A = class { a() {} b() {} };", parserOptions: { ecmaVersion: 6 } },

        { code: "import theDefault, { named1, named2 } from 'src/mylib';", parserOptions: { sourceType: "module" } },
        { code: "import theDefault, { named1, named2 } from 'src/mylib'", options: ["never"], parserOptions: { sourceType: "module" } },

        // exports, "always"
        { code: "export * from 'foo';", parserOptions: { sourceType: "module" } },
        { code: "export { foo } from 'foo';", parserOptions: { sourceType: "module" } },
        { code: "export { foo };", parserOptions: { sourceType: "module" } },
        { code: "export var foo;", parserOptions: { sourceType: "module" } },
        { code: "export function foo () { }", parserOptions: { sourceType: "module" } },
        { code: "export function* foo () { }", parserOptions: { sourceType: "module" } },
        { code: "export class Foo { }", parserOptions: { sourceType: "module" } },
        { code: "export let foo;", parserOptions: { sourceType: "module" } },
        { code: "export const FOO = 42;", parserOptions: { sourceType: "module" } },
        { code: "export default function() { }", parserOptions: { sourceType: "module" } },
        { code: "export default function* () { }", parserOptions: { sourceType: "module" } },
        { code: "export default class { }", parserOptions: { sourceType: "module" } },
        { code: "export default foo || bar;", parserOptions: { sourceType: "module" } },
        { code: "export default (foo) => foo.bar();", parserOptions: { sourceType: "module" } },
        { code: "export default foo = 42;", parserOptions: { sourceType: "module" } },
        { code: "export default foo += 42;", parserOptions: { sourceType: "module" } },

        // exports, "never"
        { code: "export * from 'foo'", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export { foo } from 'foo'", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export { foo }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export var foo", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export function foo () { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export function* foo () { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export class Foo { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export let foo", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export const FOO = 42", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default function() { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default function* () { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default class { }", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default foo || bar", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default (foo) => foo.bar()", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default foo = 42", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "export default foo += 42", options: ["never"], parserOptions: { sourceType: "module" } },
        { code: "++\nfoo;", options: ["always"] },
        { code: "var a = b;\n+ c", options: ["never"] },

        // https://github.com/eslint/eslint/issues/7782
        { code: "var a = b;\n/foo/.test(c)", options: ["never"] },
        { code: "var a = b;\n`foo`", options: ["never"], parserOptions: { ecmaVersion: 6 } },

        // babel
        "class Foo { bar = 'example'; }",
        "class Foo { static bar = 'example'; }",
        { code: "async function foo() { for await (let thing of {}) { console.log(thing); } }", parserOptions: { ecmaVersion: 6 } },

        // babel, "never"
        { code: "class Foo { bar = 'example' }", options: ["never"] },
        { code: "class Foo { static bar = 'example' }", options: ["never"] }
    ],
    invalid: [
        { code: "import * as utils from './utils'", output: "import * as utils from './utils';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ImportDeclaration", column: 33 }] },
        { code: "import { square, diag } from 'lib'", output: "import { square, diag } from 'lib';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ImportDeclaration" }] },
        { code: "import { default as foo } from 'lib'", output: "import { default as foo } from 'lib';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ImportDeclaration" }] },
        { code: "import 'src/mylib'", output: "import 'src/mylib';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ImportDeclaration" }] },
        { code: "import theDefault, { named1, named2 } from 'src/mylib'", output: "import theDefault, { named1, named2 } from 'src/mylib';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ImportDeclaration" }] },
        { code: "function foo() { return [] }", output: "function foo() { return []; }", errors: [{ message: "Missing semicolon.", type: "ReturnStatement" }] },
        { code: "while(true) { break }", output: "while(true) { break; }", errors: [{ message: "Missing semicolon.", type: "BreakStatement" }] },
        { code: "while(true) { continue }", output: "while(true) { continue; }", errors: [{ message: "Missing semicolon.", type: "ContinueStatement" }] },
        { code: "let x = 5", output: "let x = 5;", parserOptions: { ecmaVersion: 6 }, errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "var x = 5", output: "var x = 5;", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "var x = 5, y", output: "var x = 5, y;", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "debugger", output: "debugger;", errors: [{ message: "Missing semicolon.", type: "DebuggerStatement" }] },
        { code: "foo()", output: "foo();", errors: [{ message: "Missing semicolon.", type: "ExpressionStatement" }] },
        { code: "var x = 5, y", output: "var x = 5, y;", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "for (var a in b) var i ", output: "for (var a in b) var i; ", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "for (;;){var i}", output: "for (;;){var i;}", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "for (;;) var i ", output: "for (;;) var i; ", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "for (var j;;) {var i}", output: "for (var j;;) {var i;}", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "var foo = {\n bar: baz\n}", output: "var foo = {\n bar: baz\n};", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration", line: 3 }] },
        { code: "var foo\nvar bar;", output: "var foo;\nvar bar;", errors: [{ message: "Missing semicolon.", type: "VariableDeclaration", line: 1 }] },
        { code: "throw new Error('foo')", output: "throw new Error('foo');", errors: [{ message: "Missing semicolon.", type: "ThrowStatement", line: 1 }] },
        { code: "do{}while(true)", output: "do{}while(true);", errors: [{ message: "Missing semicolon.", type: "DoWhileStatement", line: 1 }] },

        { code: "throw new Error('foo');", output: "throw new Error('foo')", options: ["never"], errors: [{ message: "Extra semicolon.", type: "ThrowStatement", column: 23 }] },
        { code: "function foo() { return []; }", output: "function foo() { return [] }", options: ["never"], errors: [{ message: "Extra semicolon.", type: "ReturnStatement" }] },
        { code: "while(true) { break; }", output: "while(true) { break }", options: ["never"], errors: [{ message: "Extra semicolon.", type: "BreakStatement" }] },
        { code: "while(true) { continue; }", output: "while(true) { continue }", options: ["never"], errors: [{ message: "Extra semicolon.", type: "ContinueStatement" }] },
        { code: "let x = 5;", output: "let x = 5", parserOptions: { ecmaVersion: 6 }, options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "var x = 5;", output: "var x = 5", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "var x = 5, y;", output: "var x = 5, y", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "debugger;", output: "debugger", options: ["never"], errors: [{ message: "Extra semicolon.", type: "DebuggerStatement" }] },
        { code: "foo();", output: "foo()", options: ["never"], errors: [{ message: "Extra semicolon.", type: "ExpressionStatement" }] },
        { code: "var x = 5, y;", output: "var x = 5, y", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "for (var a in b) var i; ", output: "for (var a in b) var i ", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "for (;;){var i;}", output: "for (;;){var i}", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "for (;;) var i; ", output: "for (;;) var i ", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "for (var j;;) {var i;}", output: "for (var j;;) {var i}", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "var foo = {\n bar: baz\n};", output: "var foo = {\n bar: baz\n}", options: ["never"], errors: [{ message: "Extra semicolon.", type: "VariableDeclaration", line: 3 }] },
        { code: "import theDefault, { named1, named2 } from 'src/mylib';", output: "import theDefault, { named1, named2 } from 'src/mylib'", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ImportDeclaration" }] },
        { code: "do{}while(true);", output: "do{}while(true)", options: ["never"], errors: [{ message: "Extra semicolon.", type: "DoWhileStatement", line: 1 }] },

        { code: "if (foo) { bar()\n }", options: ["always", { omitLastInOneLineBlock: true }], errors: [{ message: "Missing semicolon." }] },
        { code: "if (foo) {\n bar() }", options: ["always", { omitLastInOneLineBlock: true }], errors: [{ message: "Missing semicolon." }] },
        { code: "if (foo) {\n bar(); baz() }", options: ["always", { omitLastInOneLineBlock: true }], errors: [{ message: "Missing semicolon." }] },
        { code: "if (foo) { bar(); }", options: ["always", { omitLastInOneLineBlock: true }], errors: [{ message: "Extra semicolon." }] },


        // exports, "always"
        { code: "export * from 'foo'", output: "export * from 'foo';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportAllDeclaration" }] },
        { code: "export { foo } from 'foo'", output: "export { foo } from 'foo';", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportNamedDeclaration" }] },
        { code: "export { foo }", output: "export { foo };", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportNamedDeclaration" }] },
        { code: "export var foo", output: "export var foo;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "export let foo", output: "export let foo;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "export const FOO = 42", output: "export const FOO = 42;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "VariableDeclaration" }] },
        { code: "export default foo || bar", output: "export default foo || bar;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default (foo) => foo.bar()", output: "export default (foo) => foo.bar();", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default foo = 42", output: "export default foo = 42;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default foo += 42", output: "export default foo += 42;", parserOptions: { sourceType: "module" }, errors: [{ message: "Missing semicolon.", type: "ExportDefaultDeclaration" }] },

        // exports, "never"
        { code: "export * from 'foo';", output: "export * from 'foo'", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportAllDeclaration" }] },
        { code: "export { foo } from 'foo';", output: "export { foo } from 'foo'", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportNamedDeclaration" }] },
        { code: "export { foo };", output: "export { foo }", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportNamedDeclaration" }] },
        { code: "export var foo;", output: "export var foo", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "export let foo;", output: "export let foo", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "export const FOO = 42;", output: "export const FOO = 42", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "VariableDeclaration" }] },
        { code: "export default foo || bar;", output: "export default foo || bar", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default (foo) => foo.bar();", output: "export default (foo) => foo.bar()", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default foo = 42;", output: "export default foo = 42", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "export default foo += 42;", output: "export default foo += 42", options: ["never"], parserOptions: { sourceType: "module" }, errors: [{ message: "Extra semicolon.", type: "ExportDefaultDeclaration" }] },
        { code: "a;\n++b", output: "a\n++b", options: ["never"], errors: [{ message: "Extra semicolon." }] },

        // babel
        { code: "class Foo { bar = 'example' }", errors: [{ message: "Missing semicolon." }] },
        { code: "class Foo { static bar = 'example' }", errors: [{ message: "Missing semicolon." }] },

        // babel, "never"
        { code: "class Foo { bar = 'example'; }", options: ["never"], errors: [{ message: "Extra semicolon." }] },
        { code: "class Foo { static bar = 'example'; }", options: ["never"], errors: [{ message: "Extra semicolon." }] }
    ]
});
