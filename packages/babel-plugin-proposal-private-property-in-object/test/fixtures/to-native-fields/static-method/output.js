class Foo {
  static #foo() {}

  test(other) {
    return Foo === other;
  }

}
