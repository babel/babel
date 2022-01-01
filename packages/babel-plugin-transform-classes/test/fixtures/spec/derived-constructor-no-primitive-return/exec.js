class Bar {}

class Foo extends Bar {
  constructor() {
    super();
    return 3;
  }
}

class Foo2 extends Bar {
  constructor() {
    super();
    return null;
  }
}

expect(() => new Foo()).toThrow("Derived constructors may only return object or undefined");
expect(() => new Foo2()).toThrow("Derived constructors may only return object or undefined");
