/* eslint-disable */

/**
 * @fileoverview Tests for arrow-parens
 * @author Jxck
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../rules/arrow-parens"),
    RuleTester = require('eslint').RuleTester;

function ok(code, args){
  return { code: code, options: args,  parser: 'babel-eslint' }
}

function err(code, errors, args){
  var e = ok(code, args)
  e.errors = errors
  return e
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var ruleTester = new RuleTester();

var valid = [
    { code: "() => {}", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {}", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => a", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {\n}", ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => {});", ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => { if (true) {}; });", ecmaFeatures: { arrowFunctions: true } },

    // // as-needed
    { code: "() => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => a", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "([a, b]) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true } },
    { code: "({ a, b }) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true } },
    { code: "(a = 10) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true, defaultParams: true } },
    { code: "(...a) => a[0]", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, restParams: true } },
    { code: "(a, b) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    ok("(a: string) => a", ["as-needed"]),

    // async
    ok("async () => {}"),
    ok("async (a) => {}"),
    ok("async (a) => a"),
    ok("async (a) => {\n}"),
    ok("a.then(async (foo) => {});"),
    ok("a.then((foo) => { if (true) {}; })"),

    ok("async () => {}", ["as-needed"]),
    ok("async a => {}", ["as-needed"]),
    ok("async a => a", ["as-needed"]),
    ok("async ([a, b]) => {}", ["as-needed"]),
    ok("async ({ a, b }) => {}", ["as-needed"]),
    ok("async (a = 10) => {}", ["as-needed"]),
    ok("async (...a) => a[0]", ["as-needed"]),
    ok("async (a, b) => {}", ["as-needed"]),

];

var message = message;
var asNeededMessage = asNeededMessage;
var type = type;

var invalid = [
    {
        code: "a => {}",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a => a",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a => {\n}",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a.then(foo => {});",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 8,
            message: message,
            type: type
        }]
    },
    {
        code: "a.then(foo => a);",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 8,
            message: message,
            type: type
        }]
    },
    {
        code: "a(foo => { if (true) {}; });",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 3,
            message: message,
            type: type
        }]
    },

    // as-needed
    {
        code: "(a) => a",
        options: ["as-needed"],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: asNeededMessage,
            type: type
        }]
    },
    {
        code: "(b) => b",
        options: ["as-needed"],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: asNeededMessage,
            type: type
        }]
    },

    // async
    err('async a => {}', [
      { message: 'Expected parentheses around arrow function argument.' },
    ]),

    err('async a => a', [
      { message: 'Expected parentheses around arrow function argument.' },
    ]),

    err('async (a) => a', [
      { message: 'Unexpected parentheses around single function argument' },
    ],
    ["as-needed"])
];

ruleTester.run("arrow-parens", rule, {
    valid: valid,
    invalid: invalid
});
