class Foo {
  static accessor #foo

  test(other) {
    return #foo in other;
  }
}
