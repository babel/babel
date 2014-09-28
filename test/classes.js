var transform = require("../lib/6to5/transform");
var assert    = require("assert");

suite("classes", function () {
  test("no calling super properties", function () {
    assert.throws(function () {
      transform.test([
        "class Test extends Foo {",
        "  constructor() {",
        "    super.test.whatever();",
        "  }",
        "}"
      ]);
    }, /cannot access super properties/);
  });

  test("no accessing super properties", function () {
    assert.throws(function () {
      transform.test([
        "class Test extends Foo {",
        "  constructor() {",
        "    super.test.whatever;",
        "  }",
        "}"
      ]);
    }, /cannot access super properties/);
  });

  test("accessing super without having one", function () {
    assert.throws(function () {
      transform.test([
        "class Test {",
        "  constructor() {",
        "    super();",
        "  }",
        "}"
      ]);
    }, /cannot access super as this class has none/);
  });

  test("defining constructor as a mutator", function () {
    assert.throws(function () {
      transform.test([
        "class Test {",
        "  get constructor() {",
        "  }",
        "}"
      ]);
    }, /unknown kind for constructor method/);
  });
});
