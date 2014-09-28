var transform = require("../lib/6to5/transform");
var assert    = require("assert");

suite("errors", function () {
  test("syntax", function () {
    assert.throws(function () {
      transform.test([
        "arr.map(function () {",
        "  return $@!@#;",
        "});"
      ]);
    }, /Error: test: Line 2: Unexpected token ILLEGAL/);
  });
});
