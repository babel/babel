import assert from "assert";
import * as util from "../lib/util";
import * as t from "babel-types";

describe("util", function () {
  it("canCompile", function () {
    assert.ok(util.canCompile("test.js"));
    assert.ok(util.canCompile("/test.js"));
    assert.ok(util.canCompile("/scripts/test.js"));

    assert.ok(util.canCompile("test.es6"));
    assert.ok(util.canCompile("/test.es6"));
    assert.ok(util.canCompile("/scripts/test.es6"));

    assert.ok(util.canCompile("test.es"));
    assert.ok(util.canCompile("/test.es"));
    assert.ok(util.canCompile("/scripts/test.es"));

    assert.ok(util.canCompile("test.jsx"));
    assert.ok(util.canCompile("/test.jsx"));
    assert.ok(util.canCompile("/scripts/test.jsx"));

    assert.ok(!util.canCompile("test"));
    assert.ok(!util.canCompile("test.css"));
    assert.ok(!util.canCompile("/test.css"));
    assert.ok(!util.canCompile("/scripts/test.css"));
  });

  it("list", function () {
    assert.deepEqual(util.list(undefined), []);
    assert.deepEqual(util.list(false), []);
    assert.deepEqual(util.list(null), []);
    assert.deepEqual(util.list(""), []);
    assert.deepEqual(util.list("foo"), ["foo"]);
    assert.deepEqual(util.list("foo,bar"), ["foo", "bar"]);
    assert.deepEqual(util.list(["foo", "bar"]), ["foo", "bar"]);
    assert.deepEqual(util.list(/foo/), [/foo/]);

    const date = new Date;
    assert.deepEqual(util.list(date), [date]);
  });

  it("arrayify", function () {
    assert.deepEqual(util.arrayify(undefined), []);
    assert.deepEqual(util.arrayify(false), []);
    assert.deepEqual(util.arrayify(null), []);
    assert.deepEqual(util.arrayify(""), []);
    assert.deepEqual(util.arrayify("foo"), ["foo"]);
    assert.deepEqual(util.arrayify("foo,bar"), ["foo", "bar"]);
    assert.deepEqual(util.arrayify(["foo", "bar"]), ["foo", "bar"]);
    assert.deepEqual(util.arrayify({ foo: "bar" }), [{ foo: "bar" }]);
    assert.deepEqual(util.arrayify(function () { return "foo"; })[0](), "foo");
  });

  it("regexify", function () {
    assert.deepEqual(util.regexify(undefined), /.^/);
    assert.deepEqual(util.regexify(false), /.^/);
    assert.deepEqual(util.regexify(null), /.^/);
    assert.deepEqual(util.regexify(""), /.^/);
    assert.deepEqual(util.regexify(["foo", "bar"]), /foo|bar/i);
    assert.deepEqual(util.regexify("foobar"), /(?:(?=.)foobar)/i);
    assert.deepEqual(util.regexify(/foobar/), /foobar/);

    assert.ok(util.regexify("foo/bar").test("bar/foo/bar"));
    assert.ok(util.regexify("foo/*").test("foo/bar.js"));
    assert.ok(util.regexify("*.js").test("bar.js"));
    assert.ok(util.regexify("./foo").test("foo"));
    assert.ok(util.regexify("./foo/bar.js").test("foo/bar.js"));
    assert.ok(util.regexify("foobar").test("foobar"));

    assert.throws(function () {
      util.regexify({});
    }, /illegal type for regexify/);
  });

  it("booleanify", function () {
    assert.strictEqual(util.booleanify("true"), true);
    assert.strictEqual(util.booleanify("false"), false);
    assert.strictEqual(util.booleanify("inline"), "inline");
  });

  it("toIdentifier", function () {
    assert.equal(t.toIdentifier("swag-lord"), "swagLord");
  });

  it("shouldIgnore", function () {
    const reIgnore = /\-reIgnore\.js/;
    const fnIgnore = function (src) {
      if (src.indexOf("fnIgnore") > 0) {
        return true;
      }
    };

    assert.equal(util.shouldIgnore("test.js", []), false);
    assert.equal(util.shouldIgnore("test-reIgnore.js", [fnIgnore]), false);
    assert.equal(util.shouldIgnore("test-reIgnore.js", [reIgnore]), true);

    assert.equal(util.shouldIgnore("test-fnIgnore.js", [fnIgnore]), true);
    assert.equal(util.shouldIgnore("test-fnIgnore.js", [reIgnore]), false);

    assert.equal(util.shouldIgnore("test-reIgnore.js", [], [fnIgnore]), true);
    assert.equal(util.shouldIgnore("test-reIgnore.js", [], [reIgnore]), false);

    assert.equal(util.shouldIgnore("test-fnIgnore.js", [], [fnIgnore]), false);
    assert.equal(util.shouldIgnore("test-fnIgnore.js", [], [reIgnore]), true);
  });
});
