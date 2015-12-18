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

suite("inference", function () {
  suite("baseTypeStrictlyMatches", function () {
    test("it should work with null", function () {
      var path = getPath("var x = null; x === null").get("body")[1].get("expression");
      var left = path.get("left");
      var right = path.get("right");
      var strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(strictMatch, "null should be equal to null");
    });

    test("it should work with numbers", function () {
      var path = getPath("var x = 1; x === 2").get("body")[1].get("expression");
      var left = path.get("left");
      var right = path.get("right");
      var strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(strictMatch, "null should be equal to null");
    });

    test("it should bail when type changes", function () {
      var path = getPath("var x = 1; if (foo) x = null;else x = 3; x === 2").get("body")[2].get("expression");
      var left = path.get("left");
      var right = path.get("right");

      var strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(!strictMatch, "type might change in if statement");
    });

    test("it should differentiate between null and undefined", function () {
      var path = getPath("var x; x === null").get("body")[1].get("expression");
      var left = path.get("left");
      var right = path.get("right");
      var strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(!strictMatch, "null should not match undefined");
    });
  });
});
