import path from "path";
import escope from "eslint-scope";
import unpad from "dedent";
import { parseForESLint as parseForESLintOriginal } from "../lib/index.cjs";
import { ESLint } from "eslint";
import { itDummy, commonJS, IS_BABEL_8, itBabel7 } from "$repo-utils";

function parseForESLint(code, options) {
  return parseForESLintOriginal(code, {
    requireConfigFile: false,
    ...options,
    babelOptions: {
      configFile: false,
      ...options.babelOptions,
    },
  });
}

const ESLINT_VERSION = ESLint.version;
const isESLint7 = ESLINT_VERSION.startsWith("7.");
const { __dirname: dirname, require } = commonJS(import.meta.url);

// @babel/eslint-parser 8 will drop ESLint 7 support

const itESLint7 = isESLint7 && !process.env.BABEL_8_BREAKING ? it : itDummy;
const itESLint8 = isESLint7 ? itDummy : it;

const BABEL_OPTIONS = {
  configFile: path.resolve(
    dirname,
    "../../babel-eslint-shared-fixtures/config/babel.config.js",
  ),
};
const PROPS_TO_REMOVE = [
  "importKind",
  "exportKind",
  "variance",
  "typeArguments",
  "filename",
  "identifierName",
];

function deeplyRemoveProperties(obj, props) {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "object") {
      if (Array.isArray(v)) {
        for (const el of v) {
          if (el != null) {
            deeplyRemoveProperties(el, props);
          }
        }
      }

      if (props.includes(k)) {
        delete obj[k];
      } else if (v != null) {
        deeplyRemoveProperties(v, props);
      }
      continue;
    }

    if (props.includes(k)) {
      delete obj[k];
    }
  }
}

describe("Babel and Espree", () => {
  let espree;

  const espreeOptions = {
    ecmaFeatures: {
      // enable JSX parsing
      jsx: true,
      // enable return in global scope
      globalReturn: true,
      // enable implied strict mode (if ecmaVersion >= 5)
      impliedStrict: true,
    },
    tokens: true,
    loc: true,
    range: true,
    comment: true,
    sourceType: "module",
  };

  function parseAndAssertSame(code, babelEcmaFeatures = null) {
    code = unpad(code);

    if (isESLint7) {
      // ESLint 7
      const espreeAST = espree.parse(code, {
        ...espreeOptions,
        ecmaVersion: 2021,
      });
      const babelAST = parseForESLint(code, {
        eslintVisitorKeys: true,
        eslintScopeManager: true,
        babelOptions: BABEL_OPTIONS,
        ecmaFeatures: babelEcmaFeatures,
      }).ast;

      deeplyRemoveProperties(babelAST, PROPS_TO_REMOVE);
      expect(babelAST).toEqual(espreeAST);
    } else {
      // ESLint 8
      const espreeAST = espree.parse(code, {
        ...espreeOptions,
        ecmaVersion: "latest",
      });

      const babelAST = parseForESLint(code, {
        eslintVisitorKeys: true,
        eslintScopeManager: true,
        babelOptions: BABEL_OPTIONS,
        ecmaFeatures: babelEcmaFeatures,
      }).ast;

      deeplyRemoveProperties(babelAST, PROPS_TO_REMOVE);
      expect(babelAST).toEqual(espreeAST);
    }
  }

  beforeAll(() => {
    // Use the version of Espree that is a dependency of
    // the version of ESLint we are testing against.
    const espreePath = require.resolve("espree", {
      paths: [path.dirname(require.resolve("eslint"))],
    });

    espree = require(espreePath);
  });

  describe("compatibility", () => {
    it("should allow ast.analyze to be called without options", () => {
      const ast = parseForESLint("`test`", {
        eslintScopeManager: true,
        eslintVisitorKeys: true,
        babelOptions: BABEL_OPTIONS,
      }).ast;
      expect(() => {
        escope.analyze(ast);
      }).not.toThrow(new TypeError("Should allow no options argument."));
    });

    it("should not crash when `loadPartialConfigSync` returns `null`", () => {
      const thunk = () =>
        parseForESLint("`test`", {
          eslintScopeManager: true,
          eslintVisitorKeys: true,
          babelOptions: { filename: "test.js", ignore: [/./] },
        });
      expect(thunk).not.toThrow();
    });
  });

  describe("templates", () => {
    it("empty template string", () => {
      parseAndAssertSame("``");
    });

    it("template string", () => {
      parseAndAssertSame("`test`");
    });

    it("template string using $", () => {
      parseAndAssertSame("`$`");
    });

    it("template string with expression", () => {
      parseAndAssertSame("`${a}`");
    });

    it("template string with multiple expressions", () => {
      parseAndAssertSame("`${a}${b}${c}`");
    });

    it("template string with expression and strings", () => {
      parseAndAssertSame("`a${a}a`");
    });

    it("template string with binary expression", () => {
      parseAndAssertSame("`a${a + b}a`");
    });

    it("tagged template", () => {
      parseAndAssertSame("jsx`<Button>Click</Button>`");
    });

    it("tagged template with expression", () => {
      parseAndAssertSame("jsx`<Button>Hi ${name}</Button>`");
    });

    it("tagged template with new operator", () => {
      parseAndAssertSame("new raw`42`");
    });

    it("template with nested function/object", () => {
      parseAndAssertSame(
        "`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`",
      );
    });

    it("template with braces inside and outside of template string #96", () => {
      parseAndAssertSame(
        "if (a) { var target = `{}a:${webpackPort}{}}}}`; } else { app.use(); }",
      );
    });

    it("template also with braces #96", () => {
      parseAndAssertSame(`
        export default function f1() {
          function f2(foo) {
            const bar = 3;
            return \`\${foo} \${bar}\`;
          }
          return f2;
        }
      `);
    });

    it("template with destructuring #31", () => {
      parseAndAssertSame(`
        module.exports = {
          render() {
            var {name} = this.props;
            return Math.max(null, \`Name: \${name}, Name: \${name}\`);
          }
        };
      `);
    });

    it("template with arrow returning template #603", () => {
      parseAndAssertSame(`
        var a = \`\${() => {
          \`\${''}\`
        }}\`;
      `);
    });

    it("template string with object with template string inside", () => {
      parseAndAssertSame("`${ { a:`${2}` } }`");
    });
  });

  it("simple expression", () => {
    parseAndAssertSame("a = 1");
  });

  it("logical NOT", () => {
    parseAndAssertSame("!0");
  });

  it("bitwise NOT", () => {
    parseAndAssertSame("~0");
  });

  it("class declaration", () => {
    parseAndAssertSame("class Foo {}");
  });

  it("class expression", () => {
    parseAndAssertSame("var a = class Foo {}");
  });

  it("jsx expression", () => {
    parseAndAssertSame("<App />");
  });

  it("jsx expression with 'this' as identifier", () => {
    parseAndAssertSame("<this />");
  });

  it("jsx expression with a dynamic attribute", () => {
    parseAndAssertSame("<App foo={bar} />");
  });

  it("jsx expression with a member expression as identifier", () => {
    parseAndAssertSame("<foo.bar />");
  });

  it("jsx expression with spread", () => {
    parseAndAssertSame("var myDivElement = <div {...this.props} />;");
  });

  it("empty jsx text", () => {
    parseAndAssertSame("<a></a>");
  });

  it("jsx text with content", () => {
    parseAndAssertSame("<a>Hello, world!</a>");
  });

  it("nested jsx", () => {
    parseAndAssertSame("<div>\n<h1>Wat</h1>\n</div>");
  });

  it("default import", () => {
    parseAndAssertSame('import foo from "foo";');
  });

  it("import specifier", () => {
    parseAndAssertSame('import { foo } from "foo";');
  });

  it("import specifier with name", () => {
    parseAndAssertSame('import { foo as bar } from "foo";');
  });

  it("import bare", () => {
    parseAndAssertSame('import "foo";');
  });

  it("import meta", () => {
    parseAndAssertSame("const url = import.meta.url");
  });

  it("export default class declaration", () => {
    parseAndAssertSame("export default class Foo {}");
  });

  it("export default class expression", () => {
    parseAndAssertSame("export default class {}");
  });

  it("export default function declaration", () => {
    parseAndAssertSame("export default function Foo() {}");
  });

  it("export default function expression", () => {
    parseAndAssertSame("export default function () {}");
  });

  it("export all", () => {
    parseAndAssertSame('export * from "foo";');
  });

  it("export * as ns", () => {
    parseAndAssertSame('export * as Foo from "foo";');
  });

  it("export named", () => {
    parseAndAssertSame("var foo = 1;export { foo };");
  });

  it("export named alias", () => {
    parseAndAssertSame("var foo = 1;export { foo as bar };");
  });

  it("optional chaining operator", () => {
    parseAndAssertSame("foo?.bar?.().qux()");
  });

  it("nullish coalescing operator", () => {
    parseAndAssertSame("foo ?? bar");
  });

  it("logical assignment", () => {
    parseAndAssertSame("foo ??= bar &&= qux ||= quux");
  });

  it("numeric separator", () => {
    parseAndAssertSame("1_0.0_0e0_1");
  });

  // Espree doesn't support the pipeline operator yet
  it("pipeline operator (token)", () => {
    const code = "foo |> bar";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;
    expect(babylonAST.tokens[1].type).toEqual("Punctuator");
  });

  it("brace and bracket hash operator (token)", () => {
    const code = "#[]; #{}";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [
            IS_BABEL_8()
              ? "recordAndTuple"
              : ["recordAndTuple", { syntaxType: "hash" }],
          ],
          tokens: true,
        },
      },
    }).ast;
    expect(babylonAST.tokens[0]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "#[" }),
    );
    expect(babylonAST.tokens[3]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "#{" }),
    );
  });

  itBabel7("brace and bracket bar operator (token)", () => {
    const code = "{||}; [||]";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [["recordAndTuple", { syntaxType: "bar" }]],
          tokens: true,
        },
      },
    }).ast;
    expect(babylonAST.tokens[0]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "{|" }),
    );
    expect(babylonAST.tokens[1]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "|}" }),
    );
    expect(babylonAST.tokens[3]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "[|" }),
    );
    expect(babylonAST.tokens[4]).toEqual(
      expect.objectContaining({ type: "Punctuator", value: "|]" }),
    );
  });

  itESLint7("hash (token) - ESLint 7", () => {
    const code = "class A { #x }";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;
    expect(babylonAST.tokens[3].type).toEqual("Punctuator");
    expect(babylonAST.tokens[3].value).toEqual("#");
  });

  itESLint8("private identifier (token) - ESLint 8", () => {
    const code = "class A { #x }";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;

    expect(babylonAST.tokens[3].type).toEqual("PrivateIdentifier");
    expect(babylonAST.tokens[3].value).toEqual("x");
  });

  it("static (token)", () => {
    const code = `
      import { static as foo } from "foo";

      class A {
        static m() {}
        static() {}
      }
    `;

    parseAndAssertSame(code);

    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;

    const staticKw = { type: "Keyword", value: "static" };

    expect(babylonAST.tokens[2]).toMatchObject(staticKw);
    expect(babylonAST.tokens[12]).toMatchObject(staticKw);
    expect(babylonAST.tokens[18]).toMatchObject(staticKw);
  });

  it("parse to PropertyDeclaration when `classFeatures: true`", () => {
    const code = "class A { #x }";
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [["estree", { classFeatures: true }]],
        },
      },
    }).ast;
    const classDeclaration = babylonAST.body[0];
    expect(classDeclaration.body.body[0].type).toEqual("PropertyDefinition");
  });

  itESLint8("class fields with ESLint 8", () => {
    parseAndAssertSame(
      `
        class A {
          x = 2;
          static #y = 3;
          asi
          #m() {}
        }
      `,
    );
  });

  itESLint7("static (token) - ESLint 7", () => {
    const code = `
      class A {
        static m() {}
        static() {}
        static x;
        static #y;
        static;
        static = 2;
      }
    `;
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;

    const staticKw = { type: "Keyword", value: "static" };

    expect(babylonAST.tokens[3]).toMatchObject(staticKw);
    expect(babylonAST.tokens[9]).toMatchObject(staticKw);
    expect(babylonAST.tokens[14]).toMatchObject(staticKw);
    expect(babylonAST.tokens[17]).toMatchObject(staticKw);
    expect(
      babylonAST.tokens[process.env.BABEL_8_BREAKING ? 20 : 21],
    ).toMatchObject(staticKw);
    expect(
      babylonAST.tokens[process.env.BABEL_8_BREAKING ? 22 : 23],
    ).toMatchObject(staticKw);
  });

  itESLint8("static (token) - ESLint 8", () => {
    const code = `
      class A {
        static m() {}
        static() {}
        static x;
        static #y;
        static;
        static = 2;
      }
    `;
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: BABEL_OPTIONS,
    }).ast;

    const staticKw = { type: "Keyword", value: "static" };

    expect(babylonAST.tokens[3]).toMatchObject(staticKw);
    expect(babylonAST.tokens[9]).toMatchObject(staticKw);
    expect(babylonAST.tokens[14]).toMatchObject(staticKw);
    expect(babylonAST.tokens[17]).toMatchObject(staticKw);
    expect(babylonAST.tokens[20]).toMatchObject(staticKw);
    expect(babylonAST.tokens[22]).toMatchObject(staticKw);
  });

  itESLint7("pipeline # topic token - ESLint 7", () => {
    const code = `
        x |> #
        y |> #[0]
        class A {
          #x = y |>
          #
          z
        }
      `;
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [
            ["pipelineOperator", { proposal: "hack", topicToken: "#" }],
          ],
          tokens: true,
        },
      },
    }).ast;

    const topicToken = { type: "Punctuator", value: "#" };
    expect(babylonAST.tokens[2]).toMatchObject(topicToken);
    expect(babylonAST.tokens[5]).toMatchObject(topicToken);
    expect(babylonAST.tokens[17]).toMatchObject(topicToken);
  });

  itESLint8("pipeline # topic token - ESLint 8", () => {
    const code = `
      x |> #
      y |> #[0]
      class A {
        #x = y |>
        #
        z
      }
    `;
    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [
            ["pipelineOperator", { proposal: "hack", topicToken: "#" }],
          ],
          tokens: true,
        },
      },
    }).ast;

    const topicToken = { type: "Punctuator", value: "#" };
    expect(babylonAST.tokens[2]).toMatchObject(topicToken);
    expect(babylonAST.tokens[5]).toMatchObject(topicToken);
    expect(babylonAST.tokens[16]).toMatchObject(topicToken);
  });

  it.each(["^", "%", "^^", "@@"])("pipeline %s topic token", tok => {
    const code = `
        x |> ${tok}
        y |> ${tok}[0]
      `;

    const babylonAST = parseForESLint(code, {
      eslintVisitorKeys: true,
      eslintScopeManager: true,
      babelOptions: {
        filename: "test.js",
        parserOpts: {
          plugins: [
            ["pipelineOperator", { proposal: "hack", topicToken: tok }],
          ],
          tokens: true,
        },
      },
    }).ast;

    const topicToken = { type: "Punctuator", value: tok };
    expect(babylonAST.tokens[2]).toMatchObject(topicToken);
    expect(babylonAST.tokens[5]).toMatchObject(topicToken);
  });

  it("empty program with line comment", () => {
    parseAndAssertSame("// single comment");
  });

  it("empty program with block comment", () => {
    parseAndAssertSame("  /* multiline\n * comment\n*/");
  });

  it("line comments", () => {
    parseAndAssertSame(`
      // single comment
      var foo = 15; // comment next to statement
      // second comment after statement
    `);
  });

  it("block comments", () => {
    parseAndAssertSame(`
      /* single comment */
      var foo = 15; /* comment next to statement */
      /*
       * multiline
       * comment
       */
    `);
  });

  it("block comments #124", () => {
    parseAndAssertSame(`
      React.createClass({
        render() {
          // return (
          //   <div />
          // ); // <-- this is the line that is reported
        }
      });
    `);
  });

  it("null", () => {
    parseAndAssertSame("null");
  });

  it("boolean", () => {
    parseAndAssertSame("if (true) {} else if (false) {}");
  });

  it("regexp", () => {
    parseAndAssertSame("/affix-top|affix-bottom|affix|[a-z]/");
  });

  it("regexp without flag", () => {
    parseAndAssertSame("const foo = /foo/;");
  });

  it("regexp y flag", () => {
    parseAndAssertSame("const foo = /foo/y;");
  });

  it("regexp u flag", () => {
    parseAndAssertSame("const foo = /foo/u;");
  });

  it("regexp in a template string", () => {
    parseAndAssertSame('`${/\\d/.exec("1")[0]}`');
  });

  it("first line is empty", () => {
    parseAndAssertSame('\nimport Immutable from "immutable";');
  });

  it("empty", () => {
    parseAndAssertSame("");
  });

  it("jsdoc", () => {
    parseAndAssertSame(`
      /**
      * @param {object} options
      * @return {number}
      */
      const test = function({ a, b, c }) {
        return a + b + c;
      };
      module.exports = test;
    `);
  });

  it("empty block with comment", () => {
    parseAndAssertSame(`
      function a () {
        try {
          b();
        } catch (e) {
          // asdf
        }
      }
    `);
  });

  describe("babel tests", () => {
    it("MethodDefinition", () => {
      parseAndAssertSame(`
        export default class A {
          a() {}
        }
      `);
    });

    it("MethodDefinition 2", () => {
      parseAndAssertSame(
        "export default class Bar { get bar() { return 42; }}",
      );
    });

    it("ClassMethod", () => {
      parseAndAssertSame(`
        class A {
          constructor() {
          }
        }
      `);
    });

    it("ClassMethod multiple params", () => {
      parseAndAssertSame(`
        class A {
          constructor(a, b, c) {
          }
        }
      `);
    });

    it("ClassMethod multiline", () => {
      parseAndAssertSame(`
        class A {
          constructor (
            a,
            b,
            c
          )

          {

          }
        }
      `);
    });

    it("ClassMethod oneline", () => {
      parseAndAssertSame("class A { constructor(a, b, c) {} }");
    });

    it("ObjectMethod", () => {
      parseAndAssertSame(`
        var a = {
          b(c) {
          }
        }
      `);
    });

    it("do not allow import export everywhere", () => {
      expect(() => {
        parseForESLint('function F() { import a from "a"; }', {
          babelOptions: BABEL_OPTIONS,
        });
      }).toThrow(/'import' and 'export' may only appear at the top level/);
    });

    it("allowImportExportEverywhere", () => {
      expect(() => {
        parseForESLint('function F() { import a from "a"; }', {
          babelOptions: {
            ...BABEL_OPTIONS,
            parserOpts: {
              allowImportExportEverywhere: true,
            },
          },
        });
      }).not.toThrow();
    });

    if (!process.env.BABEL_8_BREAKING) {
      it("top-level allowImportExportEverywhere", () => {
        expect(() => {
          parseForESLint('function F() { import a from "a"; }', {
            babelOptions: BABEL_OPTIONS,
            allowImportExportEverywhere: true,
          });
        }).not.toThrow();
      });
    }

    if (process.env.BABEL_8_BREAKING) {
      it("return outside function with ecmaFeatures.globalReturn: true", () => {
        parseAndAssertSame("return;", {
          globalReturn: true,
        });
      });

      it("return outside function with ecmaFeatures.globalReturn: false", () => {
        expect(() =>
          parseForESLint("return;", {
            babelOptions: BABEL_OPTIONS,
            ecmaVersion: { globalReturn: false },
          }),
        ).toThrow(new SyntaxError("'return' outside of function. (1:0)"));
      });

      it("return outside function without ecmaFeatures.globalReturn", () => {
        expect(() =>
          parseForESLint("return;", { babelOptions: BABEL_OPTIONS }),
        ).toThrow(new SyntaxError("'return' outside of function. (1:0)"));
      });
    } else {
      it("return outside function", () => {
        parseAndAssertSame("return;");
      });
    }

    if (process.env.BABEL_8_BREAKING) {
      it("super outside method", () => {
        expect(() => {
          parseForESLint("function F() { super(); }", {
            babelOptions: BABEL_OPTIONS,
          });
        }).toThrow(
          /`super\(\)` is only valid inside a class constructor of a subclass\./,
        );
      });

      it("super outside method - enabled", () => {
        expect(() => {
          parseForESLint("function F() { super(); }", {
            babelOptions: {
              ...BABEL_OPTIONS,
              parserOpts: {
                allowSuperOutsideMethod: true,
              },
            },
          });
        }).not.toThrow();
      });
    } else {
      it("super outside method in Babel 7", () => {
        expect(() => {
          parseForESLint("function F() { super(); }", {
            babelOptions: BABEL_OPTIONS,
          });
        }).not.toThrow();
      });

      it("super outside method - disabled", () => {
        expect(() => {
          parseForESLint("function F() { super(); }", {
            babelOptions: {
              ...BABEL_OPTIONS,
              parserOpts: {
                allowSuperOutsideMethod: false,
              },
            },
          });
        }).toThrow(
          /`super\(\)` is only valid inside a class constructor of a subclass\./,
        );
      });
    }

    it("StringLiteral", () => {
      parseAndAssertSame("");
      parseAndAssertSame("");
      parseAndAssertSame("a");
    });

    it("getters and setters", () => {
      parseAndAssertSame("class A { get x ( ) { ; } }");
      parseAndAssertSame(`
        class A {
          get x(
          )
          {
            ;
          }
        }
      `);
      parseAndAssertSame("class A { set x (a) { ; } }");
      parseAndAssertSame(`
        class A {
          set x(a
          )
          {
            ;
          }
        }
      `);
      parseAndAssertSame(`
        var B = {
          get x () {
            return this.ecks;
          },
          set x (ecks) {
            this.ecks = ecks;
          }
        };
      `);
    });

    it("RestOperator", () => {
      parseAndAssertSame("var { a, ...b } = c");
      parseAndAssertSame("var [ a, ...b ] = c");
      parseAndAssertSame("var a = function (...b) {}");
    });

    it("SpreadOperator", () => {
      parseAndAssertSame("var a = { b, ...c }");
      parseAndAssertSame("var a = [ a, ...b ]");
      parseAndAssertSame("var a = sum(...b)");
    });

    it("Async/Await", () => {
      parseAndAssertSame(`
        async function a() {
          await 1;
        }
      `);
    });

    it("BigInt", () => {
      parseAndAssertSame(`
        const a = 1n;
      `);
    });

    it("Dynamic Import", () => {
      parseAndAssertSame(`
        const a = import(moduleName);
      `);
    });
  });
});
