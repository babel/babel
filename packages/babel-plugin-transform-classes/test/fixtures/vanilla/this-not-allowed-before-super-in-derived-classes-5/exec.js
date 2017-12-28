class Bar {}

class Foo extends Bar {
  constructor() {
    Foo[this];
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
