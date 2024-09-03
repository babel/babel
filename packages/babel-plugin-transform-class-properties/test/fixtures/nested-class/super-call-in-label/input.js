class Bar {}
class Foo extends Bar {
  constructor() {
    x: {
      break x;
      super();
    }
  }
}

expect(() => new Foo()).toThrow();
