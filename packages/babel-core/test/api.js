import * as babel from "../lib/index";
import sourceMap from "source-map";
import path from "path";
import Plugin from "../lib/config/plugin";
import generator from "@babel/generator";

function assertIgnored(result) {
  expect(result).toBeFalsy();
}

function assertNotIgnored(result) {
  expect(result.ignored).toBeFalsy();
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
      ast: true,
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
    expect(newTransform(string).ast).toEqual(
      babel.transform(string, { ast: true }).ast,
    );
    expect(newTransform(string).code).toBe(string);
  });

  it("experimental syntax", function() {
    const experimental = "var a: number = 1;";

    expect(newTransform(experimental).ast).toEqual(
      babel.transform(experimental, {
        ast: true,
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    expect(newTransform(experimental).code).toBe(experimental);

    function newTransformWithPlugins(string) {
      return babel.transform(string, {
        ast: true,
        plugins: [__dirname + "/../../babel-plugin-syntax-flow"],
        parserOpts: {
          parser: recast.parse,
        },
        generatorOpts: {
          generator: recast.print,
        },
      });
    }

    expect(newTransformWithPlugins(experimental).ast).toEqual(
      babel.transform(experimental, {
        ast: true,
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    expect(newTransformWithPlugins(experimental).code).toBe(experimental);
  });

  it("other options", function() {
    const experimental = "if (true) {\n  import a from 'a';\n}";

    expect(newTransform(experimental).ast).not.toBe(
      babel.transform(experimental, {
        ast: true,
        parserOpts: {
          allowImportExportEverywhere: true,
        },
      }).ast,
    );
    expect(newTransform(experimental).code).toBe(experimental);
  });
});

describe("api", function() {
  it("exposes the resolvePlugin method", function() {
    expect(() => babel.resolvePlugin("nonexistent-plugin")).toThrow(
      /Cannot find module 'babel-plugin-nonexistent-plugin'/,
    );
  });

  it("exposes the resolvePreset method", function() {
    expect(() => babel.resolvePreset("nonexistent-preset")).toThrow(
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
      expect(res.code).toBe("foo();");
      // keep user options untouched
      expect(options).toEqual({ babelrc: false });
      done();
    });
  });

  it("transformFileSync", function() {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    expect(
      babel.transformFileSync(__dirname + "/fixtures/api/file.js", options)
        .code,
    ).toBe("foo();");
    expect(options).toEqual({ babelrc: false });
  });

  it("options throw on falsy true", function() {
    return expect(function() {
      babel.transform("", {
        plugins: [__dirname + "/../../babel-plugin-syntax-jsx", false],
      });
    }).toThrow(/.plugins\[1\] must be a string, object, function/);
  });

  it("options merge backwards", function() {
    return transformAsync("", {
      presets: [__dirname + "/../../babel-preset-es2015"],
      plugins: [__dirname + "/../../babel-plugin-syntax-jsx"],
    }).then(function(result) {
      expect(result.options.plugins[0].manipulateOptions.toString()).toEqual(
        expect.stringContaining("jsx"),
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

        expect(visitorType).toBe("enter");

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

    expect(calledRaw).toBe(4);
    expect(calledIntercept).toBe(4);
  });

  it("pass per preset", function() {
    let aliasBaseType = null;

    function execTest(passPerPreset) {
      return babel.transform("type Foo = number; let x = (y): Foo => y;", {
        sourceType: "script",
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

    expect(aliasBaseType).toBe("NumberTypeAnnotation");

    expect(result.code).toBe("var x = function x(y) {\n  return y;\n};");

    // 2. passPerPreset: false

    aliasBaseType = null;

    result = execTest(false);

    expect(aliasBaseType).toBeNull();

    expect(result.code).toBe("var x = function x(y) {\n  return y;\n};");
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

    const oldEnv = process.env.BABEL_ENV;
    process.env.BABEL_ENV = "development";

    const result = babel.transform("", {
      cwd: path.join(__dirname, "fixtures", "config", "complex-plugin-config"),
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

    if (oldEnv === undefined) {
      delete process.env.BABEL_ENV;
    } else {
      process.env.BABEL_ENV = oldEnv;
    }

    expect(result.code).toBe(
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

    expect(
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
    ).toBe(result.code);

    const consumer = new sourceMap.SourceMapConsumer(result.map);

    expect(
      consumer.originalPositionFor({
        line: 7,
        column: 4,
      }),
    ).toEqual({
      name: null,
      source: "stdout",
      line: 1,
      column: 6,
    });
  });

  it("code option false", function() {
    return transformAsync("foo('bar');", { code: false }).then(function(
      result,
    ) {
      expect(result.code).toBeFalsy();
    });
  });

  it("ast option false", function() {
    return transformAsync("foo('bar');", { ast: false }).then(function(result) {
      expect(result.ast).toBeFalsy();
    });
  });

  it("ast option true", function() {
    return transformAsync("foo('bar');", { ast: true }).then(function(result) {
      expect(result.ast).toBeTruthy();
    });
  });

  it("ast option default", function() {
    return transformAsync("foo('bar');").then(function(result) {
      expect(result.ast).toBeFalsy();
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
      expect(result.code).toBe(
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

    beforeEach(function() {
      // Tests need to run with the default and specific values for these. They
      // need to be cleared for each test.
      delete process.env.BABEL_ENV;
      delete process.env.NODE_ENV;
    });

    afterAll(function() {
      process.env.BABEL_ENV = oldBabelEnv;
      process.env.NODE_ENV = oldNodeEnv;
    });

    it("default", function() {
      const result = babel.transform("foo;", {
        env: {
          development: { comments: false },
        },
      });

      expect(result.options.comments).toBe(false);
    });

    it("BABEL_ENV", function() {
      process.env.BABEL_ENV = "foo";
      const result = babel.transform("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      expect(result.options.comments).toBe(false);
    });

    it("NODE_ENV", function() {
      process.env.NODE_ENV = "foo";
      const result = babel.transform("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      expect(result.options.comments).toBe(false);
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
      expect(script).toEqual(expect.stringContaining("classCallCheck"));
      expect(script).toEqual(expect.stringContaining("inherits"));
    });

    it("whitelist", function() {
      const script = babel.buildExternalHelpers(["inherits"]);
      expect(script).not.toEqual(expect.stringContaining("classCallCheck"));
      expect(script).toEqual(expect.stringContaining("inherits"));
    });

    it("empty whitelist", function() {
      const script = babel.buildExternalHelpers([]);
      expect(script).not.toEqual(expect.stringContaining("classCallCheck"));
      expect(script).not.toEqual(expect.stringContaining("inherits"));
    });

    it("underscored", function() {
      const script = babel.buildExternalHelpers(["typeof"]);
      expect(script).toEqual(expect.stringContaining("typeof"));
    });
  });

  describe("handle parsing errors", function() {
    const options = {
      babelrc: false,
    };

    it("only syntax plugin available", function(done) {
      babel.transformFile(
        __dirname + "/fixtures/api/parsing-errors/only-syntax/file.js",
        options,
        function(err) {
          expect(err.message).toMatch(
            "Support for the experimental syntax 'dynamicImport' isn't currently enabled (1:9)",
          );
          expect(err.message).toMatch(
            "Add @babel/plugin-syntax-dynamic-import (https://git.io/vb4Sv) to the " +
              "'plugins' section of your Babel config to enable parsing.",
          );
          done();
        },
      );
    });

    it("both syntax and transform plugin available", function(done) {
      babel.transformFile(
        __dirname + "/fixtures/api/parsing-errors/syntax-and-transform/file.js",
        options,
        function(err) {
          expect(err.message).toMatch(
            "Support for the experimental syntax 'asyncGenerators' isn't currently enabled (1:15):",
          );
          expect(err.message).toMatch(
            "Add @babel/plugin-proposal-async-generator-functions (https://git.io/vb4yp) to the " +
              "'plugins' section of your Babel config to enable transformation.",
          );
          done();
        },
      );
    });
  });
});
