let counter = 0;
class Foo {
  constructor() {
    this.#privateMethod = ++counter;
  }

  #privateMethod() {
    return 42;
  }
}

expect(() => new Foo).toThrow();
expect(counter).toBe(1);
