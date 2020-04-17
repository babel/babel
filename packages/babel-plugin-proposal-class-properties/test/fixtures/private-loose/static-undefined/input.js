class Foo {
  static #bar;

  static test() {
    return Foo.#bar;
  }

  test() {
    return Foo.#bar;
  }
}
