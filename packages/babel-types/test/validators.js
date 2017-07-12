import * as t from "../lib";
import assert from "assert";
import { parse } from "babylon";

describe("validators", function() {
  describe("isNodesEquivalent", function() {
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

  describe("patterns", function() {
    it("allows nested pattern structures", function() {
      const pattern = t.objectPattern([
        t.objectProperty(
          t.identifier("a"),
          t.objectPattern([
<<<<<<< HEAD
<<<<<<< HEAD
            t.objectProperty(t.identifier("b"), t.identifier("foo")),
            t.objectProperty(
=======
            t.objectPatternProperty(t.identifier("b"), t.identifier("foo")),
            t.objectPatternProperty(
>>>>>>> Update tests
=======
            t.objectProperty(t.identifier("b"), t.identifier("foo")),
            t.objectProperty(
>>>>>>> Remove ObjectPatternProperty
              t.identifier("c"),
              t.arrayPattern([t.identifier("value")]),
            ),
          ]),
        ),
      ]);

      assert(t.isNodesEquivalent(pattern, pattern) === true);
    });
  });

  describe("FunctionDeclaration", function() {
    it("allows nameless declaration under export default", function() {
      t.exportDefaultDeclaration(
        t.functionDeclaration(null, [], t.blockStatement([])),
      );
    });

    it("forbids nameless declaration under as statement", function() {
      assert.throws(function() {
        t.blockStatement([
          t.functionDeclaration(null, [], t.blockStatement([])),
        ]);
      });
    });
  });
});
