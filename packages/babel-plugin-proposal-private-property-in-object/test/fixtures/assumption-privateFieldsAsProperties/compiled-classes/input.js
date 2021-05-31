class Foo {
  static #foo = "foo";
  #bar = "bar";

  static test() {
    return #foo in Foo;
  }

  test() {
    return #bar in this;
  }
}
