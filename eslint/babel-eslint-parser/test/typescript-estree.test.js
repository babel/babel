import path from "node:path";
import { readFileSync } from "node:fs";
import { parseForESLint } from "../lib/index.cjs";
import { multiple as getFixtures } from "@babel/helper-fixtures";
import unpad from "dedent";
import { ESLint } from "eslint";
import { itDummy, commonJS, IS_BABEL_8, describeBabel8 } from "$repo-utils";

const ESLINT_VERSION = ESLint.version;
const isESLint9 = ESLINT_VERSION.startsWith("9.");
const { require, __dirname } = commonJS(import.meta.url);

const PROPS_TO_REMOVE = [
  // typescript-eslint generates start/end in the loc object, while Babel generate both start/end and loc
  { key: "start", type: "Node" },
  { key: "end", type: "Node" },

  { key: "filename", type: null },
  { key: "identifierName", type: null },
  // For legacy estree AST
  { key: "attributes", type: "ImportExpression" },
];

// TODO: remove the ESLint token fixes after they are fixed in upstream
function fixTSESLintTokens(ast) {
  const { tokens } = ast;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const { type, value } = token;
    switch (type) {
      case "Identifier":
        {
          if (value.match(/^#/)) {
            token.type = "PrivateIdentifier";
            token.value = value.slice(1);
          }
        }
        break;
      case "Keyword":
        {
          if (value === "null") {
            token.type = "Null";
          }
        }
        break;
      default:
        break;
    }
  }
}

function deeplyRemoveProperties(obj, props) {
  for (const [k, v] of Object.entries(obj)) {
    if (
      props.some(
        ({ key, type }) =>
          key === k &&
          ((type === "Node" && obj.type) || type === obj.type || type == null),
      )
    ) {
      delete obj[k];
      continue;
    }

    if (typeof v === "object") {
      if (Array.isArray(v)) {
        for (const el of v) {
          if (el != null) {
            deeplyRemoveProperties(el, props);
          }
        }
      }

      if (v != null) {
        deeplyRemoveProperties(v, props);
      }
    }
  }
}

// Only ESLint 9 or above will be tested
(isESLint9 ? describe : describe.skip)(
  "Babel should output the same AST as TypeScript-Estree",
  () => {
    /**
     * @type {import("@typescript-eslint/typescript-estree")}
     */
    let tsEstree;

    /**
     * @type {import("@typescript-eslint/typescript-estree").TSESTreeOptions}
     */
    const tsEstreeOptions = {
      filePath: "typescript-estree.test.js-test-input.tsx",
      jsx: true,
      tokens: true,
      loc: true,
      range: true,
      comment: true,
      sourceType: "module",
    };

    // The set of babel parser plugins that are always supported by the typescript-eslint
    const tsEslintSupportedParserPlugins = [
      "decorators-legacy",
      "decoratorAutoAccessors",
      "explicitResourceManagement",
      "jsx",
      "typescript",
    ];

    function parseAndAssertSame(code, options = {}, withoutTokens) {
      code = unpad(code);
      const tsEstreeAST = tsEstree.parse(code, tsEstreeOptions);
      const babelAST = parseForESLint(code, {
        eslintVisitorKeys: true,
        eslintScopeManager: true,
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          parserOpts: {
            plugins: tsEslintSupportedParserPlugins,
            ...options,
            // These options are not supported by the Babel eslint-parser
            createParenthesizedExpressions: false,
            // These options are not mirrored by the typescript-eslint/parser
            sourceType:
              options.sourceType === "unambiguous"
                ? "module"
                : options.sourceType,
          },
        },
      }).ast;

      deeplyRemoveProperties(babelAST, PROPS_TO_REMOVE);
      if (withoutTokens) {
        delete babelAST.tokens;
        delete tsEstreeAST.tokens;
      } else {
        fixTSESLintTokens(tsEstreeAST);
      }
      expect(babelAST).toEqual(tsEstreeAST);
    }

    beforeAll(() => {
      // Use the version of TS-Espree that is a dependency of
      // the version of typescript-eslint we are testing against.
      const tsEstreePath = require.resolve(
        "@typescript-eslint/typescript-estree",
        {
          paths: [path.dirname(require.resolve("typescript-eslint"))],
        },
      );

      tsEstree = require(tsEstreePath);
    });

    describe("ecmascript", () => {
      it.each([
        ["empty", ""],
        ["boolean", "true"],
        ["boolean", "false"],
        ["numeric", "0"],
        ["bigint", "0n"],
        ["string", `"string"`],
        ["regexp without flag", `/foo/;`],
        ["regexp u flag", `/foo/dgimsuy;`],
        ["regexp v flag", `/foo/dgimsvy;`],
        ["identifier", "i"],

        ["null", "null"],

        [
          "template with braces",
          `
          { \`\${foo} \${bar}\` }
        `,
        ],

        ["directive", `"use strict";`],

        // https://github.com/typescript-eslint/typescript-eslint/issues/11026
        // ["empty program with line comment", "// single comment"],
        // ["empty program with block comment", "  /* multiline\n * comment\n*/"],

        ["logical NOT", `!0`],
        ["bitwise NOT", `~0`],

        ["nullish coalescing", "a ?? b"],

        ["yield expression", "function *f() { yield; yield* f; yield f }"],
        ["await expression", "async function f() { await f() }"],

        ["function declaration", "function f(p) {}"],
        ["function expression", "0, function f(p) {}"],
        ["arrow function expression", "() => {}"],
        ["async arrow function expression", "async () => {}"],

        ["object method", "({ m() {} })"],
        ["object property", "({ p: 0 })"],

        ["class declaration", "class C {}"],
        ["class expression", "0, class C {}"],
        ["class method", "class C { m() {} }"],
        ["class property", "class C { p; }"],
        ["class static block", "class C { static {}; }"],
        ["class accessor", "class C { accessor a = 0 }"],
        [
          "class decorators",
          "@dec class C { @dec static p; @dec accessor a; }",
        ],

        ["variable declaration", "var a = 0"],
        [
          "variable declaration destructuring",
          "var [{ a: x = 0 }, ...b] = [{ a: 0 }]",
        ],
        [
          "variable declaration destructuring shorthand",
          "var { a = 0 } = { a: 0 }",
        ],
        ["let declaration", "let a = 0"],
        ["const declaration", "const a = 0"],
        ["using declaration", "{ using a = 0 }"],
        ["await using declaration", "async () => { await using a = 0 }"],

        ["assignment expression", "x = 1"],
        [
          "assignment expression destructuring",
          "[{ a: x = 0 }, ...b] = [{ a: 0 }]",
        ],

        ["spread element", "var a = { b, ...[...c] }"],

        ["async call expression", "async ([ x ])"],

        ["import declaration", `import "foo"`],
        ["import declaration default", `import foo from "foo"`],
        ["import declaration named", `import { foo } from "foo"`],
        ["import declaration named as", `import { foo as bar } from "foo"`],
        [
          "import declaration with attributes",
          `import foo from "./foo.json" with { type: "json" }`,
        ],

        ["export declaration", `const foo = 0;export { foo }`],
        ["export declaration as", `const foo = 0;export { foo as bar }`],
        ["export const declaration", `export const foo = 0`],
        ["export declaration from", `export { foo } from "foo"`],
        ["export function declaration", `export function foo() {}`],
        ["export class declaration", `export class foo {}`],

        ["member expression", `foo.bar`],
        ["optional member expression", `foo?.bar`],
        ["call expression", `foo(bar)`],
        ["optional call expression", `foo?.(bar)`],
        ["new expression", `new foo`],

        ["logical assignment", "x ??= y ||= z &&= x"],
      ])("%s: %s", (_, input) => {
        parseAndAssertSame(input);
      });

      if (IS_BABEL_8()) {
        it.each([["class private method", "class C { #m() {} }"]])(
          "%s: %s",
          (_, input) => {
            parseAndAssertSame(input);
          },
        );
      }
    });

    describe("typescript", () => {
      it.each([
        ["type alias", "type T = string"],
        ["property signature", "var v: { foo: string }"],
        ["index signature", "declare class C { [x: string]: unknown }"],

        ["module declaration", "module m { foo: string }"],
        ["module declaration with declare", "declare module m { foo: string }"],

        ["export assignment", "export = foo"],

        ["type query", "var v: typeof T"],
        ["tuple type", "var v: [version: string, number?, ...[]]"],
      ])("%s: %s", (_, input) => {
        parseAndAssertSame(input);
      });

      if (IS_BABEL_8()) {
        it.each([
          ["class abstract property", "abstract class C { abstract p; }"],
          ["class abstract method", "abstract class C { abstract m(): void }"],
          [
            "class abstract accessor property",
            "abstract class C { abstract accessor p; }",
          ],

          ["mapped type", "var v: { [k in string]: unknown }"],
          ["method signature", "var v: { foo(x: string): string; }"],

          ["constructor type", "var v: new (x: string) => string"],
          ["function type", "var v: (x: string) => string"],

          ["conditional type", "type M = T extends Q ? string : number"],
          ["import type", "var v: import('foo')"],
          ["instantiation expression optional chain", "a?.b<c>"],
          ["type parameter", "type Id<T> = T"],

          ["import equals declaration", "import foo = require('foo')"],
        ])("%s: %s", (_, input) => {
          parseAndAssertSame(input);
        });
      }
    });

    describe("typescript without tokens", () => {
      // These examples are tested without tokens because TS keywords such as `enum`, `interface`, `public` etc. form
      // different tokens between espree (identifier) and ts-estree (keyword)
      it.each([
        ["enum declaration", "enum E { foo, bar = 0 }"],
        ["const enum declaration", "const enum E { foo, bar = 0 }"],

        ["interface declaration", "interface I { foo; bar: string }"],

        ["parameter decorators", "class C { constructor(@dec public foo) {} }"],
      ])("%s: %s", (_, input) => {
        parseAndAssertSame(input, undefined, true);
      });
    });

    describeBabel8("babel-parser typescript tests without tokens", () => {
      const projectRoot = path.resolve(__dirname, "../../..");
      const parserTestFixtureRoot = path.resolve(
        projectRoot,
        "./packages/babel-parser/test/fixtures",
      );
      const fixtures = getFixtures(parserTestFixtureRoot);
      const FAILURES = new Set([
        // ts-eslint/tsc does not support arrow generic in tsx mode
        "typescript/arrow-function/async-await-null/input.ts",
        "typescript/arrow-function/async-generic-after-await/input.ts",
        "typescript/arrow-function/async-generic-tokens-true/input.ts",
        "typescript/arrow-function/generic/input.ts",
        "typescript/cast/arrow-in-parens/input.ts",
        "typescript/cast/arrow-in-parens-with-parens-node/input.ts",
        "typescript/regression/async-arrow-generic-9560/input.ts",

        // different program range handling when the program starts/ends with a comment
        // https://github.com/typescript-eslint/typescript-eslint/issues/11026
        "typescript/cast/as/input.ts",
        "typescript/export/internal-comments/input.ts",
        "typescript/import/internal-comments/input.ts",
        "typescript/type-alias/export/input.ts",
        "typescript/types/type-literal/input.ts",

        // ts-eslint/tsc does not support <const> in tsx mode
        "typescript/cast/as-const/input.ts",
        "typescript/types/const-type-parameters/input.ts",

        // ts-eslint/tsc does not support <T> cast in tsx mode
        "typescript/cast/destructure-and-assign/input.ts",
        "typescript/cast/for-of-lhs/input.ts",
        "typescript/cast/need-parentheses/input.ts",
        "typescript/cast/parenthesized-type-assertion-and-assign/input.ts",
        "typescript/cast/type-assertion/input.ts",
        "typescript/cast/type-assertion-after-operator/input.ts",
        "typescript/cast/type-assertion-and-assign/input.ts",
        "typescript/cast/type-assertion-before-operator/input.ts",

        // ts-eslint/tsc does not support this example
        "typescript/regression/nested-extends-in-arrow-type-param/input.ts",
        "typescript/type-arguments-bit-shift-left-like/jsx-opening-element/input.tsx",
      ]);
      for (const [name, testSuites] of Object.entries(fixtures)) {
        if (["typescript"].includes(name)) {
          for (const { tests } of testSuites) {
            for (const test of tests) {
              const testFn = test.disabled ? it.skip : it;
              const options = test.options;
              if (
                options.throws ||
                // Ignore test with unsupported plugins
                (options.plugins || []).some(
                  plugin => !tsEslintSupportedParserPlugins.includes(plugin),
                )
              ) {
                continue;
              }
              const AST = JSON.parse(readFileSync(test.expect.loc, "utf-8"));
              if (AST.errors) {
                continue;
              }
              if (
                FAILURES.has(
                  path
                    .relative(parserTestFixtureRoot, test.actual.loc)
                    .replaceAll("\\", "/"),
                )
              ) {
                testFn(test.actual.loc + " should throw", () => {
                  const input = readFileSync(test.actual.loc, "utf-8");
                  expect(() =>
                    parseAndAssertSame(input, undefined, true),
                  ).toThrow();
                });
              } else {
                testFn(test.actual.loc, () => {
                  const input = readFileSync(test.actual.loc, "utf-8");
                  parseAndAssertSame(input, test.options, true);
                });
              }
            }
          }
        }
      }
    });
  },
);

(isESLint9 ? describe.skip : describe)(
  "typescript-estree test for older ESLint versions",
  () => {
    itDummy("is skipped", () => {});
  },
);
