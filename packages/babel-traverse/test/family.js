const traverse = require("../lib").default;
const assert = require("assert");
const parse = require("babylon").parse;

describe("path/family", function () {
  describe("getBindingIdentifiers", function () {
    const ast = parse("var a = 1, {b} = c, [d] = e; function f() {}");
    let paths = {}, outerPaths = {};
    traverse(ast, {
      VariableDeclaration(path) {
        paths = path.getBindingIdentifiers();
      },
      FunctionDeclaration(path) {
        outerPaths = path.getOuterBindingIdentifiers();
      },
    });

    it("should return paths", function () {
      [
        ...Object.keys(paths).map((id) => paths[id]),
        ...Object.keys(outerPaths).map((id) => outerPaths[id]),
      ].forEach((id) => {
        assert.strictEqual(id.isIdentifier(), true);
      });
    });

    it("should return binding identifiers", function () {
      assert.deepEqual(Object.keys(paths).sort(), ["a", "b", "d"]);
    });
    it("should return outer binding identifiers", function () {
      assert.deepEqual(Object.keys(outerPaths).sort(), ["f"]);
    });
  });
  describe("getSibling", function () {
    const ast = parse("var a = 1, {b} = c, [d] = e; function f() {} function g() {}");
    let sibling = {}, lastSibling = {};
    traverse(ast, {
      VariableDeclaration(path) {
        sibling = path.getSibling(path.key);
        lastSibling = sibling.getNextSibling().getNextSibling();
      },
    });

    it("should return traverse sibling nodes", function () {
      assert.ok(sibling.getNextSibling().node, "has property node");
      assert.ok(lastSibling.getPrevSibling().node, "has property node");
      assert.equal(!!sibling.getPrevSibling().node, false, "out of scope");
      assert.equal(!!lastSibling.getNextSibling().node, false, "out of scope");
    });

    it("should return all preceding and succeeding sibling nodes", function () {
      assert.ok(sibling.getAllNextSiblings().length, "Has next sibling");
      assert.ok(lastSibling.getAllPrevSiblings().length, "Has prev sibling");
      assert.equal(sibling.getAllNextSiblings().length, 2, "Has 2 succeeding sibling");
      assert.equal(lastSibling.getAllPrevSiblings().length, 2, "Has 2 preceeding sibling");
    });
  });
});
