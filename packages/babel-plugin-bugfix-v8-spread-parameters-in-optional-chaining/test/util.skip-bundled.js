import { shouldTransform } from "../lib/util.js";
import { parseSync, traverse } from "@babel/core";

function getPath(input, parserOpts = {}) {
  let targetPath;
  traverse(
    parseSync(input, {
      parserOpts,
      filename: "example.js",
      configFile: false,
    }),
    {
      "OptionalMemberExpression|OptionalCallExpression"(path) {
        targetPath = path;
        path.stop();
      },
      noScope: true,
    },
  );
  return targetPath;
}

describe("shouldTransform", () => {
  const positiveCases = [
    "fn?.(...[], 0)",
    "fn?.(...[], ...[])",
    "fn?.(0, ...[], ...[])",
    "a?.b(...[], 0)",
    "a?.[b](...[], 0)",
    "a?.b?.(...[], 0)",
    "fn?.(0, ...[], 0)",
    "a?.b?.(0, ...[], 0)",
    "(a?.b)?.(...[], 0)",
    "a?.b.c?.(...[], 0)",
    "class C { #c; p = obj?.#c(...[], 0) }",
    "class C { #c; p = obj.#c?.(...[], 0) }",
  ];

  const negativeCases = [
    "a?.b",
    "fn?.(1)",
    "fn?.(...[])",
    "fn?.(1, ...[])",
    "a?.b(...[])",
    "a?.()(...[], 1)", // optional call under optional call is not affected
    "(a?.b)(...[], 1)", // not an optional call
    "a?.b.c(...[], 1)",
    "a?.[fn?.(...[], 0)]", // optional chain in property will be handled when traversed
    "a?.(fn?.(...[], 0))", // optional chain in arguments will be handled when traversed
    "class C { #c; p = obj?.#c(...[]) }",
  ];

  const typescriptPositiveCases = [
    "(a?.(...[], 0) as any)?.b",
    "(a?.(...[], 0) as any)?.()",
  ];

  const typescriptNegativeCases = ["(a?.b as any)(...[], 0)"];

  describe("default parser options", () => {
    test.each(positiveCases)(
      "shouldTransform(a?.b in %p) should return true",
      input => {
        expect(shouldTransform(getPath(input))).toBe(true);
      },
    );
    test.each(negativeCases)(
      "shouldTransform(a?.b in %p) should return false",
      input => {
        expect(shouldTransform(getPath(input))).toBe(false);
      },
    );
  });

  describe("createParenthesizedExpressions", () => {
    test.each(positiveCases)(
      "shouldTransform(a?.b in %p with { createParenthesizedExpressions: true }) should return true",
      input => {
        const parserOpts = { createParenthesizedExpressions: true };
        expect(shouldTransform(getPath(input, parserOpts))).toBe(true);
      },
    );
    test.each(negativeCases)(
      "shouldTransform(a?.b in %p with { createParenthesizedExpressions: true }) should return false",
      input => {
        const parserOpts = { createParenthesizedExpressions: true };
        expect(shouldTransform(getPath(input, parserOpts))).toBe(false);
      },
    );
  });

  describe("plugins: [typescript]", () => {
    test.each(positiveCases.concat(typescriptPositiveCases))(
      "shouldTransform(a?.b in %p with { plugins: [typescript] }) should return true",
      input => {
        const parserOpts = { plugins: ["typescript"] };
        expect(shouldTransform(getPath(input, parserOpts))).toBe(true);
      },
    );
    test.each(negativeCases.concat(typescriptNegativeCases))(
      "shouldTransform(a?.b in %p with { plugins: [typescript] }) should return false",
      input => {
        const parserOpts = { plugins: ["typescript"] };
        expect(shouldTransform(getPath(input, parserOpts))).toBe(false);
      },
    );
  });
});
