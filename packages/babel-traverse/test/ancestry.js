import { parse } from "@babel/parser";

import traverse from "../lib/index.js";

function getPath(input, parserOpts = {}) {
  let targetPath;
  traverse(parse(input, parserOpts), {
    Program(path) {
      targetPath = path.get("body.0");
      path.stop();
    },
  });
  return targetPath;
}

describe("path/ancestry", function () {
  describe("isAncestor", function () {
    const ast = parse("var a = 1; 'a';");

    it("returns true if ancestor", function () {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [programPath, numberPath] = paths;

      expect(programPath.isAncestor(numberPath)).toBeTruthy();
    });

    it("returns false if not ancestor", function () {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        },
      });

      const [, numberPath, stringPath] = paths;

      expect(stringPath.isAncestor(numberPath)).toBeFalsy();
    });
  });

  describe("isDescendant", function () {
    const ast = parse("var a = 1; 'a';");

    it("returns true if descendant", function () {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [programPath, numberPath] = paths;

      expect(numberPath.isDescendant(programPath)).toBeTruthy();
    });

    it("returns false if not descendant", function () {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        },
      });

      const [, numberPath, stringPath] = paths;

      expect(numberPath.isDescendant(stringPath)).toBeFalsy();
    });
  });

  describe("getStatementParent", function () {
    const ast = parse("var a = 1;");
    it("should throw", function () {
      expect(function () {
        traverse(ast, {
          Program(path) {
            path.getStatementParent();
          },
        });
      }).toThrow(/File\/Program node/);
    });
  });

  describe("getFunctionParent", function () {
    it("returns the function parent", function () {
      const fn = getPath(`function fn() { let a = 1; }`);
      const decl = fn.get("body.body.0.declarations.0");
      expect(decl.getFunctionParent()).toBe(fn);
    });

    it("returns null if there is no the function parent", function () {
      const decl = getPath(`let a = 1;`);
      expect(decl.get("declarations.0").getFunctionParent()).toBe(null);
    });

    it("does not return the function itself", function () {
      const fn = getPath(`function fn() { let a = function () {} }`);
      const inner = fn.get("body.body.0.declarations.0.init");
      expect(inner.type).toBe("FunctionExpression");
      expect(inner.getFunctionParent()).toBe(fn);
    });

    it("skips decorators and computed keys", function () {
      const fn = getPath(
        `
        function fn() {
          class A {
            @({ [x]() {} }) m() {}
          }
        }
      `,
        { plugins: [["decorators", { version: "2023-05" }]] },
      );
      const x = fn.get(
        "body.body.0.body.body.0.decorators.0.expression.properties.0.key",
      );
      expect(x.toString()).toBe("x");
      expect(x.getFunctionParent()).toBe(fn);
    });
  });
});
