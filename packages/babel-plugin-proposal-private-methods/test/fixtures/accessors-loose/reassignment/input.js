let counter = 0;
class Foo {
  constructor() {
    this.#privateFieldValue = ++counter;
  }

  get #privateFieldValue() {
    return 42;
  }
}
