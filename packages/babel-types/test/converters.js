import * as t from "../lib";
import { assert } from "chai";

describe("converters", function () {
  describe("valueToNode", function () {
    it("number", function () {
      assert.deepEqual(t.valueToNode(Math.PI), t.numericLiteral(Math.PI));
      assert.deepEqual(t.valueToNode(-Infinity), t.numericLiteral(-Infinity));
      assert.deepEqual(t.valueToNode(NaN), t.numericLiteral(NaN));
    });
    it("string", function () {
      assert.deepEqual(t.valueToNode("This is a \"string\""), t.stringLiteral("This is a \"string\""));
    });
    it("boolean", function () {
      assert.deepEqual(t.valueToNode(true), t.booleanLiteral(true));
      assert.deepEqual(t.valueToNode(false), t.booleanLiteral(false));
    });
    it("null", function () {
      assert.deepEqual(t.valueToNode(null), t.nullLiteral());
    });
    it("undefined", function () {
      assert.deepEqual(t.valueToNode(undefined), t.identifier("undefined"));
    });
    it("RegExp", function () {
      assert.deepEqual(t.valueToNode(/abc.+/gm), t.regExpLiteral("abc.+", "gm"));
    });
    it("array", function () {
      assert.deepEqual(t.valueToNode([1, "a"]), t.arrayExpression([t.numericLiteral(1), t.stringLiteral("a")]));
    });
    it("object", function () {
      assert.deepEqual(t.valueToNode({
        a: 1,
        "b c": 2
      }), t.objectExpression([
        t.objectProperty(t.identifier("a"), t.numericLiteral(1)),
        t.objectProperty(t.stringLiteral("b c"), t.numericLiteral(2))
      ]));
    });
    it("throws if cannot convert", function () {
      assert.throws(function () {
        t.valueToNode(Object);
      });
      assert.throws(function () {
        t.valueToNode(Symbol());
      });
    });
  });
});
