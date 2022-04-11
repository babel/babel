class Foo {
  #foo = 1;

  test() {
    class Nested extends class {
      #foo = 2;
      [this.#foo] = 2;
    } {
      #foo = 3;
    }
  }
}
