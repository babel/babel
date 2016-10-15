let traverse = require("../lib").default;
let assert = require("assert");
let parse = require("babylon").parse;

function getPath(code) {
  let ast = parse(code);
  let path;
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
      let path = getPath("var x = null; x === null").get("body")[1].get("expression");
      let left = path.get("left");
      let right = path.get("right");
      let strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(strictMatch, "null should be equal to null");
    });

    test("it should work with numbers", function () {
      let path = getPath("var x = 1; x === 2").get("body")[1].get("expression");
      let left = path.get("left");
      let right = path.get("right");
      let strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(strictMatch, "null should be equal to null");
    });

    test("it should bail when type changes", function () {
      let path = getPath("var x = 1; if (foo) x = null;else x = 3; x === 2").get("body")[2].get("expression");
      let left = path.get("left");
      let right = path.get("right");

      let strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(!strictMatch, "type might change in if statement");
    });

    test("it should differentiate between null and undefined", function () {
      let path = getPath("var x; x === null").get("body")[1].get("expression");
      let left = path.get("left");
      let right = path.get("right");
      let strictMatch = left.baseTypeStrictlyMatches(right);

      assert.ok(!strictMatch, "null should not match undefined");
    });
  });
});
