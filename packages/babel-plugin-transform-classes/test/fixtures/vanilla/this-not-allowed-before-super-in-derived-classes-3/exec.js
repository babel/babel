class Bar {}

class Foo extends Bar {
  constructor() {
    const fn = () => this;
    fn();
    super();
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
