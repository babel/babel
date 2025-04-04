import path from "node:path";
import { parseForESLint } from "../lib/index.cjs";
import unpad from "dedent";
import { ESLint } from "eslint";
import { itDummy, commonJS, IS_BABEL_8 } from "$repo-utils";

const ESLINT_VERSION = ESLint.version;
const isESLint9 = ESLINT_VERSION.startsWith("9.");
const { require } = commonJS(import.meta.url);

const PROPS_TO_REMOVE = [
  // typescript-eslint generates start/end in the loc object, while Babel generate both start/end and loc
  { key: "start", type: "Node" },
  { key: "end", type: "Node" },

  { key: "variance", type: "Node" },
  { key: "typeArguments", type: "Node" },
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
          if (value.match(/^\d.*n$/)) {
            token.type = "Numeric";
          } else if (value.match(/^#/)) {
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

    function parseAndAssertSame(code, babelEcmaFeatures = null) {
      code = unpad(code);
      const tsEstreeAST = tsEstree.parse(code, tsEstreeOptions);
      const babelAST = parseForESLint(code, {
        eslintVisitorKeys: true,
        eslintScopeManager: true,
        ecmaFeatures: babelEcmaFeatures,
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          parserOpts: {
            plugins: ["jsx", "typescript"],
          },
        },
      }).ast;

      deeplyRemoveProperties(babelAST, PROPS_TO_REMOVE);
      fixTSESLintTokens(tsEstreeAST);
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

      // https://github.com/typescript-eslint/typescript-eslint/issues/11026
      // ["empty program with line comment", "// single comment"],
      // ["empty program with block comment", "  /* multiline\n * comment\n*/"],

      ["logical NOT", `!0`],
      ["bitwise NOT", `~0`],

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

      ["variable declaration", "var a = 0"],
      [
        "variable declaration destructuring",
        "var [{ a: x = 0 }, ...b] = [{ a: 0 }]",
      ],
      [
        "variable declaration destructuring shorthand",
        "var { a = 0 } = { a: 0 }",
      ],

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
      it.each([
        ["class private method", "class C { #m() {} }"],
        ["class abstract property", "abstract class C { abstract p; }"],
        [
          "class abstract private property",
          "abstract class C { abstract #p; }",
        ][("class abstract method", "abstract class C { abstract m(): void }")],
      ])("%s: %s", (_, input) => {
        parseAndAssertSame(input);
      });
    }
  },
);

(isESLint9 ? describe.skip : describe)(
  "typescript-estree test for older ESLint versions",
  () => {
    itDummy("is skipped", () => {});
  },
);
