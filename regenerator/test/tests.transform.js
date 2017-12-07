/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");
var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var transform = require("..").transform;
var compile = require("..").compile;

var UglifyJS = require("uglify-js");

describe("_blockHoist nodes", function() {
  it("should be hoisted to the outer body", function() {
    var foo;
    var names = [];
    var ast = recast.parse([
      "function *foo(doNotHoistMe, hoistMe) {",
      "  var sent = yield doNotHoistMe();",
      "  hoistMe();",
      "  names.push(sent);",
      "  return 123;",
      "}"
    ].join("\n"), {
      parser: require("babylon")
    });

    var hoistMeStmt = ast.program.body[0].body.body[1];
    n.ExpressionStatement.assert(hoistMeStmt);
    n.CallExpression.assert(hoistMeStmt.expression);
    n.Identifier.assert(hoistMeStmt.expression.callee);
    assert.strictEqual(hoistMeStmt.expression.callee.name, "hoistMe");

    hoistMeStmt._blockHoist = 1;

    eval(recast.print(transform(ast)).code);

    assert.strictEqual(typeof foo, "function");
    assert.ok(regeneratorRuntime.isGeneratorFunction(foo));
    assert.strictEqual(names.length, 0);

    var g = foo(function doNotHoistMe() {
      names.push("doNotHoistMe");
      return "yielded";
    }, function hoistMe() {
      names.push("hoistMe");
    });

    assert.deepEqual(names, ["hoistMe"]);
    assert.deepEqual(g.next(), { value: "yielded", done: false });
    assert.deepEqual(names, ["hoistMe", "doNotHoistMe"]);
    assert.deepEqual(g.next("oyez"), { value: 123, done: true });
    assert.deepEqual(names, ["hoistMe", "doNotHoistMe", "oyez"]);
  });
});

describe("uglifyjs dead code removal", function() {
  function uglifyAndParse(file1, file2) {
    var code = {
      "file1.js": file1,
      "file2.js": file2
    };

    var options = {
      toplevel: true,
      // don't mangle function or variable names so we can find them
      mangle: false,
      output: {
        // make it easier to parse the output
        beautify: true
      }
    };

    // uglify our code
    var result = UglifyJS.minify(code, options);

    // parse and return the output
    return recast.parse(result.code, {
      parser: require("babylon")
    });
  }

  it("works with function expressions", function() {
    var file1 = compile([
      'var foo = function* () {};',
      'var bar = function* () {};'
    ].join("\n")).code;
    var file2 = compile('console.log(foo());').code;

    var ast = uglifyAndParse(file1, file2);

    // the results should have a single variable declaration
    var variableDeclarations = ast.program.body.filter(function(b) {
      return b.type === 'VariableDeclaration';
    });
    assert.strictEqual(variableDeclarations.length, 1);
    assert.strictEqual(variableDeclarations[0].declarations.length, 1);
    var declaration = variableDeclarations[0].declarations[0];

    // named foo
    assert.strictEqual(declaration.id.name, 'foo');
  });

  it("works with function declarations", function() {
    var file1 = compile([
      'function* foo() {};',
      'function* bar() {};'
    ].join("\n")).code;

    var file2 = compile('console.log(foo());').code;

    var ast = uglifyAndParse(file1, file2);

    // the results should have our foo() function
    assert.ok(ast.program.body.some(function(b) {
      return b.type === 'FunctionDeclaration' && b.id.name === 'foo';
    }));

    // but not our bar() function
    assert.ok(!ast.program.body.some(function(b) {
      return b.type === 'FunctionDeclaration' && b.id.name === 'bar';
    }));

    // and a single mark declaration
    var variableDeclarations = ast.program.body.filter(function(b) {
      return b.type === 'VariableDeclaration';
    });
    assert.strictEqual(variableDeclarations.length, 1);
    var declarations = variableDeclarations[0].declarations;
    assert.strictEqual(declarations.length, 1);
    var declaration = declarations[0];

    // with our function name as an argument'
    assert.strictEqual(declaration.init.arguments.length, 1);
    assert.strictEqual(declaration.init.arguments[0].name, 'foo');
  });
})

context("functions", function() {
  function marksCorrectly(marked, varName) {
    // marked should be a VariableDeclarator
    n.VariableDeclarator.assert(marked);

    // using our variable name
    assert.strictEqual(marked.id.name, varName);

    // assiging a call expression to regeneratorRuntime.mark()
    n.CallExpression.assert(marked.init);
    assert.strictEqual(marked.init.callee.object.name, 'regeneratorRuntime')
    assert.strictEqual(marked.init.callee.property.name, 'mark')

    // with said call expression marked as a pure function
    assert.strictEqual(marked.init.leadingComments[0].value, '#__PURE__');
  }

  describe("function declarations", function() {
    it("should work with a single function", function() {
      var ast = recast.parse('function* foo(){};', {
        parser: require("babylon")
      });

      // get our declarations
      const declaration = transform(ast).program.body[0];
      n.VariableDeclaration.assert(declaration);
      const declarations = declaration.declarations;

      // verify our declaration is marked correctly
      marksCorrectly(declarations[0], '_marked');

      // and has our function name as its first argument
      assert.strictEqual(declarations[0].init.arguments[0].name, 'foo');
    });

    it("should work with multiple functions", function() {
      var ast = recast.parse([
        'function* foo() {};',
        'function* bar() {};'
      ].join("\n"), {
        parser: require("babylon")
      });

      // get our declarations
      const declaration = transform(ast).program.body[0];
      n.VariableDeclaration.assert(declaration);
      const declarations = declaration.declarations;

      // verify our declarations are marked correctly and have our function name
      // as their first argument
      marksCorrectly(declarations[0], '_marked');
      n.Identifier.assert(declarations[0].init.arguments[0]);
      assert.strictEqual(declarations[0].init.arguments[0].name, 'foo');

      marksCorrectly(declarations[1], '_marked2');
      n.Identifier.assert(declarations[1].init.arguments[0]);
      assert.strictEqual(declarations[1].init.arguments[0].name, 'bar');
    });
  });

  describe("function expressions", function() {
    it("should work with a named function", function() {
      var ast = recast.parse('var a = function* foo(){};', {
        parser: require("babylon")
      });

      // get our declarations
      const declaration = transform(ast).program.body[0];
      n.VariableDeclaration.assert(declaration);
      const declarator = declaration.declarations[0];

      // verify our declaration is marked correctly
      marksCorrectly(declarator, 'a');

      // and that our first argument is our original function expression
      n.FunctionExpression.assert(declarator.init.arguments[0]);
      assert.strictEqual(declarator.init.arguments[0].id.name, 'foo');
    });

    it("should work with an anonymous function", function() {
      var ast = recast.parse('var a = function* (){};', {
        parser: require("babylon")
      });

      // get our declarations
      const declaration = transform(ast).program.body[0];
      n.VariableDeclaration.assert(declaration);
      const declarator = declaration.declarations[0];

      // verify our declaration is marked correctly
      marksCorrectly(declarator, 'a');

      // and that our first argument is our original function expression
      n.FunctionExpression.assert(declarator.init.arguments[0]);
      assert.strictEqual(declarator.init.arguments[0].id.name, '_callee');
    });
  });
});
