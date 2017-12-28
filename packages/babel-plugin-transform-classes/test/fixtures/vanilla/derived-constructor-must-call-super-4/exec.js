class Bar {}

class Foo extends Bar {
  constructor() {
    const fn = () => super();
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
