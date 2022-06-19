class Foo {
  accessor #foo;

  test(other) {
    return #foo in other;
  }
}
