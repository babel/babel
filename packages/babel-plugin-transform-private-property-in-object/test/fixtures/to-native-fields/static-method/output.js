class Foo {
  static #foo() {}
  test(other) {
    return Foo === babelHelpers.checkInRHS(other);
  }
}
