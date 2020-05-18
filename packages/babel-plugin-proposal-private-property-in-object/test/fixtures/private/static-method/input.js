class Foo {
  static #foo() {}

  test(other) {
    return #foo in other;
  }
}
