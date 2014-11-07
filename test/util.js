var assert = require("assert");
var util   = require("../lib/6to5/util");

suite("util", function () {
  test("duplicate mutator map");

  test("invalid template", function () {
    assert.throws(function () {
      util.template("invalid template");
    }, /unknown template/);
  });

  test("canCompile", function () {
    assert.ok(util.canCompile("test.js"));
    assert.ok(util.canCompile("/test.js"));
    assert.ok(util.canCompile("/scripts/test.js"));

    assert.ok(util.canCompile("test.es6"));
    assert.ok(util.canCompile("/test.es6"));
    assert.ok(util.canCompile("/scripts/test.es6"));

    assert.ok(!util.canCompile("test"));
    assert.ok(!util.canCompile("test.css"));
    assert.ok(!util.canCompile("/test.css"));
    assert.ok(!util.canCompile("/scripts/test.css"));
  });

  test("isAbsolute", function () {
    assert.ok(util.isAbsolute("/test.js"));
    assert.ok(util.isAbsolute("C:\\test.js"));

    assert.ok(!util.isAbsolute());
    assert.ok(!util.isAbsolute(""));
    assert.ok(!util.isAbsolute("test.js"));
    assert.ok(!util.isAbsolute("test/test.js"));
  });

  test("list", function () {
    assert.deepEqual(util.list(undefined), []);
    assert.deepEqual(util.list(false), []);
    assert.deepEqual(util.list(null), []);
    assert.deepEqual(util.list(""), []);
    assert.deepEqual(util.list("foo"), ["foo"]);
    assert.deepEqual(util.list("foo,bar"), ["foo", "bar"]);
  });

  test("getIds");

  test("isReferenced");

  test("removeProperties");

  test("ensureBlock");

  test("pushMutatorMap");
});
