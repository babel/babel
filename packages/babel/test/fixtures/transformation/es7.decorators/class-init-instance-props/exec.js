function noop() {}

class Foo {
  @noop
  bar = "foobar";

  @noop
  foo() {
    return "bar";
  }
}

assert.equal(new Foo().bar, "foobar");
assert.equal(new Foo().foo(), "bar");
