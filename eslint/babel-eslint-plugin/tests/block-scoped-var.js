/* eslint-disable */

/**
 * @fileoverview Tests for block-scoped-var rule
 * @author Matt DuVall <http://www.mattduvall.com>
 * @copyright 2015 Mathieu M-Gosselin. All rights reserved.
 */

var eslint = require("eslint").linter,
    ESLintTester = require("eslint-tester"),
    eslintTester = new ESLintTester(eslint);

eslintTester.addRuleTest("rules/block-scoped-var", {
    valid: [
        //original test cases
        { code: "function f() { } f(); var exports = { f: f };", ecmaFeatures: {modules: true} },
        { code: "var f = () => {}; f(); var exports = { f: f };", ecmaFeatures: {arrowFunctions: true, modules: true} },
        "!function f(){ f; }",
        "function f() { } f(); var exports = { f: f };",
        "function f() { var a, b; { a = true; } b = a; }",
        "var a; function f() { var b = a; }",
        "function f(a) { }",
        "!function(a) { };",
        "!function f(a) { };",
        "function f(a) { var b = a; }",
        "!function f(a) { var b = a; };",
        "function f() { var g = f; }",
        "function f() { } function g() { var f = g; }",
        "function f() { var hasOwnProperty; { hasOwnProperty; } }",
        "function f(){ a; b; var a, b; }",
        "function f(){ g(); function g(){} }",
        { code: "function myFunc(foo) {  \"use strict\";  var { bar } = foo;  bar.hello();}", ecmaFeatures: { destructuring: true } },
        { code: "function myFunc(foo) {  \"use strict\";  var [ bar ]  = foo;  bar.hello();}", ecmaFeatures: { destructuring: true } },
        { code: "function myFunc(...foo) {  return foo;}", ecmaFeatures: { restParams: true } },
        { code: "var f = () => { var g = f; }", ecmaFeatures: { arrowFunctions: true } },
        { code: "class Foo {}\nexport default Foo;", ecmaFeatures: { modules: true, classes: true } },
        { code: "new Date", globals: {Date: false} },
        { code: "new Date", globals: {} },
        { code: "var eslint = require('eslint');", globals: {require: false} },
        { code: "var fun = function({x}) {return x;};", ecmaFeatures: { destructuring: true } },
        { code: "var fun = function([,x]) {return x;};", ecmaFeatures: { destructuring: true } },
        "function f(a) { return a.b; }",
        "var a = { \"foo\": 3 };",
        "var a = { foo: 3 };",
        "var a = { foo: 3, bar: 5 };",
        "var a = { set foo(a){}, get bar(){} };",
        "function f(a) { return arguments[0]; }",
        "function f() { }; var a = f;",
        "var a = f; function f() { };",
        "function f(){ for(var i; i; i) i; }",
        "function f(){ for(var a=0, b=1; a; b) a, b; }",
        "function f(){ for(var a in {}) a; }",
        "function f(){ switch(2) { case 1: var b = 2; b; break; default: b; break;} b; }",
        "a:;",
        { code: "const React = require(\"react/addons\");const cx = React.addons.classSet;", globals: { require: false }, ecmaFeatures: { globalReturn: true, modules: true, blockBindings: true }},
        { code: "var v = 1;  function x() { return v; };", ecmaFeatures: { globalReturn: true }},
        { code: "import * as y from \"./other.js\"; y();", ecmaFeatures: { modules: true }},
        { code: "import y from \"./other.js\"; y();", ecmaFeatures: { modules: true }},
        { code: "import {x as y} from \"./other.js\"; y();", ecmaFeatures: { modules: true }},
        { code: "var x; export {x};", ecmaFeatures: { modules: true }},
        { code: "var x; export {x as v};", ecmaFeatures: { modules: true }},
        { code: "export {x} from \"./other.js\";", ecmaFeatures: { modules: true }},
        { code: "export {x as v} from \"./other.js\";", ecmaFeatures: { modules: true }},
        { code: "class Test { myFunction() { return true; }}", ecmaFeatures: { classes: true }},
        { code: "class Test { get flag() { return true; }}", ecmaFeatures: { classes: true }},
        { code: "var Test = class { myFunction() { return true; }}", ecmaFeatures: { classes: true }},
        { code: "var doStuff; let {x: y} = {x: 1}; doStuff(y);", ecmaFeatures: { blockBindings: true, destructuring: true }},
        { code: "function foo({x: y}) { return y; }", ecmaFeatures: { blockBindings: true, destructuring: true }},

        // Babel-specific test-cases.
        { code: "export x from \"./other.js\";", parser: "babel-eslint", ecmaFeatures: {modules: true} },
        { code: "export * as x from \"./other.js\";", parser: "babel-eslint", ecmaFeatures: {modules: true} },
    ],
    invalid: [
        { code: "!function f(){}; f", errors: [{ message: "\"f\" used outside of binding context." }] },
        { code: "var f = function foo() { }; foo(); var exports = { f: foo };", errors: [{ message: "\"foo\" used outside of binding context." }, { message: "\"foo\" used outside of binding context."}] },
        { code: "var f = () => { x; }", ecmaFeatures: { arrowFunctions: true }, errors: [{ message: "\"x\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f(){ x; }", errors: [{ message: "\"x\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f(){ x; { var x; } }", errors: [{ message: "\"x\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f(){ { var x; } x; }", errors: [{ message: "\"x\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f() { var a; { var b = 0; } a = b; }", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f() { try { var a = 0; } catch (e) { var b = a; } }", errors: [{ message: "\"a\" used outside of binding context.", type: "Identifier" }] },
        { code: "var eslint = require('eslint');", globals: {}, errors: [{ message: "\"require\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f(a) { return a[b]; }", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f() { return b.a; }", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        { code: "var a = { foo: bar };", errors: [{ message: "\"bar\" used outside of binding context.", type: "Identifier" }] },
        { code: "var a = { foo: foo };", errors: [{ message: "\"foo\" used outside of binding context.", type: "Identifier" }] },
        { code: "var a = { bar: 7, foo: bar };", errors: [{ message: "\"bar\" used outside of binding context.", type: "Identifier" }] },
        { code: "var a = arguments;", errors: [{ message: "\"arguments\" used outside of binding context.", type: "Identifier" }] },
        { code: "function x(){}; var a = arguments;", errors: [{ message: "\"arguments\" used outside of binding context.", type: "Identifier" }] },
        { code: "function z(b){}; var a = b;", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        { code: "function z(){var b;}; var a = b;", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        { code: "function f(){ try{}catch(e){} e }", errors: [{ message: "\"e\" used outside of binding context.", type: "Identifier" }] },
        { code: "a:b;", errors: [{ message: "\"b\" used outside of binding context.", type: "Identifier" }] },
        {
            code: "function a() { for(var b in {}) { var c = b; } c; }",
            errors: [{ message: "\"c\" used outside of binding context.", type: "Identifier" }]
        },
        {
            code: "function a() { for(var b of {}) { var c = b;} c; }",
            ecmaFeatures: { forOf: true },
            errors: [{ message: "\"c\" used outside of binding context.", type: "Identifier" }]
        }
    ]
});
