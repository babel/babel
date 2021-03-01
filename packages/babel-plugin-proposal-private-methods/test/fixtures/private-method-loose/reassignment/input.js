let counter = 0;
class Foo {
  constructor() {
    this.#privateMethod = ++counter;
  }

  #privateMethod() {
    return 42;
  }
}
