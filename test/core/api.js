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

  suite("getModuleId() {} option", function () {
    // As of this commit, `getModuleId` is the only option that isn't JSON
    // compatible which is why it's not inside /test/core/fixtures/transformation

    function getModuleNameTest(moduleFormat, expected) {
      var result = transform("foo('bar');", {
        filename: "foo/bar/index",
        modules: moduleFormat,
        moduleIds: true,
        getModuleId: function (name) {
          return name.replace(/\/index$/, "");
        }
      });

      assert.equal(result.code, expected);
    }

    test("{ modules: \"amd\" }", function () {
      var expected = [
        "define('foo/bar', ['exports'], function (exports) {",
        "  'use strict';",
        "",
        "  foo('bar');",
        "});"
      ].join("\n");

      getModuleNameTest("amd", expected);
    });

    test("{ modules: \"umd\" }", function () {
      var expected = [
        "(function (global, factory) {",
        "  if (typeof define === 'function' && define.amd) {",
        "    define('foo/bar', ['exports'], factory);",
        "  } else if (typeof exports !== 'undefined') {",
        "    factory(exports);",
        "  } else {",
        "    var mod = {",
        "      exports: {}",
        "    };",
        "    factory(mod.exports);",
        "    global.fooBar = mod.exports;",
        "  }",
        "})(this, function (exports) {",
        "  'use strict';",
        "",
        "  foo('bar');",
        "});",
      ].join("\n");

      getModuleNameTest("umd", expected);
    });

    test("{ modules: \"system\" }", function () {
      var expected = [
        "System.register('foo/bar', [], function (_export) {",
        "  return {",
        "    setters: [],",
        "    execute: function () {",
        "      'use strict';",
        "",
        "      foo('bar');",
        "    }",
        "  };",
        "});",
      ].join("\n");

      getModuleNameTest("system", expected);
    });
  });

  test("addHelper unknown", function () {
    var file = new File({}, transform.pipeline);
    assert.throws(function () {
      file.addHelper("foob");
    }, /Unknown helper foob/);
  });

  test("resolveModuleSource", function () {
    var actual = 'import foo from "foo-import-default";\nimport "foo-import-bare";\nexport { foo } from "foo-export-named";';
    var expected = 'import foo from "resolved/foo-import-default";\nimport "resolved/foo-import-bare";\nexport { foo } from "resolved/foo-export-named";';

    actual = transform(actual, {
      blacklist: ["es6.modules", "strict"],
      resolveModuleSource: function (originalSource) {
        return "resolved/" + originalSource;
      }
    }).code.trim();

    assert.equal(actual, expected);
  });

  test("extra options", function () {
    var file1 = new File({ extra: { foo: "bar" } }, transform.pipeline);
    assert.equal(file1.opts.extra.foo, "bar");

    var file2 = new File({}, transform.pipeline);
    var file3 = new File({}, transform.pipeline);
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
