require("../lib/api/node");

var buildExternalHelpers = require("../lib/tools/build-external-helpers");
var PluginManager        = require("../lib/transformation/file/plugin-manager");
var Transformer          = require("../lib/transformation/transformer");
var transform            = require("../lib/transformation");
var assert               = require("assert");
var File                 = require("../lib/transformation/file");

function assertIgnored(result) {
  assert.ok(result.ignored);
}

function assertNotIgnored(result) {
  assert.ok(!result.ignored);
}

suite("api", function () {
  test("code option false", function () {
    return transform("foo('bar');", { code: false }).then(function (result) {
      assert.ok(!result.code);
    });
  });

  test("ast option false", function () {
    return transform("foo('bar');", { ast: false }).then(function (result) {
      assert.ok(!result.ast);
    });
  });

  test("auxiliaryCommentBefore option", function () {
    return Promise.all([
      transform("class Foo {}", {
        auxiliaryCommentBefore: "foobar"
      }).then(function (result) {
        assert.ok(result.code.indexOf("foobar") >= 0);
      }),

      transform("for (let i in bar) { foo(function () { i; }); break; continue; }", {
        auxiliaryCommentBefore: "foobar"
      }).then(function (result) {
        assert.ok(result.code.indexOf("foobar") >= 0);
      })
    ]);
  });

  test("auxiliaryCommentAfter option", function () {
    return Promise.all([
      transform("class Foo {}", {
        auxiliaryCommentAfter: "foobar"
      }).then(function (result) {
        assert.ok(result.code.indexOf("foobar") >= 0);
      }),

      transform("for (let i in bar) { foo(function () { i; }); break; continue; }", {
        auxiliaryCommentAfter: "foobar"
      }).then(function (result) {
        assert.ok(result.code.indexOf("foobar") >= 0);
      })
    ]);
  });

  test("modules metadata", function () {
    return Promise.all([
      transform('import { externalName as localName } from "external";').then(function (result) {
        assert.deepEqual(result.metadata.modules.imports[0], {
          source: "external",
          imported: ["externalName"],
          specifiers: [{
            kind: "named",
            imported: "externalName",
            local: "localName"
          }]
        });
      }),

      transform('import * as localName2 from "external";').then(function (result) {
        assert.deepEqual(result.metadata.modules.imports[0], {
          source: "external",
          imported: ["*"],
          specifiers: [{
            kind: "namespace",
            local: "localName2"
          }]
        });
      }),

      transform('import localName3 from "external";').then(function (result) {
        assert.deepEqual(result.metadata.modules.imports[0], {
          source: "external",
          imported: ["default"],
          specifiers: [{
            kind: "named",
            imported: "default",
            local: "localName3"
          }]
        });
      }),

      transform('import localName from "./array";', {
        resolveModuleSource: function() {
          return "override-source";
        }
      }).then(function (result) {
        assert.deepEqual(result.metadata.modules.imports, [
          {
            source: "override-source",
            imported: ["default"],
            specifiers: [
              {
                "kind": "named",
                "imported": "default",
                "local": "localName"
              }
            ]
          }
        ]);
      }),

      transform('export * as externalName1 from "external";', {
        stage: 0
      }).then(function (result) {
         assert.deepEqual(result.metadata.modules.exports, {
          exported: ['externalName1'],
          specifiers: [{
            kind: "external-namespace",
            exported: "externalName1",
            source: "external",
          }]
        });
      }),

      transform('export externalName2 from "external";', {
        stage: 0
      }).then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: ["externalName2"],
          specifiers: [{
            kind: "external",
            local: "externalName2",
            exported: "externalName2",
            source: "external"
          }]
        });
      }),

      transform('export function namedFunction() {}').then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: ["namedFunction"],
          specifiers: [{
            kind: "local",
            local: "namedFunction",
            exported: "namedFunction"
          }]
        });
      }),

      transform('export var foo = "bar";').then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          "exported": ["foo"],
          specifiers: [{
            kind: "local",
            local: "foo",
            exported: "foo"
          }]
        });
      }),

      transform("export { localName as externalName3 };").then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: ["externalName3"],
          specifiers: [{
            kind: "local",
            local: "localName",
            exported: "externalName3"
          }]
        });
      }),

      transform('export { externalName4 } from "external";').then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: ["externalName4"],
          specifiers: [{
            kind: "external",
            local: "externalName4",
            exported: "externalName4",
            source: "external"
          }]
        });
      }),

      transform('export * from "external";').then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: [],
          specifiers: [{
            kind: "external-all",
            source: "external"
          }]
        });
      }),

      transform("export default function defaultFunction() {}").then(function (result) {
        assert.deepEqual(result.metadata.modules.exports, {
          exported: ["defaultFunction"],
          specifiers: [{
            kind: "local",
            local: "defaultFunction",
            exported: "default"
          }]
        });
      })
    ]);
  });

  test("ignore option", function () {
    return Promise.all([
      transform("", {
        ignore: "node_modules",
        filename: "/foo/node_modules/bar"
      }).then(assertIgnored),

      transform("", {
        ignore: "foo/node_modules",
        filename: "/foo/node_modules/bar"
      }).then(assertIgnored),

      transform("", {
        ignore: "foo/node_modules/*.bar",
        filename: "/foo/node_modules/foo.bar"
      }).then(assertIgnored)
    ]);
  });

  test("only option", function () {
    return Promise.all([
      transform("", {
        only: "node_modules",
        filename: "/foo/node_modules/bar"
      }).then(assertNotIgnored),

      transform("", {
        only: "foo/node_modules",
        filename: "/foo/node_modules/bar"
      }).then(assertNotIgnored),

      transform("", {
        only: "foo/node_modules/*.bar",
        filename: "/foo/node_modules/foo.bar"
      }).then(assertNotIgnored),

      transform("", {
        only: "node_modules",
        filename: "/foo/node_module/bar"
      }).then(assertIgnored),

      transform("", {
        only: "foo/node_modules",
        filename: "/bar/node_modules/foo"
      }).then(assertIgnored),

      transform("", {
        only: "foo/node_modules/*.bar",
        filename: "/foo/node_modules/bar.foo"
      }).then(assertIgnored)
    ])
  });

  suite("getModuleId option", function () {
    // As of this commit, `getModuleId` is the only option that isn't JSON
    // compatible which is why it's not inside /test/core/fixtures/transformation

    function getModuleNameTest(moduleFormat, expected) {
      return transform("foo('bar');", {
        filename: "/foo/bar/index",
        modules: moduleFormat,
        moduleIds: true,
        getModuleId: function (name) {
          return name.replace(/\/index$/, "");
        }
      }).then(function (result) {
        assert.equal(result.code, expected);
      });
    }

    test("amd", function () {
      var expected = [
        "define('/foo/bar', ['exports'], function (exports) {",
        "  'use strict';",
        "",
        "  foo('bar');",
        "});"
      ].join("\n");

      return getModuleNameTest("amd", expected);
    });

    test("umd", function () {
      var expected = [
        "(function (global, factory) {",
        "  if (typeof define === 'function' && define.amd) {",
        "    define('/foo/bar', ['exports'], factory);",
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

      return getModuleNameTest("umd", expected);
    });

    test("system", function () {
      var expected = [
        "System.register('/foo/bar', [], function (_export) {",
        "  'use strict';",
        "",
        "  return {",
        "    setters: [],",
        "    execute: function () {",
        "      foo('bar');",
        "    }",
        "  };",
        "});",
      ].join("\n");

      return getModuleNameTest("system", expected);
    });
  });

  suite("env option", function () {
    var oldBabelEnv = process.env.BABEL_ENV;
    var oldNodeEnv = process.env.NODE_ENV;

    before(function () {
      delete process.env.BABEL_ENV;
      delete process.env.NODE_ENV;
    });

    after(function () {
      process.env.BABEL_ENV = oldBabelEnv;
      process.env.NODE_ENV = oldNodeEnv;
    });

    test("default", function () {
      return transform("foo;", {
        env: {
          development: { blacklist: "strict" }
        }
      }).then(function (result) {
        assert.equal(result.code, "foo;");
      });
    });

    test("BABEL_ENV", function () {
      process.env.BABEL_ENV = "foo";
      return transform("foo;", {
        env: {
          foo: { blacklist: "strict" }
        }
      }).then(function (result) {
        assert.equal(result.code, "foo;");
      });
    });

    test("NODE_ENV", function () {
      process.env.NODE_ENV = "foo";
      return transform("foo;", {
        env: {
          foo: { blacklist: "strict" }
        }
      }).then(function (result) {
        assert.equal(result.code, "foo;");
      });
    });
  });

  test("addHelper unknown", function () {
    var file = new File({}, transform.pipeline);
    assert.throws(function () {
      file.addHelper("foob");
    }, /Unknown helper foob/);
  });

  test("resolveModuleSource option", function () {
    var actual = 'import foo from "foo-import-default";\nimport "foo-import-bare";\nexport { foo } from "foo-export-named";';
    var expected = 'import foo from "resolved/foo-import-default";\nimport "resolved/foo-import-bare";\nexport { foo } from "resolved/foo-export-named";';

    return transform(actual, {
      blacklist: ["es6.modules", "strict"],
      resolveModuleSource: function (originalSource) {
        return "resolved/" + originalSource;
      }
    }).then(function (result) {
      assert.equal(result.code.trim(), expected);
    });
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
      }, /didn't export a Plugin instance/);

      assert.throws(function () {
        new PluginManager().validate("foobar", "");
      }, /didn't export a Plugin instance/);

      assert.throws(function () {
        new PluginManager().validate("foobar", []);
      }, /didn't export a Plugin instance/);
    });

    test("object request");

    test("string request");

    test("transformer request");
  });
});
