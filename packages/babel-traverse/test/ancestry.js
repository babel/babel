import traverse from "../lib";
import { parse } from "babylon";

describe("path/ancestry", function() {
  describe("isAncestor", function() {
    const ast = parse("var a = 1; 'a';");

    it("returns true if ancestor", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [programPath, numberPath] = paths;

      expect(programPath.isAncestor(numberPath)).toBeTruthy();
    });

    it("returns false if not ancestor", function() {
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

  describe("isDescendant", function() {
    const ast = parse("var a = 1; 'a';");

    it("returns true if descendant", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [programPath, numberPath] = paths;

      expect(numberPath.isDescendant(programPath)).toBeTruthy();
    });

    it("returns false if not descendant", function() {
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

  describe("getStatementParent", function() {
    const ast = parse("var a = 1;");
    it("should throw", function() {
      expect(function() {
        traverse(ast, {
          Program(path) {
            path.getStatementParent();
          },
        });
      }).toThrow(/File\/Program node/);
    });
  });
});
