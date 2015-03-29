var generate = require("../../lib/babel/generation");
var assert   = require("assert");
var helper   = require("./_helper");
var parse    = require("../../lib/babel/helpers/parse");
var chai     = require("chai");
var t        = require("../../lib/babel/types");
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
      test(task.title, !task.disabled && function () {
        var expect = task.expect;
        var actual = task.actual;

        var actualAst  = parse({
          filename: actual.loc,
          nonStandard: true,
          experimental: true,
          strictMode: false,
          sourceType: "module",
          features: {
            "es7.comprehensions": true,
            "es7.asyncFunctions": true,
            "es7.exportExtensions": true
          }
        }, actual.code);
        var actualCode = generate(actualAst, null, actual.code).code;

        chai.expect(actualCode).to.equal(expect.code, actual.loc + " !== " + expect.loc);
      });
    });
  });
});
