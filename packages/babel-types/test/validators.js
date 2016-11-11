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
});
