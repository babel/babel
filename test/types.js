var assert = require("assert");
var t      = require("../lib/6to5/types");

suite("types", function () {
  test("isFalsyExpression", function () {
    assert.ok(t.isFalsyExpression(t.literal("")));
    assert.ok(t.isFalsyExpression(t.literal(null)));
    assert.ok(t.isFalsyExpression(t.literal(0)));
    assert.ok(t.isFalsyExpression(t.identifier("undefined")));

    assert.ok(!t.isFalsyExpression(t.literal("foobar")));
    assert.ok(!t.isFalsyExpression(t.literal(5)));
    assert.ok(!t.isFalsyExpression(t.identifier("foobar")));
  });
});
