class Bar {}

class Foo extends Bar {
  constructor() {
    this.foo = "bar";
    super();
  }
}

assert.throws(() => new Foo());
