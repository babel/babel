import traverse from "../lib";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function(_path) {
      path = _path.get("body.0");
      _path.stop();
    },
  });

  return path;
}

function generateCode(path) {
  return generate(path.parentPath.node).code;
}

describe("conversion", function() {
  describe("ensureBlock", function() {
    it("throws converting node without body to block", function() {
      const rootPath = getPath("true;");

      expect(() => {
        rootPath.ensureBlock();
      }).toThrow();
    });

    it("throws converting already block array", function() {
      const rootPath = getPath("function test() { true; }").get("body");
      expect(() => {
        rootPath.ensureBlock();
      }).toThrow();
    });

    it("converts arrow function with expression body to block", function() {
      const rootPath = getPath("() => true").get("expression");
      rootPath.ensureBlock();
      expect(generateCode(rootPath)).toBe("() => {\n  return true;\n};");
    });

    it("preserves arrow function body's context", function() {
      const rootPath = getPath("() => true").get("expression");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWith(t.booleanLiteral(false));
      expect(generateCode(rootPath)).toBe("() => {\n  return false;\n};");
    });

    it("converts for loop with statement body to block", function() {
      const rootPath = getPath("for (;;) true;");
      rootPath.ensureBlock();
      expect(generateCode(rootPath)).toBe("for (;;) {\n  true;\n}");
    });

    it("preserves for loop body's context", function() {
      const rootPath = getPath("for (;;) true;");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWith(t.booleanLiteral(false));
      expect(generateCode(rootPath)).toBe("for (;;) {\n  false;\n}");
    });
  });
});
