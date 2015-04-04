class Foo {
  static num = 0;
  static str = "bar";
}

assert.equal(bar.num, 0);
assert.equal(bar.num = 1, 1);
assert.equal(bar.str, "bar");
