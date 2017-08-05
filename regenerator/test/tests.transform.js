var assert = require("assert");
var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var transform = require("..").transform;

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

context("functions", function() {
  var itMarksCorrectly = function(marked, varName) {
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
  };

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
      itMarksCorrectly(declarations[0], '_marked');

      // and has our function name as its first argument
      assert.strictEqual(declarations[0].init.arguments[0].name, 'foo');
    });

    it("should work with multiple functions", function() {
      var ast = recast.parse([
        'function* foo(){};',
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
      itMarksCorrectly(declarations[0], '_marked');
      n.Identifier.assert(declarations[0].init.arguments[0]);
      assert.strictEqual(declarations[0].init.arguments[0].name, 'foo');

      itMarksCorrectly(declarations[1], '_marked2');
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
      itMarksCorrectly(declarator, 'a');

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
      itMarksCorrectly(declarator, 'a');

      // and that our first argument is our original function expression
      n.FunctionExpression.assert(declarator.init.arguments[0]);
      assert.strictEqual(declarator.init.arguments[0].id.name, '_callee');
    });
  });
});
