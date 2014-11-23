var assert = require("assert");
var util   = require("../lib/6to5/util");
var t      = require("../lib/6to5/types");

suite("util", function () {
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

  test("arrayify", function () {
    assert.deepEqual(util.arrayify(undefined), []);
    assert.deepEqual(util.arrayify(false), []);
    assert.deepEqual(util.arrayify(null), []);
    assert.deepEqual(util.arrayify(""), []);
    assert.deepEqual(util.arrayify("foo"), ["foo"]);
    assert.deepEqual(util.arrayify("foo,bar"), ["foo", "bar"]);
    assert.deepEqual(util.arrayify(["foo", "bar"]), ["foo", "bar"]);

    assert.throws(function () {
      util.arrayify({});
    }, /illegal type for arrayify/);
  });

  test("regexify", function () {
    assert.deepEqual(util.regexify(undefined), /.^/);
    assert.deepEqual(util.regexify(false), /.^/);
    assert.deepEqual(util.regexify(null), /.^/);
    assert.deepEqual(util.regexify(""), /.^/);
    assert.deepEqual(util.regexify(["foo", "bar"]), /foo|bar/);
    assert.deepEqual(util.regexify("foobar"), /foobar/);
    assert.deepEqual(util.regexify(/foobar/), /foobar/);

    assert.throws(function () {
      util.regexify({});
    }, /illegal type for regexify/);
  });

  test("getIds");

  test("toStatement");

  test("toBlock");

  test("toIdentifier", function () {
    assert.equal(t.toIdentifier(t.identifier("swag")), "swag");
    assert.equal(t.toIdentifier("swag-lord"), "swagLord");
  });

  test("isReferenced");

  test("removeProperties");

  test("ensureBlock");

  test("pushMutatorMap");
});
