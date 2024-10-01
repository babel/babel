import { itBabel8 } from "$repo-utils";
import * as t from "../lib/index.js";

describe("validate", () => {
  describe("TS", () => {
    const id1 = t.identifier("foo");
    const id2 = t.identifier("bar");
    const lhs = [
      t.tsAsExpression(id1, t.tsAnyKeyword()),
      t.tsTypeAssertion(t.tsAnyKeyword(), id1),
      t.tsNonNullExpression(id1),
    ];
    const validNodes = {
      "AssignmentExpression(=)": lhs => t.assignmentExpression("=", lhs, id2),
      "AssignmentExpression(+=)": lhs => t.assignmentExpression("+=", lhs, id2),
      ForOfStatement: lhs => t.forOfStatement(lhs, id2, t.emptyStatement()),
      ForInStatement: lhs => t.forInStatement(lhs, id2, t.emptyStatement()),
      "ObjectPattern > ObjectProperty": lhs =>
        t.objectPattern([t.objectProperty(t.stringLiteral("x"), lhs)]),
      ArrayPattern: lhs => t.arrayPattern([lhs]),
      AssignmentPattern: lhs => t.assignmentPattern(lhs, id2),
    };
    Object.keys(validNodes).forEach(name => {
      lhs.forEach(lhs => {
        it(`${lhs.type} is allowed in ${name}`, () => {
          expect(() => t.validate(validNodes[name](lhs))).not.toThrow();
        });
      });
    });
  });

  describe("VariableDeclarator", () => {
    const ast = t.variableDeclaration("const", [
      t.variableDeclarator(
        t.objectPattern([
          t.objectProperty(t.identifier("x"), t.identifier("x")),
        ]),
      ),
    ]);

    it("destructuring, no initializer, in for-of", () => {
      expect(() => {
        t.forOfStatement(
          t.cloneNode(ast),
          t.identifier("x"),
          t.blockStatement([]),
        );
      }).not.toThrow();
    });

    itBabel8("destructuring, no initializer, in block", () => {
      expect(() => {
        t.blockStatement([t.cloneNode(ast)]);
      }).toThrow();
    });
  });
});
