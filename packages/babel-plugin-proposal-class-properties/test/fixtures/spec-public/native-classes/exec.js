class Foo {
  static foo = "foo";
  bar = "bar";

  static test() {
    return Foo.foo;
  }

  test() {
    return this.bar;
  }
}

const f = new Foo();
assert.isTrue("foo" in Foo)
assert.isTrue("bar" in f)
assert.equal(Foo.test(), "foo")
assert.equal(f.test(), "bar")
