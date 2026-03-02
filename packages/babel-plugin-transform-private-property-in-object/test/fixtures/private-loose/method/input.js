class Foo {
  #foo() {}

  test(other) {
    return #foo in other;
  }
}
