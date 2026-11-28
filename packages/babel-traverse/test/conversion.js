import { parse } from "@babel/parser";
import * as t from "@babel/types";

import traverse from "../lib/index.js";
import generate from "@babel/generator";

function getPath(code, options) {
  const ast = parse(code, options);
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
  describe("splitExportDeclaration", function () {
    it("keeps struct declarations standalone", function () {
      const options = { sourceType: "module", plugins: ["structs"] };
      let path = getPath("export default struct {}", options);
      path.splitExportDeclaration();
      expect(generateCode(path)).toMatchInlineSnapshot(`
        "struct _default {}
        export { _default as default };"
      `);

      path = getPath("export default struct S {}", options);
      path.splitExportDeclaration();
      expect(generateCode(path)).toMatchInlineSnapshot(`
        "struct S {}
        export { S as default };"
      `);
    });
  });

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

    it("preserves for loop body's context", function () {
      const rootPath = getPath("for (;;) true;");
      const body = rootPath.get("body");
      rootPath.ensureBlock();
      body.replaceWith(t.booleanLiteral(false));
      expect(generateCode(rootPath)).toBe("for (;;) {\n  false;\n}");
    });
  });

  describe("ensureFunctionName", function () {
    function getFunctionPath(code) {
      const ast = parse(code);
      let path;
      traverse(ast, {
        "FunctionExpression|ClassExpression"(_path) {
          path = _path;
          _path.stop();
        },
      });
      return path;
    }

    it("registers the name as a local binding", function () {
      const path = getFunctionPath("var o = { g: function () {} }");
      path.ensureFunctionName(false);
      const binding = path.scope.getOwnBinding("g");
      expect(binding.kind).toBe("local");
      expect(binding.identifier).toBe(path.node.id);
    });

    it("registers the name of a class expression", function () {
      const path = getFunctionPath("var C = class {}");
      path.ensureFunctionName(false);
      expect(path.scope.getOwnBinding("C").kind).toBe("local");
    });

    it("registers the name after renaming a param", function () {
      const path = getFunctionPath("var g = function (g) {}");
      path.ensureFunctionName(false);
      expect(path.node.params[0].name).not.toBe("g");
      expect(path.scope.getOwnBinding("g").kind).toBe("local");
    });

    it("keeps the own binding shadowing the name", function () {
      const path = getFunctionPath("var g = function () { var g; }");
      path.ensureFunctionName(false);
      expect(path.scope.getOwnBinding("g").kind).toBe("var");
    });
  });
});
