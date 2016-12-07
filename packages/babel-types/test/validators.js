let t = require("../lib");
let assert = require("assert");
let parse = require("babylon").parse;

suite("validators", function () {
  suite("isNodesEquivalent", function () {
    it("should handle simple cases", function () {
      let mem = t.memberExpression(t.identifier("a"), t.identifier("b"));
      assert(t.isNodesEquivalent(mem, mem) === true);

      let mem2 = t.memberExpression(t.identifier("a"), t.identifier("c"));
      assert(t.isNodesEquivalent(mem, mem2) === false);
    });

    it("should handle full programs", function () {
      assert(t.isNodesEquivalent(parse("1 + 1"), parse("1+1")) === true);
      assert(t.isNodesEquivalent(parse("1 + 1"), parse("1+2")) === false);
    });

    it("should handle complex programs", function () {
      let program = "'use strict'; function lol() { wow();return 1; }";

      assert(t.isNodesEquivalent(parse(program), parse(program)) === true);

      let program2 = "'use strict'; function lol() { wow();return -1; }";

      assert(t.isNodesEquivalent(parse(program), parse(program2)) === false);
    });

    it("rejects 'await' as an identifier", function () {
      assert(t.isValidIdentifier("await") === false);
    });
  });
});
