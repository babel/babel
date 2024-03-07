class Root {}

class Foo extends Root {
  constructor(
    cb = (super(),this)
  ) {
    this.cb = cb;
  }
}

expect(new Foo().cb.constructor.name).toBe("Foo");
