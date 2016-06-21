'use strict';

var rule = require('../rules/func-params-comma-dangle');
var RuleTester = require('eslint').RuleTester;

var MISSING_I = [{message: 'Missing trailing comma.', type: 'Identifier'}];
var MISSING_AP = [{message: 'Missing trailing comma.', type: 'AssignmentPattern'}];
var MISSING_SE = [{message: 'Missing trailing comma.', type: 'SpreadElement'}];
var UNEXPECTED_I = [{message: 'Unexpected trailing comma.', type: 'Identifier'}];
var UNEXPECTED_AP = [{message: 'Unexpected trailing comma.', type: 'AssignmentPattern'}];
var UNEXPECTED_SE = [{message: 'Unexpected trailing comma.', type: 'SpreadElement'}];

var ruleTester = new RuleTester({parser: 'babel-eslint'});
ruleTester.run('func-params-comma-dangle', rule, {
  valid: [
    {code: 'function f() {}'},
    {code: 'function f(\n) {}'},
    {code: 'function f(...a) {}'},
    {code: 'function f(...a\n) {}'},

    {code: 'f()'},
    {code: 'f(\n)'},

    {code: 'new F()'},
    {code: 'new F(\n)'},

    // FunctionDeclaration
    {code: 'function f(a) {}', options: ['always-multiline']},
    {code: 'function f(a) {}', options: ['never']},
    {code: 'function f(a) {}', options: ['only-multiline']},
    {code: 'function f(a,) {}', options: ['always']},
    {code: 'function f(a,\n) {}', options: ['always']},
    {code: 'function f(a,\n) {}', options: ['always-multiline']},
    {code: 'function f(a,\n) {}', options: ['only-multiline']},
    {code: 'function f(a\n) {}', options: ['never']},
    {code: 'function f(a\n) {}', options: ['only-multiline']},

    {code: 'function f(a=1) {}', options: ['always-multiline']},
    {code: 'function f(a=1) {}', options: ['never']},
    {code: 'function f(a=1) {}', options: ['only-multiline']},
    {code: 'function f(a=1,) {}', options: ['always']},
    {code: 'function f(a=1,\n) {}', options: ['always']},
    {code: 'function f(a=1,\n) {}', options: ['always-multiline']},
    {code: 'function f(a=1,\n) {}', options: ['only-multiline']},
    {code: 'function f(a=1\n) {}', options: ['never']},
    {code: 'function f(a=1\n) {}', options: ['only-multiline']},

    {code: 'function f(a:T) {}', options: ['always-multiline']},
    {code: 'function f(a:T) {}', options: ['never']},
    {code: 'function f(a:T) {}', options: ['only-multiline']},
    {code: 'function f(a:T,) {}', options: ['always']},
    {code: 'function f(a:T,\n) {}', options: ['always']},
    {code: 'function f(a:T,\n) {}', options: ['always-multiline']},
    {code: 'function f(a:T,\n) {}', options: ['only-multiline']},
    {code: 'function f(a:T\n) {}', options: ['never']},
    {code: 'function f(a:T\n) {}', options: ['only-multiline']},

    // FunctionExpression
    {code: 'f = function(a) {}', options: ['always-multiline']},
    {code: 'f = function(a) {}', options: ['never']},
    {code: 'f = function(a) {}', options: ['only-multiline']},
    {code: 'f = function(a,) {}', options: ['always']},
    {code: 'f = function(a,\n) {}', options: ['always']},
    {code: 'f = function(a,\n) {}', options: ['always-multiline']},
    {code: 'f = function(a,\n) {}', options: ['only-multiline']},
    {code: 'f = function(a\n) {}', options: ['never']},
    {code: 'f = function(a\n) {}', options: ['only-multiline']},

    {code: 'f = function(a=1) {}', options: ['always-multiline']},
    {code: 'f = function(a=1) {}', options: ['never']},
    {code: 'f = function(a=1) {}', options: ['only-multiline']},
    {code: 'f = function(a=1,) {}', options: ['always']},
    {code: 'f = function(a=1,\n) {}', options: ['always']},
    {code: 'f = function(a=1,\n) {}', options: ['always-multiline']},
    {code: 'f = function(a=1,\n) {}', options: ['only-multiline']},
    {code: 'f = function(a=1\n) {}', options: ['never']},
    {code: 'f = function(a=1\n) {}', options: ['only-multiline']},

    {code: 'f = function(a:T) {}', options: ['always-multiline']},
    {code: 'f = function(a:T) {}', options: ['never']},
    {code: 'f = function(a:T) {}', options: ['only-multiline']},
    {code: 'f = function(a:T,) {}', options: ['always']},
    {code: 'f = function(a:T,\n) {}', options: ['always']},
    {code: 'f = function(a:T,\n) {}', options: ['always-multiline']},
    {code: 'f = function(a:T,\n) {}', options: ['only-multiline']},
    {code: 'f = function(a:T\n) {}', options: ['never']},
    {code: 'f = function(a:T\n) {}', options: ['only-multiline']},

    // ArrowFunctionExpression
    {code: 'f = (a) => {}', options: ['always-multiline']},
    {code: 'f = (a) => {}', options: ['never']},
    {code: 'f = (a) => {}', options: ['only-multiline']},
    {code: 'f = (a,) => {}', options: ['always']},
    {code: 'f = (a,\n) => {}', options: ['always']},
    {code: 'f = (a,\n) => {}', options: ['always-multiline']},
    {code: 'f = (a,\n) => {}', options: ['only-multiline']},
    {code: 'f = (a\n) => {}', options: ['never']},
    {code: 'f = (a\n) => {}', options: ['only-multiline']},

    {code: 'f = a => {}', options: ['always-multiline']},
    {code: 'f = a => {}', options: ['never']},
    {code: 'f = a => {}', options: ['only-multiline']},
    {code: 'f = a => {}', options: ['always']},

    {code: 'f = (a=1) => {}', options: ['always-multiline']},
    {code: 'f = (a=1) => {}', options: ['never']},
    {code: 'f = (a=1) => {}', options: ['only-multiline']},
    {code: 'f = (a=1,) => {}', options: ['always']},
    {code: 'f = (a=1,\n) => {}', options: ['always']},
    {code: 'f = (a=1,\n) => {}', options: ['always-multiline']},
    {code: 'f = (a=1,\n) => {}', options: ['only-multiline']},
    {code: 'f = (a=1\n) => {}', options: ['never']},
    {code: 'f = (a=1\n) => {}', options: ['only-multiline']},

    {code: 'f = (a:T) => {}', options: ['always-multiline']},
    {code: 'f = (a:T) => {}', options: ['never']},
    {code: 'f = (a:T) => {}', options: ['only-multiline']},
    // Arrow functions with flow types aren't getting the correct loc.
    // {code: 'f = (a:T,) => {}', options: ['always']},
    // {code: 'f = (a:T,\n) => {}', options: ['always']},
    {code: 'f = (a:T,\n) => {}', options: ['always-multiline']},
    {code: 'f = (a:T,\n) => {}', options: ['only-multiline']},
    {code: 'f = (a:T\n) => {}', options: ['never']},
    {code: 'f = (a:T\n) => {}', options: ['only-multiline']},

    // CallExpression
    {code: 'f(a)', options: ['always-multiline']},
    {code: 'f(a)', options: ['never']},
    {code: 'f(a)', options: ['only-multiline']},
    {code: 'f(a,)', options: ['always']},
    {code: 'f(a,\n)', options: ['always']},
    {code: 'f(a,\n)', options: ['always-multiline']},
    {code: 'f(a,\n)', options: ['only-multiline']},
    {code: 'f(a\n)', options: ['never']},
    {code: 'f(a\n)', options: ['only-multiline']},
    {code: 'f(...a)', options: ['always-multiline']},
    {code: 'f(...a)', options: ['never']},
    {code: 'f(...a)', options: ['only-multiline']},
    {code: 'f(...a,)', options: ['always']},
    {code: 'f(...a,\n)', options: ['always']},
    {code: 'f(...a,\n)', options: ['always-multiline']},
    {code: 'f(...a,\n)', options: ['only-multiline']},
    {code: 'f(...a\n)', options: ['never']},
    {code: 'f(...a\n)', options: ['only-multiline']},

    // NewExpression
    {code: 'new F(a)', options: ['always-multiline']},
    {code: 'new F(a)', options: ['never']},
    {code: 'new F(a)', options: ['only-multiline']},
    {code: 'new F(a,)', options: ['always']},
    {code: 'new F(a,\n)', options: ['always']},
    {code: 'new F(a,\n)', options: ['always-multiline']},
    {code: 'new F(a,\n)', options: ['only-multiline']},
    {code: 'new F(a\n)', options: ['never']},
    {code: 'new F(a\n)', options: ['only-multiline']},
    {code: 'new F(...a)', options: ['always-multiline']},
    {code: 'new F(...a)', options: ['never']},
    {code: 'new F(...a)', options: ['only-multiline']},
    {code: 'new F(...a,)', options: ['always']},
    {code: 'new F(...a,\n)', options: ['always']},
    {code: 'new F(...a,\n)', options: ['always-multiline']},
    {code: 'new F(...a,\n)', options: ['only-multiline']},
    {code: 'new F(...a\n)', options: ['never']},
    {code: 'new F(...a\n)', options: ['only-multiline']},
  ],
  invalid: [
    // FunctionDeclaration
    {code: 'function f(a) {}', output: 'function f(a,) {}', options: ['always'], errors: MISSING_I},
    {code: 'function f(a,) {}', output: 'function f(a) {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'function f(a,) {}', output: 'function f(a) {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'function f(a,) {}', output: 'function f(a) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'function f(a,\n) {}', output: 'function f(a\n) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'function f(a\n) {}', output: 'function f(a,\n) {}', options: ['always'], errors: MISSING_I},
    {code: 'function f(a\n) {}', output: 'function f(a,\n) {}', options: ['always-multiline'], errors: MISSING_I},

    {code: 'function f(a=1) {}', output: 'function f(a=1,) {}', options: ['always'], errors: MISSING_AP},
    {code: 'function f(a=1,) {}', output: 'function f(a=1) {}', options: ['always-multiline'], errors: UNEXPECTED_AP},
    {code: 'function f(a=1,) {}', output: 'function f(a=1) {}', options: ['always-multiline'], errors: UNEXPECTED_AP},
    {code: 'function f(a=1,) {}', output: 'function f(a=1) {}', options: ['only-multiline'], errors: UNEXPECTED_AP},
    {code: 'function f(a=1,) {}', output: 'function f(a=1) {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'function f(a=1,\n) {}', output: 'function f(a=1\n) {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'function f(a=1\n) {}', output: 'function f(a=1,\n) {}', options: ['always'], errors: MISSING_AP},
    {code: 'function f(a=1\n) {}', output: 'function f(a=1,\n) {}', options: ['always-multiline'], errors: MISSING_AP},

    {code: 'function f(a:T) {}', output: 'function f(a:T,) {}', options: ['always'], errors: MISSING_I},
    {code: 'function f(a:T,) {}', output: 'function f(a:T) {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'function f(a:T,) {}', output: 'function f(a:T) {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'function f(a:T,) {}', output: 'function f(a:T) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'function f(a:T,\n) {}', output: 'function f(a:T\n) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'function f(a:T\n) {}', output: 'function f(a:T,\n) {}', options: ['always'], errors: MISSING_I},
    {code: 'function f(a:T\n) {}', output: 'function f(a:T,\n) {}', options: ['always-multiline'], errors: MISSING_I},

    // FunctionExpression
    {code: 'f = function f(a) {}', output: 'f = function f(a,) {}', options: ['always'], errors: MISSING_I},
    {code: 'f = function f(a,) {}', output: 'f = function f(a) {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'f = function f(a,) {}', output: 'f = function f(a) {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'f = function f(a,) {}', output: 'f = function f(a) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = function f(a,\n) {}', output: 'f = function f(a\n) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = function f(a\n) {}', output: 'f = function f(a,\n) {}', options: ['always'], errors: MISSING_I},
    {code: 'f = function f(a\n) {}', output: 'f = function f(a,\n) {}', options: ['always-multiline'], errors: MISSING_I},

    {code: 'f = function f(a=1) {}', output: 'f = function f(a=1,) {}', options: ['always'], errors: MISSING_AP},
    {code: 'f = function f(a=1,) {}', output: 'f = function f(a=1) {}', options: ['always-multiline'], errors: UNEXPECTED_AP},
    {code: 'f = function f(a=1,) {}', output: 'f = function f(a=1) {}', options: ['only-multiline'], errors: UNEXPECTED_AP},
    {code: 'f = function f(a=1,) {}', output: 'f = function f(a=1) {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'f = function f(a=1,\n) {}', output: 'f = function f(a=1\n) {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'f = function f(a=1\n) {}', output: 'f = function f(a=1,\n) {}', options: ['always'], errors: MISSING_AP},
    {code: 'f = function f(a=1\n) {}', output: 'f = function f(a=1,\n) {}', options: ['always-multiline'], errors: MISSING_AP},

    {code: 'f = function f(a:T) {}', output: 'f = function f(a:T,) {}', options: ['always'], errors: MISSING_I},
    {code: 'f = function f(a:T,) {}', output: 'f = function f(a:T) {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'f = function f(a:T,) {}', output: 'f = function f(a:T) {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'f = function f(a:T,) {}', output: 'f = function f(a:T) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = function f(a:T,\n) {}', output: 'f = function f(a:T\n) {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = function f(a:T\n) {}', output: 'f = function f(a:T,\n) {}', options: ['always'], errors: MISSING_I},
    {code: 'f = function f(a:T\n) {}', output: 'f = function f(a:T,\n) {}', options: ['always-multiline'], errors: MISSING_I},

    // ArrowFunctionExpression
    {code: 'f = (a) => {}', output: 'f = (a,) => {}', options: ['always'], errors: MISSING_I},
    {code: 'f = (a,) => {}', output: 'f = (a) => {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'f = (a,) => {}', output: 'f = (a) => {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'f = (a,) => {}', output: 'f = (a) => {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = (a,\n) => {}', output: 'f = (a\n) => {}', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f = (a\n) => {}', output: 'f = (a,\n) => {}', options: ['always'], errors: MISSING_I},
    {code: 'f = (a\n) => {}', output: 'f = (a,\n) => {}', options: ['always-multiline'], errors: MISSING_I},

    {code: 'f = (a=1) => {}', output: 'f = (a=1,) => {}', options: ['always'], errors: MISSING_AP},
    {code: 'f = (a=1,) => {}', output: 'f = (a=1) => {}', options: ['always-multiline'], errors: UNEXPECTED_AP},
    {code: 'f = (a=1,) => {}', output: 'f = (a=1) => {}', options: ['only-multiline'], errors: UNEXPECTED_AP},
    {code: 'f = (a=1,) => {}', output: 'f = (a=1) => {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'f = (a=1,\n) => {}', output: 'f = (a=1\n) => {}', options: ['never'], errors: UNEXPECTED_AP},
    {code: 'f = (a=1\n) => {}', output: 'f = (a=1,\n) => {}', options: ['always'], errors: MISSING_AP},
    {code: 'f = (a=1\n) => {}', output: 'f = (a=1,\n) => {}', options: ['always-multiline'], errors: MISSING_AP},

    // Arrow functions with flow types aren't getting the correct loc.
    // {code: 'f = (a:T) => {}', output: 'f = (a:T,) => {}', options: ['always'], errors: MISSING_I},
    // {code: 'f = (a:T,) => {}', output: 'f = (a:T) => {}', options: ['always-multiline'], errors: UNEXPECTED_I},
    // {code: 'f = (a:T,) => {}', output: 'f = (a:T) => {}', options: ['only-multiline'], errors: UNEXPECTED_I},
    // {code: 'f = (a:T,) => {}', output: 'f = (a:T) => {}', options: ['never'], errors: UNEXPECTED_I},
    // {code: 'f = (a:T,\n) => {}', output: 'f = (a:T\n) => {}', options: ['never'], errors: UNEXPECTED_I},
    // {code: 'f = (a:T\n) => {}', output: 'f = (a:T,\n) => {}', options: ['always'], errors: MISSING_I},
    // {code: 'f = (a:T\n) => {}', output: 'f = (a:T,\n) => {}', options: ['always-multiline'], errors: MISSING_I},

    // CallExpression
    {code: 'f(a)', output: 'f(a,)', options: ['always'], errors: MISSING_I},
    {code: 'f(a,)', output: 'f(a)', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'f(a,)', output: 'f(a)', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'f(a,)', output: 'f(a)', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f(a,\n)', output: 'f(a\n)', options: ['never'], errors: UNEXPECTED_I},
    {code: 'f(a\n)', output: 'f(a,\n)', options: ['always'], errors: MISSING_I},
    {code: 'f(a\n)', output: 'f(a,\n)', options: ['always-multiline'], errors: MISSING_I},

    {code: 'f(...a)', output: 'f(...a,)', options: ['always'], errors: MISSING_SE},
    {code: 'f(...a,)', output: 'f(...a)', options: ['always-multiline'], errors: UNEXPECTED_SE},
    {code: 'f(...a,)', output: 'f(...a)', options: ['only-multiline'], errors: UNEXPECTED_SE},
    {code: 'f(...a,)', output: 'f(...a)', options: ['never'], errors: UNEXPECTED_SE},
    {code: 'f(...a,\n)', output: 'f(...a\n)', options: ['never'], errors: UNEXPECTED_SE},
    {code: 'f(...a\n)', output: 'f(...a,\n)', options: ['always'], errors: MISSING_SE},
    {code: 'f(...a\n)', output: 'f(...a,\n)', options: ['always-multiline'], errors: MISSING_SE},

    // NewExpression
    {code: 'new F(a)', output: 'new F(a,)', options: ['always'], errors: MISSING_I},
    {code: 'new F(a,)', output: 'new F(a)', options: ['always-multiline'], errors: UNEXPECTED_I},
    {code: 'new F(a,)', output: 'new F(a)', options: ['only-multiline'], errors: UNEXPECTED_I},
    {code: 'new F(a,)', output: 'new F(a)', options: ['never'], errors: UNEXPECTED_I},
    {code: 'new F(a,\n)', output: 'new F(a\n)', options: ['never'], errors: UNEXPECTED_I},
    {code: 'new F(a\n)', output: 'new F(a,\n)', options: ['always'], errors: MISSING_I},
    {code: 'new F(a\n)', output: 'new F(a,\n)', options: ['always-multiline'], errors: MISSING_I},

    {code: 'new F(...a)', output: 'new F(...a,)', options: ['always'], errors: MISSING_SE},
    {code: 'new F(...a,)', output: 'new F(...a)', options: ['always-multiline'], errors: UNEXPECTED_SE},
    {code: 'new F(...a,)', output: 'new F(...a)', options: ['only-multiline'], errors: UNEXPECTED_SE},
    {code: 'new F(...a,)', output: 'new F(...a)', options: ['never'], errors: UNEXPECTED_SE},
    {code: 'new F(...a,\n)', output: 'new F(...a\n)', options: ['never'], errors: UNEXPECTED_SE},
    {code: 'new F(...a\n)', output: 'new F(...a,\n)', options: ['always'], errors: MISSING_SE},
    {code: 'new F(...a\n)', output: 'new F(...a,\n)', options: ['always-multiline'], errors: MISSING_SE},
  ],
});
