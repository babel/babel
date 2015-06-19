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


eslintTester.addRuleTest('rules/generator-star-spacing', {
  valid: [
      ok('var test = async function(){}'),
      ok('async function test(){}'),
      ok('var test = async function *(){}'),
      ok('async function *test(){}', [1, "before"]) ,
      ok('async function* test(){}', [1, "after"]),
      ok('async function * test(){}', [1, "both"]),
      ok('async function*test(){}', [1, "neither"]),
      {
          code: "function foo(){}"
      },
      {
          code: "function *foo(){}",
          ecmaFeatures: { generators: true }
      },
      {
          code: "function *foo(arg1, arg2){}",
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function *foo(){};",
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function *(){};",
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function * (){};",
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = { *foo(){} };",
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "var foo = {*foo(){} };",
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "class Foo { *foo(){} }",
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo {*foo(){} }",
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { static *foo(){} }",
          ecmaFeatures: { classes: true, generators: true }
      },

      // "before"
      {
          code: "function foo(){}",
          args: [2, "before"]
      },
      {
          code: "function *foo(){}",
          args: [2, "before"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "function *foo(arg1, arg2){}",
          args: [2, "before"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function *foo(){};",
          args: [2, "before"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function *(){};",
          args: [2, "before"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function * (){};",
          args: [2, "before"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = { *foo(){} };",
          args: [2, "before"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "var foo = {*foo(){} };",
          args: [2, "before"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "class Foo { *foo(){} }",
          args: [2, "before"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo {*foo(){} }",
          args: [2, "before"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { static *foo(){} }",
          args: [2, "before"],
          ecmaFeatures: { classes: true, generators: true }
      },

      // "after"
      {
          code: "function foo(){}",
          args: [2, "after"]
      },
      {
          code: "function* foo(){}",
          args: [2, "after"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "function* foo(arg1, arg2){}",
          args: [2, "after"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function* foo(){};",
          args: [2, "after"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function* (){};",
          args: [2, "after"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function*(){};",
          args: [2, "after"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = {* foo(){} };",
          args: [2, "after"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "var foo = { * foo(){} };",
          args: [2, "after"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "class Foo {* foo(){} }",
          args: [2, "after"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { * foo(){} }",
          args: [2, "after"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { static* foo(){} }",
          args: [2, "after"],
          ecmaFeatures: { classes: true, generators: true }
      },

      // "both"
      {
          code: "function foo(){}",
          args: [2, "both"]
      },
      {
          code: "function * foo(){}",
          args: [2, "both"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "function * foo(arg1, arg2){}",
          args: [2, "both"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function * foo(){};",
          args: [2, "both"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function * (){};",
          args: [2, "both"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function *(){};",
          args: [2, "both"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = { * foo(){} };",
          args: [2, "both"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "var foo = {* foo(){} };",
          args: [2, "both"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "class Foo { * foo(){} }",
          args: [2, "both"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo {* foo(){} }",
          args: [2, "both"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { static * foo(){} }",
          args: [2, "both"],
          ecmaFeatures: { classes: true, generators: true }
      },

      // "neither"
      {
          code: "function foo(){}",
          args: [2, "neither"]
      },
      {
          code: "function*foo(){}",
          args: [2, "neither"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "function*foo(arg1, arg2){}",
          args: [2, "neither"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function*foo(){};",
          args: [2, "neither"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function*(){};",
          args: [2, "neither"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = function* (){};",
          args: [2, "neither"],
          ecmaFeatures: { generators: true }
      },
      {
          code: "var foo = {*foo(){} };",
          args: [2, "neither"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "var foo = { *foo(){} };",
          args: [2, "neither"],
          ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true }
      },
      {
          code: "class Foo {*foo(){} }",
          args: [2, "neither"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { *foo(){} }",
          args: [2, "neither"],
          ecmaFeatures: { classes: true, generators: true }
      },
      {
          code: "class Foo { static*foo(){} }",
          args: [2, "neither"],
          ecmaFeatures: { classes: true, generators: true }
      }

    ],

    invalid: [
        // Default ("before")
        err('async function*test(){}', [
          { message: 'Missing space before *.' },
        ]),
        err('async function* test(){}', [
          {
              message: "Missing space before *.",
              type: "Punctuator"
          }, {
              message: "Unexpected space after *.",
              type: "Punctuator"
          }
        ]),

        {
            code: "function*foo(){}",
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "function* foo(arg1, arg2){}",
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function*foo(){};",
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function* (){};",
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = {* foo(){} };",
            ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo {* foo(){} }",
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { static* foo(){} }",
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },

        // "before"
        {
            code: "function*foo(){}",
            args: [2, "before"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "function* foo(arg1, arg2){}",
            args: [2, "before"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function*foo(){};",
            args: [2, "before"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function* (){};",
            args: [2, "before"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = {* foo(){} };",
            args: [2, "before"],
            ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo {* foo(){} }",
            args: [2, "before"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },

        // "after"
        {
            code: "function*foo(){}",
            args: [2, "after"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "function *foo(arg1, arg2){}",
            args: [2, "after"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function *foo(){};",
            args: [2, "after"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function *(){};",
            args: [2, "after"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = { *foo(){} };",
            args: [2, "after"],
            ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true },
            errors: [{
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { *foo(){} }",
            args: [2, "after"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { static *foo(){} }",
            args: [2, "after"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },

        // "both"
        {
            code: "function*foo(){}",
            args: [2, "both"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "function*foo(arg1, arg2){}",
            args: [2, "both"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function*foo(){};",
            args: [2, "both"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function*(){};",
            args: [2, "both"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = {*foo(){} };",
            args: [2, "both"],
            ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true },
            errors: [{
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo {*foo(){} }",
            args: [2, "both"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { static*foo(){} }",
            args: [2, "both"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Missing space before *.",
                type: "Punctuator"
            }, {
                message: "Missing space after *.",
                type: "Punctuator"
            }]
        },

        // "neither"
        {
            code: "function * foo(){}",
            args: [2, "neither"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "function * foo(arg1, arg2){}",
            args: [2, "neither"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function * foo(){};",
            args: [2, "neither"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = function * (){};",
            args: [2, "neither"],
            ecmaFeatures: { generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }]
        },
        {
            code: "var foo = { * foo(){} };",
            args: [2, "neither"],
            ecmaFeatures: { generators: true, objectLiteralShorthandMethods: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { * foo(){} }",
            args: [2, "neither"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        },
        {
            code: "class Foo { static * foo(){} }",
            args: [2, "neither"],
            ecmaFeatures: { classes: true, generators: true },
            errors: [{
                message: "Unexpected space before *.",
                type: "Punctuator"
            }, {
                message: "Unexpected space after *.",
                type: "Punctuator"
            }]
        }

    ]
});