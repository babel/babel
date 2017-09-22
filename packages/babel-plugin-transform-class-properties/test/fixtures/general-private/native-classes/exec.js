class Foo {
  static #foo = "foo";
  #bar = "bar";

  static test() {
    return Foo.#foo;
  }

  test() {
    return this.#bar;
  }
}

const f = new Foo();
assert.isFalse("foo" in Foo)
assert.isFalse("bar" in f)
assert.equal(Foo.test(), "foo")
assert.equal(f.test(), "bar")
