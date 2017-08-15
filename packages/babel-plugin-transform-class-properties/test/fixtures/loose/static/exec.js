class Foo {
  static num = 0;
  static str = "foo";
}

assert.equal(Foo.num, 0);
assert.equal(Foo.num = 1, 1);
assert.equal(Foo.str, "foo");
assert.equal(Foo.str = "bar", "bar");
