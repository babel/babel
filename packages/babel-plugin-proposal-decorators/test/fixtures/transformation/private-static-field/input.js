class A {
  @deco prop;

  static #foo = 2;

  test() {
    A.#foo;
  }
}
