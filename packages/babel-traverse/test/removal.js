import traverse from "../lib";
import assert from "assert";
import { parse } from "babylon";
import * as t from "babel-types";
import generate from "babel-generator";

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    }
  });

  return path;
}

function generateCode(path) {
  return generate(path.node).code;
}

describe("removal", function () {
  describe("AssignmentExpression", function () {
    it.skip("remove left", function () {
      const rootPath = getPath("x = a;");
      const path = rootPath.get("body")[0].get('expression');
      const left = path.get("left");
      left.remove();

      assert.equal(generate(rootPath.node).code, "?", "?");
    });

    it("remove right", function () {
      const rootPath = getPath("x = a;");
      const path = rootPath.get("body")[0].get('expression');
      const right = path.get("right");
      right.remove();

      assert.equal(generateCode(rootPath), "x = void 0;", "right hand side should be replaced with undefined");
    });
  });

  describe("ArrowFunction", function () {
    it("remove body", function () {
      const rootPath = getPath("x = () => b;");
      const path = rootPath.get("body")[0].get('expression').get('right');
      const body = path.get("body");
      body.remove();

      assert.equal(generateCode(rootPath), "x = () => void 0;", "body should be replaced with undefined");
    });
  });

  describe("ConditionalExpression", function () {
    it("remove alternate", function () {
      const rootPath = getPath("x = x ? a : b;");
      const path = rootPath.get("body")[0].get('expression').get('right');
      const alternate = path.get("alternate");
      alternate.remove();

      assert.equal(generateCode(rootPath), "x = x ? a : void 0;", "alternate should be replaced with undefined");
    });

    it("remove consequent", function () {
      const rootPath = getPath("x = x ? a : b;");
      const path = rootPath.get("body")[0].get('expression').get('right');
      const consequent = path.get("consequent");
      consequent.remove();

      assert.equal(generateCode(rootPath), "x = x ? void 0 : b;", "consequent should be replaced with undefined");
    });

    it("remove test", function () {
      const rootPath = getPath("x = x ? a : b;");
      const path = rootPath.get("body")[0].get('expression').get('right');
      const test = path.get("test");
      test.remove();

      assert.equal(generateCode(rootPath), "x = void 0 ? a : b;", "test should be replaced with undefined");
    });
  });
});
