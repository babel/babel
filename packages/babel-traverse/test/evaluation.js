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

suite("evaluation", function () {
  suite("evaluateTruthy", function () {
    test("it should work with null", function () {
      assert.strictEqual(
        getPath("false || a.length === 0;").get("body")[0].evaluateTruthy(),
        undefined
      );
    });

    test("it should not mistake lack of confidence for falsy", function () {
      assert.strictEqual(
        getPath("foo || 'bar'").get("body")[0].evaluate().value,
        undefined
      );
    });
  });

  test("should bail out on recursive evaluation", function () {
    assert.strictEqual(
      getPath("function fn(a) { var g = a ? 1 : 2, a = g * this.foo; }").get("body.0.body.body.0.declarations.1.init").evaluate().confident,
      false
    );
  });

  test("should work with repeated, indeterminate identifiers", function () {
    assert.strictEqual(
      getPath("var num = foo(); (num > 0 && num < 100);").get("body")[1].evaluateTruthy(),
      undefined
    );
  });

  test("should work with repeated, determinate identifiers", function () {
    assert.strictEqual(
      getPath("var num = 5; (num > 0 && num < 100);").get("body")[1].evaluateTruthy(),
      true
    );
  });

  test("should not be confident when var is redeclared in the same scope", function () {
    assert.strictEqual(
      getPath("var x = 2; var y = x + 2; { var x = 3 }").get("body.1.declarations.0.init").evaluate().confident,
      false
    );
  });
});
