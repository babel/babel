/* eslint-disable */
var linter = require('eslint').linter
  , ESLintTester = require('eslint-tester')
  , eslintTester = new ESLintTester(linter);

var features = {
    generators: true
};

function ok(code, args){
  return { code: code, args: args,  parser: 'babel-eslint', ecmaFeatures: features }
}

function err(code, errors, args){
  var e = ok(code, args)
  e.errors = errors
  return e
}


eslintTester.addRuleTest('rules/generator-star', {
  valid: [
    ok('async function test(){}'),
    ok('async function *test(){}', [1, "end"]) ,
    ok('async function* test(){}', [1, "start"]),
    ok('async function * test(){}', [1, "middle"])
  ],
  invalid: [
    err('async function* test(){}', [ { message: 'Expected a space before *.' }]),
    err('async function *test(){}', [ { message: 'Expected no space before *.' }], [1, 'start'])
  ]
});