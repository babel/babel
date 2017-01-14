const traverse = require("../lib").default;
const assert = require("assert");
const parse = require("babylon").parse;

describe("path/family", function () {
  describe("getBindingIdentifiers", function () {
    const ast = parse("var a = 1, {b} = c, [d] = e; function f() {}");
    let nodes = {}, paths = {}, outerNodes = {}, outerPaths = {};
    traverse(ast, {
      VariableDeclaration(path) {
        nodes = path.getBindingIdentifiers();
        paths = path.getBindingIdentifierPaths();
      },
      FunctionDeclaration(path) {
        outerNodes = path.getOuterBindingIdentifiers();
        outerPaths = path.getOuterBindingIdentifierPaths();
      }
    });

    it("should contain keys of nodes in paths", function () {
      Object.keys(nodes).forEach((id) => {
        assert.strictEqual(hop(paths, id), true, "Node's keys exists in paths");
      });
    });

    it("should contain outer bindings", function () {
      Object.keys(outerNodes).forEach((id) => {
        assert.strictEqual(hop(outerPaths, id), true, "Has same outer keys");
      });
    });

    it("should return paths", function () {
      Object.keys(paths).forEach((id) => {
        assert.strictEqual(!!paths[id].node, true, "Has a property node that's not falsy");
        assert.strictEqual(paths[id].type, paths[id].node.type, "type matches");
      });

      Object.keys(outerPaths).forEach((id) => {
        assert.strictEqual(!!outerPaths[id].node, true, "has property node");
        assert.strictEqual(outerPaths[id].type, outerPaths[id].node.type, "type matches");
      });
    });

    it("should match paths and nodes returned for the same ast", function () {
      Object.keys(nodes).forEach((id) => {
        assert.strictEqual(nodes[id], paths[id].node, "Nodes match");
      });
    });

    it("should match paths and nodes returned for outer Bindings", function () {
      Object.keys(outerNodes).forEach((id) => {
        assert.strictEqual(outerNodes[id], outerPaths[id].node, "nodes match");
      });
    });
  });
});

function hop(o, key) {
  return Object.hasOwnProperty.call(o, key);
}
