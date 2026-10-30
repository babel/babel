import { parseExpression } from "@babel/parser";
import _generate from "@babel/generator";
import * as t from "@babel/types";
import {
  buildNamedDefault,
  isAnonymousFunctionDefinition,
  isIdentifierRef,
  preventNamedEvaluation,
} from "../lib/index.js";

const generate = _generate.default || _generate;

const parse = code =>
  parseExpression(code, {
    plugins: ["typescript"],
    createParenthesizedExpressions: true,
  });
const print = node => generate(node).code;
const addHelper = name => t.identifier(`_${name}`);

describe("isAnonymousFunctionDefinition", () => {
  it.each([
    "function () {}",
    "() => {}",
    "async () => {}",
    "class {}",
    "(class {})",
    "(() => {}) as any",
    "(function () {}) satisfies object",
    "(class {})!",
    "<any>(() => {})",
  ])("%s", code => {
    expect(isAnonymousFunctionDefinition(parse(code))).toBe(true);
  });

  it.each(["function f() {}", "class C {}", "(0, () => {})", "x"])(
    "not %s",
    code => {
      expect(isAnonymousFunctionDefinition(parse(code))).toBe(false);
    },
  );
});

describe("isIdentifierRef", () => {
  it("identifier", () => {
    expect(isIdentifierRef(t.identifier("a"))).toBe(true);
  });
  it("parenthesized identifier", () => {
    const id = t.identifier("a");
    id.extra = { parenthesized: true };
    expect(isIdentifierRef(id)).toBe(false);
  });
});

describe("buildNamedDefault", () => {
  it("names a function with setFunctionName", () => {
    expect(
      print(buildNamedDefault(t.identifier("a"), parse("() => {}"), addHelper)),
    ).toBe(`_setFunctionName(() => {}, "a")`);
  });

  it("names a class before its static initializers", () => {
    expect(
      print(buildNamedDefault(t.identifier("C"), parse("class {}"), addHelper)),
    ).toBe("{\n  C: class {}\n}.C");
  });

  it("uses a computed key for __proto__", () => {
    expect(
      print(
        buildNamedDefault(
          t.identifier("__proto__"),
          parse("class {}"),
          addHelper,
        ),
      ),
    ).toBe(`{\n  ["__proto__"]: class {}\n}["__proto__"]`);
  });

  it.each([
    ["a pattern", t.objectPattern([]), "() => {}"],
    ["a named function", t.identifier("a"), "function f() {}"],
    ["another value", t.identifier("a"), "b"],
  ])("keeps %s unchanged", (_, target, code) => {
    const initializer = parse(code);
    expect(buildNamedDefault(target, initializer, addHelper)).toBe(initializer);
  });
});

describe("preventNamedEvaluation", () => {
  it("wraps an anonymous function definition", () => {
    expect(print(preventNamedEvaluation(parse("class {}")))).toBe(
      "0, class {}",
    );
  });
  it("keeps other expressions", () => {
    const expr = parse("f()");
    expect(preventNamedEvaluation(expr)).toBe(expr);
  });
});
