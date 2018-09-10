import * as t from "../lib";
import { parse } from "@babel/parser";

function parseCode(string) {
  return parse(string, {
    allowReturnOutsideFunction: true,
  }).program.body[0];
}

describe("misc helpers", function() {
  describe("matchesPattern", function() {
    it("matches explicitly", function() {
      const ast = parseCode("a.b.c.d").expression;
      expect(t.matchesPattern(ast, "a.b.c.d")).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c")).toBe(false);
      expect(t.matchesPattern(ast, "b.c.d")).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e")).toBe(false);
    });

    it("matches partially", function() {
      const ast = parseCode("a.b.c.d").expression;
      expect(t.matchesPattern(ast, "a.b.c.d", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "b.c.d", true)).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e", true)).toBe(false);
    });

    it("matches string literal expressions", function() {
      const ast = parseCode("a['b'].c.d").expression;
      expect(t.matchesPattern(ast, "a.b.c.d")).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c")).toBe(false);
      expect(t.matchesPattern(ast, "b.c.d")).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e")).toBe(false);
    });

    it("matches string literal expressions partially", function() {
      const ast = parseCode("a['b'].c.d").expression;
      expect(t.matchesPattern(ast, "a.b.c.d", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "a.b.c", true)).toBeTruthy();
      expect(t.matchesPattern(ast, "b.c.d", true)).toBe(false);
      expect(t.matchesPattern(ast, "a.b.c.d.e", true)).toBe(false);
    });
  });
});
