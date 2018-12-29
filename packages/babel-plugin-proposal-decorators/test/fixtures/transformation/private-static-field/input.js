@deco
class A {
  static #foo = 2;

  test() {
    A.#foo;
  }
}
