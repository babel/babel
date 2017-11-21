import * as t from "../lib";
import { parse } from "babylon";

describe("validators", function() {
  describe("isNodesEquivalent", function() {
    it("should handle simple cases", function() {
      const mem = t.memberExpression(t.identifier("a"), t.identifier("b"));
      expect(t.isNodesEquivalent(mem, mem)).toBe(true);

      const mem2 = t.memberExpression(t.identifier("a"), t.identifier("c"));
      expect(t.isNodesEquivalent(mem, mem2)).toBe(false);
    });

    it("should handle full programs", function() {
      expect(t.isNodesEquivalent(parse("1 + 1"), parse("1+1"))).toBe(true);
      expect(t.isNodesEquivalent(parse("1 + 1"), parse("1+2"))).toBe(false);
    });

    it("should handle complex programs", function() {
      const program = "'use strict'; function lol() { wow();return 1; }";

      expect(t.isNodesEquivalent(parse(program), parse(program))).toBe(true);

      const program2 = "'use strict'; function lol() { wow();return -1; }";

      expect(t.isNodesEquivalent(parse(program), parse(program2))).toBe(false);
    });

    it("rejects 'await' as an identifier", function() {
      expect(t.isValidIdentifier("await")).toBe(false);
    });
  });

  describe("patterns", function() {
    it("allows nested pattern structures", function() {
      const pattern = t.objectPattern([
        t.objectProperty(
          t.identifier("a"),
          t.objectPattern([
            t.objectProperty(t.identifier("b"), t.identifier("foo")),
            t.objectProperty(
              t.identifier("c"),
              t.arrayPattern([t.identifier("value")]),
            ),
          ]),
        ),
      ]);

      expect(t.isNodesEquivalent(pattern, pattern)).toBe(true);
    });
  });
});
