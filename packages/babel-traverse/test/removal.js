import { parse } from "@babel/parser";

import _traverse from "../lib/index.js";
import _generate from "@babel/generator";
const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

function getPath(code) {
  const ast = parse(code);
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

describe("removal", function () {
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
      Array [
        Object {
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
        Object {
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
        Object {
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
});
