class Foo {
  #foo = 1;

  test(other) {
    return #foo in other;
  }
}
