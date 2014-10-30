var CodeGenerator = require("../lib/6to5/generator").CodeGenerator;
var traverse      = require("../lib/6to5/traverse");
var assert        = require("assert");
var _             = require("lodash");

suite("generation", function () {
  test("completeness", function () {
    _.each(traverse.VISITOR_KEYS, function (keys, type) {
      assert.ok(!!CodeGenerator.prototype[type], type + " should exist");
    });

    _.each(CodeGenerator.prototype, function (fn, type) {
      if (!/[A-Z]/.test(type[0])) return;
      assert.ok(traverse.VISITOR_KEYS[type], type + " should not exist");
    });
  });
});
