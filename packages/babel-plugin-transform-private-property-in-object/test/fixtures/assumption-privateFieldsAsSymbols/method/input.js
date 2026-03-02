class Foo {
  #foo() { }
  #foo2() { }

  test(other) {
    return #foo in other;
  }
  test2(other) {
    return #foo in other;
  }
}
