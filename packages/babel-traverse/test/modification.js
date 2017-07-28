import traverse from "../lib";
import assert from "assert";
import { parse } from "babylon";
import generate from "babel-generator";
import * as t from "babel-types";

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

describe("modification", function() {
  describe("pushContainer", function() {
    it("pushes identifier into params", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body.0");
      path.pushContainer("params", t.identifier("b"));

      assert.equal(generateCode(rootPath), "function test(a, b) {}");
    });

    it("pushes identifier into block", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body.0.body");
      path.pushContainer("body", t.expressionStatement(t.identifier("b")));

      assert.equal(generateCode(rootPath), "function test(a) {\n  b;\n}");
    });
  });
  describe("unshiftContainer", function() {
    it("unshifts identifier into params", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body.0");
      path.unshiftContainer("params", t.identifier("b"));

      assert.equal(generateCode(rootPath), "function test(b, a) {}");
    });

    it("unshifts identifier into block", function() {
      const rootPath = getPath("function test(a) {}");
      const path = rootPath.get("body.0.body");
      path.unshiftContainer("body", t.expressionStatement(t.identifier("b")));

      assert.equal(generateCode(rootPath), "function test(a) {\n  b;\n}");
    });
  });
});
