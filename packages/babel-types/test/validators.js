import * as t from "../lib";
import { parse } from "@babel/parser";

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

  describe("isCompatTag", function() {
    it("should handle lowercase tag names", function() {
      expect(t.react.isCompatTag("div")).toBe(true);
      expect(t.react.isCompatTag("a")).toBe(true); // one letter
      expect(t.react.isCompatTag("h3")).toBe(true); // letters and numbers
    });

    it("should handle custom element tag names", function() {
      expect(t.react.isCompatTag("plastic-button")).toBe(true); // ascii letters
      expect(t.react.isCompatTag("math-α")).toBe(true); // non-latin chars
      expect(t.react.isCompatTag("img-viewer2")).toBe(true); // numbers
      expect(t.react.isCompatTag("emotion-😍")).toBe(true); // emoji
    });

    it("accepts trailing dash '-' in custom element tag names", function() {
      expect(t.react.isCompatTag("div-")).toBe(true);
      expect(t.react.isCompatTag("a-")).toBe(true);
      expect(t.react.isCompatTag("h3-")).toBe(true);
    });

    it("rejects empty or null tag names", function() {
      expect(t.react.isCompatTag(null)).toBe(false);
      expect(t.react.isCompatTag()).toBe(false);
      expect(t.react.isCompatTag(undefined)).toBe(false);
      expect(t.react.isCompatTag("")).toBe(false);
    });

    it("rejects tag names starting with an uppercase letter", function() {
      expect(t.react.isCompatTag("Div")).toBe(false);
      expect(t.react.isCompatTag("A")).toBe(false);
      expect(t.react.isCompatTag("H3")).toBe(false);
    });

    it("rejects all uppercase tag names", function() {
      expect(t.react.isCompatTag("DIV")).toBe(false);
      expect(t.react.isCompatTag("A")).toBe(false);
      expect(t.react.isCompatTag("H3")).toBe(false);
    });

    it("rejects leading dash '-'", function() {
      expect(t.react.isCompatTag("-div")).toBe(false);
      expect(t.react.isCompatTag("-a")).toBe(false);
      expect(t.react.isCompatTag("-h3")).toBe(false);
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
