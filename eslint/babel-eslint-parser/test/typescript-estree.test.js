import path from "node:path";
import { parseForESLint } from "../lib/index.cjs";
import { ESLint } from "eslint";
import { itDummy, commonJS } from "$repo-utils";

const ESLINT_VERSION = ESLint.version;
const isESLint9 = ESLINT_VERSION.startsWith("9.");
const { require } = commonJS(import.meta.url);

const PROPS_TO_REMOVE = [
  // typescript-eslint generates start/end in the loc object, while Babel generate both start/end and loc
  { key: "start", type: "Node" },
  { key: "end", type: "Node" },

  { key: "importKind", type: "Node" },
  { key: "exportKind", type: "Node" },
  { key: "variance", type: "Node" },
  { key: "typeArguments", type: "Node" },
  { key: "filename", type: null },
  { key: "identifierName", type: null },
  // For legacy estree AST
  { key: "attributes", type: "ImportExpression" },
];

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
      if (isESLint9) {
        // ESLint 9
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
        expect(babelAST).toEqual(tsEstreeAST);
      }
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
      // ["bigint", "0n"],

      ["regexp without flag", `/foo/;`],
      ["regexp u flag", `/foo/dgimsuy;`],
      ["regexp v flag", `/foo/dgimsvy;`],

      ["logical NOT", `!0`],
      ["bitwise NOT", `~0`],
    ])("%s: %s", (_, input) => {
      parseAndAssertSame(input);
    });
  },
);

(isESLint9 ? describe.skip : describe)(
  "typescript-estree test for older ESLint versions",
  () => {
    itDummy("is skipped", () => {});
  },
);
