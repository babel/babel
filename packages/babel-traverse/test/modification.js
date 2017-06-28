import traverse from "../lib";
import assert from "assert";
import { parse } from "babylon";
import * as t from "babel-types";
import generate from "babel-generator";

describe("path/modification", function () {
  describe("insertBefore", function () {
    const ast = parse(`function abc() {
      var x = 3;
    }`);

    it("does things", function () {
      traverse(ast, {
        BlockStatement(path) {
          path.insertBefore(t.expressionStatement(
            t.callExpression(
              t.identifier("s"),
              [],
            )
          ));
        },
      });

      assert.equal(generate(ast).code, `function abc() {
  s();
  {
    var x = 3;
  }
}`);
    });
  });
});
