/* eslint-disable */

/**
 * @fileoverview Tests for new-cap rule.
 * @author Nicholas C. Zakas
 */

var linter = require('eslint').linter
  , ESLintTester = require('eslint-tester')
  , eslintTester = new ESLintTester(linter);


eslintTester.addRuleTest("rules/new-cap", {
    valid: [
        // Original test cases.
        "var x = new Constructor();",
        "var x = new a.b.Constructor();",
        "var x = new a.b['Constructor']();",
        "var x = new a.b[Constructor]();",
        "var x = new a.b[constructor]();",
        "var x = new function(){};",
        "var x = new _;",
        "var x = new $;",
        "var x = new Σ;",
        "var x = new _x;",
        "var x = new $x;",
        "var x = new this;",
        "var x = Array(42)",
        "var x = Boolean(42)",
        "var x = Date(42)",
        "var x = Date.UTC(2000, 0)",
        "var x = Error('error')",
        "var x = Function('return 0')",
        "var x = Number(42)",
        "var x = Object(null)",
        "var x = RegExp(42)",
        "var x = String(42)",
        "var x = Symbol('symbol')",
        "var x = _();",
        "var x = $();",
        { code: "var x = Foo(42)", args: [1, {"capIsNew": false}] },
        { code: "var x = bar.Foo(42)", args: [1, {"capIsNew": false}] },
        "var x = bar[Foo](42)",
        {code: "var x = bar['Foo'](42)", args: [1, {"capIsNew": false}] },
        "var x = Foo.bar(42)",
        { code: "var x = new foo(42)", args: [1, {"newIsCap": false}] },
        "var o = { 1: function () {} }; o[1]();",
        "var o = { 1: function () {} }; new o[1]();",
        { code: "var x = Foo(42);", args: [1, { capIsNew: true, capIsNewExceptions: ["Foo"] }] },
        { code: "var x = new foo(42);", args: [1, { newIsCap: true, newIsCapExceptions: ["foo"] }] },
        { code: "var x = Object(42);", args: [1, { capIsNewExceptions: ["Foo"] }] },

        // Babel-specific test cases.
        { code: "@MyDecorator(123) class MyClass{}", parser: "babel-eslint" },
    ],
    invalid: [
        { code: "var x = new c();", errors: [{ message: "A constructor name should not start with a lowercase letter.", type: "NewExpression"}] },
        { code: "var x = new φ;", errors: [{ message: "A constructor name should not start with a lowercase letter.", type: "NewExpression"}] },
        { code: "var x = new a.b.c;", errors: [{ message: "A constructor name should not start with a lowercase letter.", type: "NewExpression"}] },
        { code: "var x = new a.b['c'];", errors: [{ message: "A constructor name should not start with a lowercase letter.", type: "NewExpression"}] },
        { code: "var b = Foo();", errors: [{ message: "A function with a name starting with an uppercase letter should only be used as a constructor.", type: "CallExpression"}] },
        { code: "var b = a.Foo();", errors: [{ message: "A function with a name starting with an uppercase letter should only be used as a constructor.", type: "CallExpression"}] },
        { code: "var b = a['Foo']();", errors: [{ message: "A function with a name starting with an uppercase letter should only be used as a constructor.", type: "CallExpression"}] },
        { code: "var b = a.Date.UTC();", errors: [{ message: "A function with a name starting with an uppercase letter should only be used as a constructor.", type: "CallExpression"}] },
        { code: "var b = UTC();", errors: [{ message: "A function with a name starting with an uppercase letter should only be used as a constructor.", type: "CallExpression"}] },
        {
            code: "var a = B.C();",
            errors: [
                {
                    message: "A function with a name starting with an uppercase letter should only be used as a constructor.",
                    type: "CallExpression",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var a = B\n.C();",
            errors: [
                {
                    message: "A function with a name starting with an uppercase letter should only be used as a constructor.",
                    type: "CallExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var a = new B.c();",
            errors: [
                {
                    message: "A constructor name should not start with a lowercase letter.",
                    type: "NewExpression",
                    line: 1,
                    column: 14
                }
            ]
        },
        {
            code: "var a = new B.\nc();",
            errors: [
                {
                    message: "A constructor name should not start with a lowercase letter.",
                    type: "NewExpression",
                    line: 2,
                    column: 0
                }
            ]
        },
        {
            code: "var a = new c();",
            errors: [
                {
                    message: "A constructor name should not start with a lowercase letter.",
                    type: "NewExpression",
                    line: 1,
                    column: 12
                }
            ]
        }
    ]
});
