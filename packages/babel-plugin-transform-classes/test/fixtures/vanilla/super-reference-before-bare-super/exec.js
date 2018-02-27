class Bar {}

class Foo extends Bar {
  constructor() {
    super.foo();
    super();
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
