class Bar {}

class Foo extends Bar {
  constructor() {

  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
