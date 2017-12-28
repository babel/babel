class Bar {
  bar() {}
}

class Foo extends Bar {}
const foo = new Foo();

assert.throws(() => new foo.bar(), "Cannot instantiate a class method");