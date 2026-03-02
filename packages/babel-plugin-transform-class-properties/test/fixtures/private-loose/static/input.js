class Foo {
  static #bar = "foo";

  static test() {
    return Foo.#bar;
  }

  test() {
    return Foo.#bar;
  }
}
