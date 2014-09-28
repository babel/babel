var assert = require("assert");
var util   = require("../lib/6to5/util");

suite("util", function () {
  test("duplicate mutator map", function () {
    var map = {
      test: {
        get: {}
      }
    };

    assert.throws(function () {
      util.pushMutatorMap(map, "test", "get", {});
    }, /a get already exists for this property/);
  });

  test("can compile", function () {
    assert.ok(util.canCompile("test.js"));
    assert.ok(util.canCompile("/test.js"));
    assert.ok(util.canCompile("/scripts/test.js"));

    assert.ok(!util.canCompile("test"));
    assert.ok(!util.canCompile("test.css"));
    assert.ok(!util.canCompile("/test.css"));
    assert.ok(!util.canCompile("/scripts/test.css"));
  });
});
