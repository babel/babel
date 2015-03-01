var assert = require("assert");
var parse  = require("../lib/babel/helpers/parse");
var t      = require("../lib/babel/types");

suite("types", function () {
  test("evaluate", function () {
    var evaluateAssert = function (code, expect) {
      var res = t.evaluate(parse({}, code).program.body[0].expression);
      assert.ok(res.confident, "Not confident");
      assert.equal(res.value, expect);
      assert.equal(res.value, eval(code));
    };

    // Literal
    evaluateAssert("5", 5);
    evaluateAssert("true", true);
    evaluateAssert("false", false);
    evaluateAssert("null", null);
    evaluateAssert("'foo'", "foo");

    // SequenceExpression
    evaluateAssert("(false, true)", true);
    evaluateAssert("(false, false)", false);

    // Identifier
    evaluateAssert("undefined", undefined);

    // ConditionalExpression
    evaluateAssert("true ? 'foo' : 'bar'", "foo");
    evaluateAssert("false ? 'foo' : 'bar'", "bar");
    evaluateAssert("'' ? 'foo' : 'bar'", "bar");
    evaluateAssert("'foobar' ? 'foo' : 'bar'", "foo");
    evaluateAssert("5 < 22 ? 'foo' : 'bar'", "foo");
    evaluateAssert("22 < 5 ? 'foo' : 'bar'", "bar");

    // BinaryExpression -
    evaluateAssert("5 - 5", 0);
    evaluateAssert("5 - 6", -1);
    evaluateAssert("5.5 - 6", -0.5);

    // BinaryExpression +
    evaluateAssert("5 + 5", 10);
    evaluateAssert("5 + 6", 11);
    evaluateAssert("5.5 + 6", 11.5);
    evaluateAssert("-5 + 5", 0);

    // BinaryExpression /

    // BinaryExpression *

    // BinaryExpression %

    // BinaryExpression <

    // BinaryExpression >

    // BinaryExpression <=

    // BinaryExpression >=

    // BinaryExpression ==

    // BinaryExpression !=

    // BinaryExpression ===

    // BinaryExpression !==

    // UnaryExpression void

    // UnaryExpression !

    // UnaryExpression +

    // UnaryExpression -

    // LogicalExpression ||

    // LogicalExpression &&
    evaluateAssert("true && true", true);
    evaluateAssert("true && false", false);
    evaluateAssert("false && false", false);
  });

  test("evaluateTruthy", function () {

  });
});
