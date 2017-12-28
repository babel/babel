class Foo {
  bar() {}
}

const foo = new Foo();

assert.throws(() => new foo.bar(), "Cannot instantiate a class method");
