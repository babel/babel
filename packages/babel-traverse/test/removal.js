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
});
