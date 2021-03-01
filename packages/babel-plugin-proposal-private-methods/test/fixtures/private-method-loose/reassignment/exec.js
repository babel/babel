let counter = 0;
class Foo {
  constructor() {
    this.#privateMethod = ++counter;
  }

  #privateMethod() {
    return 42;
  }
}

try {
  new Foo;
} catch {
  expect(counter).toBe(1);
}
