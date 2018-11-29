class Foo {
  constructor() {
    this.publicField = this.#privateMethod();
  }

  #privateMethod() {
    return 42;
  }
}