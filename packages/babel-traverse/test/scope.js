var traverse = require("../lib").default;
var assert = require("assert");
var parse = require("babylon").parse;

function getPath(code) {
  var ast = parse(code);
  var path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    }
  });
  return path;
}

suite("scope", function () {
  suite("binding paths", function () {
    test("function declaration id", function () {
      assert.ok(getPath("function foo() {}").scope.getBinding("foo").path.type === "FunctionDeclaration");
    });

    test("function expression id", function () {
      assert.ok(getPath("(function foo() {})").get("body")[0].get("expression").scope.getBinding("foo").path.type === "FunctionExpression");
    });

    test("function param", function () {
      assert.ok(getPath("(function (foo) {})").get("body")[0].get("expression").scope.getBinding("foo").path.type === "Identifier");
    });

    test("variable declaration", function () {
      assert.ok(getPath("var foo = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var { foo } = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var [ foo ] = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var { bar: [ foo ] } = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
    });

    test("purity", function () {
      assert.ok(getPath("({ x: 1 })").get("body")[0].get("expression").isPure());
    });
  });
});
