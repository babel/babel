import { parseSync, traverse } from "@babel/core";
import { isDefaultEvaluationObservable } from "../lib/index.js";

/** The observability of the last expression statement of `code`. */
function isObservable(code) {
  const ast = parseSync(code, {
    configFile: false,
    babelrc: false,
    parserOpts: { plugins: ["throwExpressions"] },
  });
  let result;
  traverse(ast, {
    Program(path) {
      const body = path.get("body");
      const expression = body[body.length - 1].get("expression");
      result = isDefaultEvaluationObservable(expression.node, path.scope);
      path.stop();
    },
  });
  return result;
}

describe("isDefaultEvaluationObservable", () => {
  it.each([
    "1",
    "-1",
    "~1",
    "+1",
    "-1n",
    "~1n",
    `-"a"`,
    "-true",
    "-null",
    "void 0",
    "typeof 1",
    "!0",
    "undefined",
    "NaN",
    "(0, Infinity)",
    "[1, -1]",
    "({ a: -1 })",
    "`${-1}`",
    "() => x",
  ])("%s is not observable", code => {
    expect(isObservable(code)).toBe(false);
  });

  it.each([
    // Pure, but they throw
    "+1n",
    `"a" in "b"`,
    "1 instanceof /re/",
    "(throw 1)",
    // The conversions of objects and bindings can run user code
    "-x",
    "-/re/",
    "-[]",
    "-`${x}`",
    "-(-1)",
    "delete x.y",
    "1 + 2",
    "(0, x)",
    // A binding may be reassigned or in its TDZ
    "let x = 1; x",
    "let undefined; undefined",
    "this",
    // Pure, but globals can be modified
    "Symbol.iterator",
    "String.raw`a`",
  ])("%s is observable", code => {
    expect(isObservable(code)).toBe(true);
  });
});
