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

const babel8 = process.env.BABEL_8_BREAKING ? test : test.skip;
const babel7describe = process.env.BABEL_8_BREAKING ? describe.skip : describe;

babel7describe("'legacy' option", function () {
  test("must be boolean", function () {
    expect(makeParser("", { legacy: "legacy" })).toThrow();
  });

  test("'legacy': false", function () {
    expect(makeParser("({ @dec fn() {} })", { legacy: false })).toThrow();
  });

  test("'legacy': true", function () {
    expect(makeParser("({ @dec fn() {} })", { legacy: true })).not.toThrow();
  });

  test("defaults to 'false'", function () {
    expect(makeParser("({ @dec fn() {} })", {})).toThrow();
  });
});

babel7describe("'decoratorsBeforeExport' option", function () {
  test("must be boolean", function () {
    expect(
      makeParser("", { version: "2021-12", decoratorsBeforeExport: "before" }),
    ).toThrow();
  });

  test("is required with 2018-09 decorators", function () {
    expect(makeParser("", { legacy: false })).toThrow(/decoratorsBeforeExport/);
    expect(makeParser("", { version: "2018-09" })).toThrow(
      /decoratorsBeforeExport/,
    );
  });

  test("is incompatible with legacy", function () {
    expect(
      makeParser("", { decoratorsBeforeExport: false, version: "legacy" }),
    ).toThrow();
  });

  test("is incompatible with legacy when using the 'legacy' option", () => {
    expect(
      makeParser("", { decoratorsBeforeExport: false, legacy: true }),
    ).toThrow();
  });

  test("is optional with 2021-12 decorators", function () {
    expect(makeParser("", { version: "2021-12" })).not.toThrow();
    expect(
      makeParser("", { version: "2021-12", decoratorsBeforeExport: true }),
    ).not.toThrow();
    expect(
      makeParser("", { version: "2021-12", decoratorsBeforeExport: false }),
    ).not.toThrow();
  });

  test("is incompatible with 2022-03 decorators", function () {
    expect(
      makeParser("", { decoratorsBeforeExport: false, version: "2022-03" }),
    ).toThrow();
    expect(
      makeParser("", { decoratorsBeforeExport: true, version: "2022-03" }),
    ).toThrow();
  });

  test("is incompatible with 2023-01 decorators", function () {
    expect(
      makeParser("", { decoratorsBeforeExport: false, version: "2023-01" }),
    ).toThrow();
    expect(
      makeParser("", { decoratorsBeforeExport: true, version: "2023-01" }),
    ).toThrow();
  });

  const BEFORE = "@dec export class Foo {}";
  const AFTER = "export @dec class Foo {}";

  // These are skipped
  run(BEFORE, true, false);
  run(AFTER, true, true);
  run(BEFORE, false, true);
  run(AFTER, false, false);

  function run(code, before, throws) {
    const codeTitle = code === BEFORE ? "before" : "after";
    if (throws) {
      test(`${before} - decorators ${codeTitle} export should throw`, function () {
        expect(
          makeParser(code, {
            version: "2021-12",
            decoratorsBeforeExport: before,
          }),
        ).toThrow();
      });
    } else {
      test(`${before} - decorators ${codeTitle} export should not throw`, function () {
        expect(
          makeParser(code, {
            version: "2021-12",
            decoratorsBeforeExport: before,
          }),
        ).not.toThrow();
      });
    }
  }
});

describe("'version' option", function () {
  test("is incompatible with the 'legacy' option", function () {
    expect(makeParser("", { version: "2018-09", legacy: true })).toThrow();
  });

  test("throws on invalid values", function () {
    expect(makeParser("", { version: "2015-02" })).toThrow();
    expect(
      makeParser("", { version: "2015-02", decoratorsBeforeExport: true }),
    ).toThrow();
  });

  test("'2022-03' disallows @(...)()", function () {
    expect(makeParser("@(foo)() class A {}", { version: "2022-03" })).toThrow();
    expect(
      makeParser("@(foo()) class A {}", { version: "2022-03" }),
    ).not.toThrow();
  });

  test("'2023-01' disallows @(...)()", function () {
    expect(makeParser("@(foo)() class A {}", { version: "2023-01" })).toThrow();
    expect(
      makeParser("@(foo()) class A {}", { version: "2023-01" }),
    ).not.toThrow();
  });

  test("'2023-01' allows decorators both before and after export", function () {
    expect(
      makeParser("@dec export class A {}", { version: "2023-01" }),
    ).not.toThrow();
    expect(
      makeParser("export @dec class A {}", { version: "2023-01" }),
    ).not.toThrow();
  });

  babel8("is required", function () {
    expect(makeParser("", {})).toThrow();
  });
});
