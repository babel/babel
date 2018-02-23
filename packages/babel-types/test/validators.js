import * as t from "../lib";
import assert from "assert";
import { parse } from "babylon";

suite("validators", function() {
  suite("isNodesEquivalent", function() {
    it("should handle simple cases", function() {
      const mem = t.memberExpression(t.identifier("a"), t.identifier("b"));
      assert(t.isNodesEquivalent(mem, mem) === true);

      const mem2 = t.memberExpression(t.identifier("a"), t.identifier("c"));
      assert(t.isNodesEquivalent(mem, mem2) === false);
    });

    it("should handle full programs", function() {
      assert(t.isNodesEquivalent(parse("1 + 1"), parse("1+1")) === true);
      assert(t.isNodesEquivalent(parse("1 + 1"), parse("1+2")) === false);
    });

    it("should handle complex programs", function() {
      const program = "'use strict'; function lol() { wow();return 1; }";

      assert(t.isNodesEquivalent(parse(program), parse(program)) === true);

      const program2 = "'use strict'; function lol() { wow();return -1; }";

      assert(t.isNodesEquivalent(parse(program), parse(program2)) === false);
    });

    it("rejects 'await' as an identifier", function() {
      assert(t.isValidIdentifier("await") === false);
    });
  });

  suite("isCompatTag", function() {
    it("should handle lowercase tag names", function() {
      assert(t.react.isCompatTag("div"));
      assert(t.react.isCompatTag("a")); // one letter
      assert(t.react.isCompatTag("h3")); // letters and numbers
    });

    it("should handle custom element tag names", function() {
      assert(t.react.isCompatTag("plastic-button")); // ascii letters
      assert(t.react.isCompatTag("math-α")); // non-latin chars
      assert(t.react.isCompatTag("img-viewer2")); // numbers
      assert(t.react.isCompatTag("emotion-😍")); // emoji
    });

    it("accepts trailing dash '-' in custom element tag names", function() {
      assert(t.react.isCompatTag("div-"));
      assert(t.react.isCompatTag("a-"));
      assert(t.react.isCompatTag("h3-"));
    });

    it("rejects empty or null tag names", function() {
      assert(t.react.isCompatTag(null) === false);
      assert(t.react.isCompatTag() === false);
      assert(t.react.isCompatTag(undefined) === false);
      assert(t.react.isCompatTag("") === false);
    });

    it("rejects tag names starting with an uppercase letter", function() {
      assert(t.react.isCompatTag("Div") === false);
      assert(t.react.isCompatTag("A") === false);
      assert(t.react.isCompatTag("H3") === false);
    });

    it("rejects all uppercase tag names", function() {
      assert(t.react.isCompatTag("DIV") === false);
      assert(t.react.isCompatTag("A") === false);
      assert(t.react.isCompatTag("H3") === false);
    });

    it("rejects leading dash '-'", function() {
      assert(t.react.isCompatTag("-div") === false);
      assert(t.react.isCompatTag("-a") === false);
      assert(t.react.isCompatTag("-h3") === false);
    });
  });

  suite("patterns", function() {
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

      assert(t.isNodesEquivalent(pattern, pattern) === true);
    });
  });
});
