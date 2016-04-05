/**
 * @fileoverview Tests for flow-object-type.
 * @author Nat Mote
 */

"use strict";

var rule = require("../rules/flow-object-type"),
    RuleTester = require('eslint').RuleTester;

var features = {
};

function test(code, options, errors, output){
  var result = {
    code: code,
    parser: 'babel-eslint',
    ecmaFeatures: features,
  };
  if (options != null) {
    result.options = options;
  }
  if (errors != null) {
    result.errors = errors;
  }
  if (output != null) {
    result.output = output;
  }
  return result;
}

var commaMessage = 'Prefer commas to semicolons in object and class types';
var semiMessage = 'Prefer semicolons to commas in object and class types';

function ok(code, commaOrSemi) {
  return test(code, [commaOrSemi]);
}

function err(code, commaOrSemi, errorMessage, output) {
  return test(code, [commaOrSemi], [errorMessage], output);
}

var cases = [
  ok('type Foo = { a: Foo; b: Bar }', 'semicolon'),
  err('type Foo = { a: Foo, b: Bar }', 'semicolon', semiMessage, 'type Foo = { a: Foo; b: Bar }'),

  ok('type Foo = { a: Foo, b: Bar }', 'comma'),
  err('type Foo = { a: Foo; b: Bar }', 'comma', commaMessage, 'type Foo = { a: Foo, b: Bar }'),

  ok('declare class Foo { a: Foo; }', 'semicolon'),
  err('declare class Foo { a: Foo, }', 'semicolon', semiMessage, 'declare class Foo { a: Foo; }'),

  ok('declare class Foo { a: Foo, }', 'comma'),
  err('declare class Foo { a: Foo; }', 'comma', commaMessage, 'declare class Foo { a: Foo, }'),
];

function hasError(testCase) {
  return testCase.errors != null && testCase.errors.length > 0;
}

function hasNoError(testCase) {
  return !hasError(testCase);
}

var ruleTester = new RuleTester();
ruleTester.run('flow-object-type', rule, {
  valid: cases.filter(hasNoError),
  invalid: cases.filter(hasError),
});
