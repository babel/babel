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

  test("toSequenceExpression");

  test("shallowEqual");

  test("appendToMemberExpression");

  test("prependToMemberExpression");

  test("isDynamic");

  test("isReferenced");

  test("isValidIdentifier");

  test("toIdentifier");

  test("ensureBlock");

  test("toStatement");

  test("toBlock");

  test("getUid");

  test("getIds");

  test("isLet");

  test("isVar");

  test("removeComments");

  test("inheritsComments");

  test("inherits");

  test("getSpecifierName");

  test("isSpecifierDefault");
});
