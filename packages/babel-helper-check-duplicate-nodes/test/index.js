import _checkDuplicateNodes from "../lib/index.js";
import babel from "@babel/core";
const { parseSync, traverse, types: t } = babel;
const checkDuplicateNodes = _checkDuplicateNodes.default;

describe("checkDuplicateNodes", () => {
  it("should throw on duplicate AST nodes within same parent", () => {
    const ast = parseSync("{}", {
      filename: "example.js",
      configFile: false,
    });
    traverse(ast, {
      BlockStatement(path) {
        const { node } = path;
        const duplicate = t.identifier("ref");
        const statementBody = node.body;
        statementBody.unshift(
          t.variableDeclaration("var", [
            t.variableDeclarator(duplicate, duplicate),
          ]),
        );
        path.stop();
      },
    });
    expect(() => {
      checkDuplicateNodes(ast);
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw on duplicate AST nodes within different parent", () => {
    const ast = parseSync("{}", {
      filename: "example.js",
      configFile: false,
    });
    traverse(ast, {
      BlockStatement(path) {
        const { node } = path;
        const duplicate = t.identifier("ref");
        const statementBody = node.body;
        statementBody.unshift(
          t.variableDeclaration("var", [t.variableDeclarator(duplicate)]),
        );
        statementBody.unshift(
          t.expressionStatement(
            t.assignmentExpression("=", duplicate, t.nullLiteral()),
          ),
        );
        path.stop();
      },
    });
    expect(() => {
      checkDuplicateNodes(ast);
    }).toThrowErrorMatchingSnapshot();
  });
  it("should throw when more than one arguments are passed", () => {
    expect(() => {
      checkDuplicateNodes(babel, {});
    }).toThrow("checkDuplicateNodes accepts only one argument: ast");
  });
});
