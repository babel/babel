/**
 * @fileoverview Tests for no-await-in-loop.
 * @author Nat Mote
 */

"use strict";

var rule = require("../rules/no-await-in-loop"),
    RuleTester = require('eslint').RuleTester;

var features = {
};

function test(code, errors){
  var result = {
    code: code,
    parser: 'babel-eslint',
    ecmaFeatures: features,
  };
  if (errors != null) {
    result.errors = errors;
  }
  return result;
}

var ruleName = 'babel/no-await-in-loop';

var message = 'Avoid using await inside a loop. Consider refactoring to use Promise.all. If ' +
  'you are sure you want to do this, add `// eslint-disable-line ' +
  ruleName + '` at the end of this line.'

function ok(code) {
  return test(code);
}

function err(code) {
  return test(code, [message]);
}

// Construct an async function with the given body
function fun(body) {
  return "async function foo() { " + body + " }";
}

// Construct a loop
function loop(kind, condition, body) {
  return kind + " (" + condition + ") { " + body + " }";
}

// Construct a class with the given body
function cls(body) {
  return "class Foo { " + body + " }";
}

var cases = [
  ok(fun("await bar;")),

  // While loops
  ok(fun(loop("while", "true", fun("await bar;")))),  // Blocked by a function declaration
  err(fun(loop("while", "baz", "await bar;"))),
  err(fun(loop("while", "await foo()", ""))),

  // For of loops
  err(fun(loop("for", "var bar of baz", "await bar;"))),

  // For in loops
  err(fun(loop("for", "var bar in baz", "await bar;"))),

  // For loops
  ok(fun(loop("for", "var i = await bar; i < n; i++", ""))),
  err(fun(loop("for", "var i; i < n; i++", "await bar;"))),
  err(fun(loop("for", "var i; await foo(i); i++", ""))),
  err(fun(loop("for", "var i; i < n; i = await bar", ""))),

  // Do while loops
  ok(fun("do { } while (bar);")),
  err(fun("do { await bar; } while (baz);")),
  err(fun("do { } while (await bar);")),

  // Blocked by a function expression
  ok(fun(loop("while", "true", "var y = async function() { await bar; }"))),
  // Blocked by an arrow function
  ok(fun(loop("while", "true", "var y = async () => await foo;"))),
  ok(fun(loop("while", "true", "var y = async () => { await foo; }"))),
  // Blocked by a class method,
  ok(fun(loop("while", "true", cls("async foo() { await bar; }")))),

  // Deep in a loop body
  err(fun(loop("while", "true", "if (bar) { foo(await bar); }"))),
  // Deep in a loop condition
  err(fun(loop("while", "xyz || 5 > await x", ""))),
];

function hasError(testCase) {
  return testCase.errors != null && testCase.errors.length > 0;
}

function hasNoError(testCase) {
  return !hasError(testCase);
}

var ruleTester = new RuleTester();
ruleTester.run(ruleName, rule, {
  valid: cases.filter(hasNoError),
  invalid: cases.filter(hasError),
});
