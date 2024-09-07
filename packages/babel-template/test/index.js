import * as t from "@babel/types";

import _generator from "../../babel-generator/lib/index.js";
import _template from "../lib/index.js";
const generator = _generator.default || _generator;
const template = _template.default || _template;

const comments = "// Sum two numbers\nconst add = (a, b) => a + b;";

describe("@babel/template", function () {
  it("import statements are allowed by default", function () {
    expect(function () {
      template("import foo from 'foo'")({});
    }).not.toThrow();
  });

  it("with statements are allowed with sourceType: script", function () {
    expect(function () {
      template("with({}){}", { sourceType: "script" })({});
    }).not.toThrow();
  });

  it("should strip comments by default", function () {
    const code = "const add = (a, b) => a + b;";
    const output = template(comments)();
    expect(generator(output).code).toBe(code);
  });

  it("should preserve comments with a flag", function () {
    const output = template(comments, { preserveComments: true })();
    expect(generator(output).code).toBe(comments);
  });

  it("should preserve comments with a flag when using .ast", function () {
    const output1 = template.ast(comments, { preserveComments: true });
    const output2 = template({ preserveComments: true }).ast(comments);
    expect(generator(output1).code).toBe(comments);
    expect(generator(output2).code).toBe(comments);
  });

  describe("string-based", () => {
    it("should handle replacing values from an object", () => {
      const value = t.stringLiteral("some string value");
      const result = template(`
        if (SOME_VAR === "") {}
      `)({
        SOME_VAR: value,
      });

      expect(result.type).toBe("IfStatement");
      expect(result.test.type).toBe("BinaryExpression");
      expect(result.test.left).toBe(value);
    });

    it("should handle replacing values given an array", () => {
      const value = t.stringLiteral("some string value");
      const result = template(`
        if ($0 === "") {}
      `)([value]);

      expect(result.type).toBe("IfStatement");
      expect(result.test.type).toBe("BinaryExpression");
      expect(result.test.left).toBe(value);
    });

    it("should handle replacing values with null to remove them", () => {
      const result = template(`
        callee(ARG);
      `)({ ARG: null });

      expect(result.type).toBe("ExpressionStatement");
      expect(result.expression.type).toBe("CallExpression");
      expect(result.expression.arguments).toEqual([]);
    });

    it("should handle replacing values that are string content", () => {
      const result = template(`
        ("ARG");
      `)({ ARG: "some new content" });

      expect(result.type).toBe("ExpressionStatement");
      expect(result.expression.type).toBe("StringLiteral");
      expect(result.expression.value).toBe("some new content");
    });

    it("should automatically clone nodes if they are injected twice", () => {
      const id = t.identifier("someIdent");

      const result = template(`
        ID;
        ID;
      `)({ ID: id });

      expect(result[0].type).toBe("ExpressionStatement");
      expect(result[0].expression).toBe(id);
      expect(result[1].type).toBe("ExpressionStatement");
      expect(result[1].expression).not.toBe(id);
      expect(result[1].expression).toEqual(id);
    });

    it("should allow passing in a whitelist of replacement names", () => {
      const id = t.identifier("someIdent");
      const result = template(
        `
          some_id;
        `,
        { placeholderWhitelist: new Set(["some_id"]) },
      )({ some_id: id });

      expect(result.type).toBe("ExpressionStatement");
      expect(result.expression).toBe(id);
    });

    it("should allow passing in a RegExp to match replacement patterns", () => {
      const id = t.identifier("someIdent");
      const result = template(
        `
          ID;
          ANOTHER_ID;
        `,
        { placeholderPattern: /^ID$/ },
      )({ ID: id });

      expect(result[0].type).toBe("ExpressionStatement");
      expect(result[0].expression).toBe(id);
      expect(result[1].type).toBe("ExpressionStatement");
      expect(result[1].expression.type).toBe("Identifier");
      expect(result[1].expression.name).toBe("ANOTHER_ID");
    });

    it("should throw if unknown replacements are provided", () => {
      expect(() => {
        template(`
          ID;
        `)({ ID: t.identifier("someIdent"), ANOTHER_ID: null });
      }).toThrow('Unknown substitution "ANOTHER_ID" given');
    });

    it("should throw if placeholders are not given explicit values", () => {
      expect(() => {
        template(`
          ID;
          ANOTHER_ID;
        `)({ ID: t.identifier("someIdent") });
      }).toThrow(
        `Error: No substitution given for "ANOTHER_ID". If this is not meant to be a
            placeholder you may want to consider passing one of the following options to @babel/template:
            - { placeholderPattern: false, placeholderWhitelist: new Set(['ANOTHER_ID'])}
            - { placeholderPattern: /^ANOTHER_ID$/ }`,
      );
    });

    it("should return the AST directly when using .ast", () => {
      const result = template.ast(`
        if ("some string value" === "") {}
      `);

      expect(result.type).toBe("IfStatement");
      expect(result.test.type).toBe("BinaryExpression");
      expect(result.test.left.type).toBe("StringLiteral");
      expect(result.test.left.value).toBe("some string value");
    });
  });

  describe("literal-based", () => {
    it("should handle replacing values from an object", () => {
      const value = t.stringLiteral("some string value");
      const result = template`
        if (${value} === "") {}
      `();

      expect(result.type).toBe("IfStatement");
      expect(result.test.type).toBe("BinaryExpression");
      expect(result.test.left).toBe(value);
    });

    it("should handle replacing values with null to remove them", () => {
      const result = template`
        callee(${null});
      `();

      expect(result.type).toBe("ExpressionStatement");
      expect(result.expression.type).toBe("CallExpression");
      expect(result.expression.arguments).toEqual([]);
    });

    it("should handle replacing values that are string content", () => {
      const result = template`
        ("${"some new content"}");
      `();

      expect(result.type).toBe("ExpressionStatement");
      expect(result.expression.type).toBe("StringLiteral");
      expect(result.expression.value).toBe("some new content");
    });

    it("should allow setting options by passing an object", () => {
      const result = template({ sourceType: "script" })`
        with({}){}
      `();

      expect(result.type).toBe("WithStatement");
    });

    it("should return the AST directly when using .ast", () => {
      const value = t.stringLiteral("some string value");
      const result = template.ast`
        if (${value} === "") {}
      `;

      expect(result.type).toBe("IfStatement");
      expect(result.test.type).toBe("BinaryExpression");
      expect(result.test.left).toBe(value);
    });

    it("should return assertions in ImportDeclaration when using .ast", () => {
      const result = template.ast(
        `import json from "./foo.json" with { type: "json" };`,
        {
          plugins: ["importAttributes"],
        },
      );

      expect(result.attributes[0].type).toBe("ImportAttribute");
    });

    it("should return assertions in ExportNamedDeclaration when using .ast", () => {
      const result = template.ast(
        `export { default as foo2 } from "foo.json" with { type: "json" };`,
        {
          plugins: ["importAttributes"],
        },
      );

      expect(result.attributes[0].type).toBe("ImportAttribute");
    });

    it("should return assertions in ExportDefaultDeclaration when using .ast", () => {
      const result = template.ast(
        `export foo2 from "foo.json" with { type: "json" };`,
        {
          plugins: ["importAttributes", "exportDefaultFrom"],
        },
      );

      expect(result.attributes[0].type).toBe("ImportAttribute");
    });

    it("should return assertions in ExportAllDeclaration when using .ast", () => {
      const result = template.ast(
        `export * from "foo.json" with { type: "json" };`,
        {
          plugins: ["importAttributes"],
        },
      );

      expect(result.attributes[0].type).toBe("ImportAttribute");
    });

    it("should replace JSX placeholder", () => {
      const result = template.expression(
        `
        <TAG>{'content'}</TAG>
      `,
        {
          plugins: ["jsx"],
        },
      )({
        TAG: t.jsxIdentifier("div"),
      });

      expect(generator(result).code).toEqual("<div>{'content'}</div>");
    });

    it("should work with `export { x }`", () => {
      const result = template.ast`
        export { ${t.identifier("x")} }
        $$$$BABEL_TPL$0;
      `;
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "declaration": null,
            "loc": undefined,
            "source": null,
            "specifiers": Array [
              Object {
                "exported": Object {
                  "name": "x",
                  "type": "Identifier",
                },
                "loc": undefined,
                "local": Object {
                  "name": "x",
                  "type": "Identifier",
                },
                "type": "ExportSpecifier",
              },
            ],
            "type": "ExportNamedDeclaration",
          },
          Object {
            "expression": Object {
              "loc": undefined,
              "name": "$$$$BABEL_TPL$0",
              "type": "Identifier",
            },
            "loc": undefined,
            "type": "ExpressionStatement",
          },
        ]
      `);
    });

    it("should work with `const a = { x }`", () => {
      const result = template.ast`
        {
          const a = { ${t.identifier("x")} };
          $$$$BABEL_TPL$0;
        }
      `;

      expect(generator(result).code).toMatchInlineSnapshot(`
        "{
          const a = {
            x
          };
          $$$$BABEL_TPL$0;
        }"
      `);
    });
  });

  describe(".syntacticPlaceholders", () => {
    it("works in function body", () => {
      const output = template(`function f() %%A%%`)({
        A: t.blockStatement([]),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"function f() {}"`);
    });

    it("works in class body", () => {
      const output = template(`class C %%A%%`)({
        A: t.classBody([]),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"class C {}"`);
    });

    it("replaces lowercase names", () => {
      const output = template(`%%foo%%`)({
        foo: t.numericLiteral(1),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"1;"`);
    });

    it("pattern", () => {
      expect(() => {
        template(`%%A%% + %%B%%`, {
          placeholderPattern: /B/,
        })();
      }).toThrow(/aren't compatible with '.syntacticPlaceholders: true'/);
    });

    it("whitelist", () => {
      expect(() => {
        template(`%%A%% + %%B%%`, {
          placeholderPattern: false,
          placeholderWhitelist: new Set(["B"]),
        })();
      }).toThrow(/aren't compatible with '.syntacticPlaceholders: true'/);
    });

    describe("option value", () => {
      describe("true", () => {
        it("allows placeholders", () => {
          const output = template(`%%FOO%%`, { syntacticPlaceholders: true })({
            FOO: t.numericLiteral(1),
          });
          expect(generator(output).code).toMatchInlineSnapshot(`"1;"`);
        });

        it("doesn't replace identifiers", () => {
          expect(() => {
            template(`FOO`, { syntacticPlaceholders: true })({
              FOO: t.numericLiteral(1),
            });
          }).toThrow(/Unknown substitution/);
        });
      });

      describe("false", () => {
        it("disallow placeholders", () => {
          expect(() => {
            template(`%%FOO%%`, { syntacticPlaceholders: false })({
              FOO: t.numericLiteral(1),
            });
          }).toThrow(/Unexpected token.*/);
        });

        it("disallow manually enabled placeholders", () => {
          expect(() => {
            template(`%%FOO%%`, {
              syntacticPlaceholders: false,
              plugins: ["placeholders"],
            })({
              FOO: t.numericLiteral(1),
            });
          }).toThrow(/%%.*placeholders can't be used/);
        });

        it("replaces identifiers", () => {
          const output = template(`FOO`, { syntacticPlaceholders: false })({
            FOO: t.numericLiteral(1),
          });
          expect(generator(output).code).toMatchInlineSnapshot(`"1;"`);
        });

        it("allows v8intrinsics", () => {
          const output = template(`%DebugPrint(1)`, {
            syntacticPlaceholders: false,
            plugins: ["v8intrinsic"],
          })();
          expect(generator(output).code).toMatchInlineSnapshot(
            `"%DebugPrint(1);"`,
          );
        });
      });

      describe("undefined", () => {
        it("allows placeholders", () => {
          const output = template(`%%FOO%%`)({
            FOO: t.numericLiteral(1),
          });
          expect(generator(output).code).toMatchInlineSnapshot(`"1;"`);
        });

        it("replaces identifiers", () => {
          const output = template(`FOO`)({
            FOO: t.numericLiteral(1),
          });
          expect(generator(output).code).toMatchInlineSnapshot(`"1;"`);
        });

        it("doesn't mix placeholder styles", () => {
          const output = template(`FOO + %%FOO%%`)({
            FOO: t.numericLiteral(1),
          });
          expect(generator(output).code).toMatchInlineSnapshot(`"FOO + 1;"`);
        });
      });
    });

    it("works in var declaration", () => {
      const output = template("var %%LHS%% = %%RHS%%")({
        LHS: t.identifier("x"),
        RHS: t.numericLiteral(7),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"var x = 7;"`);
    });

    it("works in const declaration", () => {
      const output = template("const %%LHS%% = %%RHS%%")({
        LHS: t.identifier("x"),
        RHS: t.numericLiteral(7),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"const x = 7;"`);
    });

    it("works in let declaration", () => {
      const output = template("let %%LHS%% = %%RHS%%")({
        LHS: t.identifier("x"),
        RHS: t.numericLiteral(7),
      });
      expect(generator(output).code).toMatchInlineSnapshot(`"let x = 7;"`);
    });

    it("should keep node props", () => {
      const outputs = [
        template({ plugins: ["typescript"] }).ast`
          const ${t.identifier("greeting")}: string = 'Hello';
        `,
        template({ plugins: ["typescript"] }).ast`
          var ${t.objectPattern([])}: string = x;
        `,
        template({ plugins: ["decorators-legacy"] }).ast`
          class X {
            f(@dec ${t.identifier("x")}) {}
          }
        `,
        template({ plugins: ["typescript"] }).ast`
          function f(${t.identifier("x")}?) {}
        `,
        template({ plugins: ["typescript"] }).ast`
          function f(${Object.assign(t.identifier("x"), { optional: true })}: string) {}
        `,
        template({ plugins: ["decorators-legacy"] }).ast`
          class X {
            f(@dec ${Object.assign(t.identifier("x"), { optional: true })}) {}
          }
        `,
        template({ plugins: ["typescript"] }).ast`
          function f(${Object.assign(t.identifier("x"), { typeAnnotation: t.tsTypeAnnotation(t.tsStringKeyword()) })}: number) {}
        `,
      ];

      expect(outputs.map(ast => generator(ast).code)).toMatchInlineSnapshot(`
        Array [
          "const greeting: string = 'Hello';",
          "var {}: string = x;",
          "class X {
          f(@dec
          x) {}
        }",
          "function f(x?) {}",
          "function f(x?: string) {}",
          "class X {
          f(@dec
          x?) {}
        }",
          "function f(x: number) {}",
        ]
      `);
    });
  });
});
