let t = require("../lib");
let assert = require("assert");
let parse = require("babylon").parse;

suite("cloning", function () {
  suite("clone", function () {
    it("should handle undefined", function () {
      let node = undefined;
      let cloned = t.clone(node);
      assert(cloned === undefined);
    });

    it("should handle null", function () {
      let node = null;
      let cloned = t.clone(node);
      assert(cloned === null);
    });

    it("should handle simple cases", function () {
      let node = t.arrayExpression([null, t.identifier("a")]);
      let cloned = t.clone(node);
      assert(node !== cloned);
      assert(t.isNodesEquivalent(node, cloned) === true);
    });
  });

  suite("cloneDeep", function () {
    it("should handle undefined", function () {
      let node = undefined;
      let cloned = t.cloneDeep(node);
      assert(cloned === undefined);
    });

    it("should handle null", function () {
      let node = null;
      let cloned = t.cloneDeep(node);
      assert(cloned === null);
    });

    it("should handle simple cases", function () {
      let node = t.arrayExpression([null, t.identifier("a")]);
      let cloned = t.cloneDeep(node);
      assert(node !== cloned);
      assert(t.isNodesEquivalent(node, cloned) === true);
    });

    it("should handle full programs", function () {
      let node = parse("1 + 1");
      let cloned = t.cloneDeep(node);
      assert(node !== cloned);
      assert(t.isNodesEquivalent(node, cloned) === true);
    });

    it("should handle complex programs", function () {
      let program = "'use strict'; function lol() { wow();return 1; }";
      let node = parse(program);
      let cloned = t.cloneDeep(node);
      assert(node !== cloned);
      assert(t.isNodesEquivalent(node, cloned) === true);
    });

    it("should handle missing array element", function () {
      let node = parse("[,0]");
      let cloned = t.cloneDeep(node);
      assert(node !== cloned);
      assert(t.isNodesEquivalent(node, cloned) === true);
    });
  });
});
