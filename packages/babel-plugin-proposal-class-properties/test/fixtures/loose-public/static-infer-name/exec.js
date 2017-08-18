var Foo = class {
  static num = 0;
}

assert.equal(Foo.num, 0);
assert.equal(Foo.num = 1, 1);
assert.equal(Foo.name, "Foo");
