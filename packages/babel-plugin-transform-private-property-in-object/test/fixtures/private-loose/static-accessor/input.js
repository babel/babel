class Foo {
  static get #foo() {}

  test(other) {
    return #foo in other;
  }
}
