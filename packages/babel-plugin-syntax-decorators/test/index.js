import { parseSync } from "@babel/core";
import syntaxDecorators from "../lib/index.js";

function makeParser(code, options) {
  return () =>
    parseSync(code, {
      babelrc: false,
      configFile: false,
      plugins: [[syntaxDecorators, options]],
    });
}

describe("'version' option", function () {
  test("is incompatible with the 'legacy' option", function () {
    expect(makeParser("", { version: "legacy", legacy: true })).toThrow(
      /The \.legacy option has been removed in Babel 8. Use .version: "legacy" instead./,
    );
  });

  test("throws on invalid values", function () {
    expect(makeParser("", { version: "2015-02" })).toThrow();
    expect(
      makeParser("", { version: "2015-02", decoratorsBeforeExport: true }),
    ).toThrow();
  });

  test("'2023-11' disallows @(...)()", function () {
    expect(makeParser("@(foo)() class A {}", { version: "2023-11" })).toThrow();
    expect(
      makeParser("@(foo()) class A {}", { version: "2023-11" }),
    ).not.toThrow();
  });

  test("'2023-11' allows decorators both before and after export", function () {
    expect(
      makeParser("@dec export class A {}", { version: "2023-11" }),
    ).not.toThrow();
    expect(
      makeParser("export @dec class A {}", { version: "2023-11" }),
    ).not.toThrow();
  });

  it("is required", function () {
    expect(makeParser("", {})).toThrow();
  });
});
