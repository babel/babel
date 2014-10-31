var generate = require("../lib/6to5/generator");
var traverse = require("../lib/6to5/traverse");
var assert   = require("assert");
var util     = require("../lib/6to5/util");
var fs       = require("fs");
var _        = require("lodash");

var fixturesLoc = __dirname + "/fixtures/generation";

suite("generation", function () {
  test("completeness", function () {
    _.each(traverse.VISITOR_KEYS, function (keys, type) {
      assert.ok(!!generate.CodeGenerator.prototype[type], type + " should exist");
    });

    _.each(generate.CodeGenerator.prototype, function (fn, type) {
      if (!/[A-Z]/.test(type[0])) return;
      assert.ok(traverse.VISITOR_KEYS[type], type + " should not exist");
    });
  });

  _.each(fs.readdirSync(fixturesLoc), function (suiteName) {
    if (suiteName[0] === ".") return;

    var suiteLoc = fixturesLoc + "/" + suiteName;

    suite(suiteName, function () {
      _.each(fs.readdirSync(suiteLoc), function (testName) {
        if (testName[0] === ".") return;

        var testLoc = suiteLoc + "/" + testName;

        test(testName, function () {
          var expectedLoc = testLoc + "/expected.js";
          var actualLoc   = testLoc + "/actual.js";

          var expected = fs.readFileSync(expectedLoc, "utf8");
          var actual   = fs.readFileSync(actualLoc, "utf8");

          var actualAst = util.parseNoProperties(actualLoc, actual);
          actual        = generate(actual, actualAst).code;
          actualAst     = util.parseNoProperties(actualLoc, actual);

          var expectedAst = util.parseNoProperties(expectedLoc, expected);

          assert.deepEqual(actualAst, expectedAst);
        });
      });
    });
  });
});
