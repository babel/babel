import traverse from "../lib";
import { parse } from "babylon";

describe("path/family", function() {
  describe("getBindingIdentifiers", function() {
    const ast = parse("var a = 1, {b} = c, [d] = e; function f() {}");
    let nodes = {},
      paths = {},
      outerNodes = {},
      outerPaths = {};
    traverse(ast, {
      VariableDeclaration(path) {
        nodes = path.getBindingIdentifiers();
        paths = path.getBindingIdentifierPaths();
      },
      FunctionDeclaration(path) {
        outerNodes = path.getOuterBindingIdentifiers();
        outerPaths = path.getOuterBindingIdentifierPaths();
      },
    });

    it("should contain keys of nodes in paths", function() {
      Object.keys(nodes).forEach(id => {
        expect(hop(paths, id)).toBe(true);
      });
    });

    it("should contain outer bindings", function() {
      Object.keys(outerNodes).forEach(id => {
        expect(hop(outerPaths, id)).toBe(true);
      });
    });

    it("should return paths", function() {
      Object.keys(paths).forEach(id => {
        expect(paths[id].node).toBeTruthy();
        expect(paths[id].type).toBe(paths[id].node.type);
      });

      Object.keys(outerPaths).forEach(id => {
        expect(outerPaths[id].node).toBeTruthy();
        expect(outerPaths[id].type).toBe(outerPaths[id].node.type);
      });
    });

    it("should match paths and nodes returned for the same ast", function() {
      Object.keys(nodes).forEach(id => {
        expect(nodes[id]).toBe(paths[id].node);
      });
    });

    it("should match paths and nodes returned for outer Bindings", function() {
      Object.keys(outerNodes).forEach(id => {
        expect(outerNodes[id]).toBe(outerPaths[id].node);
      });
    });
  });
  describe("getSibling", function() {
    const ast = parse(
      "var a = 1, {b} = c, [d] = e; function f() {} function g() {}",
    );
    let sibling = {},
      lastSibling = {};
    traverse(ast, {
      VariableDeclaration(path) {
        sibling = path.getSibling(path.key);
        lastSibling = sibling.getNextSibling().getNextSibling();
      },
    });

    it("should return traverse sibling nodes", function() {
      expect(sibling.getNextSibling().node).toBeTruthy();
      expect(lastSibling.getPrevSibling().node).toBeTruthy();
      expect(sibling.getPrevSibling().node).toBeFalsy();
      expect(lastSibling.getNextSibling().node).toBeFalsy();
    });

    it("should return all preceding and succeeding sibling nodes", function() {
      expect(sibling.getAllNextSiblings().length).toBeTruthy();
      expect(lastSibling.getAllPrevSiblings().length).toBeTruthy();
      expect(sibling.getAllNextSiblings()).toHaveLength(2);
      expect(lastSibling.getAllPrevSiblings()).toHaveLength(2);
    });
  });
});

function hop(o, key) {
  return Object.hasOwnProperty.call(o, key);
}
