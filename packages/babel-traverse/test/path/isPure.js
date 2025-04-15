import { parse } from "@babel/parser";
import { IS_BABEL_8 } from "$repo-utils";

import _traverse from "../../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code) {
  const ast = parse(code, {
    plugins: [
      ["decorators", { version: "2023-11", decoratorsBeforeExport: true }],
      ...(IS_BABEL_8() ? [] : [["recordAndTuple", { syntaxType: "hash" }]]),
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
    "class C { static accessor x = 1; accessor y = f() }",
    "class C { #x = f(); static #y }",
    "class C { static target = new.target }",
    "class X { get foo() { return 1 } set foo(v) {} }",
    "class C { static #p = #p in C }",
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
    ...(IS_BABEL_8()
      ? []
      : [`#{ 0: 0, 1n: 1, two: "two"}`, `#[0, 1n, "2", \`3\`]`]),
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
    "@dec() class X {}",
    "@dec class C {}; function dec () {}",
    "class C { @dec foo() {} }",
    "class C { @dec foo }",
    "class C { @dec accessor foo = 1 }",
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

describe("isPure(constantsOnly: true) returns false", () => {
  it.each(["x", "1 + x", "({ [x]: 0 })", "(class { static x = x })"])(
    `NodePath(%p).get("body.0.expression").isPure(/* constantsOnly */true) should be false`,
    input => {
      const path = getPath(input).get("body.0.expression");
      expect(path.node).toBeTruthy();
      expect(path.isPure(true)).toBe(false);
    },
  );
});
