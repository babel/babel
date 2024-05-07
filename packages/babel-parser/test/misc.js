import { parse } from "../lib/index.js";

describe("misc", () => {
  describe("Program.extra.async", () => {
    it("not set for scripts", () => {
      const ast = parse("function f() {}", { sourceType: "script" });
      expect(
        ast.program.extra && ast.program.extra.topLevelAwait,
      ).toBeUndefined();
    });

    test.each([
      `await 0;`,
      `foo; await 0;`,
      `f(await 0);`,
      `if (false) await 0;`,
      `{ await 0 }`,
      `({ x: await 0 })`,
      `({ [await 0]: 0 })`,
      `({ [await 0]() {} })`,
      `({ async [await 0]() {} })`,
      `class X extends (await 0) {}`,
      `class X { [await 0]() {} }`,
      `class X { async [await 0]() {} }`,
      `for await (x of []) {}`,
      `for (await using x of y) {}`,
      `await using x = y;`,
      `@(await 0) class X {}`,
      `class A { @(await 0) x() {} }`,
      `class A { @(await 0) async x() {} }`,
    ])("true for %p", code => {
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["explicitResourceManagement", "decorators"],
      });
      expect(ast.program.extra.topLevelAwait).toBe(true);
    });

    test.each([
      `x + y`,
      `async function x() { await 0;} `,
      `async () => await 0`,
      `async () => { await 0 }`,
      `({ async x() { await 0 } })`,
      `class X { async x() { await 0 } }`,
      `for (x of y) {}`,
      `using x = y;`,
    ])("false for %p", code => {
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["explicitResourceManagement"],
      });
      expect(ast.program.extra.topLevelAwait).toBe(false);
    });
  });
});
