class Root {}

class Foo extends Root {
  constructor(
    cb = () => {
      return this;
    }
  ) {
    super();
    this.cb = cb;
  }
}

expect(new Foo().cb().constructor.name).toBe("Foo");
