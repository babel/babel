class Bar {
  test() {}
}

class Foo extends Bar {
  constructor() {
    const t = () => super.test()
    t();
    super();
  }
}

assert.throws(() => new Foo(), /this hasn't been initialised/);
