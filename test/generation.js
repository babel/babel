var generate = require("../lib/6to5/generator");
var assert   = require("assert");
var helper   = require("./_helper");
var util     = require("../lib/6to5/util");
var chai     = require("chai");
var t        = require("../lib/6to5/types");
var _        = require("lodash");

suite("generation", function () {
  test("completeness", function () {
    _.each(t.VISITOR_KEYS, function (keys, type) {
      assert.ok(!!generate.CodeGenerator.prototype[type], type + " should exist");
    });

    _.each(generate.CodeGenerator.prototype, function (fn, type) {
      if (!/[A-Z]/.test(type[0])) return;
      assert.ok(t.VISITOR_KEYS[type], type + " should not exist");
    });
  });
});

_.each(helper.get("generation"), function (testSuite) {
  suite("generation/" + testSuite.title, function () {
    _.each(testSuite.tests, function (task) {
      test(task.title, function () {
        var expect = task.expect;
        var actual = task.actual;

        var actualAst  = util.parse({ filename: actual.loc }, actual.code);
        var actualCode = generate(actual.code, actualAst).code;

        chai.expect(actualCode).to.equal(expect.code, actual.loc + " !== " + expect.loc);
      });
    });
  });
});
