class Foo {
  get #foo() {}

  test(other) {
    return #foo in other;
  }
}
