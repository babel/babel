import { parse } from "@babel/parser";

import traverse from "../lib/index.js";
import generate from "@babel/generator";

function getPath(code, parserOpts = {}) {
  const ast = parse(code, parserOpts);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });

  return path;
}

function generateCode(path) {
  return generate(path.node).code;
}

describe("Removal", function () {
  describe("ArrowFunction", function () {
    it("remove body", function () {
      const rootPath = getPath("x = () => b;");
      const path = rootPath.get("body")[0].get("expression").get("right");
      const body = path.get("body");
      body.remove();

      expect(generateCode(rootPath)).toBe("x = () => {};");
    });
  });

  it("remove with noScope", function () {
    const ast = parse("a=1");
    traverse(ast, {
      AssignmentExpression: function (path) {
        path.remove();
      },
      noScope: true,
    });

    expect(generate(ast).code).toBe("");
  });

  it("leading comments", function () {
    const ast = parse(`
    // update-tsconfig-file
    const a = 5;
    // const updateTSConfig = require('../update-tsconfig')
    // https://nextjs.org/docs/app/building-your-application/upgrading/from-vite
    const getValue = (a) => a.value;
    getValue();
`);
    traverse(ast, {
      VariableDeclarator: function (path) {
        path.remove();
      },
    });

    expect(ast.program.body[0].leadingComments).toMatchInlineSnapshot(`
      [
        {
          "end": 28,
          "loc": SourceLocation {
            "end": Position {
              "column": 27,
              "index": 28,
              "line": 2,
            },
            "filename": undefined,
            "identifierName": undefined,
            "start": Position {
              "column": 4,
              "index": 5,
              "line": 2,
            },
          },
          "start": 5,
          "type": "CommentLine",
          "value": " update-tsconfig-file",
        },
        {
          "end": 105,
          "loc": SourceLocation {
            "end": Position {
              "column": 59,
              "index": 105,
              "line": 4,
            },
            "filename": undefined,
            "identifierName": undefined,
            "start": Position {
              "column": 4,
              "index": 50,
              "line": 4,
            },
          },
          "start": 50,
          "type": "CommentLine",
          "value": " const updateTSConfig = require('../update-tsconfig')",
        },
        {
          "end": 186,
          "loc": SourceLocation {
            "end": Position {
              "column": 80,
              "index": 186,
              "line": 5,
            },
            "filename": undefined,
            "identifierName": undefined,
            "start": Position {
              "column": 4,
              "index": 110,
              "line": 5,
            },
          },
          "start": 110,
          "type": "CommentLine",
          "value": " https://nextjs.org/docs/app/building-your-application/upgrading/from-vite",
        },
      ]
    `);
  });

  describe("within an IfStatement", function () {
    it("does not make consequent null", function () {
      const rootPath = getPath("if (x) foo(); else bar();");
      const ifPath = rootPath.get("body.0");
      ifPath.get("consequent").remove();

      expect(ifPath.get("consequent").type).toBe("BlockStatement");
    });

    it("completely removes alternate", function () {
      const rootPath = getPath("if (x) foo(); else bar();");
      const ifPath = rootPath.get("body.0");
      ifPath.get("alternate").remove();

      expect(ifPath.get("alternate").node).toBeNull();
    });
  });

  it("of AssignmentExpression does not remove binding", function () {
    const rootPath = getPath("var x; x = 1;");
    const path = rootPath.get("body.1.expression");
    path.remove();

    expect(rootPath.scope.hasBinding("x")).toBe(true);
  });

  it("should not throw when removing without `Program`", function () {
    const ast = parse("['1']").program.body[0].expression;

    traverse(ast, {
      noScope: true,
      StringLiteral(path) {
        path.remove();
      },
    });

    expect(ast.elements.length).toBe(0);
  });

  it("should throw if the node path has already been removed", function () {
    const rootPath = getPath("var x");
    const path = rootPath.get("body.0");
    path.remove();
    expect(() => path.remove()).toThrow(
      "NodePath has been removed so is read-only.",
    );
  });

  describe("Removal hooks", function () {
    describe("Remove parent when child is removed", function () {
      it("should remove the parent WhileStatement when the test property is removed", function () {
        const rootPath = getPath("while (true) { foo(); }");
        const path = rootPath.get("body.0");
        path.get("test").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent DoWhileStatement when the test property is removed", function () {
        const rootPath = getPath("do { foo(); } while (true);");
        const path = rootPath.get("body.0");
        path.get("test").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent SwitchCase when the test property is removed", function () {
        const rootPath = getPath("switch (x) { case 1: foo(); }");
        const path = rootPath.get("body.0.cases.0");
        path.get("test").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent ExportNamedDeclaration when the declaration property is removed", function () {
        const rootPath = getPath("export const x = 1;", {
          sourceType: "module",
        });
        const path = rootPath.get("body.0");
        path.get("declaration").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent ExportDefaultDeclaration when the declaration property is removed", function () {
        const rootPath = getPath("export default function foo() {}", {
          sourceType: "module",
        });
        const path = rootPath.get("body.0");
        path.get("declaration").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent LabeledStatement when the body property is removed", function () {
        const rootPath = getPath("label: foo();");
        const path = rootPath.get("body.0");
        path.get("body").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent VariableDeclaration when there are no declarators left", function () {
        const rootPath = getPath("var x = 1;");
        const path = rootPath.get("body.0");
        path.get("declarations.0").remove();
        expect(path.removed).toBe(true);
      });

      it("should remove the parent ExpressionStatement when the expression property is removed", function () {
        const rootPath = getPath("foo();");
        const path = rootPath.get("body.0");
        path.get("expression").remove();
        expect(path.removed).toBe(true);
      });
    });
    describe("Unwrap parent when child is removed", function () {
      it("should unwrap single sequence expressions after the first child is removed", function () {
        const rootPath = getPath("foo(), bar();");
        const path = rootPath.get("body.0.expression");
        path.get("expressions.0").remove();
        expect(generateCode(rootPath)).toBe("bar();");
        expect(rootPath.get("body.0.expression").node.type).toBe(
          "CallExpression",
        );
      });
      it("should unwrap single sequence expressions after the second child is removed", function () {
        const rootPath = getPath("foo(), bar();");
        const path = rootPath.get("body.0.expression");
        path.get("expressions.1").remove();
        expect(generateCode(rootPath)).toBe("foo();");
        expect(rootPath.get("body.0.expression").node.type).toBe(
          "CallExpression",
        );
      });

      it("should unwrap binary expression after the left child is removed", function () {
        const rootPath = getPath("foo() + bar();");
        const path = rootPath.get("body.0.expression");
        path.get("left").remove();
        expect(generateCode(rootPath)).toBe("bar();");
      });
      it("should unwrap binary expression after the right child is removed", function () {
        const rootPath = getPath("foo() + bar();");
        const path = rootPath.get("body.0.expression");
        path.get("right").remove();
        expect(generateCode(rootPath)).toBe("foo();");
      });

      it("should unwrap logical expression after the left child is removed", function () {
        const rootPath = getPath("foo() && bar();");
        const path = rootPath.get("body.0.expression");
        path.get("left").remove();
        expect(generateCode(rootPath)).toBe("bar();");
      });
      it("should unwrap logical expression after the right child is removed", function () {
        const rootPath = getPath("foo() && bar();");
        const path = rootPath.get("body.0.expression");
        path.get("right").remove();
        expect(generateCode(rootPath)).toBe("foo();");
      });
    });
    describe("Ensure valid code is generated after removal", function () {
      it("should generate valid code after the consequent property of an IfStatement is removed", function () {
        const rootPath = getPath("if (x) foo(); else bar();");
        const path = rootPath.get("body.0");
        path.get("consequent").remove();
        expect(generateCode(rootPath)).toBe("if (x) {} else bar();");
      });

      it("should generate valid code after the body property of a ForStatement is removed", function () {
        const rootPath = getPath("for (let i = 0; i < 10; i++) foo();");
        const path = rootPath.get("body.0");
        path.get("body").remove();
        expect(generateCode(rootPath)).toBe("for (let i = 0; i < 10; i++) {}");
      });
      it("should generate valid code after the body property of a WhileStatement is removed", function () {
        const rootPath = getPath("while (x) foo();");
        const path = rootPath.get("body.0");
        path.get("body").remove();
        expect(generateCode(rootPath)).toBe("while (x) {}");
      });
      it("should generate valid code after the body property of a DoWhileStatement is removed", function () {
        const rootPath = getPath("do foo(); while (x);");
        const path = rootPath.get("body.0");
        path.get("body").remove();
        expect(generateCode(rootPath)).toBe("do {} while (x);");
      });

      it("should generate valid code after the body property of an ArrowExpression is removed", function () {
        const rootPath = getPath("const foo = () => bar();");
        const path = rootPath.get("body.0.declarations.0.init");
        path.get("body").remove();
        expect(generateCode(rootPath)).toBe("const foo = () => {};");
      });
    });
  });
  describe("Invalid removal cases", function () {
    it("should throw when removing the consequent property of a ConditionalExpression", function () {
      const rootPath = getPath("x ? foo() : bar();");
      const path = rootPath.get("body.0.expression");
      expect(() => {
        path.get("consequent").remove();
      }).toThrow(
        'Property consequent of ConditionalExpression expected node to be of a type ["Expression"] but instead got undefined',
      );
    });
    it("should throw when removing the argument property of an AwaitExpression", function () {
      const rootPath = getPath("async function foo() { await bar(); }");
      const path = rootPath.get("body.0.body.body.0.expression");
      expect(() => {
        path.get("argument").remove();
      }).toThrow(
        'Property argument of AwaitExpression expected node to be of a type ["Expression"] but instead got undefined',
      );
    });
    it("should throw when removing the right property of an AssignmentExpression", function () {
      const rootPath = getPath("x &&= foo();");
      const path = rootPath.get("body.0.expression");
      expect(() => {
        path.get("right").remove();
      }).toThrow(
        'Property right of AssignmentExpression expected node to be of a type ["Expression"] but instead got undefined',
      );
    });
  });
  describe("scope updates", function () {
    it("should remove the binding information when a VariableDeclarator is removed", function () {
      const rootPath = getPath("var x = 1, y = 2;");
      expect(rootPath.scope.hasBinding("x")).toBe(true);
      expect(rootPath.scope.hasBinding("y")).toBe(true);
      const path = rootPath.get("body.0");
      path.get("declarations.0").remove();
      expect(rootPath.scope.hasBinding("x")).toBe(false);
      expect(rootPath.scope.hasBinding("y")).toBe(true);
    });
  });
  describe("comments handling", function () {
    it("should preserve comments when a statement with leading comments is removed and it has leading siblings", function () {
      const rootPath = getPath("var x = 0; // comment\nvar y = 1;\nvar z = 2;");
      const path = rootPath.get("body.1");
      path.remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(`
        "var x = 0; // comment

        var z = 2;"
      `);

      const xPath = rootPath.get("body.0");
      const zPath = rootPath.get("body.1");
      expect(xPath.node.trailingComments).toHaveLength(1);
      expect(xPath.node.trailingComments[0].value).toBe(" comment");
      expect(zPath.node.leadingComments).toBeUndefined();
    });
    it("should preserve comments when a statement with leading comments is removed and it has trailing siblings", function () {
      const rootPath = getPath("// comment\nvar y = 1;\nvar z = 2;");
      const path = rootPath.get("body.0");
      path.remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(`
        "// comment

        var z = 2;"
      `);
      const zPath = rootPath.get("body.0");
      expect(zPath.node.leadingComments).toHaveLength(1);
      expect(zPath.node.leadingComments[0].value).toBe(" comment");
    });
    it("should preserve comments when a statement with trailing comments is removed and it has leading siblings", function () {
      const rootPath = getPath("var x = 0; var y = 1;// comment");
      const path = rootPath.get("body.1");
      path.remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(
        `"var x = 0; // comment"`,
      );

      const xPath = rootPath.get("body.0");
      expect(xPath.node.trailingComments).toHaveLength(1);
      expect(xPath.node.trailingComments[0].value).toBe(" comment");
    });
    it("should preserve comments when a statement with trailing comments is removed and it has trailing siblings", function () {
      const rootPath = getPath("var x = 0; var y = 1;// comment\nvar z = 2;");
      const path = rootPath.get("body.1");
      path.remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(`
        "var x = 0;
        // comment
        var z = 2;"
      `);

      const xPath = rootPath.get("body.0");
      const zPath = rootPath.get("body.1");
      expect(xPath.node.trailingComments).toBeUndefined();
      expect(zPath.node.leadingComments).toHaveLength(1);
      expect(zPath.node.leadingComments[0].value).toBe(" comment");
    });
    it("does not preserve comments when a statement with leading comments is removed and it has no siblings", function () {
      const rootPath = getPath("{ // comment\nvar y = 1; }");
      const path = rootPath.get("body.0");
      path.get("body.0").remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(`"{}"`);
      expect(path.node.innerComments).toBeUndefined();
    });
    it("does not preserve comments when a statement with leading comments is removed and it is not an element of a list container", function () {
      const rootPath = getPath("function *gen(x) { yield /* comment */x }");
      const path = rootPath.get("body.0");
      path.get("body.body.0.expression.argument").remove();
      expect(generateCode(rootPath)).toMatchInlineSnapshot(`
        "function* gen(x) {
          yield;
        }"
      `);
    });
  });
});
