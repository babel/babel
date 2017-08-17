class Foo {
  #bar = "foo";

  test() {
    return this.#bar;
  }

  static test(foo) {
    return foo.#bar;
  }
}

const f = new Foo();
assert.equal(f.test(), "foo");
assert.equal(Foo.test(f), "foo");
assert.isFalse("bar" in f);
