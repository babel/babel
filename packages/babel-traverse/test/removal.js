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

  it("remove AssignmentExpression and check binding", function () {
    const ast = parse("var a=1;a=2;");
    traverse(ast, {
      AssignmentExpression: function (path) {
        path.remove();
        expect(path.scope.getBinding("a")).toBeDefined();
      },
    });
  });

  it("remove for and check binding", function () {
    const ast = parse("var x = 1;for (x of []) { }");
    traverse(ast, {
      ForOfStatement: function (path) {
        path.remove();
        expect(path.scope.getBinding("x")).toBeDefined();
      },
    });
  });

  it("remove block and check binding", function () {
    const ast = parse("var x=1;{{{x=2;var y=x;}}};");
    traverse(ast, {
      BlockStatement: function (path) {
        path.remove();
        path.stop();
        const binding = path.scope.getBinding("x");
        expect(binding).toBeDefined();
        expect(binding.constantViolations.length).toBe(0);
        expect(binding.constant).toBe(true);
        expect(binding.referencePaths.length).toBe(0);
        expect(binding.references).toBe(0);
        expect(binding.referenced).toBe(false);
      },
    });
  });
});
