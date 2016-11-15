let traverse = require("../lib").default;
let assert = require("assert");
let parse = require("babylon").parse;

describe("path/ancestry", function () {
  describe("isAncestor", function () {
    let ast = parse("var a = 1; 'a';");

    it("returns true if ancestor", function() {
      let paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      let [ programPath, numberPath ] = paths;

      assert(programPath.isAncestor(numberPath));
    });

    it("returns false if not ancestor", function() {
      let paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        }
      });

      let [ , numberPath, stringPath ] = paths;

      assert(!stringPath.isAncestor(numberPath));
    });
  });

  describe("isDescendant", function () {
    let ast = parse("var a = 1; 'a';");

    it("returns true if descendant", function() {
      let paths = [];
      traverse(ast, {
        "Program|NumericLiteral"(path) {
          paths.push(path);
        },
      });

      let [ programPath, numberPath ] = paths;

      assert(numberPath.isDescendant(programPath));
    });

    it("returns false if not descendant", function() {
      let paths = [];
      traverse(ast, {
        "Program|NumericLiteral|StringLiteral"(path) {
          paths.push(path);
        }
      });

      let [ , numberPath, stringPath ] = paths;

      assert(!numberPath.isDescendant(stringPath));
    });
  });
});
