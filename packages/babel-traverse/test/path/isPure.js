import { parse } from "@babel/parser";

import _traverse from "../../lib/index.js";
const traverse = _traverse.default;

function getPath(code, options) {
  const ast = parse(code, options);
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
    ["({ x: 1, foo() { return 1 } })", "body.0.expression"],
    ["let a = 1; `${a}`", "body.1.expression"],
    ["String.raw`foo`", "body.0.expression"],
  ])(`NodePath(%p).get(%p).isPure() should be true`, (input, pathSpec) => {
    expect(getPath(input).get(pathSpec).isPure()).toBe(true);
  });
});

describe("isPure() returns false", () => {
  it.each([
    ["class X { get foo() { return 1 } }", "body.0.expression"],
    ["`${a}`", "body.0.expression"],
    ["let a = 1; `${a++}`", "body.1.expression"],
    ["tagged`foo`", "body.0.expression"],
  ])(`NodePath(%p).get(%p).isPure() should be false`, (input, pathSpec) => {
    expect(getPath(input).get(pathSpec).isPure()).toBe(false);
  });
});
