class Bar {}

class Foo extends Bar {
  constructor() {
    super(this);
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
