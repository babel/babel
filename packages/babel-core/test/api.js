import * as babel from "../lib/index";
import sourceMap from "source-map";
import assert from "assert";
import path from "path";
import Plugin from "../lib/config/plugin";
import generator from "@babel/generator";

function assertIgnored(result) {
  assert.ok(!result);
}

function assertNotIgnored(result) {
  assert.ok(!result.ignored);
}

// shim
function transformAsync(code, opts) {
  return {
    then: function(resolve) {
      resolve(babel.transform(code, opts));
    },
  };
}

describe("parser and generator options", function() {
  const recast = {
    parse: function(code, opts) {
      return opts.parser.parse(code);
    },
    print: function(ast) {
      return generator(ast);
    },
  };

  function newTransform(string) {
    return babel.transform(string, {
      parserOpts: {
        parser: recast.parse,
        plugins: ["flow"],
        allowImportExportEverywhere: true,
      },
      generatorOpts: {
        generator: recast.print,
      },
    });
  }

  it("options", function() {
    const string = "original;";
    assert.deepEqual(newTransform(string).ast, babel.transform(string).ast);
    assert.equal(newTransform(string).code, string);
  });

  it("experimental syntax", function() {
    const experimental = "var a: number = 1;";

    assert.deepEqual(
      newTransform(experimental).ast,
      babel.transform(experimental, {
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    assert.equal(newTransform(experimental).code, experimental);

    function newTransformWithPlugins(string) {
      return babel.transform(string, {
        plugins: [__dirname + "/../../babel-plugin-syntax-flow"],
        parserOpts: {
          parser: recast.parse,
        },
        generatorOpts: {
          generator: recast.print,
        },
      });
    }

    assert.deepEqual(
      newTransformWithPlugins(experimental).ast,
      babel.transform(experimental, {
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    assert.equal(newTransformWithPlugins(experimental).code, experimental);
  });

  it("other options", function() {
    const experimental = "if (true) {\n  import a from 'a';\n}";

    assert.notEqual(
      newTransform(experimental).ast,
      babel.transform(experimental, {
        parserOpts: {
          allowImportExportEverywhere: true,
        },
      }).ast,
    );
    assert.equal(newTransform(experimental).code, experimental);
  });
});

describe("api", function() {
  it("exposes the resolvePlugin method", function() {
    assert.throws(
      () => babel.resolvePlugin("nonexistent-plugin"),
      /Cannot find module 'babel-plugin-nonexistent-plugin'/,
    );
  });

  it("exposes the resolvePreset method", function() {
    assert.throws(
      () => babel.resolvePreset("nonexistent-preset"),
      /Cannot find module 'babel-preset-nonexistent-preset'/,
    );
  });

  it("transformFile", function(done) {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    babel.transformFile(__dirname + "/fixtures/api/file.js", options, function(
      err,
      res,
    ) {
      if (err) return done(err);
      assert.equal(res.code, "foo();");
      // keep user options untouched
      assert.deepEqual(options, { babelrc: false });
      done();
    });
  });

  it("transformFileSync", function() {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    assert.equal(
      babel.transformFileSync(__dirname + "/fixtures/api/file.js", options)
        .code,
      "foo();",
    );
    assert.deepEqual(options, { babelrc: false });
  });

  it("options throw on falsy true", function() {
    return assert.throws(function() {
      babel.transform("", {
        plugins: [__dirname + "/../../babel-plugin-syntax-jsx", false],
      });
    }, /.plugins\[1\] must be a string, object, function/);
  });

  it("options merge backwards", function() {
    return transformAsync("", {
      presets: [__dirname + "/../../babel-preset-es2015"],
      plugins: [__dirname + "/../../babel-plugin-syntax-jsx"],
    }).then(function(result) {
      assert.ok(
        result.options.plugins[0].manipulateOptions.toString().indexOf("jsx") >=
          0,
      );
    });
  });

  it("option wrapPluginVisitorMethod", function() {
    let calledRaw = 0;
    let calledIntercept = 0;

    babel.transform("function foo() { bar(foobar); }", {
      wrapPluginVisitorMethod: function(pluginAlias, visitorType, callback) {
        if (pluginAlias !== "foobar") {
          return callback;
        }

        assert.equal(visitorType, "enter");

        return function() {
          calledIntercept++;
          return callback.apply(this, arguments);
        };
      },

      plugins: [
        new Plugin({
          name: "foobar",
          visitor: {
            "Program|Identifier": function() {
              calledRaw++;
            },
          },
        }),
      ],
    });

    assert.equal(calledRaw, 4);
    assert.equal(calledIntercept, 4);
  });

  it("pass per preset", function() {
    let aliasBaseType = null;

    function execTest(passPerPreset) {
      return babel.transform("type Foo = number; let x = (y): Foo => y;", {
        passPerPreset: passPerPreset,
        presets: [
          // First preset with our plugin, "before"
          function() {
            return {
              plugins: [
                new Plugin({
                  visitor: {
                    Function: function(path) {
                      const alias = path.scope
                        .getProgramParent()
                        .path.get("body")[0].node;
                      if (!babel.types.isTypeAlias(alias)) return;

                      // In case of `passPerPreset` being `false`, the
                      // alias node is already removed by Flow plugin.
                      if (!alias) {
                        return;
                      }

                      // In case of `passPerPreset` being `true`, the
                      // alias node should still exist.
                      aliasBaseType = alias.right.type; // NumberTypeAnnotation
                    },
                  },
                }),
              ],
            };
          },

          // ES2015 preset
          require(__dirname + "/../../babel-preset-es2015"),

          // Third preset for Flow.
          function() {
            return {
              plugins: [
                require(__dirname + "/../../babel-plugin-syntax-flow"),
                require(__dirname +
                  "/../../babel-plugin-transform-flow-strip-types"),
              ],
            };
          },
        ],
      });
    }

    // 1. passPerPreset: true

    let result = execTest(true);

    assert.equal(aliasBaseType, "NumberTypeAnnotation");

    assert.deepEqual(result.code, "var x = function x(y) {\n  return y;\n};");

    // 2. passPerPreset: false

    aliasBaseType = null;

    result = execTest(false);

    assert.equal(aliasBaseType, null);

    assert.deepEqual(result.code, "var x = function x(y) {\n  return y;\n};");
  });

  it("complex plugin and preset ordering", function() {
    function pushPlugin(str) {
      return {
        visitor: {
          Program(path) {
            path.pushContainer(
              "body",
              babel.types.expressionStatement(babel.types.identifier(str)),
            );
          },
        },
      };
    }

    function pushPreset(str) {
      return { plugins: [pushPlugin(str)] };
    }

    const result = babel.transform("", {
      filename: path.join(
        __dirname,
        "fixtures",
        "config",
        "complex-plugin-config",
        "file.js",
      ),
      presets: [pushPreset("argone"), pushPreset("argtwo")],
      env: {
        development: {
          passPerPreset: true,
          presets: [pushPreset("argthree"), pushPreset("argfour")],
        },
      },
    });

    assert.equal(
      result.code,
      [
        "thirteen;",
        "fourteen;",
        "seventeen;",
        "eighteen;",
        "one;",
        "two;",
        "eleven;",
        "twelve;",
        "argtwo;",
        "argone;",
        "five;",
        "six;",
        "three;",
        "four;",
        "nineteen;",
        "twenty;",
        "fifteen;",
        "sixteen;",
        "seven;",
        "eight;",
        "nine;",
        "ten;",
        "argthree;",
        "argfour;",
      ].join("\n"),
    );
  });

  it("source map merging", function() {
    const result = babel.transform(
      [
        /* eslint-disable max-len */
        'function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }',
        "",
        "let Foo = function Foo() {",
        "  _classCallCheck(this, Foo);",
        "};",
        "",
        "//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZG91dCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFNLEdBQUcsWUFBSCxHQUFHO3dCQUFILEdBQUciLCJmaWxlIjoidW5kZWZpbmVkIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRm9vIHt9XG4iXX0=",
        /* eslint-enable max-len */
      ].join("\n"),
      {
        sourceMap: true,
      },
    );

    assert.deepEqual(
      [
        "function _classCallCheck(instance, Constructor) {",
        "  if (!(instance instanceof Constructor)) {",
        '    throw new TypeError("Cannot call a class as a function");',
        "  }",
        "}",
        "",
        "let Foo = function Foo() {",
        "  _classCallCheck(this, Foo);",
        "};",
      ].join("\n"),
      result.code,
    );

    const consumer = new sourceMap.SourceMapConsumer(result.map);

    assert.deepEqual(
      consumer.originalPositionFor({
        line: 7,
        column: 4,
      }),
      {
        name: null,
        source: "stdout",
        line: 1,
        column: 6,
      },
    );
  });

  it("code option false", function() {
    return transformAsync("foo('bar');", { code: false }).then(function(
      result,
    ) {
      assert.ok(!result.code);
    });
  });

  it("ast option false", function() {
    return transformAsync("foo('bar');", { ast: false }).then(function(result) {
      assert.ok(!result.ast);
    });
  });

  it("auxiliaryComment option", function() {
    return transformAsync("class Foo {}", {
      auxiliaryCommentBefore: "before",
      auxiliaryCommentAfter: "after",
      plugins: [
        function(babel) {
          const t = babel.types;
          return {
            visitor: {
              Program: function(path) {
                path.unshiftContainer(
                  "body",
                  t.expressionStatement(t.identifier("start")),
                );
                path.pushContainer(
                  "body",
                  t.expressionStatement(t.identifier("end")),
                );
              },
            },
          };
        },
      ],
    }).then(function(result) {
      assert.equal(
        result.code,
        "/*before*/\nstart;\n\n/*after*/\nclass Foo {}\n\n/*before*/\nend;\n\n/*after*/",
      );
    });
  });

  it("ignore option", function() {
    return Promise.all([
      transformAsync("", {
        ignore: ["/foo"],
        filename: "/foo/node_modules/bar",
      }).then(assertIgnored),

      transformAsync("", {
        ignore: ["/foo/node_modules"],
        filename: "/foo/node_modules/bar",
      }).then(assertIgnored),

      transformAsync("", {
        ignore: ["/foo/node_modules/*"],
        filename: "/foo/node_modules/bar",
      }).then(assertIgnored),

      transformAsync("", {
        ignore: ["/foo/**/*"],
        filename: "/foo/node_modules/bar",
      }).then(assertIgnored),

      transformAsync("", {
        ignore: ["/foo/node_modules/*.bar"],
        filename: "/foo/node_modules/foo.bar",
      }).then(assertIgnored),

      transformAsync("", {
        ignore: ["/foo/node_modules/*.foo"],
        filename: "/foo/node_modules/foo.bar",
      }).then(assertNotIgnored),

      transformAsync("", {
        ignore: ["/bar/**/*"],
        filename: "/foo/node_modules/foo.bar",
      }).then(assertNotIgnored),
    ]);
  });

  it("only option", function() {
    return Promise.all([
      transformAsync("", {
        only: ["/foo"],
        filename: "/foo/node_modules/bar",
      }).then(assertNotIgnored),

      transformAsync("", {
        only: ["/foo/*"],
        filename: "/foo/node_modules/bar",
      }).then(assertNotIgnored),

      transformAsync("", {
        only: ["/foo/node_modules"],
        filename: "/foo/node_modules/bar",
      }).then(assertNotIgnored),

      transformAsync("", {
        only: ["/foo/node_modules/*.bar"],
        filename: "/foo/node_modules/foo.bar",
      }).then(assertNotIgnored),

      transformAsync("", {
        only: ["/foo/node_modules"],
        filename: "/foo/node_module/bar",
      }).then(assertIgnored),

      transformAsync("", {
        only: ["/foo/node_modules"],
        filename: "/bar/node_modules/foo",
      }).then(assertIgnored),

      transformAsync("", {
        only: ["/foo/node_modules/*.bar"],
        filename: "/foo/node_modules/bar.foo",
      }).then(assertIgnored),
    ]);
  });

  describe("env option", function() {
    const oldBabelEnv = process.env.BABEL_ENV;
    const oldNodeEnv = process.env.NODE_ENV;

    setup(function() {
      // Tests need to run with the default and specific values for these. They
      // need to be cleared for each test.
      delete process.env.BABEL_ENV;
      delete process.env.NODE_ENV;
    });

    suiteTeardown(function() {
      process.env.BABEL_ENV = oldBabelEnv;
      process.env.NODE_ENV = oldNodeEnv;
    });

    it("default", function() {
      const result = babel.transform("foo;", {
        env: {
          development: { comments: false },
        },
      });

      assert.equal(result.options.comments, false);
    });

    it("BABEL_ENV", function() {
      process.env.BABEL_ENV = "foo";
      const result = babel.transform("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      assert.equal(result.options.comments, false);
    });

    it("NODE_ENV", function() {
      process.env.NODE_ENV = "foo";
      const result = babel.transform("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      assert.equal(result.options.comments, false);
    });
  });

  describe("buildExternalHelpers", function() {
    describe("smoke tests", function() {
      it("builds external helpers in global output type", function() {
        babel.buildExternalHelpers(null, "global");
      });

      it("builds external helpers in module output type", function() {
        babel.buildExternalHelpers(null, "module");
      });

      it("builds external helpers in umd output type", function() {
        babel.buildExternalHelpers(null, "umd");
      });

      it("builds external helpers in var output type", function() {
        babel.buildExternalHelpers(null, "var");
      });
    });

    it("all", function() {
      const script = babel.buildExternalHelpers();
      assert.ok(script.indexOf("classCallCheck") >= -1);
      assert.ok(script.indexOf("inherits") >= 0);
    });

    it("whitelist", function() {
      const script = babel.buildExternalHelpers(["inherits"]);
      assert.ok(script.indexOf("classCallCheck") === -1);
      assert.ok(script.indexOf("inherits") >= 0);
    });

    it("empty whitelist", function() {
      const script = babel.buildExternalHelpers([]);
      assert.ok(script.indexOf("classCallCheck") === -1);
      assert.ok(script.indexOf("inherits") === -1);
    });

    it("underscored", function() {
      const script = babel.buildExternalHelpers(["typeof"]);
      assert.ok(script.indexOf("typeof") >= 0);
    });
  });

  describe("handle parsing errors", function() {
    const options = {
      babelrc: false,
    };

    it("only syntax plugin available", function() {
      assert.throws(
        () =>
          babel.transformFileSync(
            __dirname + "/fixtures/api/parsing-errors/only-syntax/file.js",
            options,
          ),
        RegExp(
          "Support for this experimental syntax isn't currently enabled. " +
            "Add @babel/plugin-syntax-dynamic-import \\(https://git.io/vb4Sv\\) to the 'plugins' " +
            "section of your Babel config.",
        ),
      );
    });

    it("both syntax and transform plugin available", function() {
      assert.throws(
        () =>
          babel.transformFileSync(
            __dirname +
              "/fixtures/api/parsing-errors/syntax-and-transform/file.js",
            options,
          ),
        RegExp(
          "Support for this experimental syntax isn't currently enabled. Add either " +
            "@babel/plugin-syntax-async-generators \\(https://git.io/vb4SY\\) or " +
            "@babel/plugin-syntax-async-generators \\(https://git.io/vb4SY\\) " +
            "\\(if you only need parsing support\\) to the 'plugins' section of your Babel config.",
        ),
      );
    });
  });
});
