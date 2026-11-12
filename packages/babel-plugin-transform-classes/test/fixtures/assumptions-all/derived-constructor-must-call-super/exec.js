class Bar {}

class Foo extends Bar {
  constructor() {

  }
}

expect(() => new Foo()).toThrow(ReferenceError, "this hasn't been initialised");
