var transform = require("../lib/6to5/transformation/transform");
var assert    = require("assert");
var File      = require("../lib/6to5/file");

suite("api", function () {
  test("{ code: false }", function () {
    var result = transform("foo('bar');", { code: false });
    assert.ok(!result.code);
  });

  test("addDeclaration unknown", function () {
    var file = new File;
    assert.throws(function () {
      file.addDeclaration("foob");
    }, /unknown declaration foob/);
  });
});
