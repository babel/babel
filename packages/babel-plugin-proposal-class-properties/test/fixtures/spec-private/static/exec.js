class Foo {
  static #bar = "foo";

  static test() {
    return Foo.#bar;
  }

  test() {
    return Foo.#bar;
  }
}

assert.isFalse("bar" in Foo)
assert.equal(Foo.test(), "foo")
assert.equal(Foo.test(), "foo")
