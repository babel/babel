require("../../lib/babel/api/node");

var buildExternalHelpers = require("../../lib/babel/tools/build-external-helpers");
var PluginManager        = require("../../lib/babel/transformation/file/plugin-manager");
var Transformer          = require("../../lib/babel/transformation/transformer");
var transform            = require("../../lib/babel/transformation");
var assert               = require("assert");
var File                 = require("../../lib/babel/transformation/file");

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

  test("extra options", function () {
    var file1 = new File({ extra: { foo: "bar" } });
    assert.equal(file1.opts.extra.foo, "bar");

    var file2 = new File;
    var file3 = new File;
    assert.ok(file2.opts.extra !== file3.opts.extra);
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

    test("empty whitelist", function () {
      var script = buildExternalHelpers([]);
      assert.ok(script.indexOf("classCallCheck") === -1);
      assert.ok(script.indexOf("inherits") === -1);
    });
  });

  suite("plugins", function () {
    test("unknown plugin", function () {
      assert.throws(function () {
        new PluginManager().subnormaliseString("foo bar");
      }, /Unknown plugin/);
    });

    test("key collision", function () {
      assert.throws(function () {
        new PluginManager({
          transformers: { "es6.arrowFunctions": true }
        }).validate("foobar", { key: "es6.arrowFunctions" });
      }, /collides with another/);
    });

    test("not transformer", function () {
      assert.throws(function () {
        new PluginManager().validate("foobar", {});
      }, /didn't export a Transformer instance/);

      assert.throws(function () {
        new PluginManager().validate("foobar", "");
      }, /didn't export a Transformer instance/);

      assert.throws(function () {
        new PluginManager().validate("foobar", []);
      }, /didn't export a Transformer instance/);
    });

    test("object request");

    test("string request");

    test("transformer request");
  });
});
