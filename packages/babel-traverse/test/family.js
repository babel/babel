import { parse } from "@babel/parser";
import * as t from "@babel/types";

import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;

describe("path/family", function () {
  describe("getBindingIdentifiers", function () {
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

    it("should contain keys of nodes in paths", function () {
      Object.keys(nodes).forEach(id => {
        expect(hop(paths, id)).toBe(true);
      });
    });

    it("should contain outer bindings", function () {
      Object.keys(outerNodes).forEach(id => {
        expect(hop(outerPaths, id)).toBe(true);
      });
    });

    it("should return paths", function () {
      Object.keys(paths).forEach(id => {
        expect(paths[id].node).toBeTruthy();
        expect(paths[id].type).toBe(paths[id].node.type);
      });

      Object.keys(outerPaths).forEach(id => {
        expect(outerPaths[id].node).toBeTruthy();
        expect(outerPaths[id].type).toBe(outerPaths[id].node.type);
      });
    });

    it("should match paths and nodes returned for the same ast", function () {
      Object.keys(nodes).forEach(id => {
        expect(nodes[id]).toBe(paths[id].node);
      });
    });

    it("should match paths and nodes returned for outer Bindings", function () {
      Object.keys(outerNodes).forEach(id => {
        expect(outerNodes[id]).toBe(outerPaths[id].node);
      });
    });
  });
  describe("getSibling", function () {
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

    it("should return traverse sibling nodes", function () {
      expect(sibling.getNextSibling().node).toBeTruthy();
      expect(lastSibling.getPrevSibling().node).toBeTruthy();
      expect(sibling.getPrevSibling().node).toBeFalsy();
      expect(lastSibling.getNextSibling().node).toBeFalsy();
    });

    it("should return all preceding and succeeding sibling nodes", function () {
      expect(sibling.getAllNextSiblings().length).toBeTruthy();
      expect(lastSibling.getAllPrevSiblings().length).toBeTruthy();
      expect(sibling.getAllNextSiblings()).toHaveLength(2);
      expect(lastSibling.getAllPrevSiblings()).toHaveLength(2);
    });

    it("should initialize path.scope when needed", function () {
      const ast = parse("if (0) {}");

      let testHasScope = false;
      let consequentHasScope = false;

      traverse(ast, {
        IfStatement(path) {
          // @babel/traverse pre-traverses the whole tree to populate the initial
          // scope. Thus, it pre-caches paths for all the original nodes.
          // We need to introduce two new nodes to avoid using the cached paths
          // that already have the path.scope property.
          path.set("test", t.identifier("a"));
          path.set("consequent", t.expressionStatement(t.identifier("b")));

          const testPath = path.get("test");

          testHasScope = !!testPath.scope;
          consequentHasScope = !!testPath.getSibling("consequent").scope;
        },
      });

      expect(testHasScope).toBe(true);
      expect(consequentHasScope).toBe(true);
    });
    it("should be correct after mutating an unrelated container", function () {
      const ast = parse("`a${a}b${b}`");
      let secondQuasiValue;
      let firstExpressionValue;

      traverse(ast, {
        TemplateLiteral(path) {
          const [firstQuasi] = path.get("quasis");
          const [firstExpression] = path.get("expressions");
          path.unshiftContainer("expressions", t.stringLiteral("hi"));
          secondQuasiValue = firstQuasi.getNextSibling().node.value.raw;
          firstExpressionValue = firstExpression.getPrevSibling().node.value;
        },
      });

      expect(secondQuasiValue).toBe("b");
      expect(firstExpressionValue).toBe("hi");
    });
  });
  describe("getCompletionRecords", function () {
    it("should skip variable declarations", function () {
      const ast = parse("'foo' + 'bar'; var a = 10; let b = 20; const c = 30;");
      let records = [];
      traverse(ast, {
        Program(path) {
          records = path.getCompletionRecords();
        },
      });
      expect(records).toHaveLength(1);
      expect(records[0].node.type).toBe("ExpressionStatement");
      expect(records[0].node.expression.type).toBe("BinaryExpression");
    });

    it("should skip variable declarations in a BlockStatement", function () {
      const ast = parse("'foo' + 'bar'; { var a = 10; }");
      let records = [];
      traverse(ast, {
        Program(path) {
          records = path.getCompletionRecords();
        },
      });
      expect(records).toHaveLength(1);
      expect(records[0].node.type).toBe("ExpressionStatement");
      expect(records[0].node.expression.type).toBe("BinaryExpression");
    });

    it("should be empty if there are only variable declarations", function () {
      const ast = parse("var a = 10; let b = 20; const c = 30;");
      let records = [];
      traverse(ast, {
        Program(path) {
          records = path.getCompletionRecords();
        },
      });
      expect(records).toHaveLength(0);
    });
  });
});

function hop(o, key) {
  return Object.hasOwnProperty.call(o, key);
}
