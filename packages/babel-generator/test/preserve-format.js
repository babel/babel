import { parse } from "@babel/parser";
import path from "path";
import fixtures from "@babel/helper-fixtures";
import { commonJS } from "$repo-utils";

import _generate from "../lib/index.js";
const generate = _generate.default || _generate;

const { __dirname } = commonJS(import.meta.url);

const suites = (fixtures.default || fixtures)(path.join(__dirname, "fixtures"));

function removeTrailingSemicolons(code) {
  return code.replace(/ +$/gm, "");
}

describe("preserveFormat", () => {
  suites.forEach(testSuite => {
    describe(`generation/${testSuite.title}`, () => {
      testSuite.tests.forEach(function (task) {
        if (task.options.throws) return;

        const testFn = task.disabled ? it.skip : it;

        testFn(task.title, () => {
          const input = task.actual.code;
          const parserOpts = {
            filename: task.actual.loc,
            plugins: task.options.plugins || [],
            strictMode: task.options.strictMode === false ? false : true,
            sourceType: "module",
            ...task.options.parserOpts,
            createParenthesizedExpressions: true,
            tokens: true,
          };
          const ast = parse(input, parserOpts);
          const options = {
            sourceFileName: path.relative(__dirname, task.actual.loc),
            ...task.options,
            retainLines: true,
            preserveFormat: true,
            comments: true,
            // TODO: Disallow these when preserveFormat is used
            minified: false,
            compact: false,
          };

          const ok =
            removeTrailingSemicolons(generate(ast, options).code) ===
            removeTrailingSemicolons(input);
          const shouldFail = FAILURES.some(f => task.actual.loc.endsWith(f));

          if (!ok && shouldFail) {
            expect(1).toBe(1);
            return;
          }
          if (ok) {
            expect(shouldFail).toBe(false);
          }

          expect(removeTrailingSemicolons(generate(ast, options).code)).toBe(
            removeTrailingSemicolons(input),
          );
        });
      });
    });
  });
});

const FAILURES = [
  "auto-indentation/hard-tab/input.js",
  "comments/decorators-after-export-to-before/input.js",
  "comments/decorators-before-export-to-after/input.js",
  "comments/decorators-before-export-to-before/input.js",
  "comments/decorators-legacy-before-export/input.js",
  "comments/newlines/input.js",
  "decorators/decorator-call-expression/input.js",
  "decorators/decorator-parenthesized-expression/input.js",
  "decorators/decorator-parenthesized-expression-createParenthesizedExpression/input.js",
  "decorators-legacy/ts-class-modifier-with-retainlines/input.js",
  "decoratorsBeforeExport/false-to-true/input.js",
  "decoratorsBeforeExport/true-to-false/input.js",
  "decoratorsBeforeExport/true-to-true/input.js",
  "edgecase/large-file-concise/input.js",
  "escapes/numeric-literals/input.js",
  "flow/array-types/input.js",
  "flow/arrow-functions/input.js",
  "flow/call-properties/input.js",
  "flow/declare-module/input.js",
  "flow/declare-exports/input.js",
  "flow/declare-statements/input.js",
  "flow/indexed-access-types/input.js",
  "flow/interfaces-module-and-script/input.js",
  "flow/iterator-inside-declare/input.js",
  "flow/iterator-inside-interface/input.js",
  "flow/iterator-inside-types/input.js",
  "flow/object-literal-types/input.js",
  "flow/opaque-type-alias/input.js",
  "flow/parantheses/input.js",
  "flow/this-param/input.js",
  "flow/tuples/input.js",
  "flow/type-alias/input.js",
  "flow/type-annotations/input.js",
  "flow/type-union-intersection/input.js",
  "flow/typecasts/input.js",
  "flowUsesCommas/ObjectExpression/input.js",
  "importAttributesKeyword/assertions-assert-to-with/input.js",
  "importAttributesKeyword/assertions-assert-to-with-legacy/input.js",
  "importAttributesKeyword/assertions-with-to-assert/input.js",
  "importAttributesKeyword/assertions-with-to-default/input.js",
  "importAttributesKeyword/assertions-with-to-with-legacy/input.js",
  "importAttributesKeyword/attributes-assert-to-default/input.js",
  "importAttributesKeyword/attributes-assert-to-with/input.js",
  "importAttributesKeyword/attributes-assert-to-with-legacy/input.js",
  "importAttributesKeyword/attributes-with-to-assert/input.js",
  "importAttributesKeyword/attributes-with-to-default/input.js",
  "importAttributesKeyword/attributes-with-to-with-legacy/input.js",
  "importAttributesKeyword/legacy-module-attributes-to-assert/input.js",
  "importAttributesKeyword/legacy-module-attributes-to-with/input.js",
  "parentheses/class-extends/input.js",
  "parentheses/update-expression/input.js",
  "regression/comment-before-parentheses-return-arg/input.js",
  "regression/comment-before-parentheses-return-arg-createParenthesizedExpressions/input.js",
  "sourcemaps/comment-before-parentheses-return-arg/input.js",
  "sourcemaps/comment-before-parentheses-return-arg-createParenthesizedExpressions/input.js",
  "sourcemaps/function-identifier-name/input.js",
  "sourcemaps/real-world-babel-file1/input.ts",
  "sourcemaps/real-world-babel-file2/input.ts",
  "types/ClassBody-ClassProperty/input.js",
  "types/Decorator/input.js",
  "types/ImportAssertion/input.js",
  "typescript/arrow-function-async-generic/input.js",
  "typescript/arrow-function-generic/input.js",
  "typescript/cast-need-parentheses/input.js",
  "typescript/class-modifiers-properties/input.js",
  "typescript/declare-destructure/input.js",
  "typescript/enum-members/input.js",
  "typescript/enum-members-reserved-words/input.js",
  "typescript/enum-members-strings/input.js",
  "typescript/export-declare/input.js",
  "typescript/interface-property-named-public/input.js",
  "typescript/interface-separators/input.js",
  "typescript/module-namespace-head/input.js",
  "typescript/module-namespace-head-declare/input.js",
  "typescript/module-namespace-head-export/input.js",
  "typescript/satisfies/input.js",
  "typescript/types-union-intersection/input.js",
  "typescript/types-with-comments-retainLines/input.js",
];
