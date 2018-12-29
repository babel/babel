@deco
class A {
  static #foo() {}

  test() {
    A.#foo();
  }
}
