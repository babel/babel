class Bar {}

class Foo extends Bar {
  constructor() {
    if (eval("false")) super();
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
