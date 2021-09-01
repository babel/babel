import * as t from "../lib";
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
        "export named declarations",
        getBody("export const foo = 'foo';"),
        ["foo"],
      ],
    ])("%s", (_, program, bindingNames) => {
      const ids = t.getBindingIdentifiers(program);
      expect(Object.keys(ids)).toEqual(bindingNames);
    });
  });
});
