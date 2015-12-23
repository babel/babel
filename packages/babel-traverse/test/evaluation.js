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
});
