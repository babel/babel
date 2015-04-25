function noop() {}

class Foo {
  @noop
  static bar = "foobar";

  @noop
  static foo() {
    return "bar";
  }
}

assert.equal(Foo.bar, "foobar");
assert.equal(Foo.foo(), "bar");
