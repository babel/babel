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
} catch (e) {
  expect(counter).toBe(1);
}
