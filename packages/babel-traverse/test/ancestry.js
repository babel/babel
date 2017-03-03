const traverse = require("../lib").default;
const assert = require("assert");
const parse = require("babylon").parse;

describe("path/ancestry", function () {
  describe("isAncestor", function () {
    const ast = parse("var a = 1; 'a';");

    it("returns true if ancestor", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [ programPath, numberPath ] = paths;

      assert(programPath.isAncestor(numberPath));
    });

    it("returns false if not ancestor", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        }
      });

      const [ , numberPath, stringPath ] = paths;

      assert(!stringPath.isAncestor(numberPath));
    });
  });

  describe("isDescendant", function () {
    const ast = parse("var a = 1; 'a';");

    it("returns true if descendant", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      const [ programPath, numberPath ] = paths;

      assert(numberPath.isDescendant(programPath));
    });

    it("returns false if not descendant", function() {
      const paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        }
      });

      const [ , numberPath, stringPath ] = paths;

      assert(!numberPath.isDescendant(stringPath));
    });
  });
});
