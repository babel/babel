var assert = require("assert");
var util   = require("../lib/util");
var parse  = require("../lib/helpers/parse");
var t      = require("../lib/types");

suite("util", function () {
  test("invalid template", function () {
    assert.throws(function () {
      util.template("invalid template");
    }, /unknown template/);
  });

  test("templates do not recurse", function () {
    var key   = __filename;
    var KEY   = parse("replacedKey").program.body[0].expression;
    var VALUE = parse("+KEY").program.body[0].expression;

    util.templates[key] = util.parseTemplate(key, "KEY = VALUE;");
    var result = util.template(key, { KEY: KEY, VALUE: VALUE });
    delete util.templates[key];

    assert.strictEqual(
      result.right.argument.name,
      "KEY",
      "template should not recurse into replaced nodes, replacing KEY inside VALUE"
    );
  });

  test("canCompile", function () {
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

  test("list", function () {
    assert.deepEqual(util.list(undefined), []);
    assert.deepEqual(util.list(false), []);
    assert.deepEqual(util.list(null), []);
    assert.deepEqual(util.list(""), []);
    assert.deepEqual(util.list("foo"), ["foo"]);
    assert.deepEqual(util.list("foo,bar"), ["foo", "bar"]);
    assert.deepEqual(util.list(["foo", "bar"]), ["foo", "bar"]);
    assert.deepEqual(util.list(/foo/), [/foo/]);

    var date = new Date;
    assert.deepEqual(util.list(date), [date]);
  });

  test("arrayify", function () {
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

  test("regexify", function () {
    assert.deepEqual(util.regexify(undefined), /.^/);
    assert.deepEqual(util.regexify(false), /.^/);
    assert.deepEqual(util.regexify(null), /.^/);
    assert.deepEqual(util.regexify(""), /.^/);
    assert.deepEqual(util.regexify(["foo", "bar"]), /\x66oo|\x62ar/i);
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

  test("booleanify", function () {
    assert.strictEqual(util.booleanify("true"), true);
    assert.strictEqual(util.booleanify("false"), false);
    assert.strictEqual(util.booleanify("inline"), "inline");
  });

  test("resolve", function () {
    assert.notEqual(util.resolve("is-integer").indexOf("node_modules/is-integer"), -1);
    assert.equal(util.resolve("foo-bar-module"), null);
  });

  test("toIdentifier", function () {
    assert.equal(t.toIdentifier(t.identifier("swag")), "swag");
    assert.equal(t.toIdentifier("swag-lord"), "swagLord");
  });

  test("shouldIgnore", function () {
    var reIgnore = /\-reIgnore\.js/;
    var fnIgnore = function (src) {
      if (src.indexOf("fnIgnore") > 0) {
        return true;
      }
    };

    assert.equal(util.shouldIgnore("test.js", []), false);
    assert.equal(util.shouldIgnore("test-reIgnore.js", [fnIgnore]), false);
    assert.equal(util.shouldIgnore("test-reIgnore.js", [reIgnore]), true);

    assert.equal(util.shouldIgnore("test-fnIgnore.js", [fnIgnore]), true);
    assert.equal(util.shouldIgnore("test-fnIgnore.js", [reIgnore]), false);
  });
});
