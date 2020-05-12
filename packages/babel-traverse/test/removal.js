import traverse from "../lib";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function(_path) {
      path = _path;
      _path.stop();
    },
  });

  return path;
}

function generateCode(path) {
  return generate(path.node).code;
}

describe("removal", function() {
  describe("ArrowFunction", function() {
    it("remove body", function() {
      const rootPath = getPath("x = () => b;");
      const path = rootPath
        .get("body")[0]
        .get("expression")
        .get("right");
      const body = path.get("body");
      body.remove();

      expect(generateCode(rootPath)).toBe("x = () => {};");
    });
  });

  it("remove with noScope", function() {
    const ast = parse("a=1");
    traverse(ast, {
      AssignmentExpression: function(path) {
        path.remove();
      },
      noScope: true,
    });

    expect(generate(ast).code).toBe("");
  });

  test("remove ensures the right binding gets removed", function() {
    // Checks fix of https://github.com/babel/babel/issues/11551
    const program = getPath(`
    const a = '1'
    const main = () => {
      const a = 2
    }
    `);
    program.traverse({
      VariableDeclarator(path) {
        const variableDeclaration = path.parentPath;
        if (variableDeclaration.parentPath.isBlockStatement()) {
          expect(Object.keys(program.scope.bindings)).toEqual(["a", "main"]);
          expect(Object.keys(path.scope.bindings)).toEqual(["a"]);
          path.remove();
          expect(Object.keys(program.scope.bindings)).toEqual(["a", "main"]);
          expect(Object.keys(path.scope.bindings)).toEqual([]);
        }
      },
    });

    expect.assertions(4);
  });
});
