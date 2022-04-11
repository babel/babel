let counter = 0;
class Foo {
  constructor() {
    this.#privateFieldValue = ++counter;
  }

  get #privateFieldValue() {
    return 42;
  }
}

expect(() => new Foo).toThrow();
expect(counter).toBe(1);
