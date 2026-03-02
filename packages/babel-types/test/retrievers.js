import * as t from "../lib/index.js";
import { parse } from "@babel/parser";

function getBody(program) {
  return parse(program, { sourceType: "module" }).program.body;
}

describe("retrievers", function () {
  describe("getBindingIdentifiers", function () {
    it.each([
      [
        "variable declarations",
        getBody("var a = 1; let b = 2; const c = 3;"),
        ["a", "b", "c"],
      ],
      [
        "function declarations",
        getBody("var foo = 1; function bar() { var baz = 2; }"),
        ["bar", "foo"],
      ],
      [
        "object methods",
        getBody("({ a(b) { let c } })")[0].expression.properties[0],
        ["b"],
      ],
      [
        "class methods",
        getBody("(class { a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "class private methods",
        getBody("(class { #a(b) { let c } })")[0].expression.body.body,
        ["b"],
      ],
      [
        "export named declarations",
        getBody("export const foo = 'foo';"),
        ["foo"],
      ],
      [
        "export default class declarations",
        getBody("export default class foo {}"),
        ["foo"],
      ],
      [
        "export default referenced identifiers",
        getBody("export default foo"),
        [],
      ],
      ["export all declarations", getBody("export * from 'x'"), []],
      [
        "export all as namespace declarations",
        getBody("export * as ns from 'x'"),
        [], // exported bindings are not associated with declarations
      ],
      [
        "export namespace specifiers",
        getBody("export * as ns from 'x'")[0].specifiers,
        ["ns"],
      ],
      [
        "object patterns",
        getBody("const { a, b: { ...c } = { d } } = {}"),
        ["a", "c"],
      ],
      [
        "array patterns",
        getBody("var [ a, ...{ b, ...c } ] = {}"),
        ["a", "b", "c"],
      ],
      ["update expression", getBody("++x")[0].expression, ["x"]],
      ["assignment expression", getBody("x ??= 1")[0].expression, ["x"]],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
});
