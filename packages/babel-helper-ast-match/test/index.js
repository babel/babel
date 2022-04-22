import * as t from "@babel/types";
import _astMatch from "../lib/index.js";
const astMatch = _astMatch.default;
const { matchers } = _astMatch;

describe("@babel/helper-ast-match", () => {
  describe("comparing primitives", () => {
    it("compares with ===", () => {
      expect(astMatch(-0, 0)).toBe(true);
      expect(astMatch(0, 1)).toBe(false);
    });
  });

  describe("comparing arrays", () => {
    it("matches when all values matched and no unmatchable values are present", () => {
      expect(astMatch([], [])).toBe(true);
      expect(astMatch([-0], [0])).toBe(true);
      expect(astMatch([0, 1], [0])).toBe(false);
      expect(astMatch([], [0])).toBe(false);
    });
  });

  describe("comparing objects", () => {
    it("matches when all keys of match match in the ast", () => {
      expect(astMatch({ id: -0 }, { id: 0 })).toBe(true);
      expect(astMatch({ id: -0, x: 1 }, { id: 0 })).toBe(true);
    });
  });

  describe("anyOf matcher", () => {
    const { anyOf } = matchers;

    it("matches when the ast value matches any given matcher", () => {
      expect(astMatch(0, anyOf(0, 1))).toBe(true);
      expect(astMatch(1, anyOf(0, 1))).toBe(true);
      expect(astMatch(2, anyOf(0, 1))).toBe(false);
    });
  });

  describe("includes matcher", () => {
    const { includes } = matchers;

    it("matches when the ast value is an array that includes a matching value", () => {
      expect(astMatch([0, 1], includes(0))).toBe(true);
      expect(astMatch([0, 1], includes(1))).toBe(true);
      expect(astMatch([0, 1], includes(2))).toBe(false);
    });
  });

  describe("none matcher", () => {
    const { none } = matchers;

    it("matches when the ast value is undefined", () => {
      expect(astMatch(undefined, none)).toBe(true);
      expect(astMatch(null, none)).toBe(false);
    });
  });

  describe("composing matchers", () => {
    it("works", () => {
      const expectedDecl = t.importDeclaration(
        [t.importSpecifier(t.identifier("foo"), t.identifier("name"))],
        t.stringLiteral("source"),
      );
      const program = {
        body: [
          t.importDeclaration(
            [t.importSpecifier(t.identifier("fox"), t.identifier("nox"))],
            t.stringLiteral("source"),
          ),
          expectedDecl,
        ],
      };

      const decl = program.body.find(declaration => {
        return astMatch(declaration, {
          type: "ImportDeclaration",
          source: { value: "source" },
          specifiers: matchers.includes({
            type: "ImportSpecifier",
            imported: { name: "name" },
          }),
        });
      });

      expect(decl).toBe(expectedDecl);
    });
  });
});
