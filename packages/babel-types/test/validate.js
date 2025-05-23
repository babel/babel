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
      }).toThrowErrorMatchingInlineSnapshot(
        `"Property id of VariableDeclarator expected node to be of a type [\\"Identifier\\",\\"Placeholder\\"] but instead got \\"ObjectPattern\\""`,
      );
    });

    itBabel8("const without initializer should pass", () => {
      expect(() => {
        const moduleDeclaration = t.tsModuleDeclaration(
          t.identifier("M"),
          t.tsModuleBlock([
            t.blockStatement([
              t.variableDeclaration("const", [
                t.variableDeclarator(t.identifier("x")),
              ]),
            ]),
          ]),
        );
        moduleDeclaration.declare = true;
      }).not.toThrow();
    });

    itBabel8("using without initializer should pass", () => {
      expect(() => {
        const moduleDeclaration = t.tsModuleDeclaration(
          t.identifier("M"),
          t.tsModuleBlock([
            t.blockStatement([
              t.variableDeclaration("using", [
                t.variableDeclarator(t.identifier("x")),
              ]),
            ]),
          ]),
        );
        moduleDeclaration.declare = true;
      }).not.toThrow();
    });

    itBabel8.each(["var", "let", "const"])(
      "%s void pattern should throw",
      kind => {
        expect(() =>
          t.blockStatement([
            t.variableDeclaration(kind, [
              t.variableDeclarator(t.voidPattern(), t.identifier("x")),
            ]),
          ]),
        ).toThrow();
      },
    );

    itBabel8.each(["using", "await using"])(
      "%s void pattern should throw",
      kind => {
        expect(() =>
          t.blockStatement([
            t.variableDeclaration(kind, [
              t.variableDeclarator(t.voidPattern(), t.identifier("x")),
            ]),
          ]),
        ).not.toThrow();
      },
    );
  });
});
