import * as babel from "../lib/index.js";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
import path from "node:path";
import generator from "@babel/generator";

import _Plugin from "../lib/config/plugin.js";
const Plugin = _Plugin.default || _Plugin;

import presetEnv from "@babel/preset-env";
import pluginSyntaxFlow from "@babel/plugin-syntax-flow";
import pluginSyntaxJSX from "@babel/plugin-syntax-jsx";
import pluginFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import { itBabel8, commonJS, IS_BABEL_8, USE_ESM } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);
const cwd = __dirname;

function assertIgnored(result) {
  expect(result).toBeNull();
}

function assertNotIgnored(result) {
  expect(result).not.toBeNull();
}

function parse(code, opts) {
  return babel.parse(code, { cwd, configFile: false, ...opts });
}

function parseSync(code, opts) {
  return babel.parseSync(code, { cwd, configFile: false, ...opts });
}

function transform(code, opts) {
  return babel.transform(code, { cwd, configFile: false, ...opts });
}

function transformSync(code, opts) {
  return babel.transformSync(code, { cwd, configFile: false, ...opts });
}

function transformFile(filename, opts, cb) {
  return babel.transformFile(filename, { cwd, configFile: false, ...opts }, cb);
}
function transformFileSync(filename, opts) {
  return babel.transformFileSync(filename, { cwd, configFile: false, ...opts });
}
function transformFileAsync(filename, opts) {
  return babel.transformFileAsync(filename, {
    cwd,
    configFile: false,
    ...opts,
  });
}

function transformAsync(code, opts) {
  return babel.transformAsync(code, { cwd, configFile: false, ...opts });
}

function transformFromAst(ast, code, opts) {
  return babel.transformFromAst(ast, code, { cwd, configFile: false, ...opts });
}

function transformFromAstSync(ast, code, opts) {
  return babel.transformFromAstSync(ast, code, {
    cwd,
    configFile: false,
    ...opts,
  });
}

describe("parser and generator options", function () {
  const recast = {
    parse: function (code, opts) {
      return opts.parser.parse(code);
    },
    print: function (ast) {
      return (generator.default || generator)(ast);
    },
  };

  function newTransform(string) {
    return transformSync(string, {
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

  it("options", function () {
    const string = "original;";
    expect(newTransform(string).ast).toEqual(
      transformSync(string, { ast: true }).ast,
    );
    expect(newTransform(string).code).toBe(string);
  });

  it("experimental syntax", function () {
    const experimental = "var a: number = 1;";

    expect(newTransform(experimental).ast).toEqual(
      transformSync(experimental, {
        ast: true,
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    expect(newTransform(experimental).code).toBe(experimental);

    function newTransformWithPlugins(string) {
      return transformSync(string, {
        ast: true,
        plugins: [pluginSyntaxFlow],
        parserOpts: {
          parser: recast.parse,
        },
        generatorOpts: {
          generator: recast.print,
        },
      });
    }

    expect(newTransformWithPlugins(experimental).ast).toEqual(
      transformSync(experimental, {
        ast: true,
        parserOpts: {
          plugins: ["flow"],
        },
      }).ast,
    );
    expect(newTransformWithPlugins(experimental).code).toBe(experimental);
  });

  it("other options", function () {
    const experimental = "if (true) {\n  import a from 'a';\n}";

    expect(newTransform(experimental).ast).not.toBe(
      transformSync(experimental, {
        ast: true,
        parserOpts: {
          allowImportExportEverywhere: true,
        },
      }).ast,
    );
    expect(newTransform(experimental).code).toBe(experimental);
  });
});

describe("api", function () {
  it("exposes the resolvePlugin method", function () {
    expect(() => babel.resolvePlugin("nonexistent-plugin")).toThrow(
      /Cannot (?:find|resolve) module 'babel-plugin-nonexistent-plugin'/,
    );
  });

  it("exposes the resolvePreset method", function () {
    expect(() => babel.resolvePreset("nonexistent-preset")).toThrow(
      /Cannot (?:find|resolve) module 'babel-preset-nonexistent-preset'/,
    );
  });

  it("exposes types", function () {
    expect(babel.types).toBeDefined();
  });

  it("exposes the parser's token types", function () {
    expect(babel.tokTypes).toBeDefined();
  });

  itBabel8("parse throws on undefined callback", () => {
    expect(() => parse("", {})).toThrowErrorMatchingInlineSnapshot(
      `"Starting from Babel 8.0.0, the 'parse' function expects a callback. If you need to call it synchronously, please use 'parseSync'."`,
    );
  });

  itBabel8("transform throws on undefined callback", () => {
    const options = {
      filename: "example.js",
    };
    expect(() => transform("", options)).toThrowErrorMatchingInlineSnapshot(
      `"Starting from Babel 8.0.0, the 'transform' function expects a callback. If you need to call it synchronously, please use 'transformSync'."`,
    );
  });

  it("transformFile", function () {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    return new Promise((resolve, reject) => {
      transformFile(
        cwd + "/fixtures/api/file.js",
        options,
        function (err, res) {
          if (err) return reject(err);
          expect(res.code).toBe("foo();");
          // keep user options untouched
          expect(options).toEqual({ babelrc: false });
          resolve();
        },
      );
    });
  });

  it("transformFileAsync", async function () {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    const res = await transformFileAsync(
      cwd + "/fixtures/api/file.js",
      options,
    );
    expect(res.code).toBe("foo();");
    // keep user options untouched
    expect(options).toEqual({ babelrc: false });
  });

  it("transformFile throws on undefined callback", () => {
    const options = {
      babelrc: false,
    };
    expect(() =>
      transformFile(cwd + "/fixtures/api/file.js", options),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Asynchronous function called without callback"`,
    );
  });

  it("transformFileSync", function () {
    const options = {
      babelrc: false,
    };
    Object.freeze(options);
    expect(transformFileSync(cwd + "/fixtures/api/file.js", options).code).toBe(
      "foo();",
    );
    expect(options).toEqual({ babelrc: false });
  });

  itBabel8("transformFromAst throws on undefined callback", () => {
    const program = "const identifier = 1";
    const node = parseSync(program);
    expect(() =>
      transformFromAst(node, program),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Starting from Babel 8.0.0, the 'transformFromAst' function expects a callback. If you need to call it synchronously, please use 'transformFromAstSync'."`,
    );
  });

  it("transformFromAst should generate same code with different cloneInputAst", function () {
    const program = `//test1
    /*test2*/var/*test3*/ a = 1/*test4*/;//test5
    //test6
    var b;
    `;
    const node = parseSync(program);
    const { code } = transformFromAstSync(node, program, {
      plugins: [
        function () {
          return {
            visitor: {
              Identifier: function (path) {
                path.node.name = "replaced";
              },
            },
          };
        },
      ],
    });
    const { code: code2 } = transformFromAstSync(node, program, {
      cloneInputAst: false,
      plugins: [
        function () {
          return {
            visitor: {
              Identifier: function (path) {
                path.node.name = "replaced";
              },
            },
          };
        },
      ],
    });

    expect(code).toBe(code2);
  });

  it("transformFromAstSync should not cause infinite recursion with circular objects", () => {
    const program = "const identifier = 1";
    const node = parseSync(program);
    node.program.body[0].extra = { parent: node.program };

    expect(transformFromAstSync(node, program, {}).code).toBe(
      "const identifier = 1;",
    );
  });

  it("transformFromAst should not mutate the AST", function () {
    const program = "const identifier = 1";
    const node = parseSync(program);
    const { code } = transformFromAstSync(node, program, {
      plugins: [
        function () {
          return {
            visitor: {
              Identifier: function (path) {
                path.node.name = "replaced";
              },
            },
          };
        },
      ],
    });

    expect(code).toBe("const replaced = 1;");
    expect(node.program.body[0].declarations[0].id.name).toBe(
      "identifier",
      "original ast should not have been mutated",
    );
  });

  it("transformFromAstSync should mutate the AST when cloneInputAst is false", function () {
    const program = "const identifier = 1";
    const node = parseSync(program);
    const { code } = transformFromAstSync(node, program, {
      cloneInputAst: false,
      plugins: [
        function () {
          return {
            visitor: {
              Identifier: function (path) {
                path.node.name = "replaced";
              },
            },
          };
        },
      ],
    });

    expect(code).toBe("const replaced = 1;");
    expect(node.program.body[0].declarations[0].id.name).toBe(
      "replaced",
      "original ast should have been mutated",
    );
  });

  it("options throw on falsy true", function () {
    return expect(function () {
      transformSync("", {
        plugins: [pluginSyntaxJSX, false],
      });
    }).toThrow(/.plugins\[1\] must be a string, object, function/);
  });

  it("options merge backwards", async function () {
    const result = await transformAsync("", {
      cwd,
      presets: [
        () => ({
          plugins: [() => ({ name: "plugin-4" }), () => ({ name: "plugin-5" })],
        }),
        () => ({
          plugins: [() => ({ name: "plugin-2" }), () => ({ name: "plugin-3" })],
        }),
      ],
      plugins: [() => ({ name: "plugin-0" }), () => ({ name: "plugin-1" })],
    });

    expect(result.options.plugins[0].key).toBe("plugin-0");
    expect(result.options.plugins[1].key).toBe("plugin-1");
    expect(result.options.plugins[2].key).toBe("plugin-2");
    expect(result.options.plugins[3].key).toBe("plugin-3");
    expect(result.options.plugins[4].key).toBe("plugin-4");
    expect(result.options.plugins[5].key).toBe("plugin-5");
  });

  it("option wrapPluginVisitorMethod", function () {
    let calledRaw = 0;
    let calledIntercept = 0;

    transformSync("function foo() { bar(foobar); }", {
      wrapPluginVisitorMethod: function (pluginAlias, visitorType, callback) {
        if (pluginAlias !== "foobar") {
          return callback;
        }

        expect(visitorType).toBe("enter");

        return function () {
          calledIntercept++;
          return callback.apply(this, arguments);
        };
      },

      plugins: [
        new Plugin({
          name: "foobar",
          visitor: {
            "Program|Identifier": function () {
              calledRaw++;
            },
          },
        }),
      ],
    });

    expect(calledRaw).toBe(4);
    expect(calledIntercept).toBe(4);
  });

  it("pass per preset", function () {
    let aliasBaseType = null;

    function execTest(passPerPreset) {
      return transformSync("type Foo = number; let x = (y): Foo => y;", {
        sourceType: "script",
        passPerPreset: passPerPreset,
        presets: [
          // First preset with our plugin, "before"
          function () {
            return {
              plugins: [
                new Plugin({
                  visitor: {
                    Function: function (path) {
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

          // env preset
          [presetEnv, { targets: { browsers: "ie 6" } }],

          // Third preset for Flow.
          () => ({
            plugins: [pluginSyntaxFlow, pluginFlowStripTypes],
          }),
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

  it("complex plugin and preset ordering", function () {
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

    const result = transformSync("", {
      cwd: path.join(cwd, "fixtures", "config", "complex-plugin-config"),
      filename: path.join(
        cwd,
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
        "twentyone;",
        "twentytwo;",
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

  it("interpreter directive backward-compat", function () {
    function doTransform(code, preHandler) {
      return transformSync(code, {
        plugins: [
          {
            pre: preHandler,
          },
        ],
      }).code;
    }

    // Writes value properly.
    expect(
      doTransform("", file => {
        file.shebang = "env node";
      }),
    ).toBe(`#!env node`);
    expect(
      doTransform("#!env node", file => {
        file.shebang = "env node2";
      }),
    ).toBe(`#!env node2`);
    expect(
      doTransform("", file => {
        file.shebang = "";
      }),
    ).toBe(``);
    expect(
      doTransform("#!env node", file => {
        file.shebang = "";
      }),
    ).toBe(``);

    // Reads value properly.
    doTransform("", file => {
      expect(file.shebang).toBe("");
    });
    doTransform("#!env node", file => {
      expect(file.shebang).toBe("env node");
    });

    // Reads and writes properly.
    expect(
      doTransform("#!env node", file => {
        expect(file.shebang).toBe("env node");

        file.shebang = "env node2";
        expect(file.shebang).toBe("env node2");

        file.shebang = "env node3";
      }),
    ).toBe(`#!env node3`);
  });

  it("source map merging", function () {
    const result = transformSync(
      [
        'function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }',
        "",
        "let Foo = function Foo() {",
        "  _classCallCheck(this, Foo);",
        "};",
        "",
        "//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZG91dCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFNLEdBQUcsWUFBSCxHQUFHO3dCQUFILEdBQUciLCJmaWxlIjoidW5kZWZpbmVkIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRm9vIHt9XG4iXX0=",
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
        "let Foo = function Foo() {",
        "  _classCallCheck(this, Foo);",
        "};",
      ].join("\n"),
    ).toBe(result.code);

    const consumer = new TraceMap(result.map);

    expect(
      originalPositionFor(consumer, {
        line: 6,
        column: 4,
      }),
    ).toEqual({
      name: "Foo",
      source: "stdout",
      line: 1,
      column: 6,
    });
  });

  it("default source map filename", function () {
    return transformAsync("var a = 10;", {
      cwd: "/some/absolute",
      filename: "/some/absolute/file/path.js",
      sourceMaps: true,
    }).then(function (result) {
      expect(result.map.sources).toEqual(["path.js"]);
    });
  });

  it("code option false", function () {
    return transformAsync("foo('bar');", { code: false }).then(
      function (result) {
        expect(result.code).toBeFalsy();
      },
    );
  });

  it("ast option false", function () {
    return transformAsync("foo('bar');", { ast: false }).then(
      function (result) {
        expect(result.ast).toBeFalsy();
      },
    );
  });

  it("ast option true", function () {
    return transformAsync("foo('bar');", { ast: true }).then(function (result) {
      expect(result.ast).toBeTruthy();
    });
  });

  it("ast option default", function () {
    return transformAsync("foo('bar');").then(function (result) {
      expect(result.ast).toBeFalsy();
    });
  });

  it("auxiliaryComment option", function () {
    return transformAsync("class Foo {}", {
      auxiliaryCommentBefore: "before",
      auxiliaryCommentAfter: "after",
      plugins: [
        function (babel) {
          const t = babel.types;
          return {
            visitor: {
              Program: function (path) {
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
    }).then(function (result) {
      expect(result.code).toBe(
        "/*before*/\nstart;\n/*after*/\nclass Foo {}\n/*before*/\nend;\n/*after*/",
      );
    });
  });

  it("ignore option", function () {
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

  it("only option", function () {
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

  describe("env option", function () {
    const oldBabelEnv = process.env.BABEL_ENV;
    const oldNodeEnv = process.env.NODE_ENV;

    beforeEach(function () {
      // Tests need to run with the default and specific values for these. They
      // need to be cleared for each test.
      delete process.env.BABEL_ENV;
      delete process.env.NODE_ENV;
    });

    afterAll(function () {
      process.env.BABEL_ENV = oldBabelEnv;
      process.env.NODE_ENV = oldNodeEnv;
    });

    it("default", function () {
      const result = transformSync("foo;", {
        env: {
          development: { comments: false },
        },
      });

      expect(result.options.comments).toBe(false);
    });

    it("BABEL_ENV", function () {
      process.env.BABEL_ENV = "foo";
      const result = transformSync("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      expect(result.options.comments).toBe(false);
    });

    it("NODE_ENV", function () {
      process.env.NODE_ENV = "foo";
      const result = transformSync("foo;", {
        env: {
          foo: { comments: false },
        },
      });
      expect(result.options.comments).toBe(false);
    });
  });

  describe("buildExternalHelpers", function () {
    it("all", function () {
      const script = babel.buildExternalHelpers();
      expect(script).toEqual(expect.stringContaining("classCallCheck"));
      expect(script).toEqual(expect.stringContaining("inherits"));
    });

    it("allowlist", function () {
      const script = babel.buildExternalHelpers(["inherits"]);
      expect(script).not.toEqual(expect.stringContaining("classCallCheck"));
      expect(script).toEqual(expect.stringContaining("inherits"));
    });

    it("empty allowlist", function () {
      const script = babel.buildExternalHelpers([]);
      expect(script).not.toEqual(expect.stringContaining("classCallCheck"));
      expect(script).not.toEqual(expect.stringContaining("inherits"));
    });

    it("underscored", function () {
      const script = babel.buildExternalHelpers(["typeof"]);
      expect(script).toEqual(expect.stringContaining("typeof"));
    });

    describe("output types", function () {
      it("global", function () {
        const script = babel.buildExternalHelpers(["get"], "global");
        expect(script).toMatchInlineSnapshot(`
          "(function (global) {
            var babelHelpers = global.babelHelpers = {};
            function _get() {
              return babelHelpers.get = _get = \\"undefined\\" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
                var p = babelHelpers.superPropBase(e, t);
                if (p) {
                  var n = Object.getOwnPropertyDescriptor(p, t);
                  return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
                }
              }, _get.apply(null, arguments);
            }
            babelHelpers.get = _get;
          })(typeof global === \\"undefined\\" ? self : global);"
        `);
      });

      it("umd", function () {
        const script = babel.buildExternalHelpers(["get"], "umd");
        expect(script).toMatchInlineSnapshot(`
          "(function (root, factory) {
            if (typeof define === \\"function\\" && define.amd) {
              define([\\"exports\\"], factory);
            } else if (typeof exports === \\"object\\") {
              factory(exports);
            } else {
              factory(root.babelHelpers = {});
            }
          })(this, function (global) {
            var babelHelpers = global;
            function _get() {
              return babelHelpers.get = _get = \\"undefined\\" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
                var p = babelHelpers.superPropBase(e, t);
                if (p) {
                  var n = Object.getOwnPropertyDescriptor(p, t);
                  return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
                }
              }, _get.apply(null, arguments);
            }
            babelHelpers.get = _get;
          });"
        `);
      });

      it("var", function () {
        const script = babel.buildExternalHelpers(["get"], "var");
        expect(script).toMatchInlineSnapshot(`
          "var babelHelpers = {};
          function _get() {
            return babelHelpers.get = _get = \\"undefined\\" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
              var p = babelHelpers.superPropBase(e, t);
              if (p) {
                var n = Object.getOwnPropertyDescriptor(p, t);
                return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
              }
            }, _get.apply(null, arguments);
          }
          babelHelpers.get = _get;
          babelHelpers;"
        `);
      });

      it("module", function () {
        const script = babel.buildExternalHelpers(["get"], "module");
        expect(script).toMatchInlineSnapshot(`
          "export { _get as get };
          function _get() {
            return _get = \\"undefined\\" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
              var p = _superPropBase(e, t);
              if (p) {
                var n = Object.getOwnPropertyDescriptor(p, t);
                return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
              }
            }, _get.apply(null, arguments);
          }"
        `);
      });
    });
  });

  describe("handle parsing errors", function () {
    const options = {
      babelrc: false,
    };

    it("only syntax plugin available", function () {
      return new Promise(resolve => {
        transformFile(
          cwd + "/fixtures/api/parsing-errors/only-syntax/file.js",
          options,
          function (err) {
            expect(err.message).toMatch(
              "Support for the experimental syntax 'pipelineOperator' isn't currently enabled (1:3):",
            );
            expect(err.message).toMatch(
              "Add @babel/plugin-proposal-pipeline-operator (https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-pipeline-operator) to the " +
                "'plugins' section of your Babel config to enable transformation.",
            );
            resolve();
          },
        );
      });
    });

    it("both syntax and transform plugin available", async function () {
      const promise = new Promise((resolve, reject) => {
        transformFile(
          cwd + "/fixtures/api/parsing-errors/syntax-and-transform/file.js",
          options,
          (err, result) => (err ? reject(err) : resolve(result)),
        );
      });

      await expect(promise).rejects.toThrow();

      const err = await promise.catch(e => e);

      expect(err.message).toMatch(
        "Support for the experimental syntax 'doExpressions' isn't currently enabled (1:2):",
      );
      expect(err.message).toMatch(
        "Add @babel/plugin-proposal-do-expressions (https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-do-expressions) to the " +
          "'plugins' section of your Babel config to enable transformation.",
      );
      expect(err.message).toMatch(
        /npx cross-env BABEL_SHOW_CONFIG_FOR=(.*?)[\\/]parsing-errors[\\/]syntax-and-transform[\\/]file.js/,
      );
    });
  });

  describe("missing helpers", function () {
    it("should always throw", function () {
      expect(() =>
        babel.transformSync(``, {
          configFile: false,
          plugins: [
            function () {
              return {
                visitor: {
                  Program(path) {
                    try {
                      path.pushContainer("body", this.addHelper("fooBar"));
                    } catch {}
                    path.pushContainer("body", this.addHelper("fooBar"));
                  },
                },
              };
            },
          ],
        }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"unknown file: Unknown helper fooBar"`,
      );
    });
  });
});

if (IS_BABEL_8() && USE_ESM) {
  describe("cjs-proxy", function () {
    it("error should be caught", () => {
      let err;
      try {
        const cjs = require("../cjs-proxy.cjs");
        cjs.parse("foo");
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(Error);
    });
  });
}
