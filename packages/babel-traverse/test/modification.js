import traverse from "../lib";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";

function getPath(code, parserOpts) {
  const ast = parse(code, parserOpts);
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

describe("modification", function() {
  describe("pushContainer", function() {
    it("pushes identifier into params", function() {
      const rootPath = getPath("function test(a) {}");
      rootPath.pushContainer("params", t.identifier("b"));

      expect(generateCode(rootPath)).toBe("function test(a, b) {}");
    });

    it("pushes identifier into block", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body");
      path.pushContainer("body", t.expressionStatement(t.identifier("b")));

      expect(generateCode(rootPath)).toBe("function test(a) {\n  b;\n}");
    });
  });
  describe("unshiftContainer", function() {
    it("unshifts identifier into params", function() {
      const rootPath = getPath("function test(a) {}");
      rootPath.unshiftContainer("params", t.identifier("b"));

      expect(generateCode(rootPath)).toBe("function test(b, a) {}");
    });

    it("unshifts identifier into block", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body");
      path.unshiftContainer("body", t.expressionStatement(t.identifier("b")));

      expect(generateCode(rootPath)).toBe("function test(a) {\n  b;\n}");
    });

    it("properly handles more than one arguments", function() {
      const code = "foo(a, b);";
      const ast = parse(code);
      traverse(ast, {
        CallExpression: function(path) {
          path.unshiftContainer("arguments", t.identifier("d"));
          expect(generateCode(path)).toBe("foo(d, a, b);");
          path.unshiftContainer("arguments", t.stringLiteral("s"));
          expect(generateCode(path)).toBe(`foo("s", d, a, b);`);
        },
      });
    });
  });

  describe("insertBefore", function() {
    it("returns inserted path with BlockStatement", function() {
      const rootPath = getPath("if (x) { y; }");
      const path = rootPath.get("consequent.body.0");
      const result = path.insertBefore(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe("if (x) {\n  b\n  y;\n}");
    });

    it("returns inserted path without BlockStatement", function() {
      const rootPath = getPath("if (x) y;");
      const path = rootPath.get("consequent");
      const result = path.insertBefore(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe("if (x) {\n  b\n  y;\n}");
    });

    it("returns inserted path without BlockStatement without ExpressionStatement", function() {
      const rootPath = getPath("if (x) for (var i = 0; i < 0; i++) {}");
      const path = rootPath.get("consequent");
      const result = path.insertBefore(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe(
        "if (x) {\n  b\n\n  for (var i = 0; i < 0; i++) {}\n}",
      );
    });

    it("returns inserted path with BlockStatement without ExpressionStatement", function() {
      const rootPath = getPath("if (x) { for (var i = 0; i < 0; i++) {} }");
      const path = rootPath.get("consequent.body.0");
      const result = path.insertBefore(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe(
        "if (x) {\n  b\n\n  for (var i = 0; i < 0; i++) {}\n}",
      );
    });

    describe("when the parent is an export declaration inserts the node before", function() {
      it("the ExportNamedDeclaration", function() {
        const bodyPath = getPath("export function a() {}", {
          sourceType: "module",
        }).parentPath;
        const fnPath = bodyPath.get("body.0.declaration");
        fnPath.insertBefore(t.identifier("x"));

        expect(bodyPath.get("body")).toHaveLength(2);
        expect(bodyPath.get("body.0").node).toEqual(t.identifier("x"));
      });

      it("the ExportDefaultDeclaration, if a declaration is exported", function() {
        const bodyPath = getPath("export default function () {}", {
          sourceType: "module",
        }).parentPath;
        const fnPath = bodyPath.get("body.0.declaration");
        fnPath.insertBefore(t.identifier("x"));

        expect(bodyPath.get("body")).toHaveLength(2);
        expect(bodyPath.get("body.0").node).toEqual(t.identifier("x"));
      });

      it("the exported expression", function() {
        const declPath = getPath("export default 2;", {
          sourceType: "module",
        });
        const path = declPath.get("declaration");
        path.insertBefore(t.identifier("x"));

        expect(generateCode(declPath)).toBe("export default (x, 2);");
      });
    });
  });

  describe("insertAfter", function() {
    it("returns inserted path with BlockStatement with ExpressionStatement", function() {
      const rootPath = getPath("if (x) { y; }");
      const path = rootPath.get("consequent.body.0");
      const result = path.insertAfter(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe("if (x) {\n  y;\n  b\n}");
    });

    it("returns inserted path without BlockStatement with ExpressionStatement", function() {
      const rootPath = getPath("if (x) y;");
      const path = rootPath.get("consequent");
      const result = path.insertAfter(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe("if (x) {\n  y;\n  b\n}");
    });

    it("returns inserted path without BlockStatement without ExpressionStatement", function() {
      const rootPath = getPath("if (x) for (var i = 0; i < 0; i++) {}");
      const path = rootPath.get("consequent");
      const result = path.insertAfter(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe(
        "if (x) {\n  for (var i = 0; i < 0; i++) {}\n\n  b\n}",
      );
    });

    it("returns inserted path with BlockStatement without ExpressionStatement", function() {
      const rootPath = getPath("if (x) { for (var i = 0; i < 0; i++) {} }");
      const path = rootPath.get("consequent.body.0");
      const result = path.insertAfter(t.identifier("b"));

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[result.length - 1].node).toEqual(t.identifier("b"));
      expect(generateCode(rootPath)).toBe(
        "if (x) {\n  for (var i = 0; i < 0; i++) {}\n\n  b\n}",
      );
    });

    describe("when the parent is an export declaration inserts the node after", function() {
      it("the ExportNamedDeclaration", function() {
        const bodyPath = getPath("export function a() {}", {
          sourceType: "module",
        }).parentPath;
        const fnPath = bodyPath.get("body.0.declaration");
        fnPath.insertAfter(t.identifier("x"));

        expect(bodyPath.get("body")).toHaveLength(2);
        expect(bodyPath.get("body.1").node).toEqual(t.identifier("x"));
      });

      it("the ExportDefaultDeclaration, if a declaration is exported", function() {
        const bodyPath = getPath("export default function () {}", {
          sourceType: "module",
        }).parentPath;
        const fnPath = bodyPath.get("body.0.declaration");
        fnPath.insertAfter(t.identifier("x"));

        expect(bodyPath.get("body")).toHaveLength(2);
        expect(bodyPath.get("body.1").node).toEqual(t.identifier("x"));
      });

      it("the exported expression", function() {
        const bodyPath = getPath("export default 2;", {
          sourceType: "module",
        }).parentPath;
        const path = bodyPath.get("body.0.declaration");
        path.insertAfter(t.identifier("x"));

        expect(generateCode({ parentPath: bodyPath })).toBe(
          "var _temp;\n\nexport default (_temp = 2, x, _temp);",
        );
      });
    });
  });

  describe("hoist", function() {
    describe("function declaration", function() {
      it("no params", function() {
        const rootPath = getPath(`
        function outer() {
          function inner() {}
        }`);
        const path = rootPath.get("body.body.0");
        path.hoist();
        expect(generateCode(rootPath)).toBe(
          "function inner() {}\n\nfunction outer() {}",
        );
      });

      it("params", function() {
        const rootPath = getPath(`
        function outer() {
          function inner(a, b, c) {}
        }`);
        const path = rootPath.get("body.body.0");
        path.hoist();
        expect(generateCode(rootPath)).toBe(
          "function inner(a, b, c) {}\n\nfunction outer() {}",
        );
      });

      it("outer param", function() {
        const rootPath = getPath(`
        function outer(a) {
          function inner() { a; }
        }`);
        const path = rootPath.get("body.body.0");
        path.hoist();
        expect(generateCode(rootPath)).toBe(
          "function outer(a) {\n  function inner() {\n    a;\n  }\n}",
        );
      });

      it("override outer param", function() {
        const rootPath = getPath(`
        function outer(a) {
          function inner(a) { a; }
        }`);
        const path = rootPath.get("body.body.0");
        path.hoist();
        expect(generateCode(rootPath)).toBe(
          "function inner(a) {\n  a;\n}\n\nfunction outer(a) {}",
        );
      });
    });
  });
});
