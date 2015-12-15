var t = require("../lib");
var assert = require("assert");

suite("Validators", function () {
  test("isValidIdentifier()", function () {
    var fixtures = require("./fixtures/identifier");

    fixtures.forEach(function (fixture) {
      var value = fixture[0];
      var isValid = fixture[1];

      assert.equal(
        t.isValidIdentifier(value),
        isValid,
        (
          "Expected t.isValidIdentifier(" +
          JSON.stringify(value) +
          ") === " +
          JSON.stringify(isValid)
        )
      );
    });
  });

  test("isSpecIdentifierName()", function () {
    var fixtures = require("./fixtures/identifier-name");

    fixtures.forEach(function (fixture) {
      var value = fixture[0];
      var isValid = fixture[1];

      assert.equal(
        t.isSpecIdentifierName(value),
        isValid,
        (
          "Expected t.isSpecIdentifierName(" +
          JSON.stringify(value) +
          ") === " +
          JSON.stringify(isValid)
        )
      );
    });
  });
});
