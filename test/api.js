var transform = require("../lib/6to5/transformation");
var assert    = require("assert");
var File      = require("../lib/6to5/file");

suite("api", function () {
  test("{ code: false }", function () {
    var result = transform("foo('bar');", { code: false });
    assert.ok(!result.code);
  });

  test("{ ast: false }", function () {
    var result = transform("foo('bar');", { ast: false });
    assert.ok(!result.ast);
  });

  test("addHelper unknown", function () {
    var file = new File;
    assert.throws(function () {
      file.addHelper("foob");
    }, /unknown declaration foob/);
  });
});
