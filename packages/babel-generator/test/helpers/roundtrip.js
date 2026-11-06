import { parse } from "@babel/parser";
import path from "node:path";
import fixtures, { multiple as multipleFixtures } from "@babel/helper-fixtures";
import { commonJS } from "$repo-utils";

import generate from "../../lib/index.js";

const { __dirname } = commonJS(import.meta.url);

const GENERATOR_FIXTURES = path.join(__dirname, "../fixtures");
const PARSER_FIXTURES = path.join(
  __dirname,
  "../../../babel-parser/test/fixtures",
);

// Fixtures whose AST is expected to change shape, relative to `test/fixtures`
const GENERATOR_FAILURES = [
  // The generator removes parentheses around associative operators, such
  // as `a && (b && c)` or `a, (b, c)`, which changes the shape of the AST
  "parentheses/expression/input.js",
  "parentheses/nullish-coalescing/input.js",
  "parentheses/sequence-expressions/input.js",
  "parentheses/ts-union-type/input.ts",
  "types/LogicalExpression/input.js",

  // `(a.b<c>)\`\`` is printed as `a.b<c>\`\``, which has the same runtime
  // semantics but is parsed as a tagged template with type arguments
  "parentheses/ts-tagged-template-expression/input.ts",
];

// Parser fixtures whose AST is expected to change shape, relative to
// `babel-parser/test/fixtures`
const PARSER_FAILURES = [
  // `({ a: a = 1 } = {})` is printed as `({ a = 1 } = {})`
  "esprima/es2015-destructuring-assignment-object-pattern/object-pattern-assignment/input.js",

  // A parenthesized string at the start of a program is printed as a
  // directive
  "es2019/json-strings/string-line-separator/input.js",
  "es2019/json-strings/string-paragraph-separator/input.js",

  // `import {} from %%FILE%%` is printed as `import %%FILE%%;`, which is
  // parsed without `attributes`
  "placeholders/import/file-empty/input.mjs",
];

// Parser fixtures whose generated code is expected to be rejected by the
// parser, relative to `babel-parser/test/fixtures`
const PARSER_REPARSE_ERRORS = [
  // `("use strict");` is printed as a directive, so the `"\5"` that follows
  // is rejected in strict mode
  "core/categorized/not-directive/input.js",

  // The parenthesized right-hand side of a bind expression loses its
  // parentheses
  "experimental/bind-operator/binary-parenthesized-import-call/input.js",
  "experimental/bind-operator/binary-parenthesized-super-call/input.js",
  "experimental/bind-operator/parenthesized-arrow-callee/input.js",

  // The parser rejects `export async from "async";`
  "experimental/export-extensions/default-escaped/input.js",

  // The typescript plugin rejects `interface;` in sloppy mode
  "annex-b/enabled/1.1-html-comments-open-ts-interface/input.js",
];

// Keys that are expected to differ between the original AST and the AST of
// the generated output.
const IGNORED_KEYS = new Set([
  "start",
  "end",
  "loc",
  "range",
  "comments",
  "leadingComments",
  "innerComments",
  "trailingComments",
  "tokens",
]);
// `raw` is ignored since literals are re-formatted by `minified` and
// `jsescOption`
const IGNORED_EXTRA_KEYS = new Set([
  "parenthesized",
  "parenStart",
  "raw",
  "trailingComma",
  "trailingCommaLoc",
]);

function normalize(value, ignoredKeys = IGNORED_KEYS) {
  if (Array.isArray(value)) return value.map(v => normalize(v));
  if (typeof value === "bigint") return `${value}n`;
  if (value === null || typeof value !== "object") return value;

  const result = {};
  for (const key of Object.keys(value)) {
    if (ignoredKeys.has(key)) continue;
    const normalized =
      key === "extra"
        ? normalize(value[key], IGNORED_EXTRA_KEYS)
        : normalize(value[key]);
    if (
      key === "extra" &&
      normalized != null &&
      Object.keys(normalized).length === 0
    ) {
      continue;
    }
    result[key] = normalized;
  }
  return result;
}

const PASS = 0;
const AST_CHANGE = 1;
const REPARSE_ERROR = 2;

function roundtrip(task, parserOpts, generatorOpts, expectedResult) {
  const testFn = task.disabled ? it.skip : it;

  testFn(task.title, () => {
    const input = task.actual.code;
    const ast = parse(input, parserOpts);
    const { code } = generate(ast, generatorOpts, input);

    let actual;
    try {
      actual = normalize(parse(code, parserOpts).program);
    } catch (error) {
      actual = error;
    }
    const expected = normalize(ast.program);

    if (expectedResult === AST_CHANGE) {
      expect(actual).not.toBeInstanceOf(Error);
      expect(actual).not.toEqual(expected);
    } else if (expectedResult === REPARSE_ERROR) {
      expect(actual).toBeInstanceOf(SyntaxError);
    } else {
      expect([code, actual]).toEqual([code, expected]);
    }
  });
}

function expectedResultOf(root, task, astChanges, reparseErrors = []) {
  const name = path.relative(root, task.actual.loc).replace(/\\/g, "/");
  if (astChanges.includes(name)) return AST_CHANGE;
  if (reparseErrors.includes(name)) return REPARSE_ERROR;
  return PASS;
}

function hasPlugin(plugins, name) {
  return plugins?.some(p => (Array.isArray(p) ? p[0] : p) === name);
}

/**
 * Generates code from every generator and parser fixture, parses it again and
 * compares the two ASTs.
 *
 * @param {object} [generatorOpts] Generator options forced on every fixture,
 *   overriding the fixture's own options
 */
export default function runRoundtripTests(generatorOpts = {}) {
  describe("generator fixtures", () => {
    fixtures(GENERATOR_FIXTURES).forEach(testSuite => {
      describe(`${testSuite.title}`, () => {
        testSuite.tests.forEach(task => {
          if (task.options.throws || task.options.expectedReParseError) return;
          if (!task.actual.code) return;

          roundtrip(
            task,
            {
              filename: task.actual.loc,
              plugins: task.options.plugins || [],
              strictMode: task.options.strictMode === false ? false : true,
              sourceType: "module",
              ...task.options.parserOpts,
            },
            {
              ...task.options,
              sourceMaps: false,
              retainLines: false,
              ...generatorOpts,
            },
            expectedResultOf(GENERATOR_FIXTURES, task, GENERATOR_FAILURES),
          );
        });
      });
    });
  });

  describe("parser fixtures", () => {
    for (const [name, testSuites] of Object.entries(
      multipleFixtures(PARSER_FIXTURES),
    )) {
      describe(`${name}`, () => {
        testSuites.forEach(testSuite => {
          describe(`${testSuite.title}`, () => {
            testSuite.tests.forEach(task => {
              const { throws, ...parserOpts } = task.options;
              if (throws || !task.actual.code) return;
              // The generator does not support ESTree
              if (hasPlugin(parserOpts.plugins, "estree")) return;
              // Skip inputs with recoverable errors
              if (JSON.parse(task.expect.code || "{}").errors) return;

              const pipeline = parserOpts.plugins?.find(
                p => Array.isArray(p) && p[0] === "pipelineOperator",
              );

              roundtrip(
                task,
                parserOpts,
                { ...generatorOpts, topicToken: pipeline?.[1].topicToken },
                expectedResultOf(
                  PARSER_FIXTURES,
                  task,
                  PARSER_FAILURES,
                  PARSER_REPARSE_ERRORS,
                ),
              );
            });
          });
        });
      });
    }
  });
}
