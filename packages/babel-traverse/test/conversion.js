import { parse } from "@babel/parser";
import * as t from "@babel/types";

import traverse from "../lib/index.js";
import generate from "@babel/generator";

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path.get("body.0");
      _path.stop();
    },
  });

  return path;
}

function generateCode(path) {
  return generate(path.parentPath.node).code;
}

describe("conversion", function () {
  describe("ensureBlock", function () {
    it("throws converting node without body to block", function () {
      const rootPath = getPath("true;");

      expect(() => {
        rootPath.ensureBlock();
      }).toThrow();
    });

    it("throws converting already block array", function () {
      const rootPath = getPath("function test() { true; }").get("body");
      expect(() => {
        rootPath.ensureBlock();
      }).toThrow();
    });

    it("converts arrow function with expression body to block", function () {
      const rootPath = getPath("() => true").get("expression");
      rootPath.ensureBlock();
      expect(generateCode(rootPath)).toBe("() => {\n  return true;\n};");
    });

    it("preserves arrow function body's context when replaced with a boolean literal", function () {
      const rootPath = getPath("() => true").get("expression");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWith(t.booleanLiteral(false));
      expect(generateCode(rootPath)).toBe("() => {\n  return false;\n};");
    });

    it("preserves arrow function body's context when replace with multiple nodes", function () {
      const rootPath = getPath("() => true").get("expression");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWithMultiple([t.booleanLiteral(false), t.emptyStatement()]);
      expect(generateCode(rootPath)).toBe("() => {\n  return false;\n};");
    });

    it("converts for loop with statement body to block", function () {
      const rootPath = getPath("for (;;) true;");
      rootPath.ensureBlock();
      expect(generateCode(rootPath)).toBe("for (;;) {\n  true;\n}");
    });

    it("keeps the paths of a loop body without registering it again", function () {
      const rootPath = getPath("for (;;) a; let a;");
      const body = rootPath.get("body");
      const reference = body.get("expression");
      rootPath.ensureBlock();
      expect(rootPath.get("body.body.0")).toBe(body);
      expect(body.parent).toBe(rootPath.node.body);
      expect(body.scope).toBe(rootPath.get("body").scope);
      expect(body.get("expression")).toBe(reference);
      expect(rootPath.scope.getBinding("a").referencePaths).toEqual([
        reference,
      ]);
    });

    it("keeps the paths of an arrow function body without registering it again", function () {
      const rootPath = getPath("let a; () => a")
        .getSibling(1)
        .get("expression");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      expect(rootPath.get("body.body.0.argument")).toBe(body);
      expect(body.parent).toBe(rootPath.node.body.body[0]);
      expect(body.scope).toBe(rootPath.scope);
      expect(rootPath.scope.getBinding("a").referencePaths).toEqual([body]);
    });

    it("updates the scope of the paths recorded in a loop body", function () {
      const rootPath = getPath("for (const { a } of b) a;");
      const binding = rootPath.scope.getBinding("a");
      const [reference] = binding.referencePaths;
      rootPath.ensureBlock();
      const blockPath = rootPath.get("body");
      expect(reference.scope).toBe(blockPath.scope);

      const id = rootPath.node.left.declarations[0].id.properties[0].value;
      rootPath
        .get("left")
        .replaceWith(
          t.variableDeclaration("const", [
            t.variableDeclarator(t.identifier("_ref")),
          ]),
        );
      const [declaration] = blockPath.unshiftContainer(
        "body",
        t.variableDeclaration("const", [
          t.variableDeclarator(id, t.identifier("_ref")),
        ]),
      );
      blockPath.scope.registerDeclaration(declaration);
      expect(reference.scope.getBinding("a")).toBe(binding);
      expect(binding.scope).toBe(blockPath.scope);
      expect(binding.referencePaths).toEqual([reference]);
    });

    it("keeps the labels of a loop body", function () {
      const rootPath = getPath("for (;;) foo: while (1) break foo;");
      rootPath.ensureBlock();
      expect(rootPath.get("body").scope.hasLabel("foo")).toBe(true);
    });

    it("preserves for loop body's context", function () {
      const rootPath = getPath("for (;;) true;");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWith(t.booleanLiteral(false));
      expect(generateCode(rootPath)).toBe("for (;;) {\n  false;\n}");
    });
  });
});
