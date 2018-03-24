import * as t from "../lib";
import { parse } from "babylon";

function getBody(program) {
  return parse(program, { sourceType: "module" }).program.body;
}

describe("retrievers", function() {
  describe("getBindingIdentifiers", function() {
    it("variable declarations", function() {
      const program = "var a = 1; let b = 2; const c = 3;";
      const ids = t.getBindingIdentifiers(getBody(program));
      expect(Object.keys(ids)).toEqual(["a", "b", "c"]);
    });
    it("function declarations", function() {
      const program = "var foo = 1; function bar() { var baz = 2; }";
      const ids = t.getBindingIdentifiers(getBody(program));
      expect(Object.keys(ids)).toEqual(["bar", "foo"]);
    });
    it("export named declarations", function() {
      const program = "export const foo = 'foo';";
      const ids = t.getBindingIdentifiers(getBody(program));
      expect(Object.keys(ids)).toEqual(["foo"]);
    });
  });
});
