class Foo {
  static num;
}

assert.equal("num" in Foo, true);
assert.equal(Foo.num, undefined);
