var t = require("../../lib");
var assert = require("assert");

// Bear in mind that ast.Identifier is used to represent syntactic productions
// that can be spec.IdentifierName (like object property keys).
var fixtures = require("../fixtures/identifier-name");

suite("Identifier", function () {
  test("validate()", function () {
    fixtures.forEach(function (fixture) {
      var value = fixture[0];
      var isValid = fixture[1];

      var assertMethod = isValid ? "doesNotThrow" : "throws";

      assert[assertMethod](function () {
        t.validate(
          {type: "Identifier"},
          "name",
          value
        )
      });
    });
  });
});
