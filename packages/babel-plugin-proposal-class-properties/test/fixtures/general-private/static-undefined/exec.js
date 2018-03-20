class Foo {
  static #bar;

  static test() {
    return Foo.#bar;
  }

  test() {
    return Foo.#bar;
  }
}

assert.isFalse("bar" in Foo)
assert.equal(Foo.test(), undefined)
assert.equal(Foo.test(), undefined)
