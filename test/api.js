var buildExternalHelpers = require("../lib/babel/build-external-helpers");
var transform            = require("../lib/babel/transformation");
var assert               = require("assert");
var File                 = require("../lib/babel/transformation/file");

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
    }, /Unknown helper foob/);
  });

  suite("buildExternalHelpers", function () {
    test("all", function () {
      var script = buildExternalHelpers();
      assert.ok(script.indexOf("classCallCheck") >= -1);
      assert.ok(script.indexOf("inherits") >= 0);
    });

    test("whitelist", function () {
      var script = buildExternalHelpers(["inherits"]);
      assert.ok(script.indexOf("classCallCheck") === -1);
      assert.ok(script.indexOf("inherits") >= 0);
    });
  });
});
