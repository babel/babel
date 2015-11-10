class Foo {
  static num;
}

assert.equal("num" in Foo, false);
assert.equal(Foo.num, undefined);
