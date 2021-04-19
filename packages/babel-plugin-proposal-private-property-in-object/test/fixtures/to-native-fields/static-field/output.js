class Foo {
  static #foo = 1;

  test(other) {
    return Foo === other;
  }

}
