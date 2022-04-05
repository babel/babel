import { parse } from "@babel/parser";

import _traverse from "../../lib/index.js";
const traverse = _traverse.default;

function getPath(code) {
  const ast = parse(code, {
    plugins: [
      ["decorators", { version: "2021-12", decoratorsBeforeExport: true }],
      ["recordAndTuple", { syntaxType: "hash" }],
      "decoratorAutoAccessors",
      ["pipelineOperator", { proposal: "hack", topicToken: "%" }],
    ],
  });
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

describe("isPure() returns true", () => {
  it.each([
    "class C { [0]() {} }",
    "class C extends class {} {}",
    "class C { static accessor x = 1 }",
    "class C { accessor x = f() }",
    "class C { #x = f() }",
    "@dec class C {}; function dec () {}",
    "class C { static target = new.target }",
  ])(`NodePath(%p).get("body.0").isPure() should be true`, input => {
    const path = getPath(input).get("body.0");
    expect(path.node).toBeTruthy();
    expect(path.isPure()).toBe(true);
  });

  it.each([
    "({ x: 1, foo() { return 1 } })",
    "String.raw`foo`",
    `"a" + "b"`,
    `[function () {}]`,
    `#{ 0: 0, 1n: 1, two: "two"}`,
    `#[0, 1n, "2", \`3\`]`,
    `[,]`,
    `-1 || void 0`,
    `null ?? (true && false)`,
    `this`,
  ])(`NodePath(%p).get("body.0.expression").isPure() should be true`, input => {
    const path = getPath(input).get("body.0.expression");
    expect(path.node).toBeTruthy();
    expect(path.isPure()).toBe(true);
  });

  it.each(["let a = 1; `${a}`", `let a = 1; a |> % + %`])(
    `NodePath(%p).get("body.1.expression").isPure() should be true`,
    input => {
      const path = getPath(input).get("body.1.expression");
      expect(path.node).toBeTruthy();
      expect(path.isPure()).toBe(true);
    },
  );
});

describe("isPure() returns false", () => {
  it.each([
    "class X { get foo() { return 1 } }",
    "@dec() class X {}",
    "class C { @dec foo() {} }",
    "class C { static {} }",
    "class C extends class { [f()] } {}",
  ])(`NodePath(%p).get("body.0").isPure() should be false`, input => {
    const path = getPath(input).get("body.0");
    expect(path.node).toBeTruthy();
    expect(path.isPure()).toBe(false);
  });

  it.each(["`${a}`", "tagged`foo`"])(
    `NodePath(%p).get("body.0.expression").isPure() should be false`,
    input => {
      const path = getPath(input).get("body.0.expression");
      expect(path.node).toBeTruthy();
      expect(path.isPure()).toBe(false);
    },
  );

  it.each(["let a = 1; `${a++}`"])(
    `NodePath(%p).get("body.1.expression").isPure() should be false`,
    input => {
      const path = getPath(input).get("body.1.expression");
      expect(path.node).toBeTruthy();
      expect(path.isPure()).toBe(false);
    },
  );
});
