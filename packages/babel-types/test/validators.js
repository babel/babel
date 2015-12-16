var t = require("../lib");
var assert = require("assert");

suite("Validators", function () {
  suite("Identifiers", function () {
    var tests = [
      {
        method: "isValidIdentifier",
        fixtures: "./fixtures/identifier",
      },

      {
        method: "isSpecIdentifier",
        fixtures: "./fixtures/identifier",
      },

      {
        method: "isSpecIdentifierName",
        fixtures: "./fixtures/identifier-name",
      },
    ];

    tests.forEach(function (testCfg) {
      test(testCfg.method + "()", function () {
        var fixtures = require(testCfg.fixtures);

        fixtures.forEach(function (fixture) {
          var value = fixture[0];
          var isValid = fixture[1];

          assert.equal(
            t[testCfg.method](value),
            isValid,
            (
              "Expected t." +
              testCfg.method +
              "(" +
              JSON.stringify(value) +
              ") === " +
              JSON.stringify(isValid)
            )
          );
        });
      });
      // test
    });
  });
  // suite("Identifiers")
});
// suite("Validators")
