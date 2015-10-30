var generate = require("../lib");
var assert   = require("assert");
var parse    = require("babylon").parse;
var chai     = require("chai");
var t        = require("babel-types");
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

var suites = require("babel-helper-fixtures")(__dirname + "/fixtures");

suites.forEach(function (testSuite) {
  suite("generation/" + testSuite.title, function () {
    _.each(testSuite.tests, function (task) {
      test(task.title, !task.disabled && function () {
        var expect = task.expect;
        var actual = task.actual;

        var actualAst = parse(actual.code, {
          filename: actual.loc,
          plugins: [
            "jsx",
            "flow",
            "decorators",
            "asyncFunctions",
            "exportExtensions",
            "functionBind",
            "classConstructorCall",
          ],
          strictMode: false,
          sourceType: "module",
        });

        var actualCode = generate.default(actualAst, task.options, actual.code).code;
        chai.expect(actualCode).to.equal(expect.code, actual.loc + " !== " + expect.loc);
      });
    });
  });
});
