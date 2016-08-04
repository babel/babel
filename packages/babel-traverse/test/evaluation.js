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

  test("should bail out on repeated evaluation", function () {
    assert.strictEqual(
      getPath("function fn(a) { var code = a; if (code >= 0 && code <= 1) { alert(); } }")
        .get("body.0.body.body.1.test").evaluate().confident,
      false
    );
  });

  test("should resolve variable to true", function () {
    assert.strictEqual(
      getPath("function fn() { var code = 1; if (code >= 0 && code <= 2) { alert(); } }")
        .get("body.0.body.body.1.test").evaluateTruthy(),
      true
    );
  });

  test("should resolve variable to false", function () {
    assert.strictEqual(
      getPath("function fn() { var code = 3; if (code >= 0 && code <= 2) { alert(); } }")
        .get("body.0.body.body.1.test").evaluateTruthy(),
      false
    );
  });
});
