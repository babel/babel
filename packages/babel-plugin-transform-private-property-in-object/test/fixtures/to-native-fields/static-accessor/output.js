class Foo {
  static get #foo() {}
  test(other) {
    return Foo === babelHelpers.checkInRHS(other);
  }
}
